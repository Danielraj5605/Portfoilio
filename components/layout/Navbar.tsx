'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { TransitionLink } from '@/components/providers/PageTransition';
import { useLenis } from '@/components/providers/SmoothScroll';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { profile } from '@/content/profile';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { ease } from '@/lib/motion';
import { navLinks } from './navLinks';

const ids = navLinks.map(l => l.id);

/** On the home page links scroll in place; elsewhere they travel home with the cloud transition. */
function NavLink({ id, children, className, onClick }: { id: string; children: ReactNode; className?: string; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const home = usePathname() === '/';
  if (home) {
    return (
      <a href={`#${id}`} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <TransitionLink href={`/#${id}`} onClick={onClick} className={className}>
      {children}
    </TransitionLink>
  );
}

export function Navbar() {
  const home = usePathname() === '/';
  const active = useActiveSection(home ? ids : []);
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Section to scroll to once the menu has closed and scrolling is unlocked.
  const pendingTarget = useRef<string | null>(null);

  // Hide while scrolling down, reveal on the way up.
  useMotionValueEvent(scrollY, 'change', v => {
    setScrolled(v > 24);
    setHidden(v > 400 && v > (scrollY.getPrevious() ?? 0) && !open);
  });

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false);
      if (e.key !== 'Tab' || !menu) return;
      const items = [buttonRef.current, ...menu.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      lenis?.start();
      const target = pendingTarget.current && document.getElementById(pendingTarget.current);
      pendingTarget.current = null;
      if (target) (lenis ? lenis.scrollTo(target) : target.scrollIntoView());
      else buttonRef.current?.focus();
    };
  }, [open, lenis]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="Main"
          className={`container-page flex h-14 items-center justify-between gap-4 rounded-full transition-[background-color,border-color,box-shadow] duration-500 md:h-16 ${
            scrolled || open ? 'glass shadow-[0_10px_40px_-20px_rgb(0_0_0/0.4)]' : 'border border-transparent'
          }`}
        >
          <TransitionLink href="/" className="group flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            <span aria-hidden className="grid size-8 place-items-center rounded-full bg-accent text-sm text-on-accent transition-transform duration-500 group-hover:rotate-[360deg]">
              D
            </span>
            {profile.name}
          </TransitionLink>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(l => {
              const isActive = active === l.id;
              return (
                <li key={l.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]"
                    />
                  )}
                  <NavLink
                    id={l.id}
                    className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-muted'}`}
                  >
                    <span aria-current={isActive ? 'location' : undefined}>{l.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="glass relative grid size-11 place-items-center rounded-full md:hidden"
            >
              <span className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: ease.out }}
            className="glass fixed inset-x-3 top-20 z-40 rounded-card p-6 md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                  <NavLink
                    id={l.id}
                    onClick={e => {
                      if (home) {
                        // Lenis is paused while the menu is open — scroll after it closes.
                        e.preventDefault();
                        pendingTarget.current = l.id;
                      }
                      setOpen(false);
                    }}
                    className="flex items-baseline gap-3 rounded-xl px-2 py-2.5 font-display text-3xl font-semibold tracking-tight active:bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]"
                  >
                    <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${profile.email}`} className="mt-5 block rounded-full bg-accent px-5 py-3 text-center font-semibold text-on-accent">
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
