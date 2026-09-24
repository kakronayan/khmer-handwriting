"use client";

import { KhmerStrokeSvg } from "@/components/strokes/KhmerStrokeSvg";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { StrokePath } from "@/types";

interface StrokeAnimationState {
  currentIndex: number;
  progress: number;
  isPlaying: boolean;
}

interface KhmerStrokeCanvasProps {
  strokes: StrokePath[];
  characterGlyph: string;
  animation: StrokeAnimationState;
  showCharacterLabel?: boolean;
  circular?: boolean;
  className?: string;
}

export function KhmerStrokeCanvas({
  strokes,
  characterGlyph,
  animation,
  showCharacterLabel = true,
  circular = true,
  className,
}: KhmerStrokeCanvasProps) {
  const { t } = useLanguage();

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[480px]", className)}>
      <div
        className={cn(
          "relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-primary/30 bg-surface/80 glow-primary canvas-grid",
          circular ? "rounded-full" : "rounded-2xl",
        )}
      >
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full border border-gold/30"
          aria-hidden="true"
        />

        <KhmerStrokeSvg strokes={strokes} animation={animation} className="inset-[12%] h-[76%] w-[76%]" />

        <span className="pointer-events-none font-khmer-serif text-[140px] leading-none text-foreground/8 select-none">
          {characterGlyph}
        </span>

        {showCharacterLabel && characterGlyph && (
          <p className="pointer-events-none absolute bottom-[14%] text-xs text-muted/70">
            {t("អក្សរខ្មែរ", "Khmer Character")}
          </p>
        )}
      </div>
    </div>
  );
}
