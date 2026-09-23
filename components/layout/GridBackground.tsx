import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";

export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[9] h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "h-full w-full",
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
    </div>
  );
}
