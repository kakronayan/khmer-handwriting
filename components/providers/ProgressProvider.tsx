"use client";

import { useProgress } from "@/hooks/useProgress";
import type { LearningStatus, UserProgress } from "@/types";
import { createContext, useContext, type ReactNode } from "react";

interface ProgressContextValue {
  progress: UserProgress;
  loaded: boolean;
  recordPractice: (characterId: string, score: number) => void;
  getStatus: (characterId: string) => LearningStatus;
  getScore: (characterId: string) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const value = useProgress();
  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgressContext must be used within ProgressProvider");
  return ctx;
}
