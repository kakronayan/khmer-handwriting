import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "សរសេរខ្មែរ — Khmer Handwriting",
  description:
    "រៀនសរសេរអក្សរខ្មែរដោយជំហានងាយៗ — Learn Khmer handwriting step by step",
};

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("khmer-handwriting-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="km"
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
