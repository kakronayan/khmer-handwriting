"use client";

import { KhmerStrokeCanvas } from "@/components/strokes/KhmerStrokeCanvas";
import { Button } from "@/components/ui/Button";
import {
  useStrokeAnimation,
  type AnimationSpeed,
} from "@/hooks/useStrokeAnimation";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { KhmerCharacter, StrokePath } from "@/types";
import { Pause, Play, RotateCcw } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface KhmerStrokePlayerRef {
  play: () => void;
  pause: () => void;
  replay: () => void;
  reset: () => void;
}

interface KhmerStrokePlayerProps {
  character?: KhmerCharacter;
  strokes?: StrokePath[];
  characterGlyph?: string;
  speed?: AnimationSpeed;
  showSpeedControls?: boolean;
  showStepLabel?: boolean;
  showCharacterLabel?: boolean;
  showControls?: boolean;
  circular?: boolean;
  className?: string;
  onStrokeChange?: (index: number) => void;
  onComplete?: () => void;
}

const SPEEDS: AnimationSpeed[] = ["slow", "normal", "fast"];

export const KhmerStrokePlayer = forwardRef<
  KhmerStrokePlayerRef,
  KhmerStrokePlayerProps
>(function KhmerStrokePlayer(
  {
    character,
    strokes: strokesProp,
    characterGlyph,
    speed: initialSpeed = "normal",
    showSpeedControls = true,
    showStepLabel = true,
    showCharacterLabel = true,
    showControls = true,
    circular = true,
    className,
    onStrokeChange,
    onComplete,
  },
  ref,
) {
  const { t } = useLanguage();
  const [speed, setSpeed] = useState<AnimationSpeed>(initialSpeed);

  const strokes = strokesProp ?? character?.strokes ?? [];
  const glyph = characterGlyph ?? character?.character ?? "";

  const animation = useStrokeAnimation({
    strokes,
    speed,
    onStrokeChange,
    onComplete,
  });

  useImperativeHandle(ref, () => ({
    play: animation.play,
    pause: animation.pause,
    replay: animation.replay,
    reset: animation.reset,
  }));

  const currentStroke = strokes[animation.currentIndex];

  const primaryLabel = animation.isComplete
    ? t("↻ ចាក់ឡើងវិញ គំនូសអក្សរខ្មែរ", "↻ Replay Khmer Strokes")
    : animation.isPlaying
      ? t("⏸ ផ្អាក", "⏸ Pause")
      : t("▶ Play គំនូសអក្សរខ្មែរ", "▶ Play Khmer Strokes");

  const handlePrimaryAction = () => {
    if (animation.isComplete) {
      animation.replay();
    } else {
      animation.togglePlay();
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <KhmerStrokeCanvas
        strokes={strokes}
        characterGlyph={glyph}
        animation={animation}
        showCharacterLabel={showCharacterLabel}
        circular={circular}
      />

      {showStepLabel && (
        <p className="mt-3 text-sm text-primary" aria-live="polite">
          {animation.stepLabel}
          {currentStroke && (
            <span className="ml-2 text-muted">
              • {currentStroke.directionKm}
            </span>
          )}
        </p>
      )}

      {showControls && (
        <div className="mt-4 w-full max-w-[480px] space-y-4">
          <Button
            variant="primary"
            glow
            size="lg"
            className="w-full"
            onClick={handlePrimaryAction}
            aria-label={primaryLabel}
          >
            {animation.isComplete ? (
              <RotateCcw className="h-5 w-5" />
            ) : animation.isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            {primaryLabel}
          </Button>

          {showSpeedControls && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-muted">
                {t("ល្បឿន", "Speed")}:
              </span>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "focus-ring rounded-full px-3 py-1.5 text-xs transition-all",
                    speed === s
                      ? "bg-primary text-surface font-semibold"
                      : "bg-foreground/10 text-muted hover:bg-foreground/15",
                  )}
                  aria-pressed={speed === s}
                  aria-label={
                    s === "slow"
                      ? t("យឺត", "Slow")
                      : s === "fast"
                        ? t("លឿន", "Fast")
                        : t("ធម្មតា", "Normal")
                  }
                >
                  {s === "slow"
                    ? t("យឺត", "Slow")
                    : s === "fast"
                      ? t("លឿន", "Fast")
                      : t("ធម្មតា", "Normal")}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
