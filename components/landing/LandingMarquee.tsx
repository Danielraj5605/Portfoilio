'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
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

function Row({ items, transform }: { items: Tile[]; transform: string }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex w-max gap-3" style={{ transform, willChange: 'transform' }} aria-hidden>
      {tripled.map((t, i) => (
        <div key={`${t.key}-${i}`}>{t.node}</div>
      ))}
    </div>
  );
}

/** Two rows that slide in opposite directions as the page scrolls. */
export function LandingMarquee() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40" style={{ background: '#0C0C0C' }}>
      <Row items={mixed.slice(0, half)} transform={`translateX(${offset - 200}px)`} />
      <Row items={mixed.slice(half)} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  );
}
