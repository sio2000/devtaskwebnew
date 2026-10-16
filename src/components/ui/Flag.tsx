// Inline SVG flags: emoji flags render as plain letters ("GR", "GB") on Windows.
const Flag = ({ code, className = '' }: { code: 'el' | 'en' | 'fr'; className?: string }) => {
  const cls = `inline-block flex-shrink-0 rounded-[3px] ring-1 ring-white/20 ${className}`;
  if (code === 'el')
    return (
      <svg viewBox="0 0 27 18" className={cls} aria-hidden="true">
        <rect width="27" height="18" fill="#0D5EAF" />
        <path d="M0 3h27M0 7h27M0 11h27M0 15h27" stroke="#fff" strokeWidth="2" />
        <rect width="10" height="10" fill="#0D5EAF" />
        <path d="M5 0v10M0 5h10" stroke="#fff" strokeWidth="2" />
      </svg>
    );
  if (code === 'en')
    return (
      <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={cls} aria-hidden="true">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 3 2" className={cls} aria-hidden="true">
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  );
};

export default Flag;
