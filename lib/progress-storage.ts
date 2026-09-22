import { TOTAL_CHARACTERS, characters } from "@/data/characters";
import type { CharacterProgress, LearningStatus, UserProgress } from "@/types";

const STORAGE_KEY = "khmer-handwriting-progress";

function createDefaultCharacterProgress(): Record<string, CharacterProgress> {
  const map: Record<string, CharacterProgress> = {};
  characters.forEach((char, index) => {
    let status: LearningStatus = "not_started";
    let score = 0;
    if (index < 3) {
      status = "learned";
      score = index === 0 ? 85 : index === 1 ? 92 : 78;
    }
    map[char.id] = {
      characterId: char.id,
      status,
      score,
      practiceCount: status === "learned" ? 3 : 0,
    };
  });
  return map;
}

export function getDefaultProgress(): UserProgress {
  const today = new Date().toISOString().split("T")[0];
  return {
    learnedCount: 24,
    totalCharacters: TOTAL_CHARACTERS,
    averageScore: 87,
    streakDays: 7,
    lastPracticeDate: today,
    completedLessons: ["ka", "kha", "ko"],
    weakCharacters: ["ko"],
    characters: createDefaultCharacterProgress(),
    weeklyActivity: [3, 5, 4, 6, 5, 7, 8],
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    return {
      ...getDefaultProgress(),
      ...parsed,
      characters: {
        ...createDefaultCharacterProgress(),
        ...parsed.characters,
      },
    };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateCharacterProgress(
  progress: UserProgress,
  characterId: string,
  score: number,
): UserProgress {
  const existing = progress.characters[characterId];
  const updated: CharacterProgress = {
    characterId,
    status: score >= 60 ? "learned" : "in_progress",
    score: Math.max(existing?.score ?? 0, score),
    practiceCount: (existing?.practiceCount ?? 0) + 1,
    lastPracticed: new Date().toISOString(),
  };

  const charactersMap = { ...progress.characters, [characterId]: updated };
  const learnedCount = Object.values(charactersMap).filter(
    (c) => c.status === "learned",
  ).length;
  const scores = Object.values(charactersMap)
    .filter((c) => c.score > 0)
    .map((c) => c.score);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : progress.averageScore;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  let streakDays = progress.streakDays;
  if (progress.lastPracticeDate === yesterday) {
    streakDays += 1;
  } else if (progress.lastPracticeDate !== today) {
    streakDays = 1;
  }

  const completedLessons = progress.completedLessons.includes(characterId)
    ? progress.completedLessons
    : [...progress.completedLessons, characterId];

  const weakCharacters =
    score < 80 && !progress.weakCharacters.includes(characterId)
      ? [...progress.weakCharacters, characterId]
      : progress.weakCharacters;

  const weeklyActivity = [...progress.weeklyActivity.slice(1), 1];

  return {
    ...progress,
    learnedCount: Math.max(progress.learnedCount, learnedCount),
    averageScore,
    streakDays,
    lastPracticeDate: today,
    completedLessons,
    weakCharacters,
    characters: charactersMap,
    weeklyActivity,
  };
}

export function getCharacterStatus(
  progress: UserProgress,
  characterId: string,
): LearningStatus {
  return progress.characters[characterId]?.status ?? "not_started";
}

export function getCharacterScore(
  progress: UserProgress,
  characterId: string,
): number {
  return progress.characters[characterId]?.score ?? 0;
}
