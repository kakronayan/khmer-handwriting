import { assetPath } from "@/lib/asset-path";
import Link from "next/link";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="focus-ring flex items-center gap-3 rounded-lg"
      aria-label="រៀន និងសរសេរអក្សរខ្មែរ — Khmer Handwriting"
    >
      <img
        src={assetPath("/icons/logo.png")}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full"
        aria-hidden="true"
      />
      {!compact && (
        <div className="hidden sm:block">
          <div className="font-khmer-serif text-[1.75rem] leading-tight font-semibold text-foreground">
            រៀន និងសរសេរអក្សរខ្មែរ
          </div>
          <div className="font-inter text-[10px] tracking-widest text-primary uppercase">
            Khmer Handwriting
          </div>
        </div>
      )}
    </Link>
  );
}
