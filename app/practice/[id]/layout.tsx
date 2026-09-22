import { characters } from "@/data/characters";

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
