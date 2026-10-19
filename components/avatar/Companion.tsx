'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { AvatarAssets, Pose } from '@/lib/avatar';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { ease } from '@/lib/motion';
import { Avatar } from './Avatar';

export type Beat = { pose: Pose; line: string };

type Props = {
  assets: AvatarAssets;
  /** Section id → pose + speech line */
  beats: Record<string, Beat>;
  /** Shown when no section is active (e.g. case-study pages) */
  fallback?: Beat;
  /** Element whose presence on screen hides the companion (the hero avatar) */
  hideWhileVisible?: string;
};

/**
 * The avatar docks in the corner once the hero scrolls away and travels with you:
 * its pose and speech bubble change with the section in view. The bubble speaks
 * briefly on each change, then tucks away; hover or tap to hear it again.
 */
export function Companion({ assets, beats, fallback, hideWhileVisible }: Props) {
  const active = useActiveSection(Object.keys(beats));
  const [heroVisible, setHeroVisible] = useState(!!hideWhileVisible);
  const [talking, setTalking] = useState(false);

  useEffect(() => {
    if (!hideWhileVisible) return;
    const el = document.getElementById(hideWhileVisible);
    if (!el) return setHeroVisible(false);
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio > 0.35), { threshold: [0, 0.35, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, [hideWhileVisible]);

  const beat = (active && beats[active]) || fallback;
  const show = !heroVisible && !!beat;

  // Say the line for a few seconds on each new section, then tuck the bubble away so it
  // never sits over content. Hover (or tap) the avatar to hear it again.
  const speak = () => setTalking(true);
  useEffect(() => {
    if (!show) return;
    setTalking(true);
  }, [active, show]);
  useEffect(() => {
    if (!talking) return;
    const t = setTimeout(() => setTalking(false), 3500);
    return () => clearTimeout(t);
  }, [talking, active]);

  const line = beat && talking ? beat.line : null;

  return (
    <AnimatePresence>
      {show && (
        // Decorative: the lines echo each section's heading, so it's hidden from assistive tech.
        <motion.div
          key="companion"
          aria-hidden
          onClick={speak}
          onPointerEnter={speak}
          initial={{ opacity: 0, y: 60, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.6 }}
          transition={{ duration: 0.6, ease: ease.out }}
          style={{ originX: 1, originY: 1 }}
          className="fixed bottom-3 right-2 z-40 w-[68px] md:bottom-5 md:right-6 md:w-[128px]"
        >
          <Avatar assets={assets} pose={beat.pose} bubble={line} bubbleSide="left" sizes="128px" decorative />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
