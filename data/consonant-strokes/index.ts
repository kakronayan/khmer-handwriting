import type { ConsonantStrokeData } from "./templates";
import {
  ovalStem,
  series1ThreeStroke,
  series2TwoStroke,
  stroke,
  withAspirated,
} from "./templates";

export type { ConsonantStrokeData, Difficulty } from "./templates";

/** Verified stroke data for all 33 Khmer consonants (ព្យញ្ជនៈ) */
export const consonantStrokeData: Record<string, ConsonantStrokeData> = {
  // ── Row 1: ក ខ គ ឃ ង ──
  ka: {
    strokeCount: 5,
    difficulty: "hard",
    guidePath:
      "M 52 172 C 44 172 46 154 54 144 L 66 90 M 66 90 L 152 90 M 152 90 C 168 90 176 104 174 120 C 168 148 140 165 110 168 C 82 168 58 152 52 132 M 76 58 C 76 34 96 22 112 30 C 120 36 120 48 110 54 M 110 54 C 120 48 138 22 156 30 C 168 36 170 48 160 56",
    strokes: [
      stroke(1, "M 52 172 C 44 172 46 154 54 144 L 66 90", 52, 172, "ឡើងពីក្រោម", "Up from bottom"),
      stroke(2, "M 66 90 L 152 90", 66, 90, "បត់ទៅស្តាំ", "Turn right"),
      stroke(3, "M 152 90 C 168 90 176 104 174 120 C 168 148 140 165 110 168 C 82 168 58 152 52 132", 152, 90, "ចុះខាងស្តាំ", "Down on right"),
      stroke(4, "M 76 58 C 76 34 96 22 112 30 C 120 36 120 48 110 54", 76, 58, "ស៊ខាងឆ្វេង", "Left hump"),
      stroke(5, "M 110 54 C 120 48 138 22 156 30 C 168 36 170 48 160 56", 110, 54, "ស៊ខាងស្តាំ", "Right hump"),
    ],
  },
  kha: {
    strokeCount: 3,
    difficulty: "medium",
    guidePath:
      "M 120 30 L 120 120 C 120 160 80 180 50 180 M 120 30 C 160 30 200 50 200 90 C 200 130 170 150 130 150 M 100 30 L 140 30",
    strokes: [
      stroke(1, "M 120 30 L 120 120 C 120 160 80 180 50 180", 120, 30, "ចាប់ពីលើ ទៅក្រោម", "Start from top"),
      stroke(2, "M 120 30 C 160 30 200 50 200 90 C 200 130 170 150 130 150", 120, 30, "បត់ទៅស្ដាំ", "Turn right"),
      stroke(3, "M 100 30 L 140 30", 100, 30, "ខ្ពស់ខាងលើ", "Top mark"),
    ],
  },
  ko: {
    strokeCount: 2,
    difficulty: "easy",
    guidePath:
      "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180 M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
    strokes: [
      stroke(1, "M 120 40 C 120 40 120 80 120 120 C 120 160 80 180 50 180", 120, 40, "ចាប់ពីលើ ទៅក្រោម", "Start from top"),
      stroke(2, "M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160", 120, 40, "បត់ទៅស្ដាំ", "Turn right"),
    ],
  },
  kho: withAspirated({
    strokeCount: 2,
    difficulty: "easy",
    guidePath:
      "M 120 40 C 120 80 120 120 120 160 80 180 50 180 M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160",
    strokes: [
      stroke(1, "M 120 40 C 120 80 120 120 120 160 80 180 50 180", 120, 40, "ចាប់ពីលើ ទៅក្រោម", "Start from top"),
      stroke(2, "M 120 40 C 160 40 200 60 200 100 C 200 140 170 160 130 160", 120, 40, "បត់ទៅស្ដាំ", "Turn right"),
    ],
  }),
  ngo: ovalStem(),

  // ── Row 2: ច ឆ ជ ឈ ញ ──
  cha: series1ThreeStroke(),
  chha: withAspirated(series1ThreeStroke()),
  co: series2TwoStroke(),
  chho: withAspirated(series2TwoStroke()),
  nyo: {
    strokeCount: 3,
    difficulty: "hard",
    guidePath:
      "M 120 38 L 120 100 C 118 140 90 168 58 168 M 120 38 C 155 38 188 58 188 95 C 186 130 158 152 120 148 M 120 148 L 120 195",
    strokes: [
      stroke(1, "M 120 38 L 120 100 C 118 140 90 168 58 168", 120, 38, "ចាប់ពីលើ ទៅក្រោមឆ្វេង", "Down-left stem"),
      stroke(2, "M 120 38 C 155 38 188 58 188 95 C 186 130 158 152 120 148", 120, 38, "បត់ទៅស្តាំ", "Right curve"),
      stroke(3, "M 120 148 L 120 195", 120, 148, "បន្ទាត់ចុះក្រោម", "Bottom stem"),
    ],
  },

  // ── Row 3: ដ ឋ ឌ ឍ ណ ──
  da: series1ThreeStroke(),
  "tha-dent": withAspirated(series1ThreeStroke()),
  do: series2TwoStroke(),
  tho: withAspirated(series2TwoStroke()),
  "na-dent": {
    strokeCount: 4,
    difficulty: "hard",
    guidePath:
      "M 120 32 L 120 80 M 120 32 C 155 32 185 52 185 88 C 183 122 155 142 120 138 M 120 138 L 120 195 M 120 80 C 88 82 62 105 58 138",
    strokes: [
      stroke(1, "M 120 32 L 120 80", 120, 32, "ចាប់ពីលើ", "Start from top"),
      stroke(2, "M 120 32 C 155 32 185 52 185 88 C 183 122 155 142 120 138", 120, 32, "រង្កង់ខាងស្តាំ", "Right loop"),
      stroke(3, "M 120 80 C 88 82 62 105 58 138", 120, 80, "បត់ទៅឆ្វេង", "Turn left"),
      stroke(4, "M 120 138 L 120 195", 120, 138, "បន្ទាត់ចុះក្រោម", "Bottom stem"),
    ],
  },

  // ── Row 4: ត ថ ទ ធ ន ──
  ta: series1ThreeStroke(),
  tha: withAspirated(series1ThreeStroke()),
  to: series2TwoStroke(),
  "tho-asp": withAspirated(series2TwoStroke()),
  no: {
    strokeCount: 2,
    difficulty: "easy",
    guidePath: "M 120 38 L 120 130 C 118 168 88 188 55 182 M 120 130 C 158 132 188 152 188 178",
    strokes: [
      stroke(1, "M 120 38 L 120 130 C 118 168 88 188 55 182", 120, 38, "ចាប់ពីលើ ទៅក្រោម", "Down stem"),
      stroke(2, "M 120 130 C 158 132 188 152 188 178", 120, 130, "បត់ទៅស្តាំ", "Bottom loop"),
    ],
  },

  // ── Row 5: ប ផ ព ភ ម ──
  ba: series1ThreeStroke(),
  pa: withAspirated(series1ThreeStroke()),
  po: series2TwoStroke(),
  pho: withAspirated(series2TwoStroke()),
  mo: ovalStem(),

  // ── Row 6: យ រ ល វ ──
  yo: {
    strokeCount: 2,
    difficulty: "easy",
    guidePath: "M 120 38 L 120 155 C 118 182 95 198 68 188 M 105 38 L 135 38",
    strokes: [
      stroke(1, "M 120 38 L 120 155 C 118 182 95 198 68 188", 120, 38, "ចាប់ពីលើ បត់ឆ្វេង", "Down with left hook"),
      stroke(2, "M 105 38 L 135 38", 105, 38, "ខ្ពស់ខាងលើ", "Top serif"),
    ],
  },
  ro: {
    strokeCount: 2,
    difficulty: "easy",
    guidePath: "M 155 42 C 125 42 95 62 88 95 C 82 128 105 158 138 162 M 155 42 L 155 195",
    strokes: [
      stroke(1, "M 155 42 C 125 42 95 62 88 95 C 82 128 105 158 138 162", 155, 42, "គូសរង្កង់", "Curved hook"),
      stroke(2, "M 155 42 L 155 195", 155, 42, "បន្ទាត់ចុះក្រោម", "Vertical stem"),
    ],
  },
  lo: {
    strokeCount: 2,
    difficulty: "medium",
    guidePath: "M 120 38 L 120 130 C 118 168 88 188 55 182 M 120 130 C 155 132 185 152 185 178",
    strokes: [
      stroke(1, "M 120 38 L 120 130 C 118 168 88 188 55 182", 120, 38, "ចាប់ពីលើ ទៅក្រោម", "Down stem"),
      stroke(2, "M 120 130 C 155 132 185 152 185 178", 120, 130, "បត់ទៅស្តាំ", "Bottom loop"),
    ],
  },
  vo: {
    strokeCount: 2,
    difficulty: "medium",
    guidePath: "M 85 55 C 85 35 105 28 120 38 C 135 28 155 35 155 55 M 120 38 L 120 195",
    strokes: [
      stroke(1, "M 85 55 C 85 35 105 28 120 38 C 135 28 155 35 155 55", 85, 55, "គូសស៊ពីរខាង", "Double humps"),
      stroke(2, "M 120 38 L 120 195", 120, 38, "បន្ទាត់ចុះក្រោម", "Vertical stem"),
    ],
  },

  // ── Row 7: ស ហ ឡ អ ──
  sa: {
    strokeCount: 3,
    difficulty: "medium",
    guidePath:
      "M 82 58 C 82 38 98 30 112 42 M 112 42 C 128 30 148 38 148 58 M 120 42 L 120 195",
    strokes: [
      stroke(1, "M 82 58 C 82 38 98 30 112 42", 82, 58, "ស៊ខាងឆ្វេង", "Left hump"),
      stroke(2, "M 112 42 C 128 30 148 38 148 58", 112, 42, "ស៊ខាងស្តាំ", "Right hump"),
      stroke(3, "M 120 42 L 120 195", 120, 42, "បន្ទាត់ចុះក្រោម", "Vertical stem"),
    ],
  },
  ha: {
    strokeCount: 2,
    difficulty: "medium",
    guidePath: "M 70 55 L 170 55 M 120 55 L 120 130 C 118 168 88 188 55 182",
    strokes: [
      stroke(1, "M 70 55 L 170 55", 70, 55, "គូសផ្តេក", "Horizontal top"),
      stroke(2, "M 120 55 L 120 130 C 118 168 88 188 55 182", 120, 55, "ចុះឆ្វេង", "Down-left curve"),
    ],
  },
  la: {
    strokeCount: 3,
    difficulty: "hard",
    guidePath: "M 120 32 L 120 195 M 85 100 L 155 100 M 120 130 L 155 195",
    strokes: [
      stroke(1, "M 120 32 L 120 195", 120, 32, "បន្ទាត់ឈរ", "Vertical stem"),
      stroke(2, "M 85 100 L 155 100", 85, 100, "គូសផ្តេក", "Middle bar"),
      stroke(3, "M 120 130 L 155 195", 120, 130, "ជើងខាងស្តាំ", "Right leg"),
    ],
  },
  qa: {
    strokeCount: 4,
    difficulty: "hard",
    guidePath:
      "M 120 32 L 120 195 M 85 55 L 155 55 M 120 100 C 95 105 78 125 75 148 M 120 100 C 145 105 162 125 165 148",
    strokes: [
      stroke(1, "M 120 32 L 120 195", 120, 32, "បន្ទាត់ឈរ", "Vertical stem"),
      stroke(2, "M 85 55 L 155 55", 85, 55, "គូសផ្តេក", "Top bar"),
      stroke(3, "M 120 100 C 95 105 78 125 75 148", 120, 100, "បត់ឆ្វេង", "Left hook"),
      stroke(4, "M 120 100 C 145 105 162 125 165 148", 120, 100, "បត់ស្តាំ", "Right hook"),
    ],
  },
};

export function getConsonantStrokes(id: string): ConsonantStrokeData | undefined {
  return consonantStrokeData[id];
}

/** Consonant rows matching traditional Khmer teaching order */
export const CONSONANT_ROWS: string[][] = [
  ["ka", "kha", "ko", "kho", "ngo"],
  ["cha", "chha", "co", "chho", "nyo"],
  ["da", "tha-dent", "do", "tho", "na-dent"],
  ["ta", "tha", "to", "tho-asp", "no"],
  ["ba", "pa", "po", "pho", "mo"],
  ["yo", "ro", "lo", "vo"],
  ["sa", "ha", "la", "qa"],
];
