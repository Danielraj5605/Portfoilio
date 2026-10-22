/** A painterly cumulus: overlapping puffs with a soft underside shade. */
function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 130" className={className} aria-hidden>
      <g className="fill-[var(--cloud-shade)] transition-[fill] duration-1000">
        <ellipse cx="160" cy="100" rx="140" ry="26" />
      </g>
      <g className="fill-[var(--cloud)] transition-[fill] duration-1000">
        <circle cx="95" cy="80" r="38" />
        <circle cx="150" cy="58" r="52" />
        <circle cx="212" cy="72" r="42" />
        <circle cx="256" cy="88" r="28" />
        <ellipse cx="160" cy="94" rx="130" ry="22" />
      </g>
      <g className="fill-white/40 night:fill-white/5">
        <circle cx="138" cy="44" r="22" />
        <circle cx="200" cy="58" r="14" />
      </g>
    </svg>
  );
}

// top (vh), width (px), drift duration (s), start offset (fraction of a loop), opacity
const CLOUDS = [
  { top: 8, width: 300, duration: 140, offset: 0.1, opacity: 0.95 },
  { top: 20, width: 190, duration: 110, offset: 0.55, opacity: 0.8 },
  { top: 4, width: 150, duration: 170, offset: 0.8, opacity: 0.7 },
  { top: 30, width: 260, duration: 190, offset: 0.35, opacity: 0.6 },
  { top: 14, width: 120, duration: 90, offset: 0.25, opacity: 0.75 },
];

/** Clouds drift across the sky on long transform-only loops. */
export function Clouds() {
  return (
    <div className="absolute inset-0">
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute left-0 animate-drift will-change-transform night:opacity-50"
          style={{
            top: `${c.top}vh`,
            width: c.width,
            ['--drift-duration' as string]: `${c.duration}s`,
            animationDelay: `${-c.offset * c.duration}s`,
          }}
        >
          <div style={{ opacity: c.opacity }}>
            <Cloud className="h-auto w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
