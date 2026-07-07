/** Decorative tricolor floral vine for the empty side margins on wide
 *  desktop screens. Purely ornamental — hidden from assistive tech. */
function FloralVine({ mirrored }: { mirrored: boolean }) {
  const blossoms: Array<[number, number]> = [
    [60, 40],
    [60, 190],
    [60, 320],
    [60, 450],
    [60, 590],
  ];

  return (
    <svg
      className="side-floral-art"
      viewBox="0 0 120 640"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M60 0 C18 55 102 115 60 175 C18 235 102 295 60 355 C18 415 102 475 60 535 C32 575 70 605 60 640"
        fill="none"
        stroke="var(--green)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <g fill="var(--green)" opacity="0.5">
        <ellipse cx="28" cy="65" rx="15" ry="7" transform="rotate(-35 28 65)" />
        <ellipse cx="94" cy="145" rx="15" ry="7" transform="rotate(35 94 145)" />
        <ellipse cx="26" cy="245" rx="15" ry="7" transform="rotate(-30 26 245)" />
        <ellipse cx="92" cy="360" rx="15" ry="7" transform="rotate(32 92 360)" />
        <ellipse cx="28" cy="415" rx="15" ry="7" transform="rotate(-35 28 415)" />
        <ellipse cx="88" cy="515" rx="13" ry="6" transform="rotate(30 88 515)" />
      </g>
      {blossoms.map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`} opacity="0.55">
          <circle cx="0" cy="-10" r="7" fill="var(--saffron)" />
          <circle cx="9" cy="-3" r="7" fill="var(--saffron)" />
          <circle cx="6" cy="8" r="7" fill="var(--saffron)" />
          <circle cx="-6" cy="8" r="7" fill="var(--saffron)" />
          <circle cx="-9" cy="-3" r="7" fill="var(--saffron)" />
          <circle cx="0" cy="0" r="4" fill="var(--navy)" />
        </g>
      ))}
    </svg>
  );
}

export default function SideFloral() {
  return (
    <>
      <div className="side-floral side-floral-left" aria-hidden="true">
        <FloralVine mirrored={false} />
      </div>
      <div className="side-floral side-floral-right" aria-hidden="true">
        <FloralVine mirrored />
      </div>
    </>
  );
}
