"use client";

import { CharacterCard } from "@/components/character/CharacterCard";
import { characters } from "@/data/characters";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import type { CharacterCategory, LearningStatus, VowelType } from "@/types";

interface CharacterGridProps {
  filter?: (status: LearningStatus) => boolean;
  characterIds?: string[];
  category?: CharacterCategory;
  vowelType?: VowelType;
  activeId?: string;
  columns?: string;
}

export function CharacterGrid({
  filter,
  characterIds,
  category,
  vowelType,
  activeId,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
}: CharacterGridProps) {
  const { getStatus, getScore } = useProgressContext();

  const filtered = characters.filter((char) => {
    if (characterIds && !characterIds.includes(char.id)) return false;
    if (category && char.category !== category) return false;
    if (vowelType && char.vowelType !== vowelType) return false;
    const status = getStatus(char.id);
    return filter ? filter(status) : true;
  });

  if (filtered.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center text-muted">
        មិនមានអក្សរក្នុងប្រភេទនេះទេ
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${columns}`}>
      {filtered.map((char) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          character={char.character}
          status={getStatus(char.id)}
          score={getScore(char.id)}
          href={`/characters/${char.id}`}
          active={activeId === char.id}
        />
      ))}
    </div>
  );
}
