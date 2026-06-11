import * as THREE from "three";
import {
  BOUNCE,
  CENTER_PULL,
  DAMP,
  FIXED_DT_MS,
  MAX_CATCHUP,
  MAX_DROPLETS,
  MAX_ENTRIES,
  MAX_FRAME_DT_MS,
  MAX_SPEED,
  MAX_DROPLET_RADIUS,
  MAX_DROPLET_RADIUS_TOUCH,
  MERGE_RATIO,
  MOUSE_F,
  MOUSE_R,
  SPAWN_RADIUS_MAX,
  SOFT_DAMPING,
  SOFT_STIFFNESS,
  SPLIT_MIN_R,
  SPLIT_SPEED,
  TENSION_F,
  TENSION_RANGE,
  WANDER_F,
} from "./constants";
import { drawPortfolioBackground } from "./drawBackground";
import { getFragmentShader, vertexShader } from "./shaders";
import type { Droplet, MouseState } from "./types";
import { isTouchDevice } from "./isTouchDevice";

export function createLiquidGlass(container: HTMLElement): () => void {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  const touchDevice = isTouchDevice();
  const maxDroplets = touchDevice ? 8 : MAX_DROPLETS;
  const initialDroplets = touchDevice ? 4 : 7;
  const autoSpawnCap = touchDevice ? 4 : 6;

  renderer.domElement.style.touchAction = touchDevice ? "pan-y" : "none";
  renderer.domElement.style.pointerEvents = touchDevice ? "none" : "auto";
  container.style.pointerEvents = touchDevice ? "none" : "auto";

  const getPixelRatio = () => {
    const cap = touchDevice ? 1.25 : 2;
    return Math.min(cap, window.devicePixelRatio || 1);
  };

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const bgCanvas = document.createElement("canvas");
  const bgCtx = bgCanvas.getContext("2d");
  if (!bgCtx) {
    renderer.dispose();
    renderer.domElement.remove();
    return () => undefined;
  }

  const bgTexture = new THREE.CanvasTexture(bgCanvas);
  bgTexture.minFilter = THREE.LinearFilter;
  bgTexture.magFilter = THREE.LinearFilter;

  const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
  const dropletTex = new THREE.DataTexture(
    dropletBuf,
    MAX_ENTRIES,
    1,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  dropletTex.minFilter = THREE.NearestFilter;
  dropletTex.magFilter = THREE.NearestFilter;
  dropletTex.needsUpdate = true;

  let aspect = 1;
  let width = 0;
  let height = 0;

  function drawBackground() {
    if (!bgCtx || width === 0 || height === 0) return;
    bgCanvas.width = width;
    bgCanvas.height = height;
    drawPortfolioBackground(bgCtx, width, height);
    bgTexture.needsUpdate = true;
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: getFragmentShader(),
    uniforms: {
      uRes: { value: new THREE.Vector2(1, 1) },
      uData: { value: dropletTex },
      uBg: { value: bgTexture },
      uCount: { value: 0 },
      uTime: { value: 0 },
    },
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

  let drops: Droplet[] = [];
  let uid = 0;
  let spawnCD = 0;
  let autoTimer = 0;
  let simTime = 0;
  const mouse: MouseState = { x: 999, y: 999, active: false, down: false };

  const getMaxRadius = () =>
    touchDevice ? MAX_DROPLET_RADIUS_TOUCH : MAX_DROPLET_RADIUS;

  function clampDroplet(d: Droplet) {
    const maxR = getMaxRadius();
    if (d.r <= maxR) return;
    d.r = maxR;
    d.area = Math.PI * maxR * maxR;
  }

  function enforceSizeLimits() {
    for (const d of drops) clampDroplet(d);
  }

  function spawn(x: number, y: number, r: number, vx = 0, vy = 0) {
    if (drops.length >= maxDroplets) return null;
    r = Math.min(r, getMaxRadius() * 0.85, SPAWN_RADIUS_MAX);
    const area = Math.PI * r * r;
    const angle = Math.random() * Math.PI * 2;
    const spd = 0.0003 + Math.random() * 0.0008;
    const d: Droplet = {
      id: uid++,
      x,
      y,
      r,
      area,
      vx: vx || Math.cos(angle) * spd,
      vy: vy || Math.sin(angle) * spd,
      alive: true,
      wanderAngle: Math.random() * Math.PI * 2,
      wanderSpeed: 0.3 + Math.random() * 0.5,
      softPrevX: x,
      softPrevY: y,
      softOffX: 0,
      softOffY: 0,
      softVelX: 0,
      softVelY: 0,
    };
    drops.push(d);
    return d;
  }

  for (let i = 0; i < initialDroplets; i++) {
    spawn(
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.45,
      0.03 + Math.random() * 0.045,
    );
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    aspect = width / height;
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(getPixelRatio());
    mat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
    drawBackground();
  }

  function applyForces() {
    for (const d of drops) {
      d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
      d.vx += Math.cos(d.wanderAngle) * WANDER_F;
      d.vy += Math.sin(d.wanderAngle) * WANDER_F;
      d.vx -= d.x * CENTER_PULL;
      d.vy -= d.y * CENTER_PULL;

      if (mouse.active) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dSq = dx * dx + dy * dy;
        const rr = MOUSE_R + d.r;
        if (dSq < rr * rr && dSq > 1e-5) {
          const dist = Math.sqrt(dSq);
          const s = 1 - dist / rr;
          const f = s * s * MOUSE_F;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
      }
    }

    for (let i = 0; i < drops.length; i++) {
      const a = drops[i];
      for (let j = i + 1; j < drops.length; j++) {
        const b = drops[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dSq = dx * dx + dy * dy;
        const rng = TENSION_RANGE + a.r + b.r;
        if (dSq < rng * rng && dSq > 1e-5) {
          const dist = Math.sqrt(dSq);
          const s = 1 - dist / rng;
          const f = s * TENSION_F;
          const fx = (dx / dist) * f;
          const fy = (dy / dist) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }
    }
  }

  function integrate() {
    for (const d of drops) {
      const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
      if (sp > MAX_SPEED) {
        const s = MAX_SPEED / sp;
        d.vx *= s;
        d.vy *= s;
      }
      d.x += d.vx;
      d.y += d.vy;
      d.vx *= DAMP;
      d.vy *= DAMP;

      const wx = aspect * 0.5;
      const wy = 0.5;
      if (d.x - d.r < -wx) {
        d.x = -wx + d.r;
        d.vx = Math.abs(d.vx) * BOUNCE;
      }
      if (d.x + d.r > wx) {
        d.x = wx - d.r;
        d.vx = -Math.abs(d.vx) * BOUNCE;
      }
      if (d.y - d.r < -wy) {
        d.y = -wy + d.r;
        d.vy = Math.abs(d.vy) * BOUNCE;
      }
      if (d.y + d.r > wy) {
        d.y = wy - d.r;
        d.vy = -Math.abs(d.vy) * BOUNCE;
      }
    }
  }

  function mergeDroplets() {
    for (let i = 0; i < drops.length; i++) {
      const a = drops[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < drops.length; j++) {
        const b = drops[j];
        if (!b.alive) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (a.r + b.r) * MERGE_RATIO) {
          const na = a.area + b.area;
          const mergedR = Math.sqrt(na / Math.PI);
          if (mergedR > getMaxRadius()) continue;

          a.x = (a.x * a.area + b.x * b.area) / na;
          a.y = (a.y * a.area + b.y * b.area) / na;
          a.vx = (a.vx * a.area + b.vx * b.area) / na;
          a.vy = (a.vy * a.area + b.vy * b.area) / na;
          a.r = mergedR;
          a.area = na;
          b.alive = false;
        }
      }
    }
    drops = drops.filter((d) => d.alive);
  }

  function splitDroplets() {
    const add: Droplet[] = [];
    for (const d of drops) {
      if (d.r < SPLIT_MIN_R) continue;
      const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
      if (sp < SPLIT_SPEED) continue;

      const ha = d.area * 0.5;
      const nr = Math.sqrt(ha / Math.PI);
      const nx = -d.vy / sp;
      const ny = d.vx / sp;
      const off = nr * 0.7;

      d.r = nr;
      d.area = ha;
      d.x -= nx * off;
      d.y -= ny * off;

      add.push({
        id: uid++,
        x: d.x + nx * off * 2,
        y: d.y + ny * off * 2,
        r: nr,
        area: ha,
        vx: d.vx + nx * sp * 0.35,
        vy: d.vy + ny * sp * 0.35,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: d.x + nx * off * 2,
        softPrevY: d.y + ny * off * 2,
        softOffX: 0,
        softOffY: 0,
        softVelX: 0,
        softVelY: 0,
      });
    }
    for (const a of add) {
      if (drops.length < maxDroplets) drops.push(a);
    }
  }

  function autoSpawn() {
    autoTimer += FIXED_DT_MS;
    if (autoTimer > 2000 && drops.length < autoSpawnCap) {
      autoTimer = 0;
      spawn(
        (Math.random() - 0.5) * aspect * 0.6,
        (Math.random() - 0.5) * 0.5,
        0.025 + Math.random() * 0.03,
      );
    }
  }

  function mouseSpawn() {
    if (!mouse.down || !mouse.active) return;
    spawnCD -= FIXED_DT_MS;
    if (spawnCD <= 0 && drops.length < maxDroplets) {
      spawnCD = 120;
      spawn(
        mouse.x + (Math.random() - 0.5) * 0.02,
        mouse.y + (Math.random() - 0.5) * 0.02,
        0.02 + Math.random() * 0.015,
      );
    }
  }

  function updateSoftBodies() {
    for (const d of drops) {
      const dx = d.x - d.softPrevX;
      const dy = d.y - d.softPrevY;
      d.softVelX += (dx - d.softOffX) * SOFT_STIFFNESS;
      d.softVelY += (dy - d.softOffY) * SOFT_STIFFNESS;
      d.softVelX *= SOFT_DAMPING;
      d.softVelY *= SOFT_DAMPING;
      d.softOffX += d.softVelX;
      d.softOffY += d.softVelY;
      d.softPrevX = d.x;
      d.softPrevY = d.y;
    }
  }

  function fixedUpdate() {
    simTime += FIXED_DT_MS;
    applyForces();
    integrate();
    mergeDroplets();
    if (!touchDevice) splitDroplets();
    enforceSizeLimits();
    updateSoftBodies();
    autoSpawn();
    mouseSpawn();
  }

  function sync() {
    dropletBuf.fill(0);
    const n = Math.min(drops.length, maxDroplets);
    for (let i = 0; i < n; i++) {
      const d = drops[i];
      dropletBuf[i * 4] = d.x;
      dropletBuf[i * 4 + 1] = d.y;
      dropletBuf[i * 4 + 2] = d.r;
      dropletBuf[i * 4 + 3] = 1;

      const ghostScale = touchDevice ? 0.5 : 0.6;
      const trailStr = touchDevice ? 2.2 : 2.8;
      const gi = (n + i) * 4;
      dropletBuf[gi] = d.x - d.softOffX * trailStr;
      dropletBuf[gi + 1] = d.y - d.softOffY * trailStr;
      dropletBuf[gi + 2] = d.r * ghostScale;
      dropletBuf[gi + 3] = 1;
    }
    dropletTex.needsUpdate = true;
    mat.uniforms.uCount.value = n * 2;
  }

  const onPointerMove = (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspect;
    mouse.y = 0.5 - (e.clientY - rect.top) / rect.height;
    mouse.active = true;
  };
  const onPointerDown = () => {
    mouse.down = true;
  };
  const onPointerUp = () => {
    mouse.down = false;
  };
  const onPointerLeave = () => {
    mouse.active = false;
    mouse.down = false;
  };

  if (!touchDevice) {
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(container);
  resize();

  let rafId = 0;
  let last = performance.now();
  let acc = 0;
  let paused = false;

  const onVisibilityChange = () => {
    paused = document.hidden;
    if (!paused) last = performance.now();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  const loop = () => {
    rafId = requestAnimationFrame(loop);
    if (paused) return;

    const now = performance.now();
    const dt = Math.min(now - last, MAX_FRAME_DT_MS);
    last = now;
    acc += dt;

    let steps = 0;
    while (acc >= FIXED_DT_MS && steps < MAX_CATCHUP) {
      fixedUpdate();
      acc -= FIXED_DT_MS;
      steps++;
    }
    if (steps >= MAX_CATCHUP) acc = 0;

    mat.uniforms.uTime.value = now * 0.001;
    sync();
    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    resizeObserver.disconnect();
    if (!touchDevice) {
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
    }
    mat.dispose();
    dropletTex.dispose();
    bgTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
