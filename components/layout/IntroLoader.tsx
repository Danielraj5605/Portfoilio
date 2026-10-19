'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { profile } from '@/content/profile';
import { finishIntro, introShouldPlay } from '@/lib/intro';
import { ease } from '@/lib/motion';

const HOLD_MS = 1500;

function Puff({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden>
      <g className="fill-[var(--cloud)]">
        <circle cx="120" cy="120" r="70" />
        <circle cx="210" cy="90" r="90" />
        <circle cx="300" cy="120" r="70" />
        <rect x="60" y="120" width="300" height="80" rx="40" />
      </g>
    </svg>
  );
}

/**
 * First-visit curtain: the sun rises, the name writes itself, then the clouds
 * part to reveal the meadow. Click or any key skips. Never shown for reduced motion.
 */
export function IntroLoader() {
  // Server-rendered so it covers the first frame; CSS hides it unless the boot script flagged
  // `data-intro="play"`. `skip` unmounts it outright for returning visits (no exit animation).
  const [mode, setMode] = useState<'pending' | 'play' | 'skip'>('pending');
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!introShouldPlay()) {
      setMode('skip');
      return;
    }
    setMode('play');
    document.documentElement.style.overflow = 'hidden';
    const close = () => setShow(false);
    const timer = window.setTimeout(close, HOLD_MS);
    window.addEventListener('keydown', close, { once: true });
    window.addEventListener('pointerdown', close, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', close);
      window.removeEventListener('pointerdown', close);
    };
  }, []);

  const done = () => {
    document.documentElement.style.overflow = '';
    finishIntro();
  };

  if (mode === 'skip') return null;

  return (
    <AnimatePresence onExitComplete={done}>
      {show && (
        <motion.div
          key="intro"
          role="status"
          aria-label={`Loading ${profile.fullName}'s portfolio`}
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.35 } }}
          className="intro-root fixed inset-0 z-[100] overflow-hidden"
        >
          <div className="day-only absolute inset-0 bg-[linear-gradient(180deg,#8ec5e8,#cfe7f3_60%,#f7e6c4)]" />
          <div className="night-only absolute inset-0 bg-[linear-gradient(180deg,#0d1a33,#27305a_60%,#5b4a78)]" />

          {/* Sun rises behind the name */}
          <motion.div
            initial={{ y: '40vh', scale: 0.7 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: ease.out }}
            className="absolute left-1/2 top-1/2 -ml-[min(35vw,220px)] -mt-[min(35vw,220px)] size-[min(70vw,440px)] rounded-full bg-[radial-gradient(closest-side,rgb(255_236_179/0.95),rgb(255_217_138/0.4)_50%,transparent)]"
          />

          <div className="relative grid h-full place-items-center px-6 text-center">
            <div>
              <p className="flex justify-center overflow-hidden pb-2 font-display text-[clamp(3rem,13vw,8rem)] font-semibold leading-none tracking-tight text-ink">
                {profile.name.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease: ease.out }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-muted"
              >
                {profile.focus.join(' · ')}
              </motion.p>
            </div>
          </div>

          {/* Clouds part to reveal the page */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-110%', transition: { duration: 1, ease: ease.inOut } }}
            className="absolute -left-[10%] bottom-[-6%] w-[75%]"
          >
            <Puff className="h-auto w-full" />
          </motion.div>
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '110%', transition: { duration: 1, ease: ease.inOut } }}
            className="absolute -right-[10%] bottom-[-10%] w-[80%]"
          >
            <Puff className="h-auto w-full -scale-x-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
