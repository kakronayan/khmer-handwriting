"use client";

import { isStandalone } from "@/lib/pwa";
import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __pwaInstallEvent?: BeforeInstallPromptEvent | null;
  }
}

export function usePwaInstall() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    if (window.__pwaInstallEvent) {
      setInstallEvent(window.__pwaInstallEvent);
    }

    const onInstallAvailable = () => {
      if (window.__pwaInstallEvent) {
        setInstallEvent(window.__pwaInstallEvent);
      }
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("pwa-install-available", onInstallAvailable);
    window.addEventListener("pwa-installed", onInstalled);

    return () => {
      window.removeEventListener("pwa-install-available", onInstallAvailable);
      window.removeEventListener("pwa-installed", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const event = installEvent ?? window.__pwaInstallEvent ?? null;
    if (!event) return false;

    await event.prompt();
    const choice = await event.userChoice;

    if (choice.outcome === "accepted") {
      window.__pwaInstallEvent = null;
      setInstallEvent(null);
      setInstalled(true);
      return true;
    }

    return false;
  }, [installEvent]);

  return {
    canInstall: Boolean(installEvent ?? (typeof window !== "undefined" && window.__pwaInstallEvent)),
    installed,
    promptInstall,
  };
}
