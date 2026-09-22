import { AppShell } from "@/components/layout/AppShell";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Khmer, Noto_Serif_Khmer } from "next/font/google";
import "./globals.css";

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-sans-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="km"
      className={`${notoSansKhmer.variable} ${notoSerifKhmer.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
