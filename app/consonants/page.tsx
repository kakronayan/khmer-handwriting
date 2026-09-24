"use client";

import { ConsonantSelector } from "@/components/character/ConsonantSelector";
import { PronunciationButton } from "@/components/pronunciation/PronunciationButton";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { StrokeAnimator } from "@/components/strokes/StrokeAnimator";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getCharacterById } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { formatKhmerNumber } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const DIFFICULTY_LABELS = {
  easy: { km: "ងាយ", en: "Easy" },
  medium: { km: "មធ្យម", en: "Medium" },
  hard: { km: "ពិបាក", en: "Hard" },
};

function ConsonantsPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const { getScore, getStatus } = useProgressContext();

  const initialId = searchParams.get("id") ?? "ka";
  const [selectedId, setSelectedId] = useState(initialId);
  const character = getCharacterById(selectedId) ?? getCharacterById("ka")!;

  const progress = getScore(character.id);
  const difficulty = character.difficulty ?? "medium";
  const diffLabel = DIFFICULTY_LABELS[difficulty];

  return (
    <div>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t("រៀនសរសេរអក្សរខ្មែរ", "Learn Khmer Handwriting")}
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        {t(
          "ហាត់សរសេរព្យញ្ជនៈខ្មែរ តាមលំដាប់ខ្សែ",
          "Practice Khmer consonants following correct stroke order",
        )}
      </p>

      <Card className="mb-8">
        <ConsonantSelector
          activeId={character.id}
          onSelect={setSelectedId}
        />
      </Card>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gold">
            {t("ព្យញ្ជនៈ", "Consonant")}:{" "}
            <span className="font-khmer-serif text-2xl font-bold text-foreground">
              {character.character}
            </span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {t("សំឡេង", "Sound")}: {character.ipa} •{" "}
            {t("ចំនួនខ្សែ", "Strokes")}:{" "}
            {formatKhmerNumber(character.strokeCount)} •{" "}
            {t("កម្រិត", "Level")}: {t(diffLabel.km, diffLabel.en)}
          </p>
        </div>
        <PronunciationButton characterId={character.id} />
      </div>

      {getStatus(character.id) !== "not_started" && (
        <div className="mb-6">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted">{t("ដំណើរការ", "Progress")}</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <ProgressBar value={progress} max={100} />
        </div>
      )}

      <StrokeAnimator character={character} />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/practice/${character.id}`}>
          <Button variant="primary" glow size="lg">
            {t("អនុវត្តសរសេរ", "Practice Writing")}
          </Button>
        </Link>
        <Link href={`/characters/${character.id}`}>
          <Button variant="outline" size="lg">
            {t("ព័ត៌មានលម្អិត", "Character Details")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConsonantsPage() {
  return (
    <Suspense>
      <ConsonantsPageContent />
    </Suspense>
  );
}
