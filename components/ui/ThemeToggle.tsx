'use client';

import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useSyncExternalStore } from 'react';
import { useTheme } from '@/lib/theme';

const subscribeNoop = () => () => {};

/** Day ↔ night switch. The icon rolls like the sun/moon crossing the sky. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  // Avoid a server/client icon mismatch: render the icon only after hydration.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const night = theme === 'night';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={night ? 'Switch to day' : 'Switch to night'}
      aria-pressed={night}
      data-cursor="grow"
      className="glass grid size-11 place-items-center overflow-hidden rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={theme}
            initial={{ y: 22, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -22, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {night ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
