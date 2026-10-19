'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ease } from '@/lib/motion';

type Props = { text: string | null; className?: string; tail?: 'left' | 'right' };

/**
 * Glassy speech bubble whose message swaps with a little pop.
 * Decorative (the same words exist in page content), so hidden from assistive tech.
 */
export function SpeechBubble({ text, className = '', tail = 'left' }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.45, ease: ease.out }}
            style={{ originX: tail === 'left' ? 0.15 : 0.85, originY: 1 }}
            className="glass relative whitespace-nowrap rounded-2xl px-4 py-2.5 font-display text-base font-medium text-ink shadow-[0_12px_30px_-12px_rgb(0_0_0/0.35)] md:text-lg"
          >
            {text}
            <span
              className={`glass absolute -bottom-[7px] size-3.5 rotate-45 border-l-0 border-t-0 ${tail === 'left' ? 'left-6' : 'right-6'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
