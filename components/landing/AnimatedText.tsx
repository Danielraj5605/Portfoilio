'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, type CSSProperties } from 'react';

function Char({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

/** Characters fade from 20% to full opacity as the paragraph scrolls through the viewport. */
export function AnimatedText({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden>
        {chars.map((c, i) => (
          <Char key={i} char={c} index={i} total={chars.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}
