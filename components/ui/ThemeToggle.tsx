"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-muted transition-colors hover:text-foreground",
        className,
      )}
      aria-label={
        isDark
          ? t("ប្តូរទៅរបៀបពន្លឺ", "Switch to light mode")
          : t("ប្តូរទៅរបៀបងងឹត", "Switch to dark mode")
      }
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
