'use client';

import { useSyncExternalStore } from 'react';
import { INTRO_KEY } from './boot';

/**
 * Intro loader state. The <head> boot script sets `data-intro="play"` on first
 * visit; entrance animations gate on `useIntroDone()` so they start as it lifts.
 */
const listeners = new Set<() => void>();
let done: boolean | null = null;

const initial = () => {
  if (done === null) done = document.documentElement.dataset.intro !== 'play';
  return done;
};

export const introShouldPlay = () => !initial();

export function finishIntro() {
  if (initial()) return;
  done = true;
  delete document.documentElement.dataset.intro;
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    // Storage blocked — the intro plays again next visit.
  }
  listeners.forEach(l => l());
}

export function useIntroDone() {
  return useSyncExternalStore(
    cb => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    initial,
    () => false,
  );
}
