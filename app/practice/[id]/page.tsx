"use client";

import {
  HandwritingCanvas,
  type HandwritingCanvasRef,
} from "@/components/canvas/HandwritingCanvas";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgressContext } from "@/components/providers/ProgressProvider";
import { getCharacterById } from "@/data/characters";
import { useStrokeAnimation } from "@/hooks/useStrokeAnimation";
import { useLanguage } from "@/hooks/useLanguage";
import { scorePractice } from "@/lib/stroke-scoring";
import type { StrokeFeedback } from "@/types";
import { formatKhmerNumber } from "@/lib/utils";
import { Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useRef, useState } from "react";

export default function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const character = getCharacterById(id);
  const { t } = useLanguage();
  const router = useRouter();
  const { recordPractice } = useProgressContext();
  const canvasRef = useRef<HandwritingCanvasRef>(null);
  const [currentStroke, setCurrentStroke] = useState(1);
  const [feedbacks, setFeedbacks] = useState<StrokeFeedback[]>([]);
  const strokeAnimation = useStrokeAnimation({ strokes: character?.strokes ?? [] });

  if (!character) notFound();

  const handleCheck = () => {
    const userStrokes = canvasRef.current?.getStrokes() ?? [];
    const result = scorePractice(userStrokes, character.strokes);

    setFeedbacks(result.strokeFeedbacks);

    const payload = {
      score: result.overallScore,
      strokesCompleted: result.strokesCompleted,
      totalStrokes: character.strokeCount,
      strokeFeedbacks: result.strokeFeedbacks,
    };
    sessionStorage.setItem(`practice-result-${id}`, JSON.stringify(payload));
    recordPractice(id, result.overallScore);
    router.push(`/practice/${id}/result`);
  };

  const handlePlay = () => {
    if (strokeAnimation.isComplete) {
      strokeAnimation.replay();
    } else {
      strokeAnimation.togglePlay();
    }
  };

  const playLabel = strokeAnimation.isComplete
    ? t("ចាក់ឡើងវិញ", "Replay")
    : strokeAnimation.isPlaying
      ? t("ផ្អាក", "Pause")
      : t("▶ Play Stroke", "▶ Play Stroke");

  const PlayButton = (
    <Button variant="secondary" className="mt-4 w-full" onClick={handlePlay}>
      {strokeAnimation.isComplete ? (
        <RotateCcw className="h-4 w-4" />
      ) : strokeAnimation.isPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      {playLabel}
    </Button>
  );

  return (
    <div>
      <p className="mb-2 text-xs tracking-wider text-gold uppercase md:block hidden">
        Draw
      </p>
      <h1 className="font-khmer-serif mb-1 text-2xl font-bold md:mb-2 md:text-3xl">
        {t("សូមសរសេរតាមលំដាប់ខ្សែ", "Write following stroke order")}
      </h1>
      <p className="mb-6 text-sm text-muted md:mb-8">
        {t(
          `គោលដៅ៖ ${character.character} • ${formatKhmerNumber(character.strokeCount)} ខ្សែ • សរសេរនៅក្នុងផ្ទៃណែនាំ`,
          `Goal: ${character.character} • ${character.strokeCount} strokes • Write in the guided area`,
        )}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <HandwritingCanvas
          ref={canvasRef}
          character={character}
          showGuide
          showStrokeIndicators
          strokeAnimation={strokeAnimation}
          showControls
          controlsLayout="compact"
          strokeFeedbacks={feedbacks}
          className="[&_.canvas-controls-wrapper]:lg:hidden"
          onStrokeComplete={(count) =>
            setCurrentStroke(Math.min(count + 1, character.strokeCount))
          }
        />

        <div className="hidden space-y-4 md:block">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-medium">
                {t(
                  `ខ្សែ ${formatKhmerNumber(currentStroke)} នៃ ${formatKhmerNumber(character.strokeCount)}`,
                  `Stroke ${currentStroke} of ${character.strokeCount}`,
                )}
              </h2>
            </div>
            <ProgressBar
              value={currentStroke - 1}
              max={character.strokeCount}
            />
            <p className="mt-2 text-xs text-muted">
              {t(
                `${formatKhmerNumber(currentStroke - 1)} ក្នុងចំណោម ${formatKhmerNumber(character.strokeCount)} ខ្សែត្រូវបានបញ្ចប់`,
                `${currentStroke - 1} of ${character.strokeCount} strokes completed`,
              )}
            </p>
          </Card>

          {character.strokes[currentStroke - 1] && (
            <Card padding="sm">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-surface">
                  {formatKhmerNumber(currentStroke)}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {t("ខ្សែទី", "Stroke")}{" "}
                    {formatKhmerNumber(currentStroke)}
                  </p>
                  <p className="text-xs text-muted">
                    {character.strokes[currentStroke - 1].directionKm}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Button variant="primary" glow className="w-full" onClick={handleCheck}>
            {t("ពិនិត្យការសរសេរ", "Check Writing")}
          </Button>
          <Link href={`/characters/${id}`}>
            <Button variant="ghost" className="w-full">
              {t("រំលង", "Skip")}
            </Button>
          </Link>
          {PlayButton}

          <Card padding="sm" className="border-gold/20">
            <p className="text-xs text-gold">{t("គន្លឹះ", "Tip")}:</p>
            <p className="mt-1 text-xs text-muted">
              {t(
                "ចុចឲ្យជាប់ ហើយអូសសរសេរតាមលំដាប់លំដោយ... ដើម្បីទទួលបានពិន្ទុត្រឹមត្រូវ។",
                "Press and drag to write in order for the best score.",
              )}
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-6 space-y-3 md:hidden">
        <Button variant="primary" glow className="w-full" size="lg" onClick={handleCheck}>
          {t("ពិនិត្យការសរសេរ", "Check Writing")}
        </Button>
        <Link href={`/characters/${id}`} className="block text-center text-sm text-muted">
          {t("រំលង", "Skip")}
        </Link>
        {PlayButton}
      </div>
    </div>
  );
}
