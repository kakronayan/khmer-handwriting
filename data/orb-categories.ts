import { characters, consonants, subscripts } from "@/data/characters";
import type { KhmerCharacter } from "@/types";

export interface OrbCategory {
  id: string;
  characterId?: string;
  character?: string;
  labelKm: string;
  labelEn: string;
  learnHref: string;
}

/** One representative orb per Khmer character category (replaces ក→ង on the home orb). */
export const orbCategories: OrbCategory[] = [
  {
    id: "consonant",
    characterId: "ka",
    labelKm: "ព្យញ្ជនៈ",
    labelEn: "Consonants",
    learnHref: "/learn?category=consonant",
  },
  {
    id: "vowel-full",
    characterId: "vowel-qa",
    labelKm: "ស្រៈពេញតួ",
    labelEn: "Full vowels",
    learnHref: "/learn?category=vowel-full",
  },
  {
    id: "vowel-dependent",
    characterId: "dep-aa",
    labelKm: "ស្រៈនិស្ស័យ",
    labelEn: "Dependent vowels",
    learnHref: "/learn?category=vowel-dependent",
  },
  {
    id: "mark",
    characterId: "mark-i-subs",
    labelKm: "ស្រ:បម្រុង",
    labelEn: "Subscript marks",
    learnHref: "/learn?category=mark",
  },
  {
    id: "subscript",
    character: "ក្រ",
    labelKm: "មានប៉ន្មានតួ",
    labelEn: "Subscript forms",
    learnHref: "/learn?category=subscript",
  },
];

export function getOrbCategoryCharacters(categoryId: string): KhmerCharacter[] {
  switch (categoryId) {
    case "consonant":
      return consonants;
    case "vowel-full":
      return characters.filter(
        (c) => c.category === "vowel" && c.vowelType === "full",
      );
    case "vowel-dependent":
      return characters.filter(
        (c) => c.category === "vowel" && c.vowelType === "dependent",
      );
    case "mark":
      return characters.filter((c) => c.category === "mark");
    case "subscript":
      return subscripts;
    default:
      return [];
  }
}

export function getOrbCategoryCharacter(category: OrbCategory): string {
  if (category.characterId) {
    return (
      characters.find((c) => c.id === category.characterId)?.character ??
      category.character ??
      ""
    );
  }
  return category.character ?? "";
}
