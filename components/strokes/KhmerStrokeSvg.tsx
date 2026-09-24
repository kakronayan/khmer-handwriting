"use client";

import { useStrokePathLengths } from "@/hooks/useStrokePathLengths";
import { getPathEndDirection } from "@/lib/svg-path-utils";
import { cn, formatKhmerNumber } from "@/lib/utils";
import type { StrokePath } from "@/types";
import { useMemo, useRef } from "react";

interface StrokeAnimationState {
  currentIndex: number;
  progress: number;
  isPlaying: boolean;
}

interface KhmerStrokeSvgProps {
  strokes: StrokePath[];
  animation: StrokeAnimationState;
  className?: string;
  showNumbers?: boolean;
  showArrows?: boolean;
}

const CIRCLED_NUMBERS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

function StrokeArrow({
  pathD,
  progress,
}: {
  pathD: string;
  progress: number;
}) {
  const endInfo = useMemo(
    () => getPathEndDirection(pathD),
    [pathD],
  );

  if (!endInfo || progress < 0.15) return null;

  const { endX, endY, angle } = endInfo;
  const size = 10;
  const tipX = endX + Math.cos(angle) * size;
  const tipY = endY + Math.sin(angle) * size;
  const wing1X = endX + Math.cos(angle + 2.5) * size * 0.7;
  const wing1Y = endY + Math.sin(angle + 2.5) * size * 0.7;
  const wing2X = endX + Math.cos(angle - 2.5) * size * 0.7;
  const wing2Y = endY + Math.sin(angle - 2.5) * size * 0.7;

  return (
    <polygon
      points={`${tipX},${tipY} ${wing1X},${wing1Y} ${wing2X},${wing2Y}`}
      fill="#FFD700"
      opacity={Math.min(1, progress * 1.5)}
    />
  );
}

export function KhmerStrokeSvg({
  strokes,
  animation,
  className,
  showNumbers = true,
  showArrows = true,
}: KhmerStrokeSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathLengths = useStrokePathLengths(strokes, svgRef);
  const currentStroke = strokes[animation.currentIndex];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 240"
      className={cn(
        "pointer-events-none absolute inset-[15%] h-[70%] w-[70%]",
        className,
      )}
      aria-hidden="true"
    >
      {/* Light gray outline guide for all strokes */}
      {strokes.map((stroke) => (
        <path
          key={`guide-${stroke.id}`}
          d={stroke.path}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {strokes.map((stroke, index) => {
        const length = pathLengths[index] ?? 1000;
        const isPast = index < animation.currentIndex;
        const isCurrent = index === animation.currentIndex;
        const offset = isPast
          ? 0
          : isCurrent
            ? length * (1 - animation.progress)
            : length;

        return (
          <g key={stroke.id}>
            {/* Dotted tracing guide for current stroke */}
            {isCurrent && (
              <path
                d={stroke.path}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 8"
              />
            )}

            <path
              data-stroke-id={stroke.id}
              d={stroke.path}
              fill="none"
              stroke={
                isCurrent || isPast ? "#4FD1C5" : "rgba(255,255,255,0.12)"
              }
              strokeWidth={isCurrent ? 5 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={length}
              strokeDashoffset={offset}
              className={cn(
                isCurrent &&
                  !animation.isPlaying &&
                  "drop-shadow-[0_0_8px_rgba(79,209,197,0.8)]",
              )}
              style={{
                transition: animation.isPlaying
                  ? "none"
                  : "stroke-dashoffset 0.3s ease",
              }}
            />

            {showArrows && isCurrent && animation.progress > 0 && (
              <StrokeArrow pathD={stroke.path} progress={animation.progress} />
            )}
          </g>
        );
      })}

      {/* Start point circle and stroke number for current stroke */}
      {currentStroke && (
        <g>
          <circle
            cx={currentStroke.startX}
            cy={currentStroke.startY}
            r={7}
            fill="#FFD700"
            stroke="#4FD1C5"
            strokeWidth={2}
          />
          {showNumbers && (
            <text
              x={currentStroke.startX}
              y={currentStroke.startY - 14}
              textAnchor="middle"
              className="fill-gold text-[14px] font-bold"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {CIRCLED_NUMBERS[currentStroke.id - 1] ??
                formatKhmerNumber(currentStroke.id)}
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
