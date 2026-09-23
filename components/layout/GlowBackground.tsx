export function GlowBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/12 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-teal-400/10 blur-[80px]" />
    </div>
  );
}
