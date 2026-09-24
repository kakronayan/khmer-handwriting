"use client";

import { CanvasControls } from "@/components/canvas/CanvasControls";
import { KhmerStrokeSvg } from "@/components/strokes/KhmerStrokeSvg";
import { useHandwritingCanvas } from "@/hooks/useHandwritingCanvas";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { KhmerCharacter } from "@/types";
import type { CanvasStroke, StrokeFeedback } from "@/types";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface HandwritingCanvasRef {
  getImageData: () => ImageData | null;
  getStrokes: () => CanvasStroke[];
  clear: () => void;
  strokeCount: number;
}

interface StrokeAnimationState {
  currentIndex: number;
  progress: number;
  isPlaying: boolean;
  isComplete: boolean;
}

interface HandwritingCanvasProps {
  character?: KhmerCharacter;
  showGuide?: boolean;
  showStrokeIndicators?: boolean;
  strokeAnimation?: StrokeAnimationState;
  showControls?: boolean;
  controlsLayout?: "horizontal" | "compact";
  circular?: boolean;
  className?: string;
  onStrokeComplete?: (count: number) => void;
  strokeFeedbacks?: StrokeFeedback[];
  guideVisible?: boolean;
  onToggleGuide?: () => void;
}

export const HandwritingCanvas = forwardRef<
  HandwritingCanvasRef,
  HandwritingCanvasProps
>(function HandwritingCanvas(
  {
    character,
    showGuide = true,
    showStrokeIndicators = true,
    strokeAnimation,
    showControls = true,
    controlsLayout = "horizontal",
    circular = true,
    className,
    onStrokeComplete,
    strokeFeedbacks,
    guideVisible: guideVisibleProp,
    onToggleGuide,
  },
  ref,
) {
  const { t } = useLanguage();
  const [internalGuideVisible, setInternalGuideVisible] = useState(true);
  const guideVisible = guideVisibleProp ?? internalGuideVisible;
  const canvas = useHandwritingCanvas({ onStrokeComplete });

  const strokes = character?.strokes ?? [];
  const showAnimation =
    strokeAnimation &&
    strokes.length > 0 &&
    (strokeAnimation.isPlaying ||
      strokeAnimation.isComplete ||
      strokeAnimation.currentIndex > 0 ||
      strokeAnimation.progress > 0);

  useImperativeHandle(ref, () => ({
    getImageData: canvas.getImageData,
    getStrokes: canvas.getStrokes,
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
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full border border-gold/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-[20%] rounded-full border border-primary/10"
          aria-hidden="true"
        />

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

        {showGuide && guideVisible && character && !showAnimation && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-khmer-serif text-[140px] leading-none text-foreground/8 select-none">
              {character.character}
            </span>
          </div>
        )}

        {showGuide && guideVisible && character && !showAnimation && (
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
              strokeDasharray="8 6"
              className="text-primary"
            />
          </svg>
        )}

        {showAnimation && strokeAnimation && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="font-khmer-serif text-[140px] leading-none text-foreground/5 select-none">
                {character?.character}
              </span>
            </div>
            <KhmerStrokeSvg strokes={strokes} animation={strokeAnimation} />
          </>
        )}

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
      </div>

      {strokeFeedbacks && strokeFeedbacks.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2" aria-live="polite">
          {strokeFeedbacks.map((fb) => (
            <span
              key={fb.strokeIndex}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                fb.status === "correct"
                  ? "bg-primary/20 text-primary"
                  : fb.status === "wrong_direction"
                    ? "bg-gold/20 text-gold"
                    : "bg-foreground/10 text-muted",
              )}
            >
              {t(fb.messageKm, fb.messageEn)}
            </span>
          ))}
        </div>
      )}

      {showControls && (
        <div className="canvas-controls-wrapper space-y-3">
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
          {showGuide && onToggleGuide && (
            <button
              type="button"
              onClick={onToggleGuide}
              className="focus-ring mx-auto block rounded-full bg-foreground/10 px-4 py-2 text-sm"
            >
              {guideVisible
                ? t("លាក់ណែនាំ", "Hide Guide")
                : t("បង្ហាញណែនាំ", "Show Guide")}
            </button>
          )}
          {showGuide && !onToggleGuide && (
            <button
              type="button"
              onClick={() => setInternalGuideVisible((v) => !v)}
              className="focus-ring mx-auto block rounded-full bg-foreground/10 px-4 py-2 text-sm"
            >
              {guideVisible
                ? t("លាក់ណែនាំ", "Hide Guide")
                : t("បង្ហាញណែនាំ", "Show Guide")}
            </button>
          )}
        </div>
      )}
    </div>
  );
});
