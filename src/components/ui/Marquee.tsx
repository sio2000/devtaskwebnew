import React from 'react';

type MarqueeProps = {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

/** Infinite horizontal marquee. Content is duplicated; track loops on translateX(-50%). */
const Marquee: React.FC<MarqueeProps> = ({ children, duration = 42, reverse = false, pauseOnHover = true, className = '' }) => (
  <div className={`relative overflow-hidden mask-fade-x ${className}`}>
    <div
      className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${
        pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
      }`}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

export default Marquee;
