'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { PageTransitionProvider } from './PageTransition';
import { SmoothScroll } from './SmoothScroll';

export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user": Motion drops transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
