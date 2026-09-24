"use client";

import { useLayoutEffect, useState } from "react";
import type { StrokePath } from "@/types";

const DEFAULT_LENGTH = 1000;

export function useStrokePathLengths(
  strokes: StrokePath[],
  svgRef: React.RefObject<SVGSVGElement | null>,
) {
  const [lengths, setLengths] = useState<number[]>(() =>
    strokes.map(() => DEFAULT_LENGTH),
  );

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const measured = strokes.map((stroke) => {
      const path = svg.querySelector<SVGPathElement>(
        `[data-stroke-id="${stroke.id}"]`,
      );
      if (!path) return DEFAULT_LENGTH;
      const len = path.getTotalLength();
      return len > 0 ? len : DEFAULT_LENGTH;
    });

    setLengths(measured);
  }, [strokes, svgRef]);

  return lengths;
}
