"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getDefaultProgress,
  loadProgress,
  saveProgress,
  updateCharacterProgress,
} from "@/lib/progress-storage";
import type { LearningStatus, UserProgress } from "@/types";

export type { LearningStatus, UserProgress };

let progressCache: UserProgress = getDefaultProgress();
let hydrated = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((l) => l());
}

function getSnapshot(): UserProgress {
  if (typeof window !== "undefined" && !hydrated) {
    progressCache = loadProgress();
    hydrated = true;
  }
  return progressCache;
}

function getServerSnapshot(): UserProgress {
  return getDefaultProgress();
}

export function useProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setProgress = useCallback((next: UserProgress) => {
    progressCache = next;
    saveProgress(next);
    emit();
  }, []);

  const recordPractice = useCallback(
    (characterId: string, score: number) => {
      setProgress(updateCharacterProgress(progressCache, characterId, score));
    },
    [setProgress],
  );

  const getStatus = useCallback(
    (characterId: string): LearningStatus =>
      progress.characters[characterId]?.status ?? "not_started",
    [progress],
  );

  const getScore = useCallback(
    (characterId: string): number =>
      progress.characters[characterId]?.score ?? 0,
    [progress],
  );

  return {
    progress,
    loaded: typeof window !== "undefined",
    recordPractice,
    getStatus,
    getScore,
  };
}
