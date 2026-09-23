"use client";

import { InstallAppButton } from "@/components/pwa/InstallAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MessageCircleQuestion className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="font-khmer-serif mb-2 text-2xl font-bold md:text-3xl">
          {t("ជំនួយ", "Support")}
        </h1>
        <p className="text-sm text-muted md:text-base">
          {t(
            "មានសំណួរ ឬបញ្ហាក្នុងការប្រើប្រាស់កម្មវិធី?",
            "Questions or issues using the app?",
          )}
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <h2 className="font-khmer-serif mb-3 text-lg font-semibold">
            {t("ដំឡើងកម្មវិធី", "Install app")}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            {t(
              "ដំឡើងជាលើកដៃ ឬផ្ទាំងអេក្រង់ ដើម្បីបើកដោយផ្ទាល់ដូចកម្មវិធី។",
              "Install a shortcut on your phone or desktop to open the app directly.",
            )}
          </p>
          <InstallAppButton />
        </Card>

        <Card className="p-6">
          <h2 className="font-khmer-serif mb-2 text-lg font-semibold">
            {t("របៀបប្រើ", "How to use")}
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            {t(
              "ចាប់ផ្តើមនៅទំព័ររៀន មើលលំដាប់ខ្សែ បន្ទាប់មកអនុវត្តសរសេរលើ Canvas ហើយតាមដានដំណើរការរបស់អ្នកនៅទំព័រដំណើរការ។",
              "Start on the Learn page, review stroke order, practice writing on the canvas, and track your progress on the Progress page.",
            )}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-khmer-serif mb-2 text-lg font-semibold">
            {t("ទាក់ទង", "Contact")}
          </h2>
          <p className="mb-4 text-sm text-muted">
            {t(
              "បើអ្នករកឃើញកំហុស ឬមានគំនិតធ្វើឱ្យកម្មវិធីប្រសើរឡើង សូមប្រាប់យើង។",
              "If you find a bug or have ideas to improve the app, let us know.",
            )}
          </p>
          <a
            href="mailto:support@example.com"
            className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            support@example.com
          </a>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/learn">
          <Button variant="primary" glow>
            {t("ទៅទំព័ររៀន", "Go to Learn")}
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">{t("ត្រឡប់ទៅទំព័រដើម", "Back to Home")}</Button>
        </Link>
      </div>
    </div>
  );
}
