"use client";

import { CharacterCard } from "@/components/character/CharacterCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { characters, getCharacterById, getNextCharacterId } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { CheckCircle, Star, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { use } from "react";
import type { StrokeFeedback } from "@/types";

interface PracticeResult {
  score: number;
  strokesCompleted: number;
  totalStrokes: number;
  strokeFeedbacks?: StrokeFeedback[];
}

function readPracticeResult(id: string): PracticeResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(`practice-result-${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PracticeResult;
  } catch {
    return null;
  }
}

export default function PracticeResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const character = getCharacterById(id);
  const { t } = useLanguage();
  const { getStatus, getScore } = useProgressContext();
  const result = readPracticeResult(id);
  const nextId = getNextCharacterId(id);

  if (!character) notFound();

  const score = result?.score ?? 0;
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
  const weakStroke = result?.strokeFeedbacks?.find(
    (f) => f.status !== "correct",
  );
  const feedbackKm = weakStroke
    ? weakStroke.messageKm
    : score >= 80
      ? "ទម្រង់អក្សររបស់អ្នកច្បាស់ល្អ!"
      : "សាកល្បងសរសេរម្តងទៀតតាមលំដាប់ខ្សែ";
  const feedbackEn = weakStroke
    ? weakStroke.messageEn
    : score >= 80
      ? "Your character shape is clear!"
      : "Try writing again following stroke order";

  return (
    <div>
      <p className="mb-2 text-xs tracking-wider text-gold uppercase hidden md:block">
        Check → Improve
      </p>
      <h1 className="font-khmer-serif mb-2 text-2xl font-bold md:text-3xl">
        <span className="md:hidden">{t("ល្អណាស់!", "Excellent!")} </span>
        <span className="hidden md:inline">
          {t("ល្អណាស់! អ្នកកំពុងរីកចម្រើន", "Excellent! You are improving")}
        </span>
        <span className="ml-2 inline-flex md:hidden">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
          ))}
        </span>
      </h1>
      <p className="mb-8 text-sm text-muted">
        {t(feedbackKm, feedbackEn)}
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card glow="primary" className="flex flex-col items-center py-10">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#4FD1C5"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${score * 2.64} 264`}
              />
            </svg>
            <span className="text-5xl font-bold">{score}%</span>
          </div>
          <p className="mt-4 flex items-center gap-1 text-sm">
            {t("សរសេរបានល្អណាស់", "Great writing")}
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="hidden h-4 w-4 fill-gold text-gold md:inline" aria-hidden="true" />
            ))}
          </p>
        </Card>

        <div className="hidden space-y-3 md:block">
          <Card padding="sm" className="flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <div className="font-bold">
                {result?.strokesCompleted ?? character.strokeCount}/
                {character.strokeCount}
              </div>
              <div className="text-sm text-muted">
                {t("ខ្សែបានបញ្ចប់", "Strokes completed")}
              </div>
            </div>
          </Card>
          <Card padding="sm" className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" aria-hidden="true" />
            <div>
              <div className="font-khmer-serif text-xl font-bold">
                {t("ល្អ", "Good")}
              </div>
              <div className="text-sm text-muted">
                {t("ទិសដៅ និងសមាមាត្រ", "Direction and proportion")}
              </div>
            </div>
          </Card>
          <Card padding="sm" className="flex items-center gap-4 border-gold/20">
            <Zap className="h-8 w-8 text-gold" aria-hidden="true" />
            <div>
              <div className="font-inter text-xs tracking-wider text-gold uppercase">
                Improvement Tip
              </div>
              <div className="text-sm text-muted">
                {weakStroke
                  ? t(
                      `ផ្តោតលើខ្សែទី ${weakStroke.strokeIndex + 1}: ${weakStroke.messageKm}`,
                      `Focus on stroke ${weakStroke.strokeIndex + 1}: ${weakStroke.messageEn}`,
                    )
                  : t(
                      "បន្តអនុវត្តឱ្យបានទៀងទាត់",
                      "Keep practicing consistently",
                    )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
        <Card padding="sm" className="text-center">
          <div className="text-xl font-bold text-primary">
            {result?.strokesCompleted ?? character.strokeCount}/
            {character.strokeCount}
          </div>
          <div className="text-xs text-muted">{t("ខ្សែ", "Strokes")}</div>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="font-khmer-serif text-xl font-bold text-gold">
            {t("ល្អ", "Good")}
          </div>
          <div className="text-xs text-muted">{t("ទិសដៅ", "Direction")}</div>
        </Card>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/practice/${id}`} className="flex-1">
          <Button variant="primary" glow className="w-full" size="lg">
            {t("សរសេរម្តងទៀត", "Write again")}
          </Button>
        </Link>
        {nextId ? (
          <Link href={`/practice/${nextId}`} className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              {t("អក្សរបន្ទាប់", "Next character")}
            </Button>
          </Link>
        ) : (
          <Link href="/learn" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              {t("ត្រឡប់ទៅរៀន", "Back to learn")}
            </Button>
          </Link>
        )}
      </div>

      <section className="mt-10 hidden md:block">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium">{t("ដំណើរការរបស់អ្នក", "Your progress")}</h2>
          <Link href="/progress" className="text-sm text-primary">
            {t("មើលទាំងអស់ →", "See all →")}
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              character={char.character}
              status={getStatus(char.id)}
              score={getScore(char.id)}
              href={`/characters/${char.id}`}
              size="sm"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
