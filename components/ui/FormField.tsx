'use client';

import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { useEffect, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

type Common = { name: string; label: string; error?: string; /** increment to replay the shake */ shake?: number };
type Props = Common &
  (({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>) | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>));

/**
 * Glass field with a floating label (moves via transform), an accent focus
 * ring, an animated inline error and a shake on failed submit.
 */
export function FormField({ name, label, error, shake = 0, multiline, className = '', ...rest }: Props) {
  const controls = useAnimationControls();

  // Replays only when `shake` increments; `error` is read from that same render.
  useEffect(() => {
    if (shake && error) controls.start({ x: [0, -8, 7, -5, 3, 0], transition: { duration: 0.45 } });
  }, [shake, controls]);

  const errorId = `${name}-error`;
  const field = {
    id: name,
    name,
    // A blank placeholder lets CSS know when the field is empty (:placeholder-shown).
    placeholder: ' ',
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    className: `peer block w-full rounded-2xl border bg-surface px-4 pb-2.5 pt-6 text-base text-ink outline-none backdrop-blur-md transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)] ${
      error ? 'border-[#c2410c] night:border-[#f7a073]' : 'border-line'
    } ${className}`,
  };

  return (
    <motion.div animate={controls} className="relative">
      {multiline ? (
        <textarea {...field} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...field} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-4 origin-left text-base text-muted transition-transform duration-300 ease-out peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]"
      >
        {label}
      </label>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 pl-1 text-sm font-medium text-[#b42318] night:text-[#ff9b8a]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
