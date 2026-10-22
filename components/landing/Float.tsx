'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** Endless gentle bob; `delay` offsets neighbours so they never move in lockstep. */
export function Float({ children, delay = 0, distance = 12 }: { children: ReactNode; delay?: number; distance?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration: 5 + delay * 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
