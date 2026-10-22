import Link from 'next/link';
import { ProjectArt } from '@/components/projects/ProjectArt';
import { moreProjects, projects, type Project } from '@/content/projects';
import { CaseStudyButton } from './CaseStudyButton';
import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';

const featured = projects.filter(p => p.featured);
const others = projects.filter(p => !p.featured);

const LINK =
  'inline-block rounded-full border border-[#D7E2EA]/40 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:text-sm';

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <FadeIn y={40}>
      <article className="group grid transition-colors duration-500 hover:border-[#D7E2EA]/50items-center gap-6 rounded-[32px] border border-[#D7E2EA]/25 p-4 sm:gap-8 sm:p-6 md:grid-cols-2 md:gap-12 md:rounded-[48px] md:p-8">
        <div className={`relative aspect-[16/10] overflow-hidden rounded-[20px] border border-[#D7E2EA]/15 bg-[#141414] md:rounded-[32px] ${flip ? 'md:order-2' : ''}`}>
          <div className="size-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
            <ProjectArt project={project} className="size-full" />
          </div>
        </div>

        <div className="flex flex-col gap-4 px-1 text-[#D7E2EA] sm:px-2">
          <div className="flex items-baseline gap-4">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-light uppercase tracking-widest opacity-60 sm:text-sm">{project.kind}</span>
          </div>
          <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {project.name}
          </h3>
          <p className="font-light leading-relaxed opacity-80" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}>
            {project.summary}
          </p>
          {project.stack && (
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.slice(0, 6).map(s => (
                <li key={s} className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-xs uppercase tracking-wider opacity-80">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 flex flex-wrap gap-3">
            <CaseStudyButton href={`/work/${project.slug}`} />
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={LINK}>
                Live ↗
              </a>
            )}
            {project.links?.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={LINK}>
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

function MoreCard({ href, name, blurb, stack, external }: { href: string; name: string; blurb: string; stack: string[]; external?: boolean }) {
  const cls =
    'flex h-full flex-col gap-3 rounded-3xl border border-[#D7E2EA]/30 p-5 text-[#D7E2EA] transition-[color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/80 focus-visible:border-[#D7E2EA]';
  const body = (
    <>
      <h4 className="text-lg font-medium uppercase">{name}</h4>
      <p className="text-sm font-light leading-relaxed opacity-80">{blurb}</p>
      <p className="mt-auto text-xs uppercase tracking-wider opacity-60">{stack.join(' · ')}</p>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}

export function LandingProjects() {
  return (
    <section
      id="work"
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-14 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-16 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-20"
      style={{ background: '#0C0C0C' }}
    >
      <RevealText
        text="Project"
        wordClassName="hero-heading"
        className="mb-8 text-center font-black uppercase leading-none tracking-tight sm:mb-10 md:mb-14"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-12">
        {featured.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-6xl md:mt-20">
        <h3 className="mb-8 text-center text-xl font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-2xl">More projects</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map(p => (
            <li key={p.slug}>
              <MoreCard href={`/work/${p.slug}`} name={p.name} blurb={p.summary} stack={p.stack ?? p.tags} />
            </li>
          ))}
          {moreProjects.map(p => (
            <li key={p.repo}>
              <MoreCard href={p.repo} external name={p.name} blurb={p.blurb} stack={p.stack} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
