import type { StrokePath } from "@/types";

export type Difficulty = "easy" | "medium" | "hard";

export interface ConsonantStrokeData {
  strokes: StrokePath[];
  guidePath: string;
  strokeCount: number;
  difficulty: Difficulty;
}

const KHMER_NUMERALS = ["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

export function stroke(
  id: number,
  path: string,
  startX: number,
  startY: number,
  directionKm: string,
  directionEn: string,
): StrokePath {
  const num = KHMER_NUMERALS[id - 1] ?? String(id);
  return {
    id,
    path,
    startX,
    startY,
    labelKm: `ខ្សែទី ${num} • ${directionKm}`,
    labelEn: `Stroke ${id} • ${directionEn}`,
    directionKm,
  };
}

/** Series 1 O-group: ច ដ ត ប pattern — 3 strokes */
export function series1ThreeStroke(): ConsonantStrokeData {
  const strokes: StrokePath[] = [
    stroke(
      1,
      "M 55 172 L 68 92",
      55,
      172,
      "ឡើងពីក្រោម",
      "Up from bottom",
    ),
    stroke(
      2,
      "M 68 92 L 152 92",
      68,
      92,
      "បត់ទៅស្តាំ",
      "Turn right",
    ),
    stroke(
      3,
      "M 152 92 C 172 92 180 108 176 128 C 168 158 128 172 88 166 C 56 158 50 132 54 112",
      152,
      92,
      "ចុះខាងស្តាំ",
      "Down on right",
    ),
  ];
  return {
    strokes,
    guidePath: strokes.map((s) => s.path).join(" "),
    strokeCount: 3,
    difficulty: "medium",
  };
}

/** Series 2 O-group: ជ ឌ ទ ព pattern — 2 strokes (like គ) */
export function series2TwoStroke(): ConsonantStrokeData {
  const strokes: StrokePath[] = [
    stroke(
      1,
      "M 120 40 C 120 80 120 120 120 160 C 118 178 88 188 52 182",
      120,
      40,
      "ចាប់ពីលើ ទៅក្រោម",
      "Start from top, down",
    ),
    stroke(
      2,
      "M 120 40 C 162 42 202 62 198 102 C 192 142 158 162 122 158",
      120,
      40,
      "បត់ទៅស្ដាំ",
      "Turn right",
    ),
  ];
  return {
    strokes,
    guidePath: strokes.map((s) => s.path).join(" "),
    strokeCount: 2,
    difficulty: "easy",
  };
}

/** Aspirated top mark — added as final stroke */
export function aspiratedMark(id: number): StrokePath {
  return stroke(
    id,
    "M 98 28 L 142 28",
    98,
    28,
    "ខ្ពស់ខាងលើ",
    "Top aspirated mark",
  );
}

export function withAspirated(base: ConsonantStrokeData): ConsonantStrokeData {
  const mark = aspiratedMark(base.strokeCount + 1);
  const strokes = [...base.strokes, mark];
  return {
    strokes,
    guidePath: `${base.guidePath} ${mark.path}`,
    strokeCount: strokes.length,
    difficulty: "medium",
  };
}

/** Oval + stem — ង ម pattern */
export function ovalStem(): ConsonantStrokeData {
  const strokes: StrokePath[] = [
    stroke(
      1,
      "M 62 102 C 62 62 102 42 142 42 C 182 42 202 72 202 102 C 202 132 172 162 132 162 C 92 162 62 132 62 102",
      62,
      102,
      "គូសរង្កង់",
      "Draw the curve",
    ),
    stroke(
      2,
      "M 132 162 L 132 202",
      132,
      162,
      "បន្ទាត់ចុះក្រោម",
      "Bottom stem",
    ),
  ];
  return {
    strokes,
    guidePath: strokes.map((s) => s.path).join(" "),
    strokeCount: 2,
    difficulty: "easy",
  };
}
