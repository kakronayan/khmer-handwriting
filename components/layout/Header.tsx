"use client";

import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", labelKm: "ទំព័រដើម", labelEn: "Home" },
  { href: "/learn", labelKm: "រៀន", labelEn: "Learn" },
  { href: "/practice/ka", labelKm: "អនុវត្ត", labelEn: "Practice" },
  { href: "/characters", labelKm: "អក្សរ", labelEn: "Characters" },
  { href: "/progress", labelKm: "ដំណើរការ", labelEn: "Progress" },
];

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/practice"))
      return pathname.startsWith("/practice") || pathname === "/recognition";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 hidden border-b border-foreground/5 bg-surface/80 backdrop-blur-md md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-lg px-4 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "font-medium text-primary"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(item.labelKm, item.labelEn)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="focus-ring flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted hover:text-foreground"
              aria-label={t("ជ្រើសរើសភាសា", "Select language")}
              aria-expanded={langOpen}
            >
              {lang === "km" ? "ខ្មែរ" : "EN"}
              <ChevronDown className="h-4 w-4" />
            </button>
            {langOpen && (
              <div className="glass-card absolute top-full right-0 mt-1 min-w-[100px] rounded-xl py-1">
                <button
                  className="focus-ring w-full px-4 py-2 text-left text-sm hover:bg-foreground/5"
                  onClick={() => {
                    setLang("km");
                    setLangOpen(false);
                  }}
                >
                  ខ្មែរ
                </button>
                <button
                  className="focus-ring w-full px-4 py-2 text-left text-sm hover:bg-foreground/5"
                  onClick={() => {
                    setLang("en");
                    setLangOpen(false);
                  }}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <button
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-muted hover:text-foreground"
            aria-label={t("ជំនួយ", "Help")}
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          <ProfileAvatar aria-label={t("រូបភាពប្រវត្តិ", "Profile avatar")} />
        </div>
      </div>
    </header>
  );
}
