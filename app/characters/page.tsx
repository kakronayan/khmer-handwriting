"use client";

import { CharacterGrid } from "@/components/character/CharacterGrid";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SearchInput } from "@/components/ui/SearchInput";
import { characters } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { useMemo, useState } from "react";

const filterTabs = [
  { id: "all", labelKm: "ទាំងអស់", labelEn: "All" },
  { id: "consonant", labelKm: "ព្យញ្ជនៈ", labelEn: "Consonants" },
  { id: "vowel-full", labelKm: "ស្រៈពេញតួ", labelEn: "Full vowels" },
  { id: "vowel-dependent", labelKm: "ស្រៈនិស្ស័យ", labelEn: "Dependent vowels" },
  { id: "mark", labelKm: "ស្រ:បម្រុង", labelEn: "Subscript marks" },
];

export default function CharactersPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredIds = useMemo(() => {
    return characters
      .filter((c) => {
        if (filter === "vowel-full") {
          if (c.category !== "vowel" || c.vowelType !== "full") return false;
        } else if (filter === "vowel-dependent") {
          if (c.category !== "vowel" || c.vowelType !== "dependent") {
            return false;
          }
        } else if (filter !== "all" && c.category !== filter) {
          return false;
        }
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          c.character.includes(search) ||
          c.nameKm.includes(search) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.exampleWord.includes(search)
        );
      })
      .map((c) => c.id);
  }, [search, filter]);

  return (
    <div>
      <p className="mb-2 font-inter text-xs tracking-wider text-gold uppercase">
        Character Library
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t("បណ្ណាល័យអក្ខរខ្មែរ", "Khmer Character Library")}
      </h1>
      <p className="mb-8 max-w-2xl text-muted">
        {t(
          "ស្វែងរក និងរៀនព្យញ្ជនៈ ស្រៈ ជើងអក្សរ និងលេខខ្មែរ។",
          "Search and learn consonants, vowels, subscripts, and numbers.",
        )}
      </p>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={t("ស្វែងរកអក្សរ ឬពាក្យ...", "Search character or word...")}
        className="mb-6"
      />

      <FilterTabs
        tabs={filterTabs}
        activeId={filter}
        onChange={setFilter}
        lang={lang}
      />

      <div className="mt-8">
        {filteredIds.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-muted">
            {t("រកមិនឃើញអក្សរ", "No characters found")}
          </div>
        ) : (
          <CharacterGrid
            characterIds={filteredIds}
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        )}
      </div>
    </div>
  );
}
