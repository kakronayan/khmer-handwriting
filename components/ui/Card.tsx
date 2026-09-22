import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "primary" | "gold" | "none";
  padding?: "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  glow = "none",
  padding = "md",
  ...props
}: CardProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  }[padding];

  const glowClass = {
    primary: "glow-primary border-primary/30",
    gold: "glow-gold border-gold/30",
    none: "",
  }[glow];

  return (
    <div
      className={cn(
        "glass-card rounded-2xl",
        paddingClass,
        glowClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
