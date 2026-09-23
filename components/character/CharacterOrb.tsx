"use client";

import { characters } from "@/data/characters";
import {
  getOrbCategoryCharacter,
  getOrbCategoryCharacters,
  orbCategories,
} from "@/data/orb-categories";
import { useLanguage } from "@/hooks/useLanguage";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CharacterOrbProps {
  centerId?: string;
  variant?: "desktop" | "mobile";
}

const orbPositions = [
  { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
  { top: "30%", left: "95%", transform: "translate(-50%, -50%)" },
  { top: "85%", left: "78%", transform: "translate(-50%, -50%)" },
  { top: "85%", left: "22%", transform: "translate(-50%, -50%)" },
  { top: "30%", left: "5%", transform: "translate(-50%, -50%)" },
];

interface CategoryOrbProps {
  compact?: boolean;
}

function CategoryOrbs({ compact = false }: CategoryOrbProps) {
  const { getStatus } = useProgressContext();
  const { t } = useLanguage();

  return (
    <>
      {orbCategories.map((category, i) => {
        const categoryChars = getOrbCategoryCharacters(category.id);
        const learned = categoryChars.some(
          (char) => getStatus(char.id) === "learned",
        );
        const displayChar = getOrbCategoryCharacter(category);
        const pos = orbPositions[i];
        const label = t(category.labelKm, category.labelEn);

        return (
          <Link
            key={category.id}
            href={category.learnHref}
            className={cn(
              "focus-ring glass-card absolute flex flex-col items-center rounded-xl transition-all hover:scale-105",
              compact ? "w-16 p-2" : "w-20 p-3",
              learned ? "border-primary/30" : "opacity-70",
            )}
            style={pos}
            aria-label={`${displayChar} — ${label}`}
          >
            <span className={cn("font-khmer-serif", compact ? "text-xl" : "text-2xl")}>
              {displayChar}
            </span>
            <span
              className={cn(
                "mt-1 flex items-center gap-1",
                compact ? "text-[8px]" : "text-[10px]",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  learned ? "bg-primary" : "border border-muted bg-transparent",
                )}
              />
              <span className="text-center leading-tight">{label}</span>
            </span>
          </Link>
        );
      })}
    </>
  );
}

export function CharacterOrb({ centerId = "ka", variant = "desktop" }: CharacterOrbProps) {
  const center = characters.find((c) => c.id === centerId) ?? characters[0];

  if (variant === "mobile") {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-xs min-h-[280px]">
        <div className="absolute inset-6 rounded-full border border-primary/10" />

        <div className="absolute inset-[18%] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-card glow-primary">
            <div className="absolute inset-3 rounded-full border border-gold/40" />
            <span className="font-khmer-serif text-7xl text-foreground">{center.character}</span>
          </div>
        </div>

        <CategoryOrbs compact />
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md min-h-[320px] shrink-0">
      <div className="absolute inset-8 rounded-full border border-primary/10" />

      <div className="absolute inset-[15%] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/20 bg-card">
          <div className="absolute inset-3 rounded-full border border-gold/30" />
          <span className="font-khmer-serif text-[120px] leading-none text-foreground drop-shadow-[0_0_20px_rgba(79,209,197,0.35)]">
            {center.character}
          </span>
        </div>
      </div>

      <CategoryOrbs />
    </div>
  );
}
