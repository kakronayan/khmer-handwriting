"use client";

import { CONSONANT_ROWS } from "@/data/consonant-strokes";
import { characters } from "@/data/characters";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ConsonantSelectorProps {
  activeId?: string;
  hrefPattern?: "character" | "strokes" | "practice";
  onSelect?: (id: string) => void;
  className?: string;
}

function getHref(id: string, pattern: ConsonantSelectorProps["hrefPattern"]): string {
  switch (pattern) {
    case "strokes":
      return `/characters/${id}/strokes`;
    case "practice":
      return `/practice/${id}`;
    default:
      return `/characters/${id}`;
  }
}

export function ConsonantSelector({
  activeId,
  hrefPattern = "character",
  onSelect,
  className,
}: ConsonantSelectorProps) {
  const { t } = useLanguage();
  const { getStatus } = useProgressContext();

  const charMap = new Map(characters.map((c) => [c.id, c]));

  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="font-khmer-serif text-lg font-semibold">
        {t("ព្យញ្ជនៈ", "Consonants")}
      </h2>

      {CONSONANT_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {row.map((id) => {
            const char = charMap.get(id);
            if (!char) return null;

            const isActive = activeId === id;
            const status = getStatus(id);
            const isLearned = status === "learned";

            const buttonClass = cn(
              "font-khmer-serif flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-all sm:h-14 sm:w-14 sm:text-2xl",
              "focus-ring hover:scale-105 hover:border-primary/60 hover:shadow-md",
              isActive
                ? "border-primary bg-primary/20 text-primary shadow-[0_0_16px_rgba(79,209,197,0.3)]"
                : "border-foreground/15 bg-surface/60 text-foreground",
              isLearned && !isActive && "border-primary/30 bg-primary/5",
            );

            if (onSelect) {
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  className={buttonClass}
                  aria-label={char.nameKm}
                  aria-current={isActive ? "true" : undefined}
                >
                  {char.character}
                </button>
              );
            }

            return (
              <Link
                key={id}
                href={getHref(id, hrefPattern)}
                className={buttonClass}
                aria-label={char.nameKm}
                aria-current={isActive ? "page" : undefined}
              >
                {char.character}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
