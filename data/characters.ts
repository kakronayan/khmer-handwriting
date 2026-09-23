import type { KhmerCharacter } from "@/types";
import { sortKhmerConsonants } from "@/lib/khmer-order";
import { consonants as rawConsonants } from "./consonants";
import { vowels } from "./vowels";
import { marks, blessingMarks } from "./marks";

export const consonants = sortKhmerConsonants(rawConsonants);

export const characters: KhmerCharacter[] = [
  ...consonants,
  ...vowels,
  ...marks,
  ...blessingMarks,
];

export const TOTAL_CHARACTERS = characters.length;

export const CONSONANT_COUNT = consonants.length;
export const FULL_VOWEL_COUNT = vowels.filter((v) => v.vowelType === "full").length;
export const DEPENDENT_VOWEL_COUNT = vowels.filter(
  (v) => v.vowelType === "dependent",
).length;
export const MARK_COUNT = marks.length + blessingMarks.length;

export function getCharacterById(id: string): KhmerCharacter | undefined {
  return characters.find((c) => c.id === id);
}

export function getNextCharacterId(id: string): string | null {
  const index = characters.findIndex((c) => c.id === id);
  if (index === -1 || index >= characters.length - 1) return null;
  return characters[index + 1].id;
}

export function getRelatedCharacters(id: string): KhmerCharacter[] {
  const current = getCharacterById(id);
  if (!current) return characters;
  if (current.category === "vowel" && current.vowelType) {
    return characters.filter(
      (c) => c.category === "vowel" && c.vowelType === current.vowelType,
    );
  }
  if (current.category === "mark") {
    return characters.filter((c) => c.category === "mark");
  }
  return characters.filter(
    (c) => c.category === current.category && c.group === current.group,
  );
}

export function getCharactersByCategory(
  category: KhmerCharacter["category"],
): KhmerCharacter[] {
  return characters.filter((c) => c.category === category);
}
