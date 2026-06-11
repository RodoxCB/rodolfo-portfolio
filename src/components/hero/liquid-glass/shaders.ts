import { MAX_ENTRIES } from "./constants";

export const vertexShader = /* glsl */ `void main(){ gl_Position = vec4(position, 1.0); }`;

export function getFragmentShader(): string {
  return /* glsl */ `
precision highp float;
#define MAX_N ${MAX_ENTRIES}

uniform vec2      uRes;
uniform sampler2D uData;
uniform sampler2D uBg;
uniform int       uCount;
uniform float     uTime;

void main(){
  vec2  uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2  p   = (uv - 0.5) * vec2(asp, 1.0);

  float field = 0.0;
  vec2  grad  = vec2(0.0);
  vec2  lens  = vec2(0.0);
  float lensW = 0.0;

  for(int i = 0; i < MAX_N; i++){
    if(i >= uCount) break;
    vec4  d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
    vec2  c = d.xy;
    float r = d.z;
    if(r < 0.001) continue;
    vec2  delta = p - c;
    float dSq   = dot(delta, delta) + 1e-5;
    float contrib = r * r / dSq;
    field += contrib;
    grad  += -2.0 * contrib / dSq * delta;

    float w = r * r / (dSq + r * r);
    lens += (c - p) * w;
    lensW += w;
  }

  lens /= (lensW + 0.001);
  float lensLen = length(lens);

  float thr  = 1.0;
  float edge = smoothstep(thr - 0.08, thr + 0.03, field);

  float refractStrength = 0.035;
  float mappedLens = atan(lensLen * 6.0) * refractStrength;
  vec2  refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
  float refractMask = smoothstep(thr - 0.2, thr + 1.5, field);
  vec2  refractedUV = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);

  vec3  bgClean = texture2D(uBg, uv).rgb;

  float gradLen = length(grad);
  float nScale = atan(gradLen * 0.5) * 0.3;
  vec2  nGrad  = (gradLen > 1e-4) ? (grad / gradLen) * nScale : vec2(0.0);
  vec3  N = normalize(vec3(-nGrad, 1.0));
  vec3  L = normalize(vec3(0.3, 0.6, 1.0));
  vec3  V = vec3(0.0, 0.0, 1.0);
  vec3  H = normalize(L + V);
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, H), 0.0), 180.0);

  float cosTheta = max(dot(N, V), 0.0);
  float fresnel  = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);

  float rim = smoothstep(thr + 0.6, thr, field) * edge;

  float caStr = 0.0018 * edge;
  vec3 bgCA;
  bgCA.r = texture2D(uBg, refractedUV + vec2(caStr, caStr * 0.5)).r;
  bgCA.g = texture2D(uBg, refractedUV).g;
  bgCA.b = texture2D(uBg, refractedUV - vec2(caStr, caStr * 0.5)).b;

  float depth = smoothstep(thr, thr + 3.0, field);
  vec3  tint  = mix(vec3(1.0), vec3(0.88, 0.98, 0.96), depth * 0.45);

  vec3 glassColor = bgCA * tint * (0.92 + 0.08 * diff)
                  + vec3(1.0) * spec * 0.85
                  + vec3(0.75, 0.95, 0.92) * rim * 0.22
                  + vec3(1.0) * fresnel * 0.10;

  float shadowField = smoothstep(thr - 0.35, thr - 0.05, field);
  vec3 bg = bgClean * (1.0 - shadowField * 0.06);

  float borderOuter = smoothstep(thr - 0.10, thr - 0.01, field);
  float borderInner = smoothstep(thr + 0.0, thr + 0.06, field);
  float border = borderOuter * (1.0 - borderInner) * 0.28;

  vec3  col = mix(bg, glassColor, edge);
  col += vec3(1.0) * border;

  gl_FragColor = vec4(col, 1.0);
}
`;
}
