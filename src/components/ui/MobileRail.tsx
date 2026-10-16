import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

type MobileRailProps = {
  children: React.ReactNode;
  /** accessible name of the carousel, e.g. the section title */
  label: string;
  /** width of one slide; the rest of the screen shows a peek of the next one */
  itemClassName?: string;
  /** must cancel the page gutter so the row bleeds to the screen edge (default: px-4 pages) */
  edgeClassName?: string;
  className?: string;
};

const labels = {
  el: { prev: 'Προηγούμενο', next: 'Επόμενο', of: 'από' },
  en: { prev: 'Previous', next: 'Next', of: 'of' },
  fr: { prev: 'Précédent', next: 'Suivant', of: 'sur' },
} as const;

/** Phones: one horizontal swipe row (scroll snap, peek of the next card), with position dots and prev/next buttons. */
const MobileRail: React.FC<MobileRailProps> = ({
  children,
  label,
  itemClassName = 'w-[84%]',
  edgeClassName = '-mx-4 px-4 scroll-px-4',
  className = '',
}) => {
  const { language } = useLanguage();
  const l = labels[language];
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const items = React.Children.toArray(children);
  const count = items.length;

  const startOf = (el: HTMLDivElement, i: number) => {
    const child = el.children[i] as HTMLElement | undefined;
    return child ? child.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft) : 0;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      let best = 0;
      for (let i = 1; i < el.children.length; i++) {
        if (Math.abs(startOf(el, i) - el.scrollLeft) < Math.abs(startOf(el, best) - el.scrollLeft)) best = i;
      }
      // the last slides may never reach the start edge: treat "scrolled to the end" as the last one
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = el.children.length - 1;
      setIndex(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, i));
    el.scrollTo({ left: startOf(el, next), behavior: 'smooth' });
  }, [count]);

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-white/[0.04] text-paper transition-colors active:bg-iris/20 disabled:opacity-30';

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={ref}
        className={`relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${edgeClassName}`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} ${l.of} ${count}`}
            className={`flex-shrink-0 snap-start ${itemClassName}`}
          >
            {item}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={btn} onClick={() => go(index - 1)} disabled={index === 0} aria-label={l.prev}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          {count <= 8 ? (
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {items.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-paper' : 'w-1.5 bg-white/25'}`} />
              ))}
            </div>
          ) : (
            <span className="text-sm font-medium tabular-nums text-paper-dim" aria-live="polite">
              {index + 1} / {count}
            </span>
          )}
          <button type="button" className={btn} onClick={() => go(index + 1)} disabled={index === count - 1} aria-label={l.next}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileRail;
