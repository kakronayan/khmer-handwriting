import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const iconsDir = path.join(root, "public", "icons");
const svgPath = path.join(iconsDir, "icon.svg");

async function main() {
  await mkdir(iconsDir, { recursive: true });
  const svg = await readFile(svgPath, "utf8");

  const { default: sharp } = await import("sharp");

  const sizes = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ] as const;

  for (const { name, size } of sizes) {
    await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(iconsDir, name));
    console.log(`Wrote ${name}`);
  }

  const favicon = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
  await writeFile(path.join(root, "public", "favicon.ico"), favicon);
  console.log("Wrote favicon.ico");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
