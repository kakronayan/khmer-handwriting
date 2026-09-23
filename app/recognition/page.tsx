"use client";

import {
  HandwritingCanvas,
  type HandwritingCanvasRef,
} from "@/components/canvas/HandwritingCanvas";
import { RecognitionResults } from "@/components/recognition/RecognitionResults";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { recognitionService } from "@/lib/recognition-service";
import type { RecognitionResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function RecognitionPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const canvasRef = useRef<HandwritingCanvasRef>(null);
  const [result, setResult] = useState<RecognitionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecognize = async () => {
    const imageData = canvasRef.current?.getImageData();
    if (!imageData) {
      setError(t("សូមគូសអក្សរមុន", "Please draw a character first"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await recognitionService.recognize(imageData);
      setResult(response);
    } catch {
      setError(t("មានបញ្ហាក្នុងការស្គាល់", "Recognition failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    setResult(null);
    setError(null);
  };

  const handleContinue = () => {
    if (result) {
      router.push(`/characters/${result.primary.characterId}`);
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs tracking-wider text-gold uppercase">
        Free Draw
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t("សរសេរអក្សរណាមួយ", "Write any character")}
      </h1>
      <p className="mb-8 max-w-xl text-muted">
        {t(
          "គូសអក្សរលើផ្ទៃ ហើយយើងនឹងស្គាល់វាសម្រាប់អ្នក។",
          "Draw on the canvas and we'll recognize it for you.",
        )}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <HandwritingCanvas
            ref={canvasRef}
            showGuide={false}
            showStrokeIndicators={false}
            circular
          />
          <Button
            variant="primary"
            glow
            className="mt-4 w-full md:w-auto"
            onClick={handleRecognize}
            disabled={loading}
          >
            {t("ស្គាល់អក្សរ", "Recognize")}
          </Button>
        </div>

        <RecognitionResults
          result={result}
          loading={loading}
          error={error}
          onClear={handleClear}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
