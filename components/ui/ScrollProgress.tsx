'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/** A little sun that travels across the top of the page as you scroll, trailing a warm line. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 180, damping: 36, restDelta: 0.001 });
  const sunX = useTransform(p, v => `calc(${v * 100}vw - ${v * 14}px)`);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-3.5">
      <motion.div style={{ scaleX: p }} className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-glow to-accent" />
      <motion.div
        style={{ x: sunX }}
        className="absolute left-0 top-[-3px] size-3.5 rounded-full bg-[radial-gradient(circle,#fff6d8,var(--glow)_55%,var(--accent))] shadow-[0_0_14px_var(--glow)]"
      />
    </div>
  );
}
