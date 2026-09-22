"use client";

import { characters } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CharacterOrbProps {
  centerId?: string;
  variant?: "desktop" | "mobile";
}

export function CharacterOrb({ centerId = "ka", variant = "desktop" }: CharacterOrbProps) {
  const { getStatus } = useProgressContext();
  const { t } = useLanguage();
  const center = characters.find((c) => c.id === centerId) ?? characters[0];

  if (variant === "mobile") {
    return (
      <div className="relative mx-auto flex aspect-square max-w-[280px] items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-surface/80 glow-primary">
          <div className="absolute inset-4 rounded-full border border-gold/40" />
          <span className="font-khmer-serif text-8xl text-white">{center.character}</span>
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute h-2 w-2 rounded-full bg-primary"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateY(-130px) translateX(-50%)`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    );
  }

  const positions = [
    { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
    { top: "30%", left: "95%", transform: "translate(-50%, -50%)" },
    { top: "85%", left: "78%", transform: "translate(-50%, -50%)" },
    { top: "85%", left: "22%", transform: "translate(-50%, -50%)" },
    { top: "30%", left: "5%", transform: "translate(-50%, -50%)" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-8 rounded-full border border-primary/10" />

      <div className="absolute inset-[15%] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/20 bg-surface/60">
          <div className="absolute inset-3 rounded-full border border-gold/30" />
          <span className="font-khmer-serif text-[120px] leading-none text-white drop-shadow-[0_0_20px_rgba(79,209,197,0.5)]">
            {center.character}
          </span>
        </div>
      </div>

      {characters.map((char, i) => {
        const status = getStatus(char.id);
        const learned = status === "learned";
        const pos = positions[i];

        return (
          <Link
            key={char.id}
            href={`/characters/${char.id}`}
            className={cn(
              "focus-ring glass-card absolute flex w-20 flex-col items-center rounded-xl p-3 transition-all hover:scale-105",
              learned ? "border-primary/30" : "opacity-70",
            )}
            style={pos}
            aria-label={`${char.character} — ${learned ? t("បានរៀន", "Learned") : t("មិនទាន់រៀន", "Not yet learned")}`}
          >
            <span className="font-khmer-serif text-2xl">{char.character}</span>
            <span className="mt-1 flex items-center gap-1 text-[10px]">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  learned ? "bg-primary" : "border border-muted bg-transparent",
                )}
              />
              {learned ? t("បានរៀន", "Learned") : t("មិនទាន់រៀន", "Upcoming")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
