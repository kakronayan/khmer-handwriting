"use client";

import { CharacterGrid } from "@/components/character/CharacterGrid";
import { Card } from "@/components/ui/Card";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { useLanguage } from "@/hooks/useLanguage";
import { formatKhmerNumber } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const categoryTabs = [
  { id: "consonant", labelKm: "ព្យញ្ជនៈ", labelEn: "Consonants" },
  { id: "vowel-full", labelKm: "ស្រៈពេញតួ", labelEn: "Full vowels" },
  { id: "vowel-dependent", labelKm: "ស្រៈនិស្ស័យ", labelEn: "Dependent vowels" },
  { id: "mark", labelKm: "ស្រ:បម្រុង", labelEn: "Subscript marks" },
  { id: "subscript", labelKm: "មានប៉ន្មានតួ", labelEn: "Subscript forms" },
];

const categoryIds = new Set(categoryTabs.map((tab) => tab.id));

const steps = [
  {
    num: 1,
    titleKm: "មើលទម្រង់",
    titleEn: "See Shape",
    descKm: "ស្គាល់រូបរាង និងទីតាំងខ្សែ",
    descEn: "Learn the shape and stroke placement",
  },
  {
    num: 2,
    titleKm: "មើលចលនា",
    titleEn: "Watch Motion",
    descKm: "មើលលំដាប់ខ្សែយឺតៗ",
    descEn: "Watch stroke order slowly",
  },
  {
    num: 3,
    titleKm: "សរសេរតាម",
    titleEn: "Write Along",
    descKm: "អនុវត្តសរសេរតាមណែនាំ",
    descEn: "Practice writing with guides",
  },
  {
    num: 4,
    titleKm: "ពិនិត្យ",
    titleEn: "Check",
    descKm: "ទទួលបានពិន្ទុ និងការកែ",
    descEn: "Get scores and feedback",
  },
];

function LearnPageContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("consonant");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categoryIds.has(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  return (
    <div>
      <p className="mb-2 text-xs tracking-wider text-gold uppercase">
        See → Watch → Draw
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t("រៀនអក្សរខ្មែរ តាមប្រភេទ", "Learn Khmer characters by category")}
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        {t(
          "ជ្រើសរើសមេរៀន ហើយរៀនពីទ្រង់ទ្រាយ សំឡេង និងលំដាប់ខ្សែ។",
          "Choose a lesson and learn shape, sound, and stroke order.",
        )}
      </p>

      <FilterTabs
        tabs={categoryTabs}
        activeId={activeCategory}
        onChange={setActiveCategory}
        lang={lang}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <Card key={step.num} padding="sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
              {formatKhmerNumber(step.num)}
            </div>
            <h3 className="font-medium">
              {t(step.titleKm, step.titleEn)}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {t(step.descKm, step.descEn)}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        {activeCategory === "consonant" ? (
          <CharacterGrid
            category="consonant"
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        ) : activeCategory === "vowel-full" ? (
          <CharacterGrid
            category="vowel"
            vowelType="full"
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        ) : activeCategory === "vowel-dependent" ? (
          <CharacterGrid
            category="vowel"
            vowelType="dependent"
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        ) : activeCategory === "mark" ? (
          <CharacterGrid
            category="mark"
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        ) : activeCategory === "subscript" ? (
          <CharacterGrid
            category="subscript"
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center text-muted">
            {t(
              "មេរៀននេះនឹងមកដល់ឆាប់ៗ",
              "Lessons for this category coming soon",
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense>
      <LearnPageContent />
    </Suspense>
  );
}
