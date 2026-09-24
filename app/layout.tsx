import { AppShell } from "@/components/layout/AppShell";
import { assetPath } from "@/lib/asset-path";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "រៀន និងសរសេរអក្សរខ្មែរ — Khmer Handwriting",
  description:
    "រៀនសរសេរអក្សរខ្មែរដោយជំហានងាយៗ — Learn Khmer handwriting step by step",
  applicationName: "Khmer Handwriting",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "រៀន និងសរសេរអក្សរខ្មែរ",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: assetPath("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: assetPath("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: assetPath("/icons/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#050a18" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("khmer-handwriting-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

const pwaScript = `
(function () {
  window.__pwaInstallEvent = null;
  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    window.__pwaInstallEvent = event;
    window.dispatchEvent(new Event("pwa-install-available"));
  });
  window.addEventListener("appinstalled", function () {
    window.__pwaInstallEvent = null;
    window.dispatchEvent(new Event("pwa-installed"));
  });
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
        <script dangerouslySetInnerHTML={{ __html: pwaScript }} />
      </head>
      <body className="min-h-full font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
