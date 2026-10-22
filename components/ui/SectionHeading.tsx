import { SplitText } from './SplitText';

type Props = { eyebrow: string; title: string; highlight?: string[]; intro?: string; align?: 'left' | 'center' };

/** Eyebrow chip + staggered serif title + optional lead. */
export function SectionHeading({ eyebrow, title, highlight, intro, align = 'left' }: Props) {
  const center = align === 'center';
  return (
    <header className={`mb-12 max-w-3xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      <p className="glass inline-flex rounded-full px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        {eyebrow}
      </p>
      <SplitText
        as="h2"
        text={title}
        highlight={highlight}
        className="mt-5 block text-balance font-display text-[clamp(2.1rem,5vw,3.9rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
      />
      {intro && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}
