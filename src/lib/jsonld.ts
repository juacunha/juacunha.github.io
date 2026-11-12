import { localize, url, type Locale } from '../i18n';
import type { getProfile } from './content';

type Profile = Awaited<ReturnType<typeof getProfile>>;

export function personJsonLd(profile: Profile, locale: Locale, site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: localize(profile.label, locale),
    description: localize(profile.summary, locale),
    email: `mailto:${profile.email}`,
    telephone: profile.phone.href,
    url: site ? new URL(url('/'), site).href : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rio Grande',
      addressRegion: 'RS',
      addressCountry: 'BR',
    },
    sameAs: profile.profiles.map((p) => p.url),
    knowsLanguage: ['pt-BR', 'en'],
  };
}
