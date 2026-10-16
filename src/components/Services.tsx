import React from 'react';
import { servicesData } from '../services/servicesData';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  FaGlobe, FaMobileAlt, FaRobot, FaUsers, FaVideo, FaSearch, FaPalette, FaDatabase, FaBrain, FaShoppingCart, FaGamepad,
} from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import SectionHeading from './ui/SectionHeading';

const iconMap: Record<string, React.ElementType> = {
  'web-development': FaGlobe,
  'mobile-app-development': FaMobileAlt,
  'chatbots-ai-agents': FaRobot,
  'social-media-management': FaUsers,
  'video-animation-production': FaVideo,
  'seo-website-optimization': FaSearch,
  'ux-ui-design': FaPalette,
  'database-cloud-infrastructure': FaDatabase,
  'ai-integration-applications': FaBrain,
  'ecommerce-development': FaShoppingCart,
  'game-development': FaGamepad,
};

type ServicesProps = {
  /** /services page: every service listed (no home filter), heading rendered as h1 */
  standalone?: boolean;
};

const Services: React.FC<ServicesProps> = ({ standalone = false }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();

  const hiddenOnHome = new Set([
    'ux-ui-design',
    'database-cloud-infrastructure',
    'social-media-management',
    'video-animation-production',
  ]);
  const filteredServices = servicesData.filter((service) => {
    if (standalone) return true;
    if (hiddenOnHome.has(service.slug)) return false;
    if (isMobile && (service.slug === 'ai-integration-applications' || service.slug === 'seo-website-optimization')) {
      return false;
    }
    return true;
  });

  const label = language === 'el' ? 'Τι κάνουμε' : language === 'fr' ? 'Ce que nous faisons' : 'What we do';

  return (
    <section id="services" className="surface-ink relative overflow-hidden py-16 md:py-32" aria-label={t.services.title}>
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 md:mb-16">
          <SectionHeading as={standalone ? 'h1' : 'h2'} index="02" label={label} title={t.services.title} kicker={language === 'el' ? 'από άκρη σε άκρη' : language === 'fr' ? 'de bout en bout' : 'end to end'} />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-dim md:mt-6 md:text-lg md:leading-relaxed">{t.services.subtitle}</p>
          </Reveal>
        </div>

        {isMobile ? (
          // Phones: one compact tappable list instead of tall cards, same titles, copy and links
          <Reveal>
            <ul className="card-ink divide-y divide-[var(--line)] overflow-hidden">
              {filteredServices.map((service) => {
                const Icon = iconMap[service.slug] ?? FaGlobe;
                return (
                  <li key={service.slug}>
                    <a
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-3.5 px-4 py-4 transition-colors active:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white shadow-[0_6px_18px_-8px_rgba(110,86,248,0.7)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[17px] font-semibold leading-snug text-paper">{service.title[language]}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-paper-dim">{service.shortDescription[language]}</span>
                      </span>
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-paper-muted" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, i) => {
            const Icon = iconMap[service.slug] ?? FaGlobe;
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <TiltCard max={6} className="h-full">
                  <a
                    href={`/services/${service.slug}`}
                    className="card-ink group flex h-full flex-col p-7"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-white/[0.02] text-iris-bright transition-all duration-500 group-hover:border-iris/40 group-hover:bg-iris/10 group-hover:text-paper">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="eyebrow-num text-paper-muted">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-paper">
                      {service.title[language]}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-paper-dim">
                      {service.shortDescription[language]}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-paper-dim transition-colors group-hover:text-iris-bright">
                      {t.services.more}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
};

export default Services;
