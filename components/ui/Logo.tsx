import Link from "next/link";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="focus-ring flex items-center gap-3 rounded-lg"
      aria-label="សរសេរខ្មែរ — Khmer Handwriting"
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-surface glow-gold">
        <span className="font-khmer-serif text-lg text-gold">ក</span>
      </div>
      {!compact && (
        <div className="hidden sm:block">
          <div className="font-khmer-serif text-[1.75rem] leading-tight font-semibold text-foreground">
            សរសេរខ្មែរ
          </div>
          <div className="font-inter text-[10px] tracking-widest text-primary uppercase">
            Khmer Handwriting
          </div>
        </div>
      )}
    </Link>
  );
}
