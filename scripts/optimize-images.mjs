import sharp from 'sharp';
import { mkdir, stat, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public', 'images');

const originalsDir = path.join(publicDir, 'originals');
const optimizedOut = path.join(publicDir, 'optimized');

// Логотипы шапки/футера: рендерятся до 70px, поэтому 80 (1x) и 160 (2x).
const logoWidths = [80, 160];
const logoFiles = [
  { src: 'logo.png', out: 'logo' },
  { src: 'Logo_1.png', out: 'logo_1' },
];

/* Контентные изображения: единый источник правды — utils/optimized-images.json.
   Тот же манифест импортируется utils/img.ts для построения srcset,
   поэтому имена/ширины файлов гарантированно совпадают с разметкой. */
const manifest = JSON.parse(
  await readFile(path.join(root, 'utils', 'optimized-images.json'), 'utf8')
);

const QUALITY = { webp: 82, avif: 62 };

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

// Кэш по mtime: пересоздаём файл, только если оригинал новее результата.
async function isFresh(outFile, srcMtimeMs) {
  try {
    const s = await stat(outFile);
    return s.mtimeMs >= srcMtimeMs;
  } catch {
    return false;
  }
}

async function generateContentImages() {
  await ensureDir(optimizedOut);
  let made = 0;
  for (const [base, def] of Object.entries(manifest)) {
    const input = path.join(originalsDir, def.src);
    if (!existsSync(input)) {
      console.warn('Source not found, skipping:', def.src);
      continue;
    }
    const srcMtime = (await stat(input)).mtimeMs;
    const formats = def.formats ?? ['avif', 'webp'];
    for (const width of def.widths) {
      for (const fmt of formats) {
        const outFile = path.join(optimizedOut, `${base}-${width}.${fmt}`);
        if (await isFresh(outFile, srcMtime)) continue;
        const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
        if (fmt === 'webp') pipeline.webp({ quality: QUALITY.webp });
        else pipeline.avif({ quality: QUALITY.avif });
        await pipeline.toFile(outFile);
        console.log(`${base}-${width}.${fmt}`);
        made++;
      }
    }
  }
  return made;
}

/* Слайды презентации NANOECOVERM: PNG ~0.5–1.6 МБ каждый → WebP (~70–150 КБ).
   Слайды BIOGUMUS уже в WebP — их не трогаем. */
async function generatePresentationSlides() {
  const slidesIn = path.join(publicDir, 'presentations', 'nanoecoverm');
  const slidesOut = path.join(optimizedOut, 'presentations', 'nanoecoverm');
  if (!existsSync(slidesIn)) {
    console.warn('Presentation dir not found, skipping:', slidesIn);
    return 0;
  }
  await ensureDir(slidesOut);
  let made = 0;
  for (let n = 1; ; n++) {
    const input = path.join(slidesIn, `slide_${n}.png`);
    if (!existsSync(input)) break;
    const srcMtime = (await stat(input)).mtimeMs;
    const outFile = path.join(slidesOut, `slide_${n}.webp`);
    if (await isFresh(outFile, srcMtime)) continue;
    await sharp(input)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: QUALITY.webp })
      .toFile(outFile);
    console.log(`presentations/nanoecoverm/slide_${n}.webp`);
    made++;
  }
  return made;
}

async function generateLogos() {
  await ensureDir(optimizedOut);
  let made = 0;
  for (const { src, out } of logoFiles) {
    const input = path.join(originalsDir, src);
    if (!existsSync(input)) {
      console.warn('Logo source not found, skipping:', input);
      continue;
    }
    const srcMtime = (await stat(input)).mtimeMs;
    for (const width of logoWidths) {
      const outFile = path.join(optimizedOut, `${out}-${width}.webp`);
      if (await isFresh(outFile, srcMtime)) continue;
      await sharp(input)
        .resize(width, width, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(outFile);
      console.log(`${out}-${width}.webp`);
      made++;
    }
  }
  return made;
}

const counts = [];
counts.push(await generateLogos());
counts.push(await generateContentImages());
counts.push(await generatePresentationSlides());
const total = counts.reduce((a, b) => a + b, 0);
console.log(total ? `Image optimization complete: ${total} file(s) generated.` : 'Image optimization: everything up to date.');
