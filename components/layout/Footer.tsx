'use client';

import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { useLenis } from '@/components/providers/SmoothScroll';
import { Particles } from '@/components/scene/Particles';
import { profile } from '@/content/profile';
import { usePauseOffscreen } from '@/lib/hooks/usePauseOffscreen';
import { navLinks } from './navLinks';

/** Always a dusk scene — night hills and fireflies close the page in either theme. */
export function Footer() {
  const lenis = useLenis();
  const root = useRef<HTMLElement>(null);
  usePauseOffscreen(root); // fireflies only fly while the footer is on screen
  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer ref={root} data-theme="night" className="relative isolate mt-10 overflow-hidden bg-transparent pt-40 text-ink">
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Sunset into night: sky → coral glow → violet dusk → deep night */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgb(247_160_115/0.55)_14%,#5b4a78_30%,#27305a_44%,#0d1a33_70%)]" />
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 top-16 h-40 w-full">
          <path d="M0 200 C 200 110, 380 150, 560 170 C 760 190, 900 90, 1100 120 C 1260 145, 1360 180, 1440 160 V320 H0 Z" fill="#1f3040" />
          <path d="M0 240 C 260 180, 520 280, 780 240 C 1040 200, 1220 160, 1440 200 V320 H0 Z" fill="#13212b" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 top-52 bg-[#13212b]" />
        <Particles count={14} seed={11} />
      </div>

      <div className="container-page relative pb-10 pt-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight">
              Thanks for wandering <em className="text-accent-ink">this far.</em>
            </p>
            <a href={`mailto:${profile.email}`} className="mt-3 inline-block text-lg text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent">
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
            {navLinks.map(l => (
              <a key={l.id} href={`/#${l.id}`} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. Hand-built with Next.js, GSAP &amp; a lot of tea.
          </p>
          <div className="flex items-center gap-2">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="glass grid size-10 place-items-center rounded-full transition-transform hover:-translate-y-1">
              <SiGithub size={16} />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="glass grid size-10 place-items-center rounded-full transition-transform hover:-translate-y-1">
              <FaLinkedinIn size={16} />
            </a>
            <button type="button" onClick={toTop} className="glass ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-medium text-ink transition-transform hover:-translate-y-1">
              Back to top <ArrowUp size={14} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
