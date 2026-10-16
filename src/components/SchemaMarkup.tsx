import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from './Seo';

// Route-level JSON-LD. scripts/prerender-meta.mjs imports these same builders for the static
// HTML (tagged data-rh), and Helmet swaps those copies for identical ones on mount, so
// crawlers with and without JavaScript read the same data. The site-wide Organization graph
// lives in index.html.

/** Owner decision: only the city and the service area, never a street address. */
export const AREA_SERVED = [
  { '@type': 'City', name: 'Θεσσαλονίκη' },
  { '@type': 'AdministrativeArea', name: 'Κεντρική Μακεδονία' },
  { '@type': 'Country', name: 'Ελλάδα' },
];

type ServiceInput = {
  /** route path, e.g. "/services/web-development" */
  path: string;
  name: string;
  description: string;
  serviceType: string;
};

export const serviceJsonLd = ({ path, name, description, serviceType }: ServiceInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${path}#service`,
  name,
  description,
  serviceType,
  url: `${SITE_URL}${path}`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: AREA_SERVED,
});

export const breadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/** Only for questions that are visible on the same page. */
export const faqJsonLd = (items: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export const ServiceSchema: React.FC<ServiceInput> = (props) => <JsonLd data={serviceJsonLd(props)} />;

export const BreadcrumbSchema: React.FC<{ items: Array<{ name: string; url: string }> }> = ({ items }) => (
  <JsonLd data={breadcrumbJsonLd(items)} />
);

export const FAQSchema: React.FC<{ items: Array<{ q: string; a: string }> }> = ({ items }) => (
  <JsonLd data={faqJsonLd(items)} />
);
