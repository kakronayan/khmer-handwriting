import { basePath } from "@/lib/base-path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "សរសេរខ្មែរ — Khmer Handwriting",
    short_name: "សរសេរខ្មែរ",
    description:
      "រៀនសរសេរអក្សរខ្មែរដោយជំហានងាយៗ — Learn Khmer handwriting step by step",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#050a18",
    theme_color: "#0d9488",
    lang: "km",
    categories: ["education", "books"],
    icons: [
      {
        src: `${basePath}/icons/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
