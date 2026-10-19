import type { Variants } from 'motion/react';

/** Shared easing — mirrors --ease-out / --ease-in-out in globals.css. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
};

export const inView = { once: true, margin: '-12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.out } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Deterministic pseudo-random (mulberry32) so SSR and client render identical particles. */
export function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
