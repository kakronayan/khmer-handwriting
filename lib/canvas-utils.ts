import type { CanvasPoint, CanvasStroke } from "@/types";

export function smoothStroke(points: CanvasPoint[]): CanvasPoint[] {
  if (points.length < 3) return points;

  const smoothed: CanvasPoint[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    smoothed.push({
      x: (prev.x + curr.x + next.x) / 3,
      y: (prev.y + curr.y + next.y) / 3,
      pressure: curr.pressure,
    });
  }
  smoothed.push(points[points.length - 1]);
  return smoothed;
}

export function drawStroke(
  ctx: CanvasRenderingContext2D,
  stroke: CanvasStroke,
  scale: number,
): void {
  const points = smoothStroke(stroke.points);
  if (points.length === 0) return;

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#4FD1C5";
  ctx.shadowColor = "rgba(79, 209, 197, 0.5)";
  ctx.shadowBlur = 4;

  const first = points[0];
  ctx.moveTo(first.x * scale, first.y * scale);

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    const width = Math.max(2, p.pressure * 6) * scale;
    ctx.lineWidth = width;
    ctx.lineTo(p.x * scale, p.y * scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x * scale, p.y * scale);
  }
}

export function getCanvasPoint(
  canvas: HTMLCanvasElement,
  event: PointerEvent,
): CanvasPoint {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
    pressure: event.pressure > 0 ? event.pressure : 0.5,
  };
}

export function normalizePoint(
  point: CanvasPoint,
  width: number,
  height: number,
): CanvasPoint {
  return {
    x: (point.x / width) * 240,
    y: (point.y / height) * 240,
    pressure: point.pressure,
  };
}

export function denormalizePoint(
  point: CanvasPoint,
  width: number,
  height: number,
): CanvasPoint {
  return {
    x: (point.x / 240) * width,
    y: (point.y / 240) * height,
    pressure: point.pressure,
  };
}
