/* Соответствие оригиналов из /images/originals/ их оптимизированным
   AVIF/WebP-вариантам в /images/optimized/. Единый источник правды —
   utils/optimized-images.json: его же читает scripts/optimize-images.mjs
   при генерации файлов, поэтому srcset всегда указывает на существующие файлы. */
import manifest from './optimized-images.json';

interface ManifestEntry {
  src: string;
  widths: number[];
  formats?: string[];
}

const MAP = manifest as Record<string, ManifestEntry>;

const MIME: Record<string, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
};

export interface ImgSource {
  type: string;
  srcSet: string;
}

/** Источники <picture> для оригинала; null — если оптимизированных версий нет
    (тогда Slot рендерит обычный <img> с оригиналом, как раньше). */
export function optimizedSources(src: string): ImgSource[] | null {
  const file = src.split('/').pop() || '';
  const base = file.replace(/\.(png|jpe?g)$/i, '');
  const entry = MAP[base];
  if (!entry || entry.src !== file) return null;
  const formats = entry.formats ?? ['avif', 'webp'];
  return formats.map((fmt) => ({
    type: MIME[fmt],
    srcSet: entry.widths
      .map((w) => `/images/optimized/${base}-${w}.${fmt} ${w}w`)
      .join(', '),
  }));
}
