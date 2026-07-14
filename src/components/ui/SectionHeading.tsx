import React from 'react';
import Reveal from './Reveal';

type SectionHeadingProps = {
  index?: string;
  label: string;
  title: React.ReactNode;
  kicker?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
};

/** Numbered editorial section header: mono index · hairline · label, then a large display title. */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  kicker,
  align = 'left',
  className = '',
  titleClassName = '',
}) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      <Reveal className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : ''}`}>
        {index && <span className="eyebrow-num">{index}</span>}
        <span className="h-px w-8 bg-[var(--line-strong)]" />
        <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper-muted">{label}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className={`display-hero text-paper text-[clamp(2.1rem,5.6vw,4.4rem)] ${titleClassName}`}>
          {title}
          {kicker && <span className="font-editorial italic font-normal text-iris-gradient"> {kicker}</span>}
        </h2>
      </Reveal>
    </div>
  );
};

export default SectionHeading;
