'use client';

import { motion, useAnimationControls } from 'motion/react';
import { Fragment, useEffect, type ElementType } from 'react';
import { useIntroDone } from '@/lib/intro';
import { ease, inView } from '@/lib/motion';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Split into characters (words never break) or whole words */
  by?: 'char' | 'word';
  delay?: number;
  stagger?: number;
  /** Play when the intro finishes instead of on scroll-into-view */
  onLoad?: boolean;
  /** Wrap specific words in an accent style, e.g. ['risk', 'governance.'] */
  highlight?: string[];
};

const mask = 'inline-block overflow-hidden -mb-[0.12em] pb-[0.12em] -mt-[0.1em] pt-[0.1em] align-bottom';

const rise = {
  hidden: { y: '115%', rotate: 4 },
  shown: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: ease.out } },
};

/**
 * Staggered masked text reveal. Screen readers get the plain sentence; the split
 * copy is visual only. Same markup for every visitor (no hydration mismatch);
 * <MotionConfig reducedMotion="user"> makes the rise instant for reduced motion.
 *
 * `onLoad` pieces are server-rendered fully visible so they paint on the first
 * frame (under the intro curtain — good for LCP), then hidden and revealed as the
 * curtain lifts. With no intro, CSS keeps them hidden from the first frame instead.
 */
export function SplitText({ text, as: Tag = 'span', className, by = 'word', delay = 0, stagger, onLoad = false, highlight = [] }: Props) {
  const introDone = useIntroDone();
  const controls = useAnimationControls();
  const words = text.split(' ');

  useEffect(() => {
    if (!onLoad) return;
    controls.set('hidden');
    if (introDone) controls.start('shown');
  }, [onLoad, introDone, controls]);

  const trigger = onLoad
    ? { initial: false as const, animate: controls }
    : { initial: 'hidden', whileInView: 'shown', viewport: inView };

  const piece = (content: string, key: number, accent: string) => (
    <span key={key} className={mask}>
      <motion.span data-reveal-piece variants={rise} className={`inline-block origin-bottom-left ${accent}`}>
        {content}
      </motion.span>
    </span>
  );

  return (
    <Tag className={className} data-reveal-onload={onLoad || undefined}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        {...trigger}
        transition={{ staggerChildren: stagger ?? (by === 'char' ? 0.03 : 0.07), delayChildren: delay }}
      >
        {words.map((word, i) => {
          const accent = highlight.includes(word) ? 'text-accent-ink italic' : '';
          const space = i < words.length - 1 ? ' ' : '';
          return (
            <Fragment key={i}>
              {by === 'word' ? (
                piece(word, i, accent)
              ) : (
                <span className="inline-block whitespace-nowrap">{word.split('').map((ch, j) => piece(ch, j, accent))}</span>
              )}
              {space}
            </Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
