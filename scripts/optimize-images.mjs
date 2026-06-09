import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public', 'images');

const heroSource = path.join(publicDir, 'originals', 'doroga_trava_pole_1140666_3840x2160.webp');
const heroOut = path.join(publicDir, 'hero');
const optimizedOut = path.join(publicDir, 'optimized');

const heroWidths = [640, 1024, 1920];
const logoFiles = [
  { src: 'logo.webp', out: 'logo-48' },
  { src: 'logo_2.webp', out: 'logo2-48' },
];

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function generateHero() {
  if (!existsSync(heroSource)) {
    console.warn('Hero source not found, skipping:', heroSource);
    return;
  }
  await ensureDir(heroOut);
  for (const width of heroWidths) {
    const base = path.join(heroOut, `hero-${width}`);
    await sharp(heroSource)
      .resize(width, Math.round(width * 9 / 16), { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(`${base}.webp`);
    await sharp(heroSource)
      .resize(width, Math.round(width * 9 / 16), { fit: 'cover' })
      .avif({ quality: 65 })
      .toFile(`${base}.avif`);
    console.log(`hero-${width} (.webp + .avif)`);
  }
}

async function generateLogos() {
  await ensureDir(optimizedOut);
  for (const { src, out } of logoFiles) {
    const input = path.join(publicDir, 'originals', src);
    if (!existsSync(input)) continue;
    await sharp(input)
      .resize(96, 96, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.join(optimizedOut, `${out}.webp`));
    console.log(`${out}.webp`);
  }
}

await generateHero();
await generateLogos();
console.log('Image optimization complete.');
