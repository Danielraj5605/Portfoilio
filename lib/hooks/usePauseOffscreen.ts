'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Sets `data-paused` on an element while it's off-screen; globals.css pauses
 * every CSS animation inside it. Keeps decorative loops from burning frames
 * where nobody can see them.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>, margin = '100px') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => (el.dataset.paused = String(!entry.isIntersecting)), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
}
