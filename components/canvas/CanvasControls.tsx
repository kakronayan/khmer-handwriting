"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { Redo2, Undo2 } from "lucide-react";

interface CanvasControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  strokeCount: number;
  totalStrokes?: number;
  layout?: "horizontal" | "compact";
}

export function CanvasControls({
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  strokeCount,
  totalStrokes,
  layout = "horizontal",
}: CanvasControlsProps) {
  const { t } = useLanguage();

  if (layout === "compact") {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white/10 disabled:opacity-40"
          aria-label={t("មិនធ្វើវិញ", "Undo")}
        >
          <Undo2 className="h-5 w-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white/10 disabled:opacity-40"
          aria-label={t("ធ្វើឡើងវិញ", "Redo")}
        >
          <Redo2 className="h-5 w-5" />
        </button>
        <button
          onClick={onClear}
          className="focus-ring rounded-full bg-white/10 px-4 py-2.5 text-sm"
          aria-label={t("សម្អាត", "Clear")}
        >
          {t("សម្អាត", "Clear")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {totalStrokes !== undefined && (
        <p className="text-sm text-muted">
          {t(
            `${strokeCount} ក្នុងចំណោម ${totalStrokes} ខ្សែ`,
            `${strokeCount} of ${totalStrokes} strokes drawn`,
          )}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label={t("មិនធ្វើវិញ", "Undo")}
        >
          <Undo2 className="h-4 w-4" />
          {t("មិនធ្វើវិញ", "Undo")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          aria-label={t("ធ្វើឡើងវិញ", "Redo")}
        >
          <Redo2 className="h-4 w-4" />
          {t("ធ្វើឡើងវិញ", "Redo")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onClear}
          aria-label={t("សម្អាត", "Clear canvas")}
        >
          {t("សម្អាត", "Clear")}
        </Button>
      </div>
    </div>
  );
}
