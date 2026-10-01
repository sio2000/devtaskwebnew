import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, MessageSquare, PenTool, Code2, Rocket, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import MagneticButton from './ui/MagneticButton';

const icons: LucideIcon[] = [MessageSquare, PenTool, Code2, Rocket];

type Step = { title: string; text: string };

/** One step of the timeline. Its node lights up when the step reaches the middle of the screen. */
const ProcessStep: React.FC<{ step: Step; index: number; Icon: LucideIcon }> = ({ step, index, Icon }) => {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const seen = useInView(ref, { once: true, margin: '-25% 0px' });

  return (
    <li ref={ref} className="relative pb-12 pl-20 last:pb-0">
      <span
        className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-500 ${
          seen ? 'border-iris/50 bg-iris/15 text-paper' : 'border-[var(--line)] bg-ink-800 text-paper-muted'
        }`}
      >
        {active && <span className="step-ring absolute inset-0 rounded-2xl border border-iris" aria-hidden="true" />}
        <Icon className="h-6 w-6" />
      </span>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={seen ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow-num">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="mt-1.5 font-display text-2xl font-semibold text-paper">{step.title}</h3>
        <p className="mt-2 max-w-md text-[17px] leading-relaxed text-paper-dim">{step.text}</p>
      </motion.div>
    </li>
  );
};

const HomeShowcaseSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const listRef = useRef<HTMLOListElement>(null);

  // The connector line fills as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="why" className="surface-ink-2 relative overflow-hidden py-24 md:py-32" aria-label={t.process.label}>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left: statement */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index="01" label={t.process.label} title={t.process.title} kicker={t.process.kicker} />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper-dim">{t.process.subtitle}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <MagneticButton>
              <a href="#portfolio" className="btn-accent group mt-9 px-7 py-4 text-base">
                {t.process.cta}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Right: animated timeline */}
        <ol ref={listRef} className="relative">
          <span className="absolute bottom-6 left-[27px] top-2 w-px bg-[var(--line)]" aria-hidden="true" />
          <motion.span
            className="absolute bottom-6 left-[27px] top-2 w-px origin-top bg-gradient-to-b from-iris-bright to-signal"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          {t.process.steps.map((step: Step, i: number) => (
            <ProcessStep key={step.title} step={step} index={i} Icon={icons[i] ?? Rocket} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HomeShowcaseSection;
