import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  progress?: number;
  orbColor?: "primary" | "gold" | "success";
}

export function StatCard({
  icon: Icon,
  value,
  label,
  progress,
  orbColor = "primary",
}: StatCardProps) {
  const orbColors = {
    primary: "bg-primary shadow-primary/50",
    gold: "bg-gold shadow-gold/50",
    success: "bg-emerald-400 shadow-emerald-400/50",
  };

  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute top-4 right-4 h-2 w-2 rounded-full shadow-lg ${orbColors[orbColor]}`}
        aria-hidden="true"
      />
      <Icon className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
      <div className="font-khmer-serif text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
      {progress !== undefined && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
}
