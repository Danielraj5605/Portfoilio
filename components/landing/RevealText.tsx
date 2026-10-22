'use client';

import { motion, type Variants } from 'motion/react';
import type { CSSProperties } from 'react';

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const word = (duration: number): Variants => ({
  hidden: { y: '115%', rotate: 5 },
  show: { y: '0%', rotate: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
});

type RevealTextProps = {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  /** Applied to every word, e.g. the gradient-text class that can't be clipped through transformed children. */
  wordClassName?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
};

/** Words rise out of a mask one after another when the text scrolls into view. */
export function RevealText({ text, as = 'h2', className, wordClassName, style, delay = 0, stagger = 0.07, duration = 0.9 }: RevealTextProps) {
  const Tag = TAGS[as];
  const words = text.split(' ');
  const item = word(duration);

  return (
    <Tag
      className={className}
      style={style}
      aria-label={text}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
            <motion.span variants={item} className={`inline-block origin-bottom-left ${wordClassName ?? ''}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
