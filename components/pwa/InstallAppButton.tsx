"use client";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { isAndroid, isIos } from "@/lib/pwa";
import { cn } from "@/lib/utils";
import { Download, Share, Smartphone } from "lucide-react";
import { useCallback } from "react";

interface InstallAppButtonProps {
  variant?: "icon" | "button";
  className?: string;
}

export function InstallAppButton({ variant = "button", className }: InstallAppButtonProps) {
  const { t } = useLanguage();
  const { canInstall, installed, promptInstall } = usePwaInstall();

  const showInstallHelp = useCallback(() => {
    if (isIos()) {
      window.alert(
        t(
          "ប៉ះប៊ូតុងចែករំលែក (Share) រួចជ្រើស Add to Home Screen ដើម្បីដំឡើងកម្មវិធី។",
          "Tap Share, then choose Add to Home Screen to install the app.",
        ),
      );
      return;
    }

    if (isAndroid()) {
      window.alert(
        t(
          "ប៉ះម៉ឺនុយ ⋮ រួចជ្រើស Install app ឬ Add to Home screen។",
          "Tap the menu ⋮, then choose Install app or Add to Home screen.",
        ),
      );
      return;
    }

    window.alert(
      t(
        "មើលរូបតូដំឡើង (⊕) នៅខាងស្តាំរបារអាសយដ្ឋាន ឬប្រើម៉ឺនុយ Chrome/Edge → Install app។",
        "Look for the install icon (⊕) in the address bar, or use Chrome/Edge menu → Install app.",
      ),
    );
  }, [t]);

  const handleClick = useCallback(async () => {
    if (canInstall) {
      const accepted = await promptInstall();
      if (!accepted) showInstallHelp();
      return;
    }

    showInstallHelp();
  }, [canInstall, promptInstall, showInstallHelp]);

  if (installed) return null;

  const label = t("ដំឡើងកម្មវិធី", "Install app");
  const Icon = isIos() ? Smartphone : Download;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => void handleClick()}
        className={cn(
          "font-battambang focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-muted hover:text-foreground",
          className,
        )}
        aria-label={label}
        title={label}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  if (canInstall) {
    return (
      <Button
        type="button"
        variant="primary"
        glow
        className={className}
        onClick={() => void handleClick()}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </Button>
    );
  }

  if (isIos()) {
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
    <div className={cn("rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm", className)}>
      <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </div>
      <p className="text-muted">
        {t(
          "បើកក្នុង Chrome ឬ Edge រួចមើលរូបតូដំឡើង (⊕) នៅរបារអាសយដ្ឋាន ឬប្រើម៉ឺនុយ → Install app។",
          "Open in Chrome or Edge, then look for the install icon (⊕) in the address bar or use menu → Install app.",
        )}
      </p>
    </div>
  );
}
