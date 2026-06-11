const GRID_SIZE = 48;
const GRID_COLOR = "rgba(20, 184, 166, 0.08)";

const SCATTER_WORDS = [
  "HMI",
  "UX",
  "UI",
  "design",
  "automotive",
  "prototype",
  "interface",
  "motion",
  "glass",
  "metaball",
];

export function drawPortfolioBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
  gradient.addColorStop(0.65, "rgba(5, 5, 5, 0)");
  gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  for (let i = 0; i < 4; i++) {
    const cx = width * (0.35 + i * 0.1);
    const cy = height * (0.22 + Math.sin(i * 1.1) * 0.06);
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.28);
    rg.addColorStop(0, "rgba(20, 184, 166, 0.22)");
    rg.addColorStop(1, "rgba(20, 184, 166, 0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = "#f8fafc";
  const scatterSize = Math.max(11, Math.round(width * 0.014));
  ctx.font = `500 ${scatterSize}px ui-monospace, monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  for (let i = 0; i < SCATTER_WORDS.length; i++) {
    ctx.fillText(
      SCATTER_WORDS[i],
      width * (0.08 + (i % 4) * 0.22),
      height * (0.12 + Math.floor(i / 4) * 0.28 + (i % 3) * 0.1),
    );
  }
  ctx.restore();
}
