'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

/** Drifts with page scroll at `speed` × the scroll distance (positive sinks behind, negative rises past). */
export function HeroParallax({ children, speed, className }: { children: ReactNode; speed: number; className?: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, v => v * speed);
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
