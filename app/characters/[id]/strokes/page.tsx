"use client";

import { StrokeAnimator } from "@/components/strokes/StrokeAnimator";
import { getCharacterById } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { notFound } from "next/navigation";
import { use } from "react";
export default function StrokeAnimationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const character = getCharacterById(id);
  const { t } = useLanguage();

  if (!character) notFound();

  return (
    <div>
      <p className="mb-2 font-inter text-xs tracking-wider text-gold uppercase">
        Watch
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t(
          `មើលលំដាប់ខ្សែរបស់ ${character.character}`,
          `Watch stroke order of ${character.character}`,
        )}
      </h1>
      <p className="mb-8 max-w-xl text-muted">
        {t(
          "មើលចលនាយឺតៗ ហើយចងចាំទិសដៅនៃខ្សែនីមួយៗ។",
          "Watch slowly and remember the direction of each stroke.",
        )}
      </p>

      <StrokeAnimator character={character} />
    </div>
  );
}
