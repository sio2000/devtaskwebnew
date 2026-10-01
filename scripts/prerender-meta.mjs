// Post-build step: writes one static HTML file per route into dist/, each with its own
// <title>, description, canonical, Open Graph tags, JSON-LD and no-JS fallback content.
//
// Why: the site is a client-rendered SPA. Without this, every URL serves the homepage's
// head until JavaScript runs, so crawlers that do not execute JS (most AI crawlers, social
// previews, Bing at times) see the same title and description on every page.
//
// Texts come from src/data/translations.ts (Greek, the site's default language), so there is
// a single source of truth. Routes must match src/App.tsx and public/sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transformSync } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const SITE = 'https://devtaskhub.com';

// translations.ts has no imports, so a plain TS -> ESM transform is enough to load it
const tmp = resolve(dist, '.translations.tmp.mjs');
writeFileSync(tmp, transformSync(readFileSync(resolve(root, 'src/data/translations.ts'), 'utf8'), { loader: 'ts', format: 'esm' }).code);
const { translations } = await import(pathToFileURL(tmp).href);
rmSync(tmp);
const t = translations.el;

const services = [
  ['web-development', 'webDevelopment', 'Web Development'],
  ['mobile-app-development', 'mobileAppDevelopment', 'Mobile App Development'],
  ['ecommerce-development', 'ecommerceDevelopment', 'E-commerce Development'],
  ['chatbots-ai-agents', 'chatbotsAIAgents', 'AI Chatbots'],
  ['ai-integration-applications', 'aiIntegrationApplications', 'AI Integration'],
  ['seo-website-optimization', 'seoWebsiteOptimization', 'SEO Services'],
  ['social-media-management', 'socialMediaManagement', 'Social Media Management'],
  ['video-animation-production', 'videoAnimationProduction', 'Video Production'],
  ['ux-ui-design', 'uxUIDesign', 'UX/UI Design'],
  ['database-cloud-infrastructure', 'databaseCloudInfrastructure', 'Cloud Infrastructure'],
  ['game-development', 'gameDevelopment', 'Game Development'],
];

const routes = [
  { path: '/services', title: `${t.services.title} | DevTaskHub`, description: t.services.subtitle, crumbs: [t.nav.services] },
  { path: '/portfolio', title: t.meta.portfolio.title, description: t.meta.portfolio.description, crumbs: ['Portfolio'] },
  { path: '/contact', title: t.meta.contact.title, description: t.meta.contact.description, crumbs: [t.nav.contact] },
  { path: '/terms', title: t.meta.terms.title, description: t.meta.terms.description, crumbs: [t.footer.terms] },
  ...services.map(([slug, key, serviceType]) => ({
    path: `/services/${slug}`,
    title: t.meta[key].title,
    description: t.meta[key].description,
    crumbs: [t.nav.services, t.footer.services[key]],
    serviceType,
  })),
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: could not find ${label} in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

const base = readFileSync(resolve(dist, 'index.html'), 'utf8');

for (const route of routes) {
  const url = SITE + route.path;
  const title = esc(route.title);
  const description = esc(route.description);
  let html = base;

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceOnce(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`, 'description');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`, 'canonical');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`, 'og:description');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`, 'og:url');
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`, 'twitter:title');
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`, 'twitter:description');

  // The homepage FAQ schema only belongs on the homepage
  html = replaceOnce(html, /\s*<script type="application\/ld\+json" id="ld-faq">[\s\S]*?<\/script>/, '', 'FAQ JSON-LD');

  // Route-level JSON-LD. data-rh lets react-helmet-async replace these with its own at runtime.
  const crumbs = [{ name: t.nav.home, item: `${SITE}/` }];
  route.crumbs.forEach((name, i) => {
    const isLast = i === route.crumbs.length - 1;
    crumbs.push({ name, item: isLast ? url : `${SITE}/services` });
  });
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
    },
  ];
  if (route.serviceType) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.title,
      description: route.description,
      serviceType: route.serviceType,
      url,
      provider: { '@id': `${SITE}/#organization` },
      areaServed: { '@type': 'Country', name: 'Ελλάδα' },
    });
  }
  const jsonLd = graph
    .map((g) => `    <script type="application/ld+json" data-rh="true">${JSON.stringify(g).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  html = replaceOnce(html, /\s*<\/head>/, `\n${jsonLd}\n  </head>`, '</head>');

  // No-JS fallback: page-specific heading and intro
  html = replaceOnce(
    html,
    /<!--route-content-start-->[\s\S]*?<!--route-content-end-->/,
    `<header>\n        <h1>${esc(route.title.split(' | ')[0])}</h1>\n        <p>${description}</p>\n        <p><a href="/">DevTaskHub</a></p>\n      </header>`,
    'noscript route content'
  );

  const out = resolve(dist, `${route.path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

console.log(`prerender-meta: wrote ${routes.length} route files`);
