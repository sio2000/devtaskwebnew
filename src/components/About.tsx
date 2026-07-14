import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import logo from '../assets/logo.png';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = [
    { value: '50+', label: t.about.stats.projects },
    { value: '3+', label: t.about.stats.experience },
    { value: '24/7', label: t.about.stats.support },
  ];

  const label = language === 'el' ? 'Ποιοι είμαστε' : language === 'fr' ? 'Qui sommes-nous' : 'Who we are';

  return (
    <section id="about" className="surface-ink-2 relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Left — narrative */}
        <div>
          <SectionHeading index="03" label={label} title={t.about.title} />
          <Reveal delay={0.08}>
            <p className="font-editorial mt-6 text-2xl italic leading-snug text-iris-gradient">{t.about.subtitle}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">{t.about.description}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <h4 className="mt-12 mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.about.experience}</h4>
          </Reveal>
          <ul className="space-y-3">
            {t.about.experienceItems.map((item: string, i: number) => (
              <Reveal as="li" key={i} delay={0.24 + i * 0.06}>
                <div className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white/[0.015] px-5 py-4 transition-colors hover:border-iris/30 hover:bg-white/[0.03]">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-iris/40 bg-iris/10 text-iris-bright">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-paper">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Right — brand + stats plate */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="card-ink overflow-hidden p-8">
              <div className="flex items-center gap-4 border-b border-[var(--line)] pb-6">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                  <img src={logo} alt="DevTaskHub" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-paper">DevTaskHub</p>
                  <p className="text-sm text-paper-muted">Full-Stack Studio · Thessaloniki</p>
                </div>
              </div>

              <div className="mt-2 divide-y divide-[var(--line)]">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 py-6">
                    <span className="font-display text-5xl font-bold tabular-nums text-iris-gradient">{s.value}</span>
                    <span className="max-w-[48%] text-right text-sm font-medium leading-snug text-paper-dim">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
