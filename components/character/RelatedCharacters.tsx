"use client";

import { CharacterCard } from "@/components/character/CharacterCard";
import { getRelatedCharacters } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { useProgressContext } from "@/components/providers/ProgressProvider";

interface RelatedCharactersProps {
  characterId: string;
}

export function RelatedCharacters({ characterId }: RelatedCharactersProps) {
  const { t } = useLanguage();
  const { getStatus, getScore } = useProgressContext();
  const related = getRelatedCharacters(characterId);

  return (
    <section aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="mb-4 text-sm font-medium text-gold"
      >
        {t("អក្សរទាក់ទង", "Related characters")}
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {related.map((char) => (
          <CharacterCard
            key={char.id}
            id={char.id}
            character={char.character}
            status={getStatus(char.id)}
            score={getScore(char.id)}
            href={`/characters/${char.id}`}
            active={char.id === characterId}
            size="sm"
          />
        ))}
      </div>
    </section>
  );
}
