"use client";

import { useProgressContext } from "@/components/providers/ProgressProvider";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Sparkles, Star, TrendingUp, Zap } from "lucide-react";

const dayLabels = ["ច", "អ", "ព", "ព្រ", "ស", "ស", "ថ"];

export default function ProgressPage() {
  const { t } = useLanguage();
  const { progress } = useProgressContext();

  const maxActivity = Math.max(...progress.weeklyActivity, 1);

  const achievements = [
    {
      icon: Star,
      titleKm: `អនុវត្ត ${progress.streakDays} ថ្ងៃ`,
      titleEn: `${progress.streakDays}-day practice streak`,
      descKm: "ជំនាញផ្តើមមានការរីកចម្រើន",
      descEn: "Starting skills are improving",
      orb: "gold" as const,
    },
    {
      icon: BookOpen,
      titleKm: `រៀនបាន ${progress.learnedCount} អក្សរ`,
      titleEn: `Learned ${progress.learnedCount} characters`,
      descKm: "ចំណេះដឹងកំពុងពង្រីក",
      descEn: "Knowledge is expanding",
      orb: "primary" as const,
    },
    {
      icon: Sparkles,
      titleKm: `ពិន្ទុលើស ${progress.averageScore}%`,
      titleEn: `Score over ${progress.averageScore}%`,
      descKm: "ភាពត្រឹមត្រូវខ្ពស់",
      descEn: "High accuracy",
      orb: "success" as const,
    },
  ];

  return (
    <div>
      <p className="mb-2 font-inter text-xs tracking-wider text-gold uppercase">
        Your Progress
      </p>
      <h1 className="font-khmer-serif mb-2 text-3xl font-bold md:text-4xl">
        {t("ការរីកចម្រើនរបស់អ្នក", "Your Progress")}
      </h1>
      <p className="mb-8 max-w-xl text-muted">
        {t(
          "បន្តអនុវត្តរាល់ថ្ងៃ ដើម្បីធ្វើឱ្យការសរសេរកាន់តែរលូន។",
          "Keep practicing daily to make your writing smoother.",
        )}
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={BookOpen}
          value={`${progress.learnedCount}/${progress.totalCharacters}`}
          label={t("អក្សរបានរៀន", "Characters learned")}
          progress={Math.round(
            (progress.learnedCount / progress.totalCharacters) * 100,
          )}
          orbColor="primary"
        />
        <StatCard
          icon={TrendingUp}
          value={`${progress.averageScore}%`}
          label={t("ពិន្ទុមធ្យម", "Average score")}
          progress={progress.averageScore}
          orbColor="primary"
        />
        <StatCard
          icon={Zap}
          value={t(`${progress.streakDays} ថ្ងៃ`, `${progress.streakDays} days`)}
          label={t("អនុវត្តជាប់គ្នា", "Practice streak")}
          orbColor="gold"
        />
      </div>

      <Card className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-medium">
            {t("សកម្មភាព ៧ ថ្ងៃ", "7-day activity")}
          </h2>
          <div className="flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t("ថ្ងៃមុន", "Previous days")}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-gold" />
              {t("ថ្ងៃនេះ", "Today")}
            </span>
          </div>
        </div>
        <div
          className="flex items-end justify-between gap-2"
          role="img"
          aria-label={t("ក្រាហ្វសកម្មភាព ៧ ថ្ងៃ", "7-day activity chart")}
        >
          {progress.weeklyActivity.map((value, i) => {
            const isToday = i === progress.weeklyActivity.length - 1;
            const height = `${(value / maxActivity) * 100}%`;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                      isToday ? "bg-gold" : "bg-primary/70"
                    }`}
                    style={{ height: height || "4px" }}
                  />
                </div>
                <span className="text-xs text-muted">{dayLabels[i]}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <section>
        <h2 className="mb-4 font-medium">{t("សមិទ្ធផល", "Achievements")}</h2>
        <div className="space-y-3">
          {achievements.map((item) => (
            <Card
              key={item.titleEn}
              padding="sm"
              className="flex items-center gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/5">
                <item.icon className="h-5 w-5 text-gold" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {t(item.titleKm, item.titleEn)}
                </p>
                <p className="text-sm text-muted">
                  {t(item.descKm, item.descEn)}
                </p>
              </div>
              <div
                className={`h-2 w-2 rounded-full ${
                  item.orb === "gold"
                    ? "bg-gold"
                    : item.orb === "success"
                      ? "bg-emerald-400"
                      : "bg-primary"
                }`}
                aria-hidden="true"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
