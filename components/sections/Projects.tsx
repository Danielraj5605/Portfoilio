'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { ProjectArt } from '@/components/projects/ProjectArt';
import { TransitionLink } from '@/components/providers/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects, type Project } from '@/content/projects';
import { usePauseOffscreen } from '@/lib/hooks/usePauseOffscreen';
import { fadeUp, inView, stagger } from '@/lib/motion';

const span: Record<Project['size'], string> = {
  feature: 'lg:col-span-4 lg:row-span-2 min-h-[26rem] lg:min-h-[36rem]',
  tall: 'lg:col-span-2 lg:row-span-2 min-h-[26rem]',
  wide: 'lg:col-span-3 min-h-[22rem]',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li variants={fadeUp} className={span[project.size]}>
      <TiltCard className="size-full rounded-card border border-line bg-surface-solid shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
        <ProjectArt
          project={project}
          className="absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <article className="relative z-10 flex size-full flex-col justify-between gap-6 overflow-hidden p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="glass rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              {String(index + 1).padStart(2, '0')} · {project.kind}
            </span>
            <span
              aria-hidden
              className="glass grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45"
            >
              <ArrowUpRight size={18} />
            </span>
          </div>

          {/* Hover preview (transform only): on pointer devices the panel rests pushed down so just the
              title + tagline peek out; hover/focus slides it up to reveal the summary and tags. */}
          <div className="glass rounded-2xl p-5 transition-transform duration-500 ease-out md:p-6 [@media(hover:hover)]:translate-y-[calc(100%-8.25rem)] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-within:translate-y-0">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{project.name}</h3>
            <p className="mt-1.5 line-clamp-2 text-pretty text-muted">{project.tagline}</p>
            <div className="transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
              <p className="mt-3 text-pretty text-sm leading-relaxed">{project.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                {project.tags.map(t => (
                  <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        {/* Whole-card link (outside the sliding panel, whose transform would otherwise contain it) */}
        <TransitionLink
          href={`/work/${project.slug}`}
          aria-label={`${project.name} — read the case study`}
          data-cursor-label="Case study"
          className="absolute inset-0 z-30 rounded-card focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        />
      </TiltCard>
    </motion.li>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  usePauseOffscreen(root); // cover art (radar sweep, orbits) only spins while visible
  return (
    <section id="work" ref={root} className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="03 · Selected work"
          title="Case studies in risk, access and AI."
          highlight={['risk,', 'access', 'AI.']}
          intro="Four products across enterprise risk intelligence, governance and AI-native SaaS. Open one for the full story."
        />

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="shown"
          viewport={inView}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
