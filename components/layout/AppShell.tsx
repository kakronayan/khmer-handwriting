"use client";

import { InstallAppButton } from "@/components/pwa/InstallAppButton";
import { BottomNav } from "@/components/layout/BottomNav";
import { GlowBackground } from "@/components/layout/GlowBackground";
import { GridBackground } from "@/components/layout/GridBackground";
import { Header } from "@/components/layout/Header";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageContext, useLanguageState } from "@/hooks/useLanguage";
import { ThemeContext, useThemeState } from "@/hooks/useTheme";
import { registerServiceWorker } from "@/lib/pwa";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const language = useLanguageState();
  const theme = useThemeState();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("home-no-scroll", isHome);
    document.body.classList.toggle("home-no-scroll", isHome);
    return () => {
      document.documentElement.classList.remove("home-no-scroll");
      document.body.classList.remove("home-no-scroll");
    };
  }, [isHome]);

  return (
    <LanguageContext.Provider value={language}>
      <ThemeContext.Provider value={theme}>
        <ProgressProvider>
          <div
            className={cn(
              isHome && "flex h-dvh flex-col overflow-hidden",
            )}
          >
            <GlowBackground />
            <GridBackground />
            <Header />
            <main
              className={cn(
                "relative mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:px-6 md:pb-10",
                isHome
                  ? "min-h-0 flex-1 overflow-x-hidden overflow-y-auto md:overflow-hidden md:pt-4 md:pb-0"
                  : "min-h-[calc(100dvh-5rem)]",
              )}
            >
              <div className={cn(isHome && "h-full md:min-h-0")}>
                <div className="mb-4 flex items-center justify-end gap-2 md:hidden">
                  <InstallAppButton variant="icon" />
                  <ThemeToggle />
                </div>
                {children}
              </div>
            </main>
            <BottomNav />
          </div>
        </ProgressProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
