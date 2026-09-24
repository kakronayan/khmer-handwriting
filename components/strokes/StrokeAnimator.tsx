"use client";

import { KhmerStrokeCanvas } from "@/components/strokes/KhmerStrokeCanvas";
import { StrokeList } from "@/components/strokes/StrokeList";
import { Button } from "@/components/ui/Button";
import { useStrokeAnimation } from "@/hooks/useStrokeAnimation";
import { useLanguage } from "@/hooks/useLanguage";
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

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col items-center">
        <KhmerStrokeCanvas
          strokes={character.strokes}
          characterGlyph={character.character}
          animation={animation}
          showCharacterLabel={false}
        />
        <p className="mt-4 text-sm font-medium text-primary" aria-live="polite">
          {t(animation.stepLabel, animation.stepLabelEn)}
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
