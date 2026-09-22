import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "gold" | "success" | "muted";
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  const variants = {
    primary: "bg-primary/20 text-primary border-primary/30",
    gold: "bg-gold/20 text-gold border-gold/30",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    muted: "bg-white/5 text-muted border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
