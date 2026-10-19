'use client';

import { useLayoutEffect, type DependencyList, type RefObject } from 'react';

type Gsap = typeof import('@/lib/gsap');
type Setup = (lib: Gsap, scope: HTMLElement) => void | (() => void);

let refreshQueued = false;

/**
 * Scenes load asynchronously and in any order, so a later pin (e.g. the hero's)
 * can shift sections whose triggers were already measured. Once per frame,
 * re-sort triggers into document order and re-measure them all.
 */
function scheduleRefresh(ScrollTrigger: Gsap['ScrollTrigger']) {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
}

/**
 * Builds a GSAP ScrollTrigger scene scoped to `scope`, loading GSAP on demand
 * so it never blocks first paint. Only runs when motion is allowed.
 *
 * Uses a *layout* effect on purpose: pinning wraps elements in a pin-spacer, and
 * layout-effect cleanups run before React removes DOM nodes — so the scene is
 * reverted (spacer unwrapped) before an unmount, avoiding `removeChild` errors
 * on page transitions.
 */
export function useScrollScene(scope: RefObject<HTMLElement | null>, setup: Setup, deps: DependencyList = []) {
  useLayoutEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    import('@/lib/gsap').then(lib => {
      const el = scope.current;
      if (cancelled || !el) return;
      const mm = lib.gsap.matchMedia(el);
      mm.add('(prefers-reduced-motion: no-preference)', () => setup(lib, el));
      revert = () => mm.revert();
      scheduleRefresh(lib.ScrollTrigger);
    });

    return () => {
      cancelled = true;
      revert?.();
    };
    // Callers pass explicit deps; `setup` is usually an inline closure.
  }, deps);
}
