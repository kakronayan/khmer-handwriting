"use client";

import { cn } from "@/lib/utils";

export interface FilterTab {
  id: string;
  labelKm: string;
  labelEn: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeId: string;
  onChange: (id: string) => void;
  lang: "km" | "en";
}

export function FilterTabs({ tabs, activeId, onChange, lang }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter categories"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "focus-ring rounded-full px-5 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-surface"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-white",
            )}
          >
            {lang === "km" ? tab.labelKm : tab.labelEn}
          </button>
        );
      })}
    </div>
  );
}
