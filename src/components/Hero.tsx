import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, ArrowDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import WordReveal from './ui/WordReveal';
import Marquee from './ui/Marquee';
import MagneticButton from './ui/MagneticButton';
import SpinningBadge from './ui/SpinningBadge';
import AuroraField from './ui/AuroraField';

const SLIDE_INTERVAL = 6500;

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const raw = t.hero.slides;

  // CTA tied to each slide's identity (by original index): 0=websites, 1=mobile, 2=team
  const ctaByIndex: Record<number, { label: string; target: string }> = {
    0: { label: t.hero.websiteSamples, target: 'portfolio' },
    1: { label: 'iOS & Android', target: 'getfit-app-showcase' },
    2: { label: t.hero.cta, target: 'services' },
  };
  // Display order requested: team first, then mobile, then websites
  const displayOrder = raw.length >= 3 ? [2, 1, 0] : raw.map((_, i: number) => i);
  const slides = displayOrder.map((idx) => ({
    ...raw[idx],
    cta: ctaByIndex[idx] ?? { label: t.hero.cta, target: 'services' },
  }));

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [slides.length]);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const primary = slides[current].cta;

  const marqueeByLang: Record<string, string[]> = {
    el: ['Ιστοσελίδες', 'Mobile Εφαρμογές', 'Αυτοματισμοί', 'SEO', 'AI', 'E-shop', 'Android & iOS', 'Web Apps', 'UX/UI Design', 'Chatbots'],
    en: ['Websites', 'Mobile Apps', 'Automation', 'SEO', 'AI', 'E-shop', 'Android & iOS', 'Web Apps', 'UX/UI Design', 'Chatbots'],
    fr: ['Sites Web', 'Applications Mobiles', 'Automatisation', 'SEO', 'IA', 'E-shop', 'Android & iOS', 'Web Apps', 'Design UX/UI', 'Chatbots'],
  };
  const marqueeItems = marqueeByLang[language] ?? marqueeByLang.en;

  return (
    <section
      id="hero"
      className="surface-ink relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Ambient light */}
      {!isMobile ? (
        <AuroraField />
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: 'radial-gradient(120% 80% at 15% 0%, rgba(110,86,248,0.28), transparent 60%)' }}
        />
      )}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden="true" />
      {/* Bottom vignette to seat the marquee */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, var(--ink), transparent)' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 pb-10 sm:px-8 lg:pt-32">
        {/* Headline — rotates per slide */}
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              className="display-hero text-paper text-[clamp(2rem,7.2vw,6rem)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <WordReveal text={slides[current].title} triggerKey={current} />
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-paper-dim sm:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {slides[current].subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTAs + rotating badge */}
        <div className="mt-11 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton>
              <button
                onClick={() => scrollToSection(primary.target)}
                className="btn-accent group px-8 py-4 text-base"
              >
                <span>{primary.label}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-ghost group px-7 py-4 text-base"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>{t.hero.contact}</span>
              </button>
            </MagneticButton>
          </div>

          {!isMobile && (
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
              className="text-paper-dim transition-colors hover:text-paper"
              aria-label="Scroll"
            >
              <SpinningBadge size={132} className="text-paper-muted">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] bg-white/[0.03] backdrop-blur-sm">
                  <ArrowDown className="h-5 w-5 text-paper" />
                </span>
              </SpinningBadge>
            </button>
          )}
        </div>

        {/* Slide progress */}
        <div className="mt-10 flex items-center gap-4">
          <span className="eyebrow-num text-paper-muted">
            {String(current + 1).padStart(2, '0')} <span className="text-paper-muted/50">/ {String(slides.length).padStart(2, '0')}</span>
          </span>
          <div className="flex flex-1 max-w-[220px] gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === current}
                className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/12"
              >
                {i === current && (
                  <motion.span
                    key={`bar-${current}`}
                    className="absolute inset-0 origin-left rounded-full bg-paper"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee band */}
      <div className="relative z-10 border-t border-[var(--line)] py-5">
        <Marquee duration={38}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 text-sm font-medium uppercase tracking-[0.14em] text-paper-muted">
              {item}
              <span className="ml-6 h-1.5 w-1.5 rounded-full bg-iris" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
