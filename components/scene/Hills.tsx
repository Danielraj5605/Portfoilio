const fill = 'transition-[fill] duration-1000';

/** Tuft of grass blades that sways from its base. */
function Tuft({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 40 30"
      className={`absolute origin-bottom animate-sway ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <path d="M4 30 Q8 14 6 2 Q12 16 12 30 M14 30 Q18 10 22 0 Q20 16 22 30 M24 30 Q30 14 36 6 Q30 20 32 30" className={`fill-grass ${fill}`} />
    </svg>
  );
}

/**
 * Three rolling hill layers plus swaying grass. Each layer carries
 * `data-layer` so the hero's ScrollTrigger timeline can parallax it.
 */
export function Hills() {
  return (
    // Bottom mask: the meadow fades into mist instead of ending in a hard edge.
    <div
      data-hills
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[46svh] min-h-[260px] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]"
    >
      <div data-layer="far" className="absolute inset-x-0 bottom-[18%] h-[70%] will-change-transform">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="size-full">
          <path
            d="M0 220 C 180 120, 340 150, 520 170 C 700 190, 820 80, 1020 110 C 1200 140, 1320 190, 1440 150 L1440 320 L0 320 Z"
            className={`fill-hill-far ${fill}`}
          />
        </svg>
      </div>
      <div data-layer="mid" className="absolute inset-x-0 bottom-[6%] h-[62%] will-change-transform">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="size-full">
          <path
            d="M0 180 C 220 250, 380 110, 620 150 C 860 190, 980 260, 1180 200 C 1300 165, 1380 175, 1440 190 L1440 320 L0 320 Z"
            className={`fill-hill-mid ${fill}`}
          />
        </svg>
      </div>
      <div data-layer="near" className="absolute inset-x-0 -bottom-[2%] h-[48%] will-change-transform">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="size-full">
          <path
            d="M0 120 C 260 60, 520 180, 780 140 C 1040 100, 1220 40, 1440 90 L1440 320 L0 320 Z"
            className={`fill-hill-near ${fill}`}
          />
        </svg>
        <Tuft className="bottom-[62%] left-[6%] w-10" />
        <Tuft className="bottom-[52%] left-[22%] w-8" delay={-1.2} />
        <Tuft className="bottom-[58%] left-[48%] w-12" delay={-2.4} />
        <Tuft className="bottom-[66%] left-[71%] w-9" delay={-0.6} />
        <Tuft className="bottom-[72%] left-[90%] w-10" delay={-3.1} />
      </div>
    </div>
  );
}
