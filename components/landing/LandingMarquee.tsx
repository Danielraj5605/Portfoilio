'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { ProjectArt } from '@/components/projects/ProjectArt';
import { projects } from '@/content/projects';
import { allSkills } from '@/content/skills';

const TILE = 'group relative h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl';

type Tile = { key: string; node: ReactNode };

const projectTiles: Tile[] = projects.map(p => ({
  key: p.slug,
  node: (
    <div className={TILE}>
      <ProjectArt project={p} className="h-full w-full" />
      <span className="absolute bottom-4 left-5 text-xl font-semibold uppercase tracking-wide text-white drop-shadow">{p.name}</span>
    </div>
  ),
}));

const skillTiles: Tile[] = allSkills.map(({ name, Icon }) => ({
  key: name,
  node: (
    <div className={`${TILE} flex flex-col items-center justify-center gap-5 border border-[#D7E2EA]/15 bg-[#141414]`}>
      <Icon aria-hidden className="size-20 text-[#D7E2EA]" />
      <span className="hero-heading text-2xl font-bold uppercase tracking-wide">{name}</span>
    </div>
  ),
}));

// Alternate a project tile with a few skill tiles, then split into two rows.
const perProject = Math.ceil(skillTiles.length / projectTiles.length);
const mixed = projectTiles.flatMap((t, i) => [t, ...skillTiles.slice(i * perProject, (i + 1) * perProject)]);
const half = Math.ceil(mixed.length / 2);

function Row({ items, x }: { items: Tile[]; x: MotionValue<number> }) {
  const tripled = [...items, ...items, ...items];
  return (
    <motion.div className="flex w-max gap-3" style={{ x, willChange: 'transform' }} aria-hidden>
      {tripled.map((t, i) => (
        <div key={`${t.key}-${i}`}>{t.node}</div>
      ))}
    </motion.div>
  );
}

/** Two rows that slide in opposite directions as the page scrolls. */
export function LandingMarquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const forward = useTransform(scrollYProgress, [0, 1], [-200, 300]);
  const backward = useTransform(scrollYProgress, [0, 1], [200, -300]);

  return (
    <section ref={ref} className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40" style={{ background: '#0C0C0C' }}>
      <Row items={mixed.slice(0, half)} x={forward} />
      <Row items={mixed.slice(half)} x={backward} />
    </section>
  );
}
