'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { THEME_KEY } from './boot';

export type Theme = 'day' | 'night';
export const THEME_COLORS: Record<Theme, string> = { day: '#8ec5e8', night: '#0d1a33' };

const read = (): Theme => (document.documentElement.dataset.theme === 'night' ? 'night' : 'day');
const listeners = new Set<() => void>();

export function useTheme() {
  const theme = useSyncExternalStore(
    cb => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => 'day' as Theme,
  );

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked — applies for this visit only.
    }
    listeners.forEach(l => l());
  }, []);

  return { theme, toggle: () => setTheme(read() === 'day' ? 'night' : 'day') };
}
