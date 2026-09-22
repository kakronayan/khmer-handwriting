"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { GlowBackground } from "@/components/layout/GlowBackground";
import { Header } from "@/components/layout/Header";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { LanguageContext, useLanguageState } from "@/hooks/useLanguage";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const language = useLanguageState();

  return (
    <LanguageContext.Provider value={language}>
      <ProgressProvider>
        <GlowBackground />
        <Header />
        <main className="mx-auto min-h-[calc(100dvh-4rem)] max-w-7xl px-4 pt-6 pb-24 md:pb-10 md:px-6">
          {children}
        </main>
        <BottomNav />
      </ProgressProvider>
    </LanguageContext.Provider>
  );
}
