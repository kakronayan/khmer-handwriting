import { basePath } from "@/lib/base-path";

/** Prefix a public asset path with the GitHub Pages base path. */
export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
