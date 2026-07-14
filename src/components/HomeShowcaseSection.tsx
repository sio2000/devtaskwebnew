import React from 'react';
import { FaGem, FaBolt, FaBullseye, FaTools, FaRocket } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import MagneticButton from './ui/MagneticButton';

const HomeShowcaseSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const icons = [FaGem, FaBolt, FaBullseye, FaTools, FaRocket];
  const bullets = t.homeShowcase.bullets.map((text: string, i: number) => ({ text, Icon: icons[i] ?? FaGem }));

  const label = language === 'el' ? 'Γιατί DevTaskHub' : language === 'fr' ? 'Pourquoi DevTaskHub' : 'Why DevTaskHub';

  return (
    <section id="why" className="surface-ink-2 relative overflow-hidden py-24 md:py-32" aria-label={label}>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left — statement */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index="01" label={label} title={t.homeShowcase.title} />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper-dim">{t.homeShowcase.subtitle}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <MagneticButton>
              <a href="#portfolio" className="btn-accent group mt-9 px-7 py-4 text-base">
                {t.homeShowcase.cta}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Right — editorial index list */}
        <ul className="flex flex-col">
          {bullets.map(({ text, Icon }, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <div className="group flex items-start gap-5 border-t border-[var(--line)] py-6 transition-colors last:border-b hover:bg-white/[0.015]">
                <span className="eyebrow-num pt-1.5 text-paper-muted transition-colors group-hover:text-amber-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-white/[0.02] text-iris-bright transition-all duration-500 group-hover:border-iris/40 group-hover:bg-iris/10">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="flex-1 pt-1 text-lg font-medium leading-snug text-paper transition-transform duration-500 group-hover:translate-x-1">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeShowcaseSection;
