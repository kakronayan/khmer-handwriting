"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PronunciationButton } from "@/components/pronunciation/PronunciationButton";
import { useLanguage } from "@/hooks/useLanguage";
import type { RecognitionResponse } from "@/types";
import { Loader2 } from "lucide-react";

interface RecognitionResultsProps {
  result: RecognitionResponse | null;
  loading: boolean;
  error: string | null;
  onClear: () => void;
  onContinue: () => void;
}

export function RecognitionResults({
  result,
  loading,
  error,
  onClear,
  onContinue,
}: RecognitionResultsProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <Card className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <p className="mt-4 text-muted">{t("កំពុងស្គាល់...", "Recognizing...")}</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-400/30 py-12 text-center">
        <p className="text-red-400">{error}</p>
        <Button variant="secondary" className="mt-4" onClick={onClear}>
          {t("សាកម្តងទៀត", "Try again")}
        </Button>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="py-16 text-center text-muted">
        <p>{t("គូសអក្សរលើផ្ទៃ ហើយចុចស្គាល់", "Draw a character and tap recognize")}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card glow="primary" padding="lg">
        <div className="mb-4 flex items-start justify-between">
          <span className="text-sm text-muted">
            {t("យើងស្គាល់ថាជា", "We recognize it as")}
          </span>
          <Badge variant="success">{result.primary.confidence}%</Badge>
        </div>
        <div className="font-khmer-serif text-center text-8xl text-foreground">
          {result.primary.character}
        </div>
        <div className="mt-4 flex justify-center">
          <PronunciationButton
            characterId={result.primary.characterId}
            variant="compact"
          />
        </div>
      </Card>

      <div>
        <p className="mb-2 font-inter text-xs tracking-wider text-muted uppercase">
          {t("ជម្រើសផ្សេង", "Alternatives")}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {result.alternatives.map((alt) => (
            <Card key={alt.characterId} padding="sm" className="text-center">
              <div className="font-khmer-serif text-3xl">{alt.character}</div>
              <div className="mt-1 text-xs text-muted">{alt.confidence}%</div>
            </Card>
          ))}
          <Card padding="sm" className="flex items-center justify-center text-muted">
            ...
          </Card>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onClear}>
          {t("លុបចោល", "Clear")}
        </Button>
        <Button variant="primary" glow className="flex-1" onClick={onContinue}>
          {t("បន្តទៅមុខ", "Continue")}
        </Button>
      </div>
    </div>
  );
}
