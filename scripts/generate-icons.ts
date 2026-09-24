import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const iconsDir = path.join(root, "public", "icons");
const logoPath = path.join(iconsDir, "logo.png");

async function main() {
  await mkdir(iconsDir, { recursive: true });

  const { default: sharp } = await import("sharp");
  const logo = sharp(logoPath);

  const sizes = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ] as const;

  for (const { name, size } of sizes) {
    await logo.clone().resize(size, size).png().toFile(path.join(iconsDir, name));
    console.log(`Wrote ${name}`);
  }

  const maskableSize = 512;
  const innerSize = Math.round(maskableSize * 0.8);
  const padding = Math.round((maskableSize - innerSize) / 2);
  const resized = await logo.clone().resize(innerSize, innerSize).png().toBuffer();
  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: { r: 5, g: 10, b: 24, alpha: 1 },
    },
  })
    .composite([{ input: resized, top: padding, left: padding }])
    .png()
    .toFile(path.join(iconsDir, "icon-maskable-512.png"));
  console.log("Wrote icon-maskable-512.png");

  const favicon = await logo.clone().resize(32, 32).png().toBuffer();
  await writeFile(path.join(root, "public", "favicon.ico"), favicon);
  console.log("Wrote favicon.ico");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
