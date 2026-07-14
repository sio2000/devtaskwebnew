import React from 'react';

/** Slow-drifting aurora blobs — the ambient light behind dark sections. Purely decorative. */
const AuroraField: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    <div
      className="aurora-blob animate-aurora"
      style={{
        width: '44rem',
        height: '44rem',
        left: '-12rem',
        top: '-14rem',
        background: 'radial-gradient(circle, rgba(110,86,248,0.50), transparent 62%)',
      }}
    />
    <div
      className="aurora-blob animate-aurora"
      style={{
        width: '34rem',
        height: '34rem',
        right: '-8rem',
        top: '18%',
        background: 'radial-gradient(circle, rgba(52,228,234,0.26), transparent 62%)',
        animationDelay: '-6s',
      }}
    />
    <div
      className="aurora-blob animate-aurora"
      style={{
        width: '30rem',
        height: '30rem',
        left: '32%',
        bottom: '-12rem',
        background: 'radial-gradient(circle, rgba(139,120,255,0.34), transparent 62%)',
        animationDelay: '-12s',
      }}
    />
  </div>
);

export default AuroraField;
