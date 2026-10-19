'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { SiGithub } from 'react-icons/si';
import { TransitionLink } from '@/components/providers/PageTransition';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitText } from '@/components/ui/SplitText';
import type { Project } from '@/content/projects';
import { useIntroReveal } from '@/lib/hooks/useIntroReveal';
import { fadeUp, inView, stagger } from '@/lib/motion';
import { ProjectArt } from './ProjectArt';

const label = 'font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="shown"
      viewport={inView}
      className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14"
    >
      <h2 className={`${label} md:col-span-3 md:pt-2`}>{title}</h2>
      <div className="md:col-span-9">{children}</div>
    </motion.section>
  );
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] });
  const coverY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const lead = useIntroReveal(0.35);
  const meta = useIntroReveal(0.5);

  return (
    <article className="pb-10">
      <header className="container-page pb-12 pt-32 md:pt-40">
        <TransitionLink href="/#work" className="group glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
          <ArrowLeft size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1" /> All work
        </TransitionLink>

        <p className="glass mt-10 inline-flex rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em]">{project.kind}</p>
        <SplitText
          as="h1"
          onLoad
          by="char"
          delay={0.1}
          text={project.name}
          className="mt-3 block font-display text-[clamp(2.8rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        />
        <motion.p {...lead} className="mt-6 max-w-3xl text-balance font-display text-2xl leading-snug md:text-3xl">
          {project.tagline}
        </motion.p>

        <motion.dl {...meta} className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className={label}>Role</dt>
            <dd className="mt-2 font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className={label}>Domain</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map(t => (
                <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-sm">
                  {t}
                </span>
              ))}
            </dd>
          </div>
          {(project.stack?.length || project.links) && (
            <div>
              <dt className={label}>{project.stack?.length ? 'Stack' : 'Links'}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack?.map(s => (
                  <span key={s} className="rounded-full bg-surface px-2.5 py-0.5 text-sm">
                    {s}
                  </span>
                ))}
                {project.links?.live && (
                  <MagneticButton href={project.links.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2">
                    Live <ArrowUpRight size={14} aria-hidden />
                  </MagneticButton>
                )}
                {project.links?.repo && (
                  <MagneticButton href={project.links.repo} target="_blank" rel="noopener noreferrer" variant="ghost" className="px-4 py-2">
                    <SiGithub size={14} aria-hidden /> Code
                  </MagneticButton>
                )}
              </dd>
            </div>
          )}
        </motion.dl>
      </header>

      <div className="container-page">
        <div ref={coverRef} className="relative aspect-[16/10] overflow-hidden rounded-card border border-line shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)] md:aspect-[16/8]">
          <motion.div style={{ y: coverY, scale: 1.14 }} className="group absolute inset-0">
            <ProjectArt project={project} className="size-full" />
          </motion.div>
        </div>
      </div>

      <div className="container-page mt-16 md:mt-24">
        <Block title="The problem">
          <p className="text-pretty font-display text-2xl leading-snug md:text-[1.75rem]">{project.problem}</p>
        </Block>

        <Block title="The approach">
          <motion.ol variants={stagger(0.1)} initial="hidden" whileInView="shown" viewport={inView} className="grid gap-4 md:grid-cols-3">
            {project.approach.map((step, i) => (
              <motion.li key={step} variants={fadeUp} className="glass rounded-2xl p-5">
                <span className="font-mono text-sm text-accent-ink">0{i + 1}</span>
                <p className="mt-3 leading-relaxed">{step}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Block>

        <Block title="The outcome">
          <p className="text-pretty text-xl leading-relaxed">{project.outcome}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
            {project.highlights.map(h => (
              <li key={h} className="rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] px-3.5 py-1.5 text-sm font-medium">
                {h}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {next.slug !== project.slug && (
        <nav aria-label="Next case study" className="container-page mt-10">
          <TransitionLink
            href={`/work/${next.slug}`}
            data-cursor-label="Next"
            className="group glass relative flex items-center justify-between gap-6 overflow-hidden rounded-card p-6 md:p-10"
          >
            <div>
              <p className={label}>Next case study</p>
              <p className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                {next.name}
              </p>
              <p className="mt-2 text-muted">{next.tagline}</p>
            </div>
            <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-12">
              <ArrowRight size={22} />
            </span>
          </TransitionLink>
        </nav>
      )}
    </article>
  );
}
