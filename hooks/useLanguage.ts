"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import type { Language } from "@/types";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (km: string, en: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "km",
  setLang: () => {},
  t: (km) => km,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

let langCache: Language = "km";
const langListeners = new Set<() => void>();

function subscribeLang(listener: () => void) {
  langListeners.add(listener);
  return () => langListeners.delete(listener);
}

function getLangSnapshot(): Language {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("khmer-handwriting-lang");
    if (stored === "en") langCache = "en";
    else if (stored === "km") langCache = "km";
  }
  return langCache;
}

function emitLang() {
  langListeners.forEach((l) => l());
}

export function useLanguageState(): LanguageContextValue {
  const lang = useSyncExternalStore<Language>(
    subscribeLang,
    getLangSnapshot,
    (): Language => "km",
  );

  const setLang = useCallback((value: Language) => {
    langCache = value;
    localStorage.setItem("khmer-handwriting-lang", value);
    emitLang();
  }, []);

  const t = useCallback(
    (km: string, en: string) => (lang === "km" ? km : en),
    [lang],
  );

  return { lang, setLang, t };
}
