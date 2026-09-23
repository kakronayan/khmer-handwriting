"use client";

import { CanvasControls } from "@/components/canvas/CanvasControls";
import { useHandwritingCanvas } from "@/hooks/useHandwritingCanvas";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { KhmerCharacter } from "@/types";
import { forwardRef, useImperativeHandle } from "react";

export interface HandwritingCanvasRef {
  getImageData: () => ImageData | null;
  clear: () => void;
  strokeCount: number;
}

interface HandwritingCanvasProps {
  character?: KhmerCharacter;
  showGuide?: boolean;
  showStrokeIndicators?: boolean;
  showControls?: boolean;
  controlsLayout?: "horizontal" | "compact";
  circular?: boolean;
  className?: string;
  onStrokeComplete?: (count: number) => void;
}

export const HandwritingCanvas = forwardRef<
  HandwritingCanvasRef,
  HandwritingCanvasProps
>(function HandwritingCanvas(
  {
    character,
    showGuide = true,
    showStrokeIndicators = true,
    showControls = true,
    controlsLayout = "horizontal",
    circular = true,
    className,
    onStrokeComplete,
  },
  ref,
) {
  const { t } = useLanguage();
  const canvas = useHandwritingCanvas({ onStrokeComplete });

  useImperativeHandle(ref, () => ({
    getImageData: canvas.getImageData,
    clear: canvas.clear,
    strokeCount: canvas.strokeCount,
  }));

  return (
    <div className={cn("space-y-4", className)}>
      <div
        ref={canvas.containerRef}
        className={cn(
          "relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden",
          circular ? "rounded-full" : "rounded-2xl",
          "border border-primary/30 bg-surface/80 glow-primary canvas-grid",
        )}
        role="application"
        aria-label={t("ផ្ទៃសរសេរ", "Drawing canvas")}
      >
        {/* Guide rings */}
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full border border-gold/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-[20%] rounded-full border border-primary/10"
          aria-hidden="true"
        />

        {/* Compass dots */}
        {[
          { top: "4%", left: "50%", color: "bg-primary" },
          { top: "50%", left: "4%", color: "bg-gold" },
          { top: "50%", right: "4%", color: "bg-gold" },
          { bottom: "4%", left: "50%", color: "bg-primary" },
        ].map((dot, i) => (
          <div
            key={i}
            className={cn(
              "pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
              dot.color,
            )}
            style={{ top: dot.top, left: dot.left, right: dot.right, bottom: dot.bottom }}
            aria-hidden="true"
          />
        ))}

        {/* Faint character guide */}
        {showGuide && character && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-khmer-serif text-[140px] leading-none text-foreground/8 select-none">
              {character.character}
            </span>
          </div>
        )}

        {/* SVG stroke guide overlay */}
        {showGuide && character && (
          <svg
            className="pointer-events-none absolute inset-[15%] h-[70%] w-[70%] m-auto left-0 right-0 top-0 bottom-0 opacity-10"
            viewBox="0 0 240 240"
            aria-hidden="true"
          >
            <path
              d={character.guidePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-primary"
            />
          </svg>
        )}

        {/* Stroke start indicators */}
        {showStrokeIndicators &&
          character?.strokes.map((stroke) => (
            <div
              key={stroke.id}
              className="pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface"
              style={{
                left: `${(stroke.startX / 240) * 100}%`,
                top: `${(stroke.startY / 240) * 100}%`,
              }}
              aria-hidden="true"
            >
              {stroke.id}
            </div>
          ))}

        <canvas
          ref={canvas.canvasRef}
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
          style={{ width: "100%", height: "100%" }}
          onPointerDown={canvas.handlePointerDown}
          onPointerMove={canvas.handlePointerMove}
          onPointerUp={canvas.handlePointerUp}
          onPointerLeave={canvas.handlePointerUp}
          aria-label={t("គូសសរសេរនៅទីនេះ", "Draw here")}
        />

        {!circular && (
          <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-muted/50">
            {t("គូសសរសេរនៅទីនេះ", "Draw here")}
          </p>
        )}
      </div>

      {showControls && (
        <div className="canvas-controls-wrapper">
        <CanvasControls
          onUndo={canvas.undo}
          onRedo={canvas.redo}
          onClear={canvas.clear}
          canUndo={canvas.canUndo}
          canRedo={canvas.canRedo}
          strokeCount={canvas.strokeCount}
          totalStrokes={character?.strokeCount}
          layout={controlsLayout}
        />
        </div>
      )}
    </div>
  );
});
