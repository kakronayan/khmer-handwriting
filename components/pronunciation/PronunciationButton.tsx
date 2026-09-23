"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { speakCharacter, stopSpeaking } from "@/lib/pronunciation";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";
import { useState } from "react";

interface PronunciationButtonProps {
  characterId: string;
  variant?: "default" | "compact" | "card";
  className?: string;
}

export function PronunciationButton({
  characterId,
  variant = "default",
  className,
}: PronunciationButtonProps) {
  const { t } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  const handleClick = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    try {
      await speakCharacter(characterId);
    } finally {
      setSpeaking(false);
    }
  };

  if (variant === "card") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "focus-ring glass-card flex w-full items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-foreground/5",
          speaking && "border-primary/30",
          className,
        )}
        aria-label={t("ស្ដាប់សំឡេង", "Hear pronunciation")}
        aria-pressed={speaking}
      >
        <Volume2
          className={cn("h-5 w-5 text-gold", speaking && "animate-pulse text-primary")}
          aria-hidden="true"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-full bg-primary transition-all",
                  speaking ? "h-4 animate-pulse" : "h-2",
                )}
                style={{ animationDelay: `${i * 100}ms` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{t("ស្ដាប់សំឡេង", "Hear Voice")}</div>
          <div className="font-inter text-[10px] tracking-wider text-primary uppercase">
            Hear Pronunciation
          </div>
        </div>
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "focus-ring flex items-center gap-2 text-sm text-muted hover:text-primary",
          className,
        )}
        aria-label={t("ស្ដាប់សំឡេង", "Hear pronunciation")}
        aria-pressed={speaking}
      >
        <Volume2 className="h-4 w-4" aria-hidden="true" />
        {t("ស្ដាប់សំឡេង", "Hear Voice")}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "focus-ring flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary",
        speaking && "border-primary/30 text-primary",
        className,
      )}
      aria-label={t("ស្ដាប់សំឡេង", "Hear pronunciation")}
      aria-pressed={speaking}
    >
      <Volume2 className="h-4 w-4" aria-hidden="true" />
      {t("ស្ដាប់សំឡេង", "Hear Voice")}
    </button>
  );
}
