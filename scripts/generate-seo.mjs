import { mkdirSync, writeFileSync } from 'node:fs';
import { buildSitemapXml, getCanonicalUrl } from '@micazoyolli/foundation';

const lastmod = '2026-07-16';
const siteUrl = 'https://snake.nadia.dev';
const canonical = getCanonicalUrl(siteUrl, '/', {
  rootTrailingSlash: true,
  trailingSlash: true,
});

mkdirSync('public', { recursive: true });
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n`);
writeFileSync(
  'public/sitemap.xml',
  buildSitemapXml([
    {
      changefreq: 'monthly',
      lastmod,
      loc: canonical,
      priority: '1.0',
    },
  ]),
);
