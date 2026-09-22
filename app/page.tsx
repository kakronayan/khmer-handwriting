"use client";

import { CharacterOrb } from "@/components/character/CharacterOrb";
import { CharacterCard } from "@/components/character/CharacterCard";
import { PronunciationButton } from "@/components/pronunciation/PronunciationButton";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Logo } from "@/components/ui/Logo";
import { characters } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";

export default function HomePage() {
  const { t } = useLanguage();
  const { progress, getStatus } = useProgressContext();

  return (
    <>
      {/* Mobile header */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <Logo compact />
        <div
          className="h-9 w-9 rounded-full bg-amber-200/80"
          role="img"
          aria-label={t("រូបភាពប្រវត្តិ", "Profile")}
        />
      </div>

      {/* Mobile home */}
      <div className="md:hidden">
        <h1 className="font-khmer-serif mb-6 text-2xl font-bold">
          {t("សួស្តី! តោះរៀនសរសេរ", "Hello! Let's learn to write")}
        </h1>

        <div className="glass-card mb-6 rounded-2xl p-5">
          <div className="mb-2 flex items-center gap-2 text-gold">
            <span aria-hidden="true">🔥</span>
            <span className="text-sm font-medium">
              {t(
                `${progress.streakDays} ថ្ងៃជាប់គ្នា`,
                `${progress.streakDays}-day streak`,
              )}
            </span>
          </div>
          <p className="mb-3 text-sm text-primary">
            {t(
              `បានរៀន ${progress.learnedCount} នៃ ${progress.totalCharacters} អក្សរ`,
              `Learned ${progress.learnedCount} of ${progress.totalCharacters} characters`,
            )}
          </p>
          <ProgressBar
            value={progress.learnedCount}
            max={progress.totalCharacters}
          />
        </div>

        <div className="glass-card mb-6 rounded-2xl p-6 text-center">
          <p className="mb-4 text-sm text-primary">
            {t("បន្តមេរៀន", "Continue lesson")}
          </p>
          <CharacterOrb variant="mobile" centerId="ka" />
          <Link href="/learn" className="mt-6 block">
            <Button variant="primary" glow size="lg" className="w-full">
              {t("បន្តរៀន", "Continue learning")}
            </Button>
          </Link>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-3">
          {characters.slice(0, 4).map((char) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              character={char.character}
              status={getStatus(char.id)}
              href={`/characters/${char.id}`}
              size="sm"
            />
          ))}
        </div>

        <p className="text-center text-xs text-primary/70">
          {t("រៀន • សរសេរ • អនុវត្ត • ចងចាំ", "Learn • Write • Practice • Remember")}
        </p>
      </div>

      {/* Desktop home */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
        <div>
          <p className="mb-4 text-sm text-gold">
            {t("រៀន • សរសេរ • អនុវត្ត • ចងចាំ", "Learn • Write • Practice • Remember")}
          </p>
          <h1 className="font-khmer-serif mb-4 text-4xl leading-tight font-bold lg:text-5xl">
            {t(
              "រៀនសរសេរអក្សរខ្មែរដោយជំហានងាយៗ",
              "Learn Khmer handwriting step by step",
            )}
          </h1>
          <p className="mb-8 max-w-lg text-muted">
            {t(
              "មើលលំដាប់ខ្សែ អនុវត្តដោយដៃ និងទទួលបានការកែម្អតម្រាមៗ។",
              "Watch stroke order, practice by hand, and get instant feedback.",
            )}
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <Link href="/learn">
              <Button variant="primary" glow size="lg">
                {t("ចាប់ផ្តើមរៀន", "Start Learning")}
              </Button>
            </Link>
            <Link href="/practice/ka">
              <Button variant="ghost" size="lg">
                {t("សាកល្បងសរសេរ", "Try Writing")}
              </Button>
            </Link>
          </div>

          <PronunciationButton characterId="ka" variant="card" className="mb-8" />

          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-2xl font-bold text-primary">
                {progress.learnedCount}/{progress.totalCharacters}
              </div>
              <div className="text-sm text-muted">
                {t("អក្សរដែលបានរៀន", "Characters learned")}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">
                {Math.round(
                  (progress.learnedCount / progress.totalCharacters) * 100,
                )}
                %
              </div>
              <div className="text-sm text-muted">
                {t("ភាគរយពេញលេញ", "Completion")}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {progress.streakDays}
              </div>
              <div className="text-sm text-muted">
                {t("ថ្ងៃជាប់គ្នា", "Day streak")}
              </div>
            </div>
          </div>
        </div>

        <div>
          <CharacterOrb variant="desktop" centerId="ka" />
          <div className="mt-6 flex justify-end gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t("បានរៀន", "Learned")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-muted" />
              {t("មិនទាន់រៀន", "Upcoming")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
