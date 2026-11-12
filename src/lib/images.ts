import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

/** Resolve um caminho relativo a src/assets/ (ex.: "projects/eco/cover.jpg"). */
export function asset(key: string): ImageMetadata {
  const entry = images[`../assets/${key}`];
  if (!entry) throw new Error(`Imagem não encontrada em src/assets/: ${key} (rode npm run media)`);
  return entry.default;
}

export function youtubeThumb(id: string): ImageMetadata {
  return asset(`youtube/${id}.jpg`);
}
