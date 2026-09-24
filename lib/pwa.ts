import { basePath } from "@/lib/base-path";

export const PWA_SW_PATH = `${basePath}/sw.js`;
export const PWA_SCOPE = `${basePath}/`;

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register(PWA_SW_PATH, { scope: PWA_SCOPE });
  } catch {
    // Ignore registration errors in unsupported contexts.
  }
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isIos(): boolean {
  if (typeof navigator === "undefined") return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;

  return /Android/.test(navigator.userAgent);
}
