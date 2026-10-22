'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { ComponentProps, PointerEvent, ReactNode } from 'react';

type Variant = 'accent' | 'ghost';

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-on-accent shadow-[0_10px_30px_-10px_var(--accent)]',
  ghost: 'glass text-ink',
};

const base =
  'group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold disabled:pointer-events-none disabled:opacity-60';

/** Lean toward the pointer; returns motion values for the pill and its (further-moving) label. */
function useMagnetic() {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { x, y, handlers: { onPointerMove, onPointerLeave } };
}

function Inner({ x, y, children }: { x: MotionValue<number>; y: MotionValue<number>; children: ReactNode }) {
  const lx = useTransform(x, v => v * 0.4);
  const ly = useTransform(y, v => v * 0.4);
  return (
    <>
      {/* Sheen that sweeps across on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-white/35 opacity-0 transition-[translate,opacity] duration-700 ease-out group-hover:translate-x-[300%] group-hover:opacity-100"
      />
      <motion.span style={{ x: lx, y: ly }} className="inline-flex items-center gap-2">
        {children}
      </motion.span>
    </>
  );
}

type LinkProps = Omit<ComponentProps<typeof motion.a>, 'children'> & { variant?: Variant; children: ReactNode };

/** Magnetic pill link. Transform/opacity only. */
export function MagneticButton({ variant = 'accent', className = '', children, ...rest }: LinkProps) {
  const { x, y, handlers } = useMagnetic();
  return (
    <motion.a style={{ x, y }} {...handlers} whileTap={{ scale: 0.96 }} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner x={x} y={y}>
        {children}
      </Inner>
    </motion.a>
  );
}

type ButtonProps = Omit<ComponentProps<typeof motion.button>, 'children'> & { variant?: Variant; children: ReactNode };

/** Magnetic pill button (e.g. form submit). */
export function MagneticActionButton({ variant = 'accent', className = '', children, ...rest }: ButtonProps) {
  const { x, y, handlers } = useMagnetic();
  return (
    <motion.button style={{ x, y }} {...handlers} whileTap={{ scale: 0.96 }} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner x={x} y={y}>
        {children}
      </Inner>
    </motion.button>
  );
}
