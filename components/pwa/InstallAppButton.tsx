"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { cn } from "@/lib/utils";
import { Download, Share, Smartphone } from "lucide-react";

interface InstallAppButtonProps {
  variant?: "icon" | "button";
  className?: string;
}

export function InstallAppButton({ variant = "button", className }: InstallAppButtonProps) {
  const { t } = useLanguage();
  const { canInstall, installed, iosDevice, promptInstall } = usePwaInstall();

  if (installed) return null;

  const label = t("ដំឡើងកម្មវិធី", "Install app");

  if (variant === "icon") {
    if (canInstall) {
      return (
        <button
          type="button"
          onClick={() => void promptInstall()}
          className={cn(
            "font-battambang focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-muted hover:text-foreground",
            className,
          )}
          aria-label={label}
          title={label}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
        </button>
      );
    }

    if (iosDevice) {
      return (
        <button
          type="button"
          onClick={() => {
            window.alert(
              t(
                "ប៉ះប៊ូតុងចែករំលែក (Share) រួចជ្រើស Add to Home Screen ដើម្បីដំឡើងកម្មវិធី។",
                "Tap Share, then choose Add to Home Screen to install the app.",
              ),
            );
          }}
          className={cn(
            "font-battambang focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-muted hover:text-foreground",
            className,
          )}
          aria-label={label}
          title={label}
        >
          <Smartphone className="h-5 w-5" aria-hidden="true" />
        </button>
      );
    }

    return null;
  }

  if (canInstall) {
    return (
      <Button
        type="button"
        variant="primary"
        glow
        className={className}
        onClick={() => void promptInstall()}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </Button>
    );
  }

  if (iosDevice) {
    return (
      <div className={cn("rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm", className)}>
        <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
          <Share className="h-4 w-4" aria-hidden="true" />
          {label}
        </div>
        <p className="text-muted">
          {t(
            "នៅ Safari ប៉ះប៊ូតុងចែករំលែក (Share) រួចជ្រើស Add to Home Screen។",
            "In Safari, tap Share, then choose Add to Home Screen.",
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-muted", className)}>
      {t(
        "បើកកម្មវិធីនេះក្នុង Chrome ឬ Edge រួចប្រើម៉ឺនុយដំឡើងកម្មវិធី។",
        "Open this app in Chrome or Edge, then use the browser install option.",
      )}
    </div>
  );
}
