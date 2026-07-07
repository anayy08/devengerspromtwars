/** Flat illustration: a citizen's complaint travelling across a bridge (setu)
 *  to a government office — drawn with the app's tricolor tokens. */
export default function CivicIllustration({ className = 'hero-art' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 190"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* sky sun */}
      <circle cx="236" cy="34" r="16" fill="var(--saffron)" opacity="0.9" />
      {/* government building */}
      <g>
        <rect x="168" y="86" width="92" height="64" rx="3" fill="rgba(255,255,255,0.08)" stroke="var(--navy)" strokeWidth="2" />
        <polygon points="164,86 264,86 214,58" fill="var(--navy)" />
        <rect x="206" y="112" width="16" height="38" rx="2" fill="var(--navy)" />
        <rect x="180" y="100" width="14" height="18" rx="2" fill="rgba(255,255,255,0.14)" stroke="var(--navy)" strokeWidth="1.5" />
        <rect x="234" y="100" width="14" height="18" rx="2" fill="rgba(255,255,255,0.14)" stroke="var(--navy)" strokeWidth="1.5" />
        {/* flag */}
        <line x1="214" y1="58" x2="214" y2="34" stroke="var(--ink)" strokeWidth="2" />
        <rect x="214" y="34" width="20" height="5" fill="var(--saffron)" />
        <rect x="214" y="39" width="20" height="5" fill="#fff" />
        <rect x="214" y="44" width="20" height="5" fill="var(--green)" />
      </g>
      {/* bridge */}
      <path d="M20 150 Q80 108 150 150" stroke="var(--navy)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="12" y1="150" x2="168" y2="150" stroke="var(--navy)" strokeWidth="4" strokeLinecap="round" />
      <line x1="48" y1="128" x2="48" y2="150" stroke="var(--navy)" strokeWidth="3" />
      <line x1="85" y1="122" x2="85" y2="150" stroke="var(--navy)" strokeWidth="3" />
      <line x1="122" y1="128" x2="122" y2="150" stroke="var(--navy)" strokeWidth="3" />
      {/* ground */}
      <line x1="8" y1="162" x2="272" y2="162" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      {/* citizen */}
      <g>
        <circle cx="34" cy="112" r="9" fill="var(--saffron)" />
        <rect x="26" y="123" width="16" height="22" rx="6" fill="var(--navy)" />
      </g>
      {/* letter travelling over the bridge */}
      <g transform="rotate(-8 85 96)">
        <rect x="70" y="86" width="30" height="21" rx="3" fill="rgba(255,255,255,0.12)" stroke="var(--saffron)" strokeWidth="2" />
        <polyline points="70,88 85,99 100,88" fill="none" stroke="var(--saffron)" strokeWidth="2" />
      </g>
      {/* motion dashes */}
      <line x1="52" y1="100" x2="62" y2="97" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" />
      <line x1="106" y1="92" x2="116" y2="89" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
