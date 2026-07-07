/** NagrikSetu logo: a bridge (setu) under a saffron sun on green ground. */
export default function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill="#1F3A93" />
      <circle cx="32" cy="18" r="6" fill="var(--saffron)" />
      <path d="M10 46 Q32 24 54 46" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="8" y1="46" x2="56" y2="46" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <line x1="20" y1="38" x2="20" y2="46" stroke="#fff" strokeWidth="3" />
      <line x1="32" y1="35" x2="32" y2="46" stroke="#fff" strokeWidth="3" />
      <line x1="44" y1="38" x2="44" y2="46" stroke="#fff" strokeWidth="3" />
      <line x1="12" y1="54" x2="52" y2="54" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
