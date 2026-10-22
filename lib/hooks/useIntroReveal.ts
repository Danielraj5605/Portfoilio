'use client';

import { useAnimationControls } from 'motion/react';
import { useEffect } from 'react';
import { useIntroDone } from '@/lib/intro';
import { ease } from '@/lib/motion';

/**
 * Entrance for above-the-fold content that should paint on the very first frame
 * (under the intro curtain — keeps LCP fast) and then reveal as the curtain lifts.
 * With no intro, CSS (`[data-reveal-fade]`) hides it from the first frame instead.
 *
 * Spread the result onto a motion element.
 */
export function useIntroReveal(delay = 0) {
  const introDone = useIntroDone();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set({ opacity: 0, y: 24 });
    if (introDone) controls.start({ opacity: 1, y: 0, transition: { delay, duration: 0.9, ease: ease.out } });
  }, [introDone, controls, delay]);

  return { initial: false as const, animate: controls, 'data-reveal-fade': true };
}
