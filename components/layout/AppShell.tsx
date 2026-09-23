"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { GlowBackground } from "@/components/layout/GlowBackground";
import { GridBackground } from "@/components/layout/GridBackground";
import { Header } from "@/components/layout/Header";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageContext, useLanguageState } from "@/hooks/useLanguage";
import { ThemeContext, useThemeState } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const language = useLanguageState();
  const theme = useThemeState();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <LanguageContext.Provider value={language}>
      <ThemeContext.Provider value={theme}>
        <ProgressProvider>
          <GlowBackground />
          <GridBackground />
          <Header />
          <main
            className={cn(
              "relative mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:px-6 md:pb-10",
              isHome
                ? "overflow-x-hidden max-md:min-h-[calc(100dvh-5rem)] max-md:overflow-y-auto md:h-[calc(100dvh-4rem)] md:overflow-hidden md:pt-4"
                : "min-h-[calc(100dvh-4rem)]",
            )}
          >
            <div className={cn(isHome && "md:h-full")}>
              <div className="mb-4 flex justify-end md:hidden">
                <ThemeToggle />
              </div>
              {children}
            </div>
          </main>
          <BottomNav />
        </ProgressProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
