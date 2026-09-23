"use client";

import { Button } from "@/components/ui/Button";
import { StrokeList } from "@/components/strokes/StrokeList";
import { useLanguage } from "@/hooks/useLanguage";
import { useStrokeAnimation } from "@/hooks/useStrokeAnimation";
import { cn } from "@/lib/utils";
import type { KhmerCharacter } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

interface StrokeAnimatorProps {
  character: KhmerCharacter;
}

export function StrokeAnimator({ character }: StrokeAnimatorProps) {
  const { t } = useLanguage();
  const animation = useStrokeAnimation({ strokes: character.strokes });

  const strokeLength = 1000;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col items-center">
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-surface/60 glow-primary">
            <div className="absolute inset-4 rounded-full border border-gold/30" />

            <svg
              viewBox="0 0 240 240"
              className="absolute inset-[12%] h-[76%] w-[76%]"
              aria-hidden="true"
            >
              {character.strokes.map((stroke, index) => {
                const isPast = index < animation.currentIndex;
                const isCurrent = index === animation.currentIndex;
                const offset = isPast
                  ? 0
                  : isCurrent
                    ? strokeLength * (1 - animation.progress)
                    : strokeLength;

                return (
                  <path
                    key={stroke.id}
                    d={stroke.path}
                    fill="none"
                    stroke={isCurrent ? "#4FD1C5" : isPast ? "#4FD1C5" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isCurrent ? 5 : 4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={strokeLength}
                    strokeDashoffset={offset}
                    className={cn(
                      isCurrent && !animation.isPlaying && "drop-shadow-[0_0_8px_rgba(79,209,197,0.8)]",
                    )}
                    style={{
                      transition: animation.isPlaying ? "none" : "stroke-dashoffset 0.3s ease",
                    }}
                  />
                );
              })}
            </svg>

            <span className="pointer-events-none font-khmer-serif text-7xl text-foreground/15 select-none">
              {character.character}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm text-primary" aria-live="polite">
          {animation.stepLabel}
        </p>
      </div>

      <div className="space-y-6">
        <StrokeList
          strokes={character.strokes}
          activeIndex={animation.currentIndex}
          onSelect={animation.goTo}
        />

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={animation.previous}
            disabled={animation.currentIndex === 0}
            aria-label={t("មុន", "Previous")}
          >
            <ChevronLeft className="h-4 w-4" />
            {t("មុន", "Previous")}
          </Button>

          <Button
            variant="primary"
            glow
            onClick={animation.togglePlay}
            aria-label={
              animation.isPlaying
                ? t("ផ្អាក", "Pause")
                : t("ចាក់លេង", "Play")
            }
          >
            {animation.isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            {animation.isPlaying ? t("ផ្អាក", "Pause") : t("ចាក់លេង", "Play")}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={animation.next}
            disabled={animation.currentIndex >= animation.total - 1}
            aria-label={t("បន្ទាប់", "Next")}
          >
            {t("បន្ទាប់", "Next")}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={animation.replay}
          className="w-full"
          aria-label={t("ចាក់ឡើងវិញ", "Replay")}
        >
          <RotateCcw className="h-4 w-4" />
          {t("ចាក់ឡើងវិញ", "Replay")}
        </Button>

        <div className="glass-card rounded-2xl border-gold/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
              ★
            </div>
            <div>
              <p className="text-sm font-medium text-gold">{t("គន្លឹះ", "Tip")}</p>
              <p className="mt-1 text-sm text-muted">
                {t(
                  "ប្រើចលនាដៃឱ្យស្រាល ហើយអូសខ្សែឱ្យត្រង់។",
                  "Use light hand movements and draw strokes smoothly.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
