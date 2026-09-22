"use client";

import { RelatedCharacters } from "@/components/character/RelatedCharacters";
import { PronunciationButton } from "@/components/pronunciation/PronunciationButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCharacterById } from "@/data/characters";
import { useLanguage } from "@/hooks/useLanguage";
import { formatKhmerNumber } from "@/lib/utils";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const character = getCharacterById(id);
  const { t } = useLanguage();

  if (!character) notFound();

  return (
    <div>
      <p className="mb-2 text-sm text-gold">
        {t("ព្យញ្ជនៈ • វគ្គទី ១", "Consonants • Group 1")}
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {character.nameKm}
      </h1>
      <p className="mb-8 text-muted">
        {t("សំឡេង", "Sound")} {character.ipa} •{" "}
        {t("ដូចក្នុងពាក្យ", "as in")} {character.exampleWord}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-surface/60 glow-primary">
              <div className="absolute inset-4 rounded-full border border-gold/30" />
              {[
                { top: "4%", left: "50%", color: "bg-primary" },
                { top: "50%", left: "4%", color: "bg-gold" },
                { top: "50%", right: "4%", color: "bg-gold" },
                { bottom: "4%", left: "50%", color: "bg-primary" },
              ].map((dot, i) => (
                <div
                  key={i}
                  className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot.color}`}
                  style={{
                    top: dot.top,
                    left: dot.left,
                    right: dot.right,
                    bottom: dot.bottom,
                  }}
                  aria-hidden="true"
                />
              ))}
              <span className="font-khmer-serif text-[120px] leading-none text-white">
                {character.character}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="mb-3 flex items-center gap-2 text-primary">
              <PenLine className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-medium">{t("របៀបសរសេរ", "How to Write")}</h2>
            </div>
            <p className="mb-4 text-sm text-muted">
              {t(
                "ចាប់ផ្តើមពីខ្សែទី ១ ហើយបន្តតាមលំដាប់។",
                "Start with stroke 1 and follow the order.",
              )}
            </p>
            <div className="flex gap-3">
              {character.strokes.map((stroke, i) => (
                <div key={stroke.id} className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? "bg-primary text-surface"
                        : i === 1
                          ? "bg-gold text-surface"
                          : "bg-white/10 text-muted"
                    }`}
                  >
                    {formatKhmerNumber(stroke.id)}
                  </div>
                  {i < character.strokes.length - 1 && (
                    <div className="h-px w-4 bg-white/20" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 font-medium text-gold">
              {t("សំឡេង", "Sound")}
            </h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted">IPA</div>
                <div className="text-gold">{character.ipa}</div>
              </div>
              <div>
                <div className="text-xs text-muted">
                  {t("ប្រភេទ", "Class")}
                </div>
                <div>{t("ព្យញ្ជនៈ", "Consonant")}</div>
              </div>
              <div>
                <div className="text-xs text-muted">
                  {t("ឧទាហរណ៍", "Example")}
                </div>
                <div>{character.exampleWord}</div>
              </div>
            </div>
            <div className="mt-4">
              <PronunciationButton characterId={character.id} />
            </div>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Link href={`/characters/${character.id}/strokes`}>
              <Button variant="primary" glow>
                {t("មើលចលនាខ្សែ", "Watch Stroke Animation")}
              </Button>
            </Link>
            <Link href={`/practice/${character.id}`}>
              <Button variant="outline">
                {t("អនុវត្តសរសេរ", "Practice Writing")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RelatedCharacters characterId={character.id} />
      </div>
    </div>
  );
}
