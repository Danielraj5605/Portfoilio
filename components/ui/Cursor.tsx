'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Mode = 'default' | 'grow' | 'label' | 'hidden';
const SIZE = 84;
const SCALE: Record<Mode, number> = { default: 12 / SIZE, grow: 44 / SIZE, label: 1, hidden: 0 };

/**
 * Soft sunlit dot that trails the pointer: grows over links/buttons and shows a
 * label over anything with `data-cursor-label`. Hidden over text fields, on
 * touch devices and for reduced motion. Native cursor stays — this is decoration.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const x = useSpring(useMotionValue(-200), { stiffness: 520, damping: 40, mass: 0.35 });
  const y = useSpring(useMotionValue(-200), { stiffness: 520, damping: 40, mass: 0.35 });

  useEffect(() => {
    setEnabled(!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, [reduce]);

  // New page: whatever was under the pointer is gone, so drop any label until it moves.
  useEffect(() => setMode('default'), [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      if (el?.closest('input, textarea, select')) return setMode('hidden');
      const labelled = el?.closest<HTMLElement>('[data-cursor-label]');
      if (labelled) {
        setLabel(labelled.dataset.cursorLabel ?? '');
        return setMode('label');
      }
      setMode(el?.closest('a, button, [data-cursor="grow"]') ? 'grow' : 'default');
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[90]">
      <motion.div
        initial={false}
        animate={{ scale: SCALE[mode], opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        style={{ width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }}
        className="grid place-items-center rounded-full bg-accent/85 shadow-[0_0_30px_var(--glow)]"
      >
        <motion.span
          animate={{ opacity: mode === 'label' ? 1 : 0 }}
          className="px-2 text-center font-mono text-[0.6rem] font-semibold uppercase leading-tight tracking-wider text-on-accent"
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
