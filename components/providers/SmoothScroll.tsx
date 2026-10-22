'use client';

import type Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scrolling is off (reduced motion) or not yet loaded. */
export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger scenes and the
 * scroll position update in the same frame. Both load after first paint; skipped
 * entirely for reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import('lenis'), import('@/lib/gsap')]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      // Anchor offset comes from `scroll-padding-top` in globals.css, which Lenis already respects.
      const instance = new LenisCtor({ duration: 1.15, anchors: true, autoRaf: false });
      instance.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
