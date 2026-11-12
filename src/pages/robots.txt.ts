import type { APIRoute } from 'astro';
import { url } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\nDisallow: ${url('/dev/')}\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
