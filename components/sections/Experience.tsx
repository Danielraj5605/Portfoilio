'use client';

import { Briefcase, GraduationCap, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, type CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { timeline, type TimelineEntry } from '@/content/experience';
import { useScrollScene } from '@/lib/hooks/useScrollScene';
import { fadeUp, inView, stagger } from '@/lib/motion';

const icons = { work: Briefcase, education: GraduationCap, community: HeartHandshake };

function EntryCard({ entry, className = '', style, deck = false }: { entry: TimelineEntry; className?: string; style?: CSSProperties; deck?: boolean }) {
  const Icon = icons[entry.kind];
  return (
    <article data-card={deck || undefined} className={`glass rounded-card p-6 md:p-8 ${className}`} style={style}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-accent text-on-accent">
          <Icon size={18} aria-hidden />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{entry.period}</p>
        {entry.current && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-ink">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" /> Now
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight md:text-3xl">{entry.role}</h3>
      <p className="mt-1 font-medium text-accent-ink">{entry.org}</p>
      <ul className="mt-5 space-y-2.5">
        {entry.points.map(p => (
          <li key={p} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
            {p}
          </li>
        ))}
      </ul>
      {entry.tags && (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {entry.tags.map(t => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** Desktop: pinned scene — roles crossfade in turn while the timeline fills and marks the current stop. */
function PinnedDeck() {
  const root = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ gsap }, el) => {
    const mm = gsap.matchMedia(el);
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);
      const marks = gsap.utils.toArray<HTMLElement>('[data-mark]', el);
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 1 },
        scrollTrigger: { trigger: el, start: 'top top', end: `+=${cards.length * 70}%`, scrub: 0.7, pin: true },
      });
      tl.fromTo('[data-rail]', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: cards.length - 1 }, 0);
      // Active stop = filled dot + label nudged right (transform only; text stays full contrast).
      const dots = marks.map(m => m.querySelector('[data-dot]'));
      const labels = marks.map(m => m.querySelector('[data-label]'));
      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = i - 1;
        tl.to(cards[i - 1], { opacity: 0, y: -50, scale: 0.96 }, at)
          .fromTo(card, { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1 }, at)
          .to(dots[i - 1], { scale: 0 }, at)
          .to(dots[i], { scale: 1 }, at)
          .to(labels[i - 1], { x: 0 }, at)
          .to(labels[i], { x: 10 }, at);
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={root} className="hidden min-h-svh items-center md:motion-safe:flex">
      <div className="container-page grid w-full grid-cols-12 gap-10 py-20">
        <div className="col-span-5">
          <SectionHeading eyebrow="04 · Experience" title="Where I've been building." highlight={['building.']} />
          <ol className="relative space-y-5 pl-8">
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
            <span aria-hidden data-rail className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent" />
            {timeline.map((e, i) => (
              <li key={e.role + e.period} data-mark className="relative">
                <span aria-hidden className="absolute -left-8 top-1.5 grid size-[15px] place-items-center rounded-full border-2 border-accent bg-surface-solid">
                  <span data-dot className="size-[7px] rounded-full bg-accent" style={{ transform: `scale(${i === 0 ? 1 : 0})` }} />
                </span>
                <div data-label style={{ transform: `translateX(${i === 0 ? 10 : 0}px)` }}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{e.period}</p>
                  <p className="font-display text-lg font-semibold">{e.role}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative col-span-7 min-h-[30rem]">
          {timeline.map((e, i) => (
            <EntryCard
              key={e.role + e.period}
              entry={e}
              deck
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced motion: a simple vertical timeline. */
function List() {
  return (
    <div className="container-page md:motion-safe:hidden">
      <SectionHeading eyebrow="04 · Experience" title="Where I've been building." highlight={['building.']} />
      <motion.ol variants={stagger(0.1)} initial="hidden" whileInView="shown" viewport={inView} className="relative space-y-5 pl-6">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-gradient-to-b from-accent to-line" />
        {timeline.map(e => (
          <motion.li key={e.role + e.period} variants={fadeUp} className="relative">
            <span aria-hidden className="absolute -left-6 top-8 size-[11px] rounded-full border-2 border-accent bg-surface-solid" />
            <EntryCard entry={e} />
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:motion-safe:py-0">
      <PinnedDeck />
      <List />
    </section>
  );
}
