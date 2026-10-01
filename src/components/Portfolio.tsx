import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { siteProjects } from '../data/work';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import SectionHeading from './ui/SectionHeading';
import AppShowcases from './AppShowcases';

const INITIAL_COUNT = 9;

type PortfolioProps = {
  /** standalone /portfolio page: every project visible, heading rendered as h1 */
  standalone?: boolean;
};

const copy = {
  el: { kicker: 'ζωντανά έργα', apps: 'Εφαρμογές Κινητών', more: 'Δες όλα τα έργα' },
  en: { kicker: 'live projects', apps: 'Mobile Apps', more: 'See all projects' },
  fr: { kicker: 'projets en ligne', apps: 'Applications Mobiles', more: 'Voir tous les projets' },
} as const;

const Portfolio: React.FC<PortfolioProps> = ({ standalone = false }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const c = copy[language];
  const [expanded, setExpanded] = useState(standalone);

  const visible = expanded ? siteProjects : siteProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="portfolio" className={`surface-ink relative overflow-hidden pb-24 md:pb-32 ${standalone ? 'pt-16' : 'pt-24 md:pt-32'}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as={standalone ? 'h1' : 'h2'}
          index="03"
          label="Portfolio"
          title={t.portfolio.title}
          kicker={c.kicker}
          align="center"
          className="mb-6"
        />
        <Reveal className="mb-14 text-center">
          <p className="mx-auto max-w-2xl text-lg text-paper-dim">{t.portfolio.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ key, image, tags, title, kind, description, url }, i) => (
            <Reveal key={key} delay={(i % 3) * 0.07}>
              <TiltCard max={5} className="h-full">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-ink group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={image}
                      alt={`${title[language]}: ${kind[language]}`}
                      width={1200}
                      height={750}
                      className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-45" />
                    <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper-muted">{kind[language]}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-paper transition-colors group-hover:text-iris-bright">{title[language]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-dim">{description[language]}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tech) => (
                          <span key={tech} className="tag-ink">{tech}</span>
                        ))}
                      </div>
                      <span className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-medium text-paper-dim transition-colors group-hover:text-iris-bright">
                        {t.portfolio.viewProject}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {!expanded && siteProjects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button onClick={() => setExpanded(true)} className="btn-ghost group px-7 py-3.5 text-base">
              {c.more} ({siteProjects.length})
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* ===================== Mobile app showcases ===================== */}
      <div id="getfit-app-showcase" className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-5 sm:px-8">
        <SectionHeading index="04" label={c.apps} title={t.portfolio.appShowcase.title} align="center" className="mb-14" />
        <AppShowcases />
      </div>
    </section>
  );
};

export default Portfolio;
