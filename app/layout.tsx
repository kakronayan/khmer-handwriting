import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { Battambang, Inter, Noto_Serif_Khmer } from "next/font/google";
import "./globals.css";

const battambang = Battambang({
  variable: "--font-battambang",
  subsets: ["khmer"],
  weight: ["100", "300", "400", "700", "900"],
});

const notoSerifKhmer = Noto_Serif_Khmer({
  variable: "--font-noto-serif-khmer",
  subsets: ["khmer"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      className={`${battambang.variable} ${notoSerifKhmer.variable} ${inter.variable} h-full`}
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
