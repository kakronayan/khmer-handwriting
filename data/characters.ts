import type { KhmerCharacter } from "@/types";

export const TOTAL_CHARACTERS = 74;

export const characters: KhmerCharacter[] = [
  {
    id: "ka",
    character: "ក",
    nameKm: "អក្សរ ក",
    nameEn: "Letter Ka",
    pronunciation: "ka",
    ipa: "/kɑː/",
    category: "consonant",
    group: 1,
    strokeCount: 3,
    exampleWord: "កង្កែប",
    exampleMeaningKm: "កង្កែប",
    guidePath:
      "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180 C 30 180 20 160 20 140 M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
    strokes: [
      {
        id: 1,
        path: "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180 C 30 180 20 160 20 140",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ១ • ចាប់ពីលើ",
        labelEn: "Stroke 1 • Start from top",
        directionKm: "ចាប់ពីខាងលើ ទៅខាងស្តាំ",
      },
      {
        id: 2,
        path: "M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ២ • បត់ទៅស្ដាំ",
        labelEn: "Stroke 2 • Turn right",
        directionKm: "បត់ទៅស្ដាំ",
      },
      {
        id: 3,
        path: "M 50 180 C 70 200 100 210 130 210 C 160 210 180 190 180 170",
        startX: 50,
        startY: 180,
        labelKm: "ខ្សែទី ៣ • បញ្ចប់ខាងក្រោម",
        labelEn: "Stroke 3 • Finish at bottom",
        directionKm: "បញ្ចប់ខាងក្រោម",
      },
    ],
    audioFile: "/audio/ka.mp3",
  },
  {
    id: "kha",
    character: "ខ",
    nameKm: "អក្សរ ខ",
    nameEn: "Letter Kha",
    pronunciation: "kha",
    ipa: "/kʰɑː/",
    category: "consonant",
    group: 1,
    strokeCount: 3,
    exampleWord: "ខ្ញុំ",
    exampleMeaningKm: "ខ្ញុំ",
    guidePath:
      "M 120 30 L 120 120 C 120 160 80 180 50 180 M 120 30 C 160 30 200 50 200 90 C 200 130 170 150 130 150 M 100 30 L 140 30",
    strokes: [
      {
        id: 1,
        path: "M 120 30 L 120 120 C 120 160 80 180 50 180",
        startX: 120,
        startY: 30,
        labelKm: "ខ្សែទី ១ • ចាប់ពីលើ",
        labelEn: "Stroke 1 • Start from top",
        directionKm: "ចាប់ពីលើ ទៅក្រោម",
      },
      {
        id: 2,
        path: "M 120 30 C 160 30 200 50 200 90 C 200 130 170 150 130 150",
        startX: 120,
        startY: 30,
        labelKm: "ខ្សែទី ២ • បត់ទៅស្ដាំ",
        labelEn: "Stroke 2 • Turn right",
        directionKm: "បត់ទៅស្ដាំ",
      },
      {
        id: 3,
        path: "M 100 30 L 140 30",
        startX: 100,
        startY: 30,
        labelKm: "ខ្សែទី ៣ • ខ្ពស់ខាងលើ",
        labelEn: "Stroke 3 • Top mark",
        directionKm: "គូសខ្ពស់ខាងលើ",
      },
    ],
    audioFile: "/audio/kha.mp3",
  },
  {
    id: "ko",
    character: "គ",
    nameKm: "អក្សរ គ",
    nameEn: "Letter Ko",
    pronunciation: "ko",
    ipa: "/kɔː/",
    category: "consonant",
    group: 1,
    strokeCount: 2,
    exampleWord: "គ្រូ",
    exampleMeaningKm: "គ្រូ",
    guidePath:
      "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180 M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
    strokes: [
      {
        id: 1,
        path: "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ១ • ចាប់ពីលើ",
        labelEn: "Stroke 1 • Start from top",
        directionKm: "ចាប់ពីលើ ទៅក្រោម",
      },
      {
        id: 2,
        path: "M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ២ • បត់ទៅស្ដាំ",
        labelEn: "Stroke 2 • Turn right",
        directionKm: "បត់ទៅស្ដាំ",
      },
    ],
    audioFile: "/audio/ko.mp3",
  },
  {
    id: "kho",
    character: "ឃ",
    nameKm: "អក្សរ ឃ",
    nameEn: "Letter Kho",
    pronunciation: "kho",
    ipa: "/kʰɔː/",
    category: "consonant",
    group: 1,
    strokeCount: 3,
    exampleWord: "ឃ្មុំ",
    exampleMeaningKm: "ឃ្មុំ",
    guidePath:
      "M 120 40 C 120 80 120 120 120 160 80 180 50 180 M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160 M 100 25 L 140 25",
    strokes: [
      {
        id: 1,
        path: "M 120 40 C 120 80 120 120 120 160 80 180 50 180",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ១ • ចាប់ពីលើ",
        labelEn: "Stroke 1 • Start from top",
        directionKm: "ចាប់ពីលើ ទៅក្រោម",
      },
      {
        id: 2,
        path: "M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
        startX: 120,
        startY: 40,
        labelKm: "ខ្សែទី ២ • បត់ទៅស្ដាំ",
        labelEn: "Stroke 2 • Turn right",
        directionKm: "បត់ទៅស្ដាំ",
      },
      {
        id: 3,
        path: "M 100 25 L 140 25",
        startX: 100,
        startY: 25,
        labelKm: "ខ្សែទី ៣ • ខ្ពស់ខាងលើ",
        labelEn: "Stroke 3 • Top mark",
        directionKm: "គូសខ្ពស់ខាងលើ",
      },
    ],
    audioFile: "/audio/kho.mp3",
  },
  {
    id: "ngo",
    character: "ង",
    nameKm: "អក្សរ ង",
    nameEn: "Letter Ngo",
    pronunciation: "ngo",
    ipa: "/ŋɔː/",
    category: "consonant",
    group: 1,
    strokeCount: 2,
    exampleWord: "ងូតទឹក",
    exampleMeaningKm: "ងូតទឹក",
    guidePath:
      "M 60 100 C 60 60 100 40 140 40 C 180 40 200 70 200 100 C 200 130 170 160 130 160 C 90 160 60 130 60 100 M 130 160 L 130 200",
    strokes: [
      {
        id: 1,
        path: "M 60 100 C 60 60 100 40 140 40 C 180 40 200 70 200 100 C 200 130 170 160 130 160 C 90 160 60 130 60 100",
        startX: 60,
        startY: 100,
        labelKm: "ខ្សែទី ១ • គូសរង្កង់",
        labelEn: "Stroke 1 • Draw the curve",
        directionKm: "គូសរង្កង់",
      },
      {
        id: 2,
        path: "M 130 160 L 130 200",
        startX: 130,
        startY: 160,
        labelKm: "ខ្សែទី ២ • បន្ទាត់ក្រោម",
        labelEn: "Stroke 2 • Bottom line",
        directionKm: "បន្ទាត់ចុះក្រោម",
      },
    ],
    audioFile: "/audio/ngo.mp3",
  },
];

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
  return characters.filter((c) => c.group === current.group);
}
