export const locales = ['pt-br', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

export const htmlLang: Record<Locale, 'pt-BR' | 'en'> = { 'pt-br': 'pt-BR', en: 'en' };

type ContentKey = 'pt' | 'en';
const contentKeys: Record<Locale, ContentKey> = { 'pt-br': 'pt', en: 'en' };

export function contentKey(locale: Locale): ContentKey {
  return contentKeys[locale];
}

export function localize<T>(value: Record<ContentKey, T>, locale: Locale): T {
  return value[contentKey(locale)];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'pt-br' : 'en';
}

/** Prefixa o `base` do site (raiz ou subcaminho do GitHub Pages). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const homePath: Record<Locale, string> = { 'pt-br': '/', en: '/en/' };

export function projectPath(slug: string, locale: Locale): string {
  return locale === 'en' ? `/en/projects/${slug}/` : `/projetos/${slug}/`;
}
