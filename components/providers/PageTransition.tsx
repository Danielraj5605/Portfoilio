'use client';

import { motion, useAnimationControls } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { ease } from '@/lib/motion';
import { useLenis } from './SmoothScroll';

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });

/** Scalloped cloud edge, drawn as one path so it scales cleanly to any width. */
function CloudEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`block h-[14vh] w-full ${flip ? 'rotate-180' : ''}`} aria-hidden>
      <path
        d="M0 120 V70 C 40 20, 110 20, 150 60 C 180 10, 270 0, 310 50 C 350 5, 440 10, 470 60 C 520 15, 600 15, 630 55 C 670 0, 770 5, 800 58 C 840 18, 920 18, 950 60 C 990 10, 1080 12, 1110 58 C 1140 30, 1180 40, 1200 60 V120 Z"
        className="fill-[var(--sky-2)]"
      />
    </svg>
  );
}

/**
 * Cloud-wipe page transitions: a bank of cloud rises to cover the screen, the
 * route changes underneath, then it lifts away. Transform only; skipped for
 * reduced motion, modified clicks and same-page hash links.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const controls = useAnimationControls();
  const pending = useRef<string | null>(null);

  const navigate = useCallback(
    async (href: string) => {
      const url = new URL(href, window.location.href);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || url.pathname === window.location.pathname) {
        router.push(href);
        return;
      }
      pending.current = href;
      await controls.start({ y: '-14vh', transition: { duration: 0.6, ease: ease.inOut } });
      router.push(href, { scroll: false });
    },
    [controls, router],
  );

  // Route changed under the clouds: jump to the right place, then lift the clouds.
  useEffect(() => {
    const href = pending.current;
    if (!href) return;
    pending.current = null;
    const hash = new URL(href, window.location.href).hash;
    // Let the new page lay out before measuring anchors.
    requestAnimationFrame(() => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target ?? 0, { immediate: true, force: true });
      } else if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
      import('@/lib/gsap').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
      controls
        .start({ y: '-130vh', transition: { duration: 0.8, ease: ease.inOut, delay: 0.1 } })
        .then(() => controls.set({ y: '100vh' }));
    });
  }, [pathname, controls, lenis]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        aria-hidden
        initial={{ y: '100vh' }}
        animate={controls}
        className="pointer-events-none fixed inset-x-0 top-0 z-[95] will-change-transform"
      >
        <CloudEdge />
        <div className="h-screen bg-[var(--sky-2)]" />
        <CloudEdge flip />
      </motion.div>
    </TransitionContext.Provider>
  );
}

/** next/link that plays the cloud wipe for page-to-page navigation. */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = useContext(TransitionContext);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
  return <Link href={href} onClick={handle} {...rest} />;
}
