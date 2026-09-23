interface ProfileAvatarProps {
  "aria-label": string;
}

export function ProfileAvatar({ "aria-label": ariaLabel }: ProfileAvatarProps) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200/80 text-sm font-semibold text-amber-950"
      role="img"
      aria-label={ariaLabel}
    >
      K
    </div>
  );
}
