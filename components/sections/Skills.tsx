'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { allSkills, skillGroups, type Skill } from '@/content/skills';
import { usePauseOffscreen } from '@/lib/hooks/usePauseOffscreen';
import { fadeUp, inView, stagger } from '@/lib/motion';

/** Moving chips use a solid surface — backdrop blur on animated elements repaints every frame. */
function Chip({ skill, className = '' }: { skill: Skill; className?: string }) {
  const { Icon, name } = skill;
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface-solid px-3.5 py-2 text-sm font-medium shadow-[0_6px_20px_-12px_rgb(0_0_0/0.35)] ${className}`}
    >
      <Icon aria-hidden className="size-4 text-accent-ink" />
      {name}
    </span>
  );
}

/** Two rings of skill chips orbiting a glowing core; chips counter-rotate to stay upright. */
function Orbit() {
  const inner = allSkills.slice(0, 7);
  const outer = allSkills.slice(7);
  const ring = (items: Skill[], radius: number, duration: number, reverse = false) => (
    <div
      className={`absolute inset-0 ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
      style={{ ['--orbit-duration' as string]: `${duration}s` }}
    >
      {items.map((skill, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={skill.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
          >
            {/* Cancel the ring's spin so labels stay level */}
            <div
              className={`-translate-x-1/2 -translate-y-1/2 ${reverse ? 'animate-orbit' : 'animate-orbit-reverse'}`}
              style={{ ['--orbit-duration' as string]: `${duration}s` }}
            >
              <Chip skill={skill} className="transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div aria-hidden className="group/orbit relative mx-auto aspect-square w-full max-w-[560px] [&_*]:[animation-play-state:inherit] hover:[animation-play-state:paused]">
      <div className="absolute inset-[22%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[4%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[38%] grid place-items-center rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]">
        <span className="glass rounded-full px-4 py-2 font-display text-lg font-semibold">Toolkit</span>
      </div>
      {ring(inner, 150, 70)}
      {ring(outer, 255, 110, true)}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className="flex w-max gap-3 animate-marquee pr-3"
        style={{ animationDirection: reverse ? 'reverse' : 'normal', ['--marquee-duration' as string]: '32s' }}
      >
        {[...items, ...items].map((s, i) => (
          <Chip key={i} skill={s} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(allSkills.length / 2);
  const root = useRef<HTMLElement>(null);
  usePauseOffscreen(root); // orbit + marquee only spin while visible
  return (
    <section id="skills" ref={root} className="relative overflow-hidden py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="02 · Skills"
          title="The toolkit behind the work."
          highlight={['toolkit']}
          intro="Full-stack foundations, with AI and governance models layered on top."
        />

        {/* min-w-0: the marquee's max-content track must not stretch the column */}
        <div className="grid items-center gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="hidden md:block lg:col-span-7">
            <Orbit />
          </div>
          <div aria-hidden className="-mx-4 space-y-3 md:hidden">
            <MarqueeRow items={allSkills.slice(0, half)} />
            <MarqueeRow items={allSkills.slice(half)} reverse />
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="shown"
            viewport={inView}
            className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            {skillGroups.map(group => (
              <motion.div key={group.title} variants={fadeUp} className="glass rounded-2xl p-5">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-ink">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {group.skills.map(({ name, Icon }) => (
                    <li key={name} className="group/skill inline-flex items-center gap-1.5 font-medium">
                      <Icon aria-hidden className="size-4 text-muted transition-[color,scale] duration-300 group-hover/skill:scale-110 group-hover/skill:text-accent-ink" />
                      {name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
