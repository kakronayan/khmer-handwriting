"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { LearningStatus } from "@/types";
import Link from "next/link";

interface CharacterCardProps {
  id: string;
  character: string;
  status: LearningStatus;
  score?: number;
  href?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function CharacterCard({
  id,
  character,
  status,
  score,
  href,
  active = false,
  size = "md",
  onClick,
}: CharacterCardProps) {
  const { t } = useLanguage();
  const learned = status === "learned";
  const inProgress = status === "in_progress";

  const statusLabel = learned
    ? t("បានរៀន", "Learned")
    : inProgress
      ? t("កំពុងរៀន", "In progress")
      : t("មិនទាន់រៀន", "Not yet learned");

  const sizeClasses = {
    sm: "p-3 min-h-[80px]",
    md: "p-5 min-h-[120px]",
    lg: "p-6 min-h-[140px]",
  };

  const charSizes = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
  };

  const content = (
    <>
      <span
        className={cn(
          "font-khmer-serif leading-none",
          charSizes[size],
          learned || inProgress ? "text-foreground" : "text-foreground/25",
        )}
      >
        {character}
      </span>
      <span
        className={cn(
          "mt-2 text-xs",
          learned ? "text-primary" : "text-muted/60",
        )}
      >
        {score !== undefined && score > 0 ? `${score}%` : statusLabel}
      </span>
    </>
  );

  const className = cn(
    "glass-card flex flex-col items-center justify-center rounded-2xl transition-all duration-200",
    sizeClasses[size],
    learned && "border-primary/30 hover:border-primary/50",
    active && "glow-primary border-primary/50",
    !learned && !inProgress && "opacity-60",
    href && "hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary",
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={`${character} — ${statusLabel}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(className, "focus-ring w-full cursor-pointer")}
      aria-label={`${character} — ${statusLabel}`}
      data-character-id={id}
    >
      {content}
    </button>
  );
}
