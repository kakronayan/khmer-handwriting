import type { KhmerCharacter, CharacterCategory, VowelType } from "@/types";

const PLACEHOLDER_GUIDE =
  "M 100 40 L 100 160 M 60 100 L 140 100";

interface CharacterInput {
  id: string;
  character: string;
  nameKm: string;
  nameEn: string;
  pronunciation: string;
  ipa: string;
  category: CharacterCategory;
  vowelType?: VowelType;
  group: number;
  strokeCount?: number;
  exampleWord: string;
  exampleMeaningKm: string;
  meaningKm?: string;
  meaningEn?: string;
  guidePath?: string;
  strokes?: KhmerCharacter["strokes"];
}

export function makeCharacter(input: CharacterInput): KhmerCharacter {
  const strokeCount = input.strokeCount ?? 1;
  return {
    ...input,
    strokeCount,
    guidePath: input.guidePath ?? PLACEHOLDER_GUIDE,
    strokes: input.strokes ?? [
      {
        id: 1,
        path: "M 100 40 L 100 160",
        startX: 100,
        startY: 40,
        labelKm: "ខ្សែទី ១",
        labelEn: "Stroke 1",
        directionKm: "គូសខ្សែ",
      },
    ],
  };
}
