"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StrokePath } from "@/types";

export type AnimationSpeed = "slow" | "normal" | "fast";

const SPEED_DURATION: Record<AnimationSpeed, number> = {
  slow: 1800,
  normal: 1200,
  fast: 700,
};

interface UseStrokeAnimationOptions {
  strokes: StrokePath[];
  autoPlay?: boolean;
  speed?: AnimationSpeed;
  onComplete?: () => void;
  onStrokeChange?: (index: number) => void;
}

export function useStrokeAnimation({
  strokes,
  autoPlay = false,
  speed = "normal",
  onComplete,
  onStrokeChange,
}: UseStrokeAnimationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const currentIndexRef = useRef(currentIndex);

  const total = strokes.length;
  const duration = SPEED_DURATION[speed];

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    onStrokeChange?.(currentIndex);
  }, [currentIndex, onStrokeChange]);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct >= 1) {
        startTimeRef.current = 0;
        setProgress(0);
        if (currentIndexRef.current < total - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          setIsPlaying(false);
          setIsComplete(true);
          onComplete?.();
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, currentIndex, total, duration, onComplete]);

  const play = useCallback(() => {
    if (isComplete) {
      setCurrentIndex(0);
      setProgress(0);
      setIsComplete(false);
      startTimeRef.current = 0;
    }
    setIsPlaying(true);
  }, [isComplete]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const replay = useCallback(() => {
    setCurrentIndex(0);
    setProgress(0);
    setIsComplete(false);
    startTimeRef.current = 0;
    setIsPlaying(true);
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentIndex(0);
    setProgress(0);
    setIsComplete(false);
    startTimeRef.current = 0;
  }, [pause]);

  const previous = useCallback(() => {
    pause();
    setIsComplete(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
    setProgress(0);
  }, [pause]);

  const next = useCallback(() => {
    pause();
    setIsComplete(false);
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
    setProgress(0);
  }, [pause, total]);

  const togglePlay = useCallback(
    () => (isPlaying ? pause() : play()),
    [isPlaying, pause, play],
  );

  const goTo = useCallback(
    (index: number) => {
      pause();
      setIsComplete(false);
      setCurrentIndex(Math.max(0, Math.min(total - 1, index)));
      setProgress(0);
    },
    [pause, total],
  );

  return {
    currentIndex,
    currentStroke: strokes[currentIndex],
    progress,
    isPlaying,
    isComplete,
    total,
    speed,
    play,
    pause,
    replay,
    reset,
    previous,
    next,
    togglePlay,
    goTo,
    stepLabel: `ខ្សែ ${currentIndex + 1} / ${total}`,
    stepLabelEn: `Stroke ${currentIndex + 1} / ${total}`,
  };
}
