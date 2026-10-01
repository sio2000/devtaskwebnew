import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://devtaskhub.com';

type SeoProps = {
  title: string;
  description?: string;
  /** route path, e.g. "/services/web-development". Omit for pages without a canonical (404, admin). */
  path?: string;
  noindex?: boolean;
};

/**
 * Per-route head tags. The static copies in index.html (and the prerendered
 * route files written by scripts/prerender-meta.mjs) carry data-rh="true",
 * so Helmet replaces them instead of adding duplicates.
 *
 * Optional tags live in their own <Helmet>: react-helmet-async ignores the whole
 * block when one of its children is a falsy value from a `cond && <tag />`.
 */
const Seo: React.FC<SeoProps> = ({ title, description, path, noindex = false }) => {
  const url = path !== undefined ? `${SITE_URL}${path}` : undefined;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="robots"
          content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
        />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Helmet>
      {description !== undefined && (
        <Helmet>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      )}
      {url !== undefined && (
        <Helmet>
          <link rel="canonical" href={url} />
          <meta property="og:url" content={url} />
        </Helmet>
      )}
    </>
  );
};

export default Seo;
