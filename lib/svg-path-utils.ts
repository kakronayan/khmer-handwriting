import type { CanvasPoint } from "@/types";

const SAMPLE_COUNT = 40;

/** Sample evenly spaced points along an SVG path (browser only). */
export function sampleSvgPath(pathD: string, count = SAMPLE_COUNT): CanvasPoint[] {
  if (typeof document === "undefined") return [];

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const length = path.getTotalLength();
  const points: CanvasPoint[] = [];

  for (let i = 0; i <= count; i++) {
    const pt = path.getPointAtLength((i / count) * length);
    points.push({ x: pt.x, y: pt.y, pressure: 0.5 });
  }

  document.body.removeChild(svg);
  return points;
}

/** Get the end point and direction angle (radians) of an SVG path. */
export function getPathEndDirection(
  pathD: string,
): { endX: number; endY: number; angle: number } | null {
  if (typeof document === "undefined") return null;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const length = path.getTotalLength();
  const end = path.getPointAtLength(length);
  const near = path.getPointAtLength(Math.max(0, length - 8));
  document.body.removeChild(svg);

  return {
    endX: end.x,
    endY: end.y,
    angle: Math.atan2(end.y - near.y, end.x - near.x),
  };
}
