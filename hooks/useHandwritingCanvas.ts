"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawStroke, getCanvasPoint } from "@/lib/canvas-utils";
import type { CanvasPoint, CanvasStroke } from "@/types";

const CANVAS_SIZE = 480;

interface UseHandwritingCanvasOptions {
  onStrokeComplete?: (count: number) => void;
}

export function useHandwritingCanvas(options: UseHandwritingCanvasOptions = {}) {
  const onStrokeCompleteRef = useRef(options.onStrokeComplete);
  onStrokeCompleteRef.current = options.onStrokeComplete;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<CanvasStroke[]>([]);
  const strokesRef = useRef<CanvasStroke[]>([]);
  strokesRef.current = strokes;
  const [redoStack, setRedoStack] = useState<CanvasStroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentStrokeRef = useRef<CanvasPoint[]>([]);
  const [displaySize, setDisplaySize] = useState(CANVAS_SIZE);

  const scale = displaySize / CANVAS_SIZE;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach((stroke) => drawStroke(ctx, stroke, 1));
    if (currentStrokeRef.current.length > 0) {
      drawStroke(ctx, { points: currentStrokeRef.current }, 1);
    }
  }, [strokes]);

  useEffect(() => {
    redraw();
  }, [redraw, displaySize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const size = Math.min(entry.contentRect.width, entry.contentRect.height, CANVAS_SIZE);
        setDisplaySize(size || CANVAS_SIZE);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    redraw();
  }, [redraw]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDrawing(true);
      setRedoStack([]);
      const point = getCanvasPoint(e.currentTarget, e.nativeEvent);
      currentStrokeRef.current = [point];
      redraw();
    },
    [redraw],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const point = getCanvasPoint(e.currentTarget, e.nativeEvent);
      currentStrokeRef.current = [...currentStrokeRef.current, point];
      redraw();
    },
    [isDrawing, redraw],
  );

  const finishStroke = useCallback(() => {
    if (currentStrokeRef.current.length > 0) {
      const newStroke: CanvasStroke = { points: [...currentStrokeRef.current] };
      const completedCount = strokes.length + 1;
      setStrokes((prev) => [...prev, newStroke]);
      onStrokeCompleteRef.current?.(completedCount);
      currentStrokeRef.current = [];
    }
    setIsDrawing(false);
    redraw();
  }, [strokes.length, redraw]);

  const handlePointerUp = useCallback(() => {
    finishStroke();
  }, [finishStroke]);

  const undo = useCallback(() => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((r) => [...r, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const clear = useCallback(() => {
    setStrokes([]);
    setRedoStack([]);
    currentStrokeRef.current = [];
    redraw();
  }, [redraw]);

  const getImageData = useCallback((): ImageData | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }, []);

  return {
    canvasRef,
    containerRef,
    strokes,
    getStrokes: () => strokesRef.current,
    strokeCount: strokes.length,
    isDrawing,
    displaySize,
    scale,
    undo,
    redo,
    clear,
    canUndo: strokes.length > 0,
    canRedo: redoStack.length > 0,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    getImageData,
  };
}
