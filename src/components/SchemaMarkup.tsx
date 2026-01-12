import React from 'react';
import { Helmet } from 'react-helmet';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = 'DevTaskHub',
  url = 'https://devtaskhub.com',
  logo = 'https://devtaskhub.com/assets/logo-ChYGESUI.png',
  email = 'info@devtaskhub.com',
  telephone = '+30 694 971 982 563',
  address = {
    addressLocality: 'Θεσσαλονίκη',
    addressRegion: 'Κεντρική Μακεδονία',
    addressCountry: 'GR',
  },
  sameAs = [
    'https://www.facebook.com/profile.php?id=61578746165941',
    'https://www.instagram.com/devtaskhub/',
    'https://www.tiktok.com/@devtaskhub',
  ],
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      email,
      areaServed: 'GR',
      availableLanguage: ['el', 'en', 'fr'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      addressCountry: address.addressCountry,
    },
    sameAs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  provider = 'DevTaskHub',
  areaServed = 'Θεσσαλονίκη, Ελλάδα',
  serviceType,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://devtaskhub.com',
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    ...(serviceType && { serviceType }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface LocalBusinessSchemaProps {
  name?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  priceRange?: string;
  openingHours?: string[];
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name = 'DevTaskHub',
  url = 'https://devtaskhub.com',
  telephone = '+30 694 971 982 563',
  email = 'info@devtaskhub.com',
  address = {
    addressLocality: 'Θεσσαλονίκη',
    addressRegion: 'Κεντρική Μακεδονία',
    addressCountry: 'GR',
  },
  priceRange = '$$',
  openingHours = ['Mo-Su 09:00-21:00'],
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      addressCountry: address.addressCountry,
    },
    priceRange,
    openingHours,
    areaServed: {
      '@type': 'City',
      name: 'Θεσσαλονίκη',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

