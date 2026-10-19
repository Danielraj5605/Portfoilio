'use client';

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

type Props = Omit<HTMLMotionProps<'div'>, 'children'> & { children?: ReactNode; max?: number };

const spring = { stiffness: 200, damping: 20, mass: 0.6 };

/**
 * Card that tilts toward the pointer with a warm glow that follows it and a
 * rim light on the border. Transform/opacity only (the glow is a translated
 * layer, not a repainted gradient). Inert on touch and for reduced motion.
 */
export function TiltCard({ max = 7, className = '', children, style, ...rest }: Props) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const glow = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });
  const glowTransform = useMotionTemplate`translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
    glow.set(1);
    if (reduce) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * 2 * max);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
    glow.set(0);
  };

  return (
    <motion.div
      {...rest}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      {children}
      {/* Pointer glow */}
      <motion.div
        aria-hidden
        style={{ transform: glowTransform, opacity: glow }}
        className="pointer-events-none absolute left-0 top-0 z-20 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(255_217_138/0.35),transparent)] mix-blend-soft-light"
      />
      {/* Rim light */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-[color-mix(in_oklab,var(--glow)_70%,transparent)]"
      />
    </motion.div>
  );
}
