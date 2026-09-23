"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, Dumbbell, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", labelKm: "ទំព័រដើម", labelEn: "Home", icon: Home },
  { href: "/learn", labelKm: "រៀន", labelEn: "Learn", icon: BookOpen },
  {
    href: "/practice/ka",
    labelKm: "អនុវត្ត",
    labelEn: "Practice",
    icon: Dumbbell,
  },
  { href: "/progress", labelKm: "ដំណើរការ", labelEn: "Progress", icon: BarChart3 },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/practice"))
      return (
        pathname.startsWith("/practice") || pathname === "/recognition"
      );
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="font-battambang fixed right-0 bottom-0 left-0 z-50 border-t border-foreground/10 bg-surface/95 backdrop-blur-lg md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ href, labelKm, labelEn, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-battambang focus-ring flex min-h-[56px] min-w-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs transition-colors",
                active ? "text-primary" : "text-muted",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                  active && "bg-primary/15 glow-primary",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{t(labelKm, labelEn)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
