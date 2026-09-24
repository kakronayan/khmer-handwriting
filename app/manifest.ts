import { basePath } from "@/lib/base-path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${basePath}/`,
    name: "រៀន និងសរសេរអក្សរខ្មែរ — Khmer Handwriting",
    short_name: "Khmer Handwriting",
    description:
      "រៀនសរសេរអក្សរខ្មែរដោយជំហានងាយៗ — Learn Khmer handwriting step by step",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    display_override: ["standalone", "browser"],
    orientation: "portrait-primary",
    background_color: "#050a18",
    theme_color: "#0d9488",
    lang: "km",
    categories: ["education", "books"],
    prefer_related_applications: false,
    icons: [
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
        src: `${basePath}/icons/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
