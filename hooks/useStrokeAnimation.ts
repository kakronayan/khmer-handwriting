"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StrokePath } from "@/types";

interface UseStrokeAnimationOptions {
  strokes: StrokePath[];
  autoPlay?: boolean;
}

export function useStrokeAnimation({
  strokes,
  autoPlay = false,
}: UseStrokeAnimationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const currentIndexRef = useRef(currentIndex);

  const total = strokes.length;
  const duration = 1200;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, currentIndex, total]);

  const play = () => setIsPlaying(true);
  const pause = () => {
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  };
  const replay = () => {
    setCurrentIndex(0);
    setProgress(0);
    startTimeRef.current = 0;
    setIsPlaying(true);
  };
  const previous = () => {
    pause();
    setCurrentIndex((i) => Math.max(0, i - 1));
    setProgress(0);
  };
  const next = () => {
    pause();
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
    setProgress(0);
  };

  const togglePlay = () => (isPlaying ? pause() : play());

  const goTo = useCallback((index: number) => {
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
    setCurrentIndex(Math.max(0, Math.min(total - 1, index)));
    setProgress(0);
  }, [total]);

  return {
    currentIndex,
    currentStroke: strokes[currentIndex],
    progress,
    isPlaying,
    total,
    play,
    pause,
    replay,
    previous,
    next,
    togglePlay,
    goTo,
    stepLabel: `ជំហាន ${currentIndex + 1} / ${total}`,
  };
}
