// Post-build step: writes one static HTML file per route into the build folder, each with its
// own <title>, description, canonical, Open Graph tags, JSON-LD and the route's real text.
//
// Why: the site is a client-rendered SPA. Crawlers that do not run JavaScript (AI crawlers,
// social previews, Bing at times) would otherwise see an empty page with the homepage head.
// The text goes inside <div id="root">; React's createRoot clears it on mount, so users see
// it only before the app loads. It is built from the SAME strings the app renders
// (translations.ts in Greek, work.ts, servicesData.ts), so it always matches the visible page.
//
// Usage: node scripts/prerender-meta.mjs [outDir]   (default: dist, used by the Netlify build)
// Routes must match src/App.tsx and public/sitemap.xml; the checks at the end enforce the sitemap.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, process.argv[2] ?? 'dist');
const SITE = 'https://devtaskhub.com';

// Bundles a source module and imports it from memory. npm packages (react, icons, helmet) become
// empty stubs and images empty modules: we only need the plain data and the JSON-LD builders.
async function load(file) {
  const { outputFiles } = await build({
    entryPoints: [resolve(root, file)],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'neutral',
    logLevel: 'error',
    loader: { '.png': 'empty', '.webp': 'empty', '.jpg': 'empty', '.jpeg': 'empty', '.svg': 'empty' },
    plugins: [{
      name: 'stub-packages',
      setup(b) {
        b.onResolve({ filter: /^[^./]/ }, (a) => (a.kind === 'entry-point' ? undefined : { path: a.path, namespace: 'stub' }));
        b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'module.exports = {}', loader: 'js' }));
      },
    }],
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`);
}

const [{ translations }, { siteProjects, appProjects }, { servicesData }, { legal }, schema] = await Promise.all([
  load('src/data/translations.ts'),
  load('src/data/work.ts'),
  load('src/services/servicesData.ts'),
  load('src/data/legal.ts'),
  load('src/components/SchemaMarkup.tsx'),
]);
const t = translations.el;
const L = 'el';

// slug, translations key, schema.org serviceType (as in App.tsx), page component
const services = [
  ['web-development', 'webDevelopment', 'Web Development', 'WebDevelopmentPage'],
  ['mobile-app-development', 'mobileAppDevelopment', 'Mobile App Development', 'MobileAppDevelopmentPage'],
  ['ecommerce-development', 'ecommerceDevelopment', 'E-commerce Development', 'EcommerceDevelopmentPage'],
  ['chatbots-ai-agents', 'chatbotsAIAgents', 'AI Chatbots', 'ChatbotsAIAgentsPage'],
  ['ai-integration-applications', 'aiIntegrationApplications', 'AI Integration', 'AIIntegrationApplicationsPage'],
  ['seo-website-optimization', 'seoWebsiteOptimization', 'SEO Services', 'SEOWebsiteOptimizationPage'],
  ['social-media-management', 'socialMediaManagement', 'Social Media Management', 'SocialMediaManagementPage'],
  ['video-animation-production', 'videoAnimationProduction', 'Video Production', 'VideoAnimationProductionPage'],
  ['ux-ui-design', 'uxUIDesign', 'UX/UI Design', 'UXUIDesignPage'],
  ['database-cloud-infrastructure', 'databaseCloudInfrastructure', 'Cloud Infrastructure', 'DatabaseCloudInfrastructurePage'],
  ['game-development', 'gameDevelopment', 'Game Development', 'GameDevelopmentPage'],
];

// ---------- HTML helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const ul = (items) => (items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '');
const p = (text) => (text ? `<p>${esc(text)}</p>` : '');
const withKicker = (title, kicker) => esc(title) + (kicker ? ` ${esc(kicker)}` : '');

const contactList = ul([
  `${esc(t.contact.form.phone)}: <a href="tel:+306971982563">${esc(t.contact.info.phone)}</a>`,
  `${esc(t.contact.form.email)}: <a href="mailto:${esc(t.contact.info.email)}">${esc(t.contact.info.email)}</a>`,
  esc(t.contact.info.location),
]);

const projectItem = (pr) => `<strong>${a(pr.url, pr.title[L])}</strong>: ${esc(pr.kind[L])}. ${esc(pr.description[L])}`;
const appItem = (app) => {
  const stores = [
    app.ios && a(app.ios, 'App Store'),
    app.android && a(app.android, 'Google Play'),
    app.web && a(app.web, app.web.replace(/^https?:\/\/(www\.)?|\/$/g, '')),
  ].filter(Boolean).join(', ');
  return `<strong>${esc(app.name)}</strong>: ${esc(app.tagline[L])} ${esc(app.description[L])} ${stores}`;
};
const appsSection = (title) => `<section><h2>${esc(title)}</h2>${ul(appProjects.map(appItem))}</section>`;

// Same chrome as Header.tsx (labels) and Footer.tsx (the five services it lists)
const header = `<header><p>${a('/', 'DevTaskHub')}: ${esc(t.nav.tagline)}</p><nav aria-label="Μενού">${[
  ['/', t.nav.home], ['/services', t.nav.services], ['/portfolio', t.nav.portfolio],
  ['/services/mobile-app-development', t.nav.mobileAppSamples], ['/contact', t.nav.contact],
].map(([h, l]) => a(h, l)).join('')}</nav></header>`;
const footerServices = ['web-development', 'mobile-app-development', 'ecommerce-development', 'chatbots-ai-agents', 'ai-integration-applications'];
const footer = `<footer><p><strong>DevTaskHub</strong>: ${esc(t.footer.description)}</p>`
  + `<p><strong>${esc(t.nav.services)}</strong></p>${ul([
    ...footerServices.map((slug) => a(`/services/${slug}`, t.footer.services[services.find((s) => s[0] === slug)[1]])),
    a('/portfolio', 'Portfolio'),
    a('/terms', t.footer.terms),
  ])}`
  + `<p><strong>${esc(t.nav.contact)}</strong></p>${contactList}`
  + `<p>${[
    ['https://www.facebook.com/profile.php?id=61594834146080', 'Facebook'], ['https://www.instagram.com/devtaskhub/', 'Instagram'],
    ['https://www.tiktok.com/@devtaskhub', 'TikTok'], ['https://www.youtube.com/@Devtaskhub', 'YouTube'],
  ].map(([h, l]) => a(h, l)).join(' · ')}</p>`
  + `<p>© DevTaskHub. ${esc(t.footer.rights)}</p></footer>`;

const breadcrumbNav = (crumbs) => `<nav aria-label="Breadcrumb"><ol>${crumbs
  .map((c, i) => `<li>${i === crumbs.length - 1 ? `<span aria-current="page">${esc(c.name)}</span>` : a(c.url.replace(SITE, ''), c.name)}</li>`)
  .join('')}</ol></nav>`;

// ---------- page bodies ----------
// Services.tsx hides these four on the home and /services grids
const hiddenOnHome = new Set(['ux-ui-design', 'database-cloud-infrastructure', 'social-media-management', 'video-animation-production']);
const servicesGrid = ul(servicesData
  .filter((s) => !hiddenOnHome.has(s.slug))
  .map((s) => `<strong>${a(`/services/${s.slug}`, s.title[L])}</strong>: ${esc(s.shortDescription[L])}`));
const servicesKicker = 'από άκρη σε άκρη'; // Services.tsx
const slides = [2, 1, 0].map((i) => t.hero.slides[i]); // Hero.tsx display order

const faqHtml = `<section><h2>${esc(t.faq.title)}</h2>${p(t.faq.subtitle)}${t.faq.items.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')}</section>`;

const homeBody = [
  `<h1>${esc(slides[0].title)}</h1>${p(slides[0].subtitle)}`,
  slides.slice(1).map((s) => `<p><strong>${esc(s.title)}</strong>. ${esc(s.subtitle)}</p>`).join(''),
  `<section><h2>${withKicker(t.process.title, t.process.kicker)}</h2>${p(t.process.subtitle)}<ol>${t.process.steps.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.text)}</li>`).join('')}</ol></section>`,
  `<section><h2>${withKicker(t.services.title, servicesKicker)}</h2>${p(t.services.subtitle)}${servicesGrid}</section>`,
  `<section><h2>${withKicker(t.portfolio.title, 'ζωντανά έργα')}</h2>${p(t.portfolio.subtitle)}${ul(siteProjects.slice(0, 9).map(projectItem))}<p>${a('/portfolio', 'Δες όλα τα έργα')}</p></section>`,
  appsSection(t.portfolio.appShowcase.title),
  `<section><h2>${esc(t.about.title)}</h2>${p(t.about.subtitle)}${p(t.about.description)}<h3>${esc(t.about.experience)}</h3>${ul(t.about.experienceItems.map(esc))}</section>`,
  faqHtml,
  `<section><h2>${withKicker(t.contact.title, 'σήμερα')}</h2>${p(t.contact.description)}${contactList}</section>`,
].join('');

// Service pages: render the sections and fields the page component actually reads, so the
// static text never includes copy the page does not show (checked against the component source).
const SKIP = new Set(['hero', 'buttons', 'stats', 'caseStudies', 'technologies', 'tools', 'samples', 'portfolio', 'uiSamples', 'logoTransformations', 'finalCta']);
const itemText = (it) => (typeof it === 'string'
  ? esc(it)
  : [it.title && `<strong>${esc(it.title)}</strong>`, esc(it.desc ?? it.description ?? it.text ?? '')].filter(Boolean).join(': '));

function serviceBody(key, component) {
  const src = readFileSync(resolve(root, `src/components/${component}.tsx`), 'utf8');
  const reads = (k, field) => new RegExp(`\\b${k}\\??\\.${field}\\b`).test(src);
  const pg = t.services.pages[key];
  const out = [`<h1>${esc(pg.hero.title)}</h1>${p(pg.hero.subtitle)}`];

  for (const [k, s] of Object.entries(pg)) {
    if (SKIP.has(k) || !s || typeof s.title !== 'string' || !reads(k, 'title')) continue;
    const items = [
      ...(reads(k, 'items') && Array.isArray(s.items) ? s.items : []),
      ...(reads(k, 'steps') && Array.isArray(s.steps) ? s.steps : []),
      ...(reads(k, 'cards') && s.cards ? Object.values(s.cards) : []),
    ].map(itemText).filter(Boolean);
    out.push(`<section><h2>${esc(s.title)}</h2>${reads(k, 'subtitle') ? p(s.subtitle) : ''}${reads(k, 'description') ? p(s.description) : ''}${ul(items)}</section>`);
  }

  if (key === 'webDevelopment' && src.includes('siteProjects')) out.push(`<section><h2>${esc(pg.samples.title)}</h2>${ul(siteProjects.map(projectItem))}</section>`);
  if (key === 'ecommerceDevelopment' && src.includes('siteProjects')) out.push(`<section><h2>${esc(pg.portfolio.title)}</h2>${ul(siteProjects.filter((x) => x.commerce).map(projectItem))}</section>`);
  if (key === 'mobileAppDevelopment' && src.includes('AppShowcases')) out.push(appsSection(pg.portfolio.title));
  if (pg.finalCta?.title && reads('finalCta', 'title')) {
    out.push(`<section><h2>${esc(pg.finalCta.title)}</h2>${pg.finalCta.subtitle ? p(pg.finalCta.subtitle) : ''}<p>${a('/contact', pg.finalCta.button ?? t.nav.contact)}</p></section>`);
  } else {
    out.push(`<p>${a('/contact', t.nav.contact)}</p>`);
  }
  return out.join('');
}

// ---------- routes ----------
const home = { name: t.nav.home, url: `${SITE}/` };
const crumbsFor = (...rest) => [home, ...rest];

const routes = [
  {
    path: '/', file: 'index.html', ...t.meta.home, body: homeBody,
    jsonLd: [schema.faqJsonLd(t.faq.items)],
  },
  {
    path: '/services', ...t.meta.services,
    crumbs: crumbsFor({ name: t.nav.services, url: `${SITE}/services` }),
    // the visible page has the grid heading only; here it is the page's h1
    body: `<h1>${withKicker(t.services.title, servicesKicker)}</h1>${p(t.services.subtitle)}${servicesGrid}`,
  },
  {
    path: '/portfolio', ...t.meta.portfolio,
    crumbs: crumbsFor({ name: 'Portfolio', url: `${SITE}/portfolio` }),
    body: `<h1>${withKicker(t.portfolio.title, 'ζωντανά έργα')}</h1>${p(t.portfolio.subtitle)}${ul(siteProjects.map(projectItem))}${appsSection(t.portfolio.appShowcase.title)}`,
  },
  {
    path: '/contact', ...t.meta.contact,
    crumbs: crumbsFor({ name: t.nav.contact, url: `${SITE}/contact` }),
    body: `<h1>${withKicker(t.contact.title, 'σήμερα')}</h1>${p(t.contact.description)}${contactList}<p>${a('/terms', t.footer.terms)}</p>`,
  },
  {
    path: '/terms', ...t.meta.terms,
    crumbs: crumbsFor({ name: t.footer.terms, url: `${SITE}/terms` }),
    body: `<h1>${esc(legal.el.title)}</h1>${p(legal.el.intro)}${ul(legal.el.sections.map((s) => esc(s.title)))}`,
  },
  ...services.map(([slug, key, serviceType, component]) => {
    const path = `/services/${slug}`;
    const name = t.footer.services[key];
    return {
      path, ...t.meta[key],
      crumbs: crumbsFor({ name: t.nav.services, url: `${SITE}/services` }, { name, url: SITE + path }),
      jsonLd: [schema.serviceJsonLd({ path, name, description: t.meta[key].description, serviceType })],
      body: serviceBody(key, component),
    };
  }),
  {
    // Served by public/_redirects for unknown URLs with a real 404 status (no soft 404s)
    path: null, file: '404.html', title: t.meta.notFound.title, description: t.meta.notFound.text, noindex: true,
    body: `<h1>${esc(t.meta.notFound.heading)}</h1>${p(t.meta.notFound.text)}<p>${a('/', t.meta.notFound.cta)}</p>`,
  },
];

// ---------- write ----------
function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-meta: could not find ${label} in ${dist}/index.html`);
  return html.replace(pattern, () => replacement);
}
const ldScript = (data) => `    <script type="application/ld+json" data-rh="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const base = readFileSync(resolve(dist, 'index.html'), 'utf8');
const written = [];

for (const route of routes) {
  const url = route.path === null ? null : SITE + route.path;
  const title = esc(route.title);
  const description = esc(route.description);
  let html = base;

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceOnce(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`, 'description');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`, 'og:description');
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`, 'twitter:title');
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`, 'twitter:description');
  if (url) {
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`, 'canonical');
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`, 'og:url');
  } else {
    html = replaceOnce(html, /\s*<link rel="canonical"[^>]*>/, '', 'canonical');
    html = replaceOnce(html, /\s*<meta property="og:url"[^>]*>/, '', 'og:url');
  }
  if (route.noindex) html = replaceOnce(html, /<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, follow"', 'robots');

  // Route JSON-LD, tagged data-rh: Helmet replaces it on mount with the same output (SchemaMarkup.tsx)
  const jsonLd = [...(route.crumbs ? [schema.breadcrumbJsonLd(route.crumbs)] : []), ...(route.jsonLd ?? [])];
  if (jsonLd.length) html = replaceOnce(html, /\s*<\/head>/, `\n${jsonLd.map(ldScript).join('\n')}\n  </head>`, '</head>');

  const main = `<main>${route.crumbs ? breadcrumbNav(route.crumbs) : ''}${route.body}</main>`;
  html = replaceOnce(html, /<!--prerender-->/, `<div class="pr">${header}${main}${footer}</div>`, '#root marker');

  const file = route.file ?? `${route.path.slice(1)}.html`;
  const out = resolve(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written.push({ route, file, html });
}

// ---------- self-checks: fail the build rather than ship a broken head ----------
const count = (html, re) => (html.match(re) ?? []).length;
for (const { route, file, html } of written) {
  const fail = (msg) => { throw new Error(`prerender-meta: ${file}: ${msg}`); };
  if (count(html, /<title>/g) !== 1) fail('expected one <title>');
  if (count(html, /<h1[\s>]/g) !== 1) fail('expected one <h1>');
  if (count(html, /rel="canonical"/g) !== (route.path === null ? 0 : 1)) fail('wrong number of canonicals');
  if (html.includes('<!--prerender-->')) fail('marker left in place');
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch (e) { fail(`invalid JSON-LD: ${e.message}`); }
  }
}
const sitemap = [...readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const routeUrls = routes.filter((r) => r.path !== null).map((r) => SITE + r.path);
for (const loc of sitemap) if (!routeUrls.includes(loc)) throw new Error(`prerender-meta: sitemap URL without a prerendered page: ${loc}`);
for (const u of routeUrls) if (!sitemap.includes(u)) throw new Error(`prerender-meta: route missing from public/sitemap.xml: ${u}`);

console.log(`prerender-meta: wrote ${written.length} files to ${dist}`);
