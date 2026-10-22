'use client';

import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react';
import { useEffect, type RefObject } from 'react';

/**
 * Pointer position relative to an element's centre, normalised to roughly -1..1
 * (clamped), sprung for smoothness. Motion values only — never re-renders.
 * Stays at 0 for touch-only devices and reduced motion.
 */
export function usePointerTracking(ref: RefObject<HTMLElement | null>): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        rawX.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        rawY.set(clamp((e.clientY - (r.top + r.height * 0.35)) / (window.innerHeight / 2)));
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce, ref, rawX, rawY]);

  return { x, y };
}
