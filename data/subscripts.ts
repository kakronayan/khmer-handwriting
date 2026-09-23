import type { KhmerCharacter } from "@/types";
import { makeCharacter } from "./character-factory";
import { consonants as rawConsonants } from "./consonants";

const COENG = "\u17D2";

/** Subscript consonant forms (មានប៉ន្មានតួ) derived from the 33 consonants. */
export const subscripts: KhmerCharacter[] = rawConsonants.map((consonant) =>
  makeCharacter({
    id: `sub-${consonant.id}`,
    character: `${COENG}${consonant.character}`,
    nameKm: `ជើងអក្សរ ${consonant.character}`,
    nameEn: `Subscript ${consonant.nameEn.replace(/^Letter /, "")}`,
    pronunciation: consonant.pronunciation,
    ipa: consonant.ipa,
    category: "subscript",
    group: consonant.group,
    exampleWord: consonant.exampleWord,
    exampleMeaningKm: consonant.exampleMeaningKm,
    meaningKm: `ទម្រង់ជើងអក្សររបស់ ${consonant.character}`,
    meaningEn: `Subscript form of ${consonant.character}`,
  }),
);
