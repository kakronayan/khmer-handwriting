export type LearningStatus = "learned" | "in_progress" | "not_started";

export type CharacterCategory = "consonant" | "vowel" | "subscript" | "number";

export interface StrokePath {
  id: number;
  path: string;
  startX: number;
  startY: number;
  labelKm: string;
  labelEn: string;
  directionKm: string;
}

export interface KhmerCharacter {
  id: string;
  character: string;
  nameKm: string;
  nameEn: string;
  pronunciation: string;
  ipa: string;
  category: CharacterCategory;
  group: number;
  strokeCount: number;
  exampleWord: string;
  exampleMeaningKm: string;
  strokes: StrokePath[];
  guidePath: string;
  audioFile?: string;
}

export interface CharacterProgress {
  characterId: string;
  status: LearningStatus;
  score: number;
  practiceCount: number;
  lastPracticed?: string;
}

export interface UserProgress {
  learnedCount: number;
  totalCharacters: number;
  averageScore: number;
  streakDays: number;
  lastPracticeDate: string;
  completedLessons: string[];
  weakCharacters: string[];
  characters: Record<string, CharacterProgress>;
  weeklyActivity: number[];
}

export interface CanvasPoint {
  x: number;
  y: number;
  pressure: number;
}

export interface CanvasStroke {
  points: CanvasPoint[];
}

export interface RecognitionResult {
  character: string;
  characterId: string;
  confidence: number;
}

export interface RecognitionResponse {
  primary: RecognitionResult;
  alternatives: RecognitionResult[];
}

export type Language = "km" | "en";

export interface NavItem {
  href: string;
  labelKm: string;
  labelEn: string;
  icon: "home" | "learn" | "practice" | "characters" | "progress";
}
