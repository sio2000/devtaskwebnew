import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import Seo from './Seo';

const NotFound: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].meta.notFound;

  return (
    <section className="surface-ink flex min-h-[70vh] items-center justify-center px-5 py-24 text-center">
      <Seo title={t.title} noindex />
      <div>
        <p className="eyebrow-num">404</p>
        <h1 className="display-hero mt-4 text-[clamp(2.2rem,6vw,4.4rem)] text-paper">{t.heading}</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-paper-dim">{t.text}</p>
        <Link to="/" className="btn-accent group mt-9 px-7 py-4 text-base">
          {t.cta}
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
