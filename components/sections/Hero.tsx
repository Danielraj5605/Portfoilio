'use client';

import { ArrowDown, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { Avatar } from '@/components/avatar/Avatar';
import { Hills } from '@/components/scene/Hills';
import { Particles } from '@/components/scene/Particles';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitText } from '@/components/ui/SplitText';
import { profile } from '@/content/profile';
import type { AvatarAssets } from '@/lib/avatar';
import { useIntroReveal } from '@/lib/hooks/useIntroReveal';
import { usePauseOffscreen } from '@/lib/hooks/usePauseOffscreen';
import { useScrollScene } from '@/lib/hooks/useScrollScene';
import { useIntroDone } from '@/lib/intro';
import { ease } from '@/lib/motion';

export function Hero({ avatar }: { avatar: AvatarAssets }) {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  // Painted on the first frame, revealed as the intro lifts (see useIntroReveal).
  const chip = useIntroReveal(0.1);
  const lead = useIntroReveal(0.6);
  const ctas = useIntroReveal(0.75);
  const cue = useIntroReveal(1.1);

  // Pause decorative loops (motes, grass, float) once the hero is off-screen.
  usePauseOffscreen(root);

  // Pinned scene: the camera rises — hills sink at different depths (nearest fastest),
  // copy lifts away, avatar settles. Sinking (not rising) never exposes sky below the hills.
  useScrollScene(root, ({ gsap }, el) => {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: '+=70%', scrub: 0.6, pin: true },
      })
      .to('[data-layer="far"]', { yPercent: 10 }, 0)
      .to('[data-layer="mid"]', { yPercent: 22 }, 0)
      .to('[data-layer="near"]', { yPercent: 40 }, 0)
      .to('[data-hero-copy]', { yPercent: -18, opacity: 0 }, 0)
      .to('[data-hero-avatar]', { yPercent: -10, scale: 0.92 }, 0)
      .to('[data-hero-cue]', { opacity: 0 }, 0)
      // The meadow dissolves into haze so the hero hands off to open sky — no hard edge.
      .to('[data-hills]', { opacity: 0, duration: 0.5 }, 0.5);
  });

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden pt-24 md:pt-28"
    >
      <Hills />
      <Particles className="z-0" />

      <div className="container-page relative z-10 grid flex-1 items-center gap-6 pb-[18svh] md:grid-cols-12 md:gap-8 md:pb-[14svh]">
        <div data-hero-copy className="order-2 md:order-1 md:col-span-7">
          <motion.p
            {...chip}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted sm:text-[0.7rem] sm:tracking-[0.18em]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.title}
          </motion.p>

          <SplitText
            as="h1"
            onLoad
            delay={0.2}
            text={profile.headline}
            highlight={['risk', 'governance.']}
            className="mt-5 block text-balance font-display text-[clamp(2.4rem,6.4vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
          />

          <motion.p {...lead} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
            {profile.intro}
          </motion.p>

          <motion.div {...ctas} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#work">
              See case studies <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton href={profile.resume} target="_blank" rel="noopener noreferrer" variant="ghost">
              Résumé <FileText size={16} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Outer: Motion entrance. Inner: GSAP scroll scene — separate elements so transforms never fight. */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ delay: 0.35, duration: 1.1, ease: ease.out }}
          className="order-1 mx-auto w-[min(46vw,210px)] md:order-2 md:col-span-5 md:w-full md:max-w-[440px]"
        >
          <div data-hero-avatar>
            <Avatar assets={avatar} pose="wave" bubble={ready ? "Hi, I'm Danielraj!" : null} priority />
          </div>
        </motion.div>
      </div>

      <div data-hero-cue className="absolute bottom-6 left-1/2 z-10 -ml-5">
        <motion.a
          href="#about"
          {...cue}
          aria-label="Scroll to the next section"
          className="glass grid size-10 place-items-center rounded-full text-ink"
        >
          <ArrowDown size={16} className="animate-float" />
        </motion.a>
      </div>
    </section>
  );
}
