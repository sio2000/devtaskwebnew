import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { appProjects, newSiteProjects } from '../../data/work';

export type HeroFocus = 'team' | 'mobile' | 'web';

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_INTERVAL = 4200;

const sites = newSiteProjects.map((p) => ({
  src: p.image,
  host: p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
}));
const screens = appProjects.map((a) => a.screens[0].src);

// widths (%) of the "code" bars, typed in one after the other
const codeLines = [
  [28, 44],
  [16, 52, 18],
  [16, 34],
  [40, 22],
];
const barColors = ['bg-iris-bright', 'bg-paper/50', 'bg-signal'];

type HeroVisualProps = {
  focus: HeroFocus;
};

/**
 * Hero motion graphic: a browser and a phone showing real, live work, plus a small
 * "build" card. The piece that matches the current headline steps forward.
 * Decorative only, transform/opacity animations, desktop only.
 */
const HeroVisual: React.FC<HeroVisualProps> = ({ focus }) => {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((p) => p + 1), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  const siteIndex = tick % sites.length;
  const screenIndex = tick % screens.length;

  const emphasis = (piece: HeroFocus) => ({
    scale: focus === piece ? 1.04 : 0.97,
    opacity: focus === piece ? 1 : 0.72,
  });

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[560px]" aria-hidden="true">
      {/* Glow behind the composition */}
      <div
        className="absolute inset-8 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(110,86,248,0.28), transparent 65%)' }}
      />

      {/* Browser */}
      <motion.div
        className="absolute left-0 top-6 w-[88%]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ y: 0, ...emphasis('web') }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: '30% 40%' }}
      >
        <div className="hero-drift overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-ink-800 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 flex flex-1 items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-paper-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <motion.span
                key={sites[siteIndex].host}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {sites[siteIndex].host}
              </motion.span>
            </span>
          </div>
          <div className="relative aspect-[16/10] bg-ink">
            {sites.map((site, i) => (
              <motion.img
                key={site.src}
                src={site.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
                initial={false}
                animate={{ opacity: i === siteIndex ? 1 : 0, scale: i === siteIndex ? 1 : 1.04 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        className="absolute bottom-0 right-0 w-[31%]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ y: 0, ...emphasis('mobile') }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        style={{ transformOrigin: '60% 70%' }}
      >
        <div className="hero-drift hero-drift-slow rounded-[1.7rem] border border-[var(--line-strong)] bg-ink p-1.5 shadow-[0_40px_80px_-30px_rgba(110,86,248,0.55)]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1.35rem] bg-ink">
            {screens.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
                initial={false}
                animate={{ opacity: i === screenIndex ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Build card */}
      <motion.div
        className="absolute bottom-8 left-[-3%] w-[44%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ y: 0, ...emphasis('team') }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        style={{ transformOrigin: '30% 80%' }}
      >
        <div className="hero-drift hero-drift-fast rounded-2xl border border-[var(--line-strong)] bg-[rgba(17,17,24,0.92)] p-4 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)] backdrop-blur-sm">
          <div key={tick} className="space-y-2.5">
            {codeLines.map((line, li) => (
              <div key={li} className="flex gap-1.5">
                {line.map((w, bi) => (
                  <motion.span
                    key={bi}
                    className={`h-1.5 origin-left rounded-full ${barColors[(li + bi) % barColors.length]}`}
                    style={{ width: `${w}%` }}
                    initial={reduced ? false : { scaleX: 0, opacity: 0.4 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.25 + li * 0.32 + bi * 0.12, ease: 'easeOut' }}
                  />
                ))}
              </div>
            ))}
          </div>
          <motion.div
            key={`ok-${tick}`}
            className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-3 text-[11px] font-medium text-paper"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.7, ease: 'easeOut' }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              <Check className="h-3 w-3" />
            </span>
            <span className="eyebrow-num !text-[10px] !tracking-[0.2em] !text-emerald-300">Live</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
