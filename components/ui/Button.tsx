import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-surface font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "border border-white/20 bg-transparent text-white hover:bg-white/5 disabled:opacity-50",
  danger:
    "bg-red-400/90 text-white hover:bg-red-400 disabled:opacity-50",
  outline:
    "border border-white/20 bg-transparent text-white hover:border-primary/50 hover:text-primary disabled:opacity-50",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200",
        variants[variant],
        sizes[size],
        glow && variant === "primary" && "glow-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
