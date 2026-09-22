"use client";

import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { formatKhmerNumber } from "@/lib/utils";
import type { StrokePath } from "@/types";

interface StrokeListProps {
  strokes: StrokePath[];
  activeIndex: number;
  onSelect?: (index: number) => void;
}

export function StrokeList({ strokes, activeIndex, onSelect }: StrokeListProps) {
  const { lang } = useLanguage();

  return (
    <div className="space-y-3" role="list" aria-label="Stroke order">
      {strokes.map((stroke, index) => {
        const isActive = index === activeIndex;
        return (
          <Card
            key={stroke.id}
            role="listitem"
            className={cn(
              "flex cursor-pointer items-center gap-4 transition-all",
              isActive ? "border-primary/40 glow-primary" : "hover:bg-white/5",
            )}
            onClick={() => onSelect?.(index)}
            padding="sm"
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                isActive ? "bg-gold text-surface" : "bg-white/10 text-muted",
              )}
            >
              {formatKhmerNumber(stroke.id)}
            </div>
            <div>
              <p className={cn("text-sm", isActive ? "text-white" : "text-muted")}>
                {lang === "km" ? stroke.labelKm : stroke.labelEn}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
