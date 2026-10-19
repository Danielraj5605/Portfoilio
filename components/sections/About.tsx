'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/content/profile';
import { fadeUp, inView, stagger } from '@/lib/motion';

const statement =
  'I turn tangled risk, access and vendor workflows into calm, intelligent software — the kind that explains itself.';

const stats = [
  { value: '4', label: 'AI & governance products built' },
  { value: '2', label: 'Roles at Techcora Corporation' },
  { value: '8.31', label: 'CGPA · B.Tech CSE, SRM IST' },
];

/**
 * One word of the statement, lit by scroll progress. The resting word is muted
 * (still readable, passes contrast); an ink copy fades in over it — opacity only.
 */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    // muted/80 ≈ 3.6:1 on the lightest sky — passes for large text while leaving room to "light up".
    <span className="relative inline-block text-muted/80">
      {word}&nbsp;
      <motion.span style={{ opacity }} className="absolute inset-0 text-ink">
        {word}
      </motion.span>
    </span>
  );
}

export function About() {
  const statementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 80%', 'end 45%'] });
  const words = statement.split(' ');

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container-page">
        <SectionHeading eyebrow="01 · About" title="Calm software for complex organisations." highlight={['Calm']} />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Pinned statement that lights up word by word */}
          <div className="md:col-span-7">
            <div ref={statementRef} className="md:sticky md:top-32">
              <p className="sr-only">{statement}</p>
              <p aria-hidden className="text-balance font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-medium leading-[1.2] tracking-[-0.01em]">
                {words.map((w, i) => (
                  <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
                ))}
              </p>
            </div>
          </div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="shown"
            viewport={inView}
            className="space-y-8 md:col-span-5"
          >
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted">
              I&apos;m {profile.name}, a full-stack engineer focused on{' '}
              <strong className="font-semibold text-ink">enterprise risk intelligence</strong>,{' '}
              <strong className="font-semibold text-ink">governance tooling</strong> and{' '}
              <strong className="font-semibold text-ink">AI-native SaaS</strong>. I like the unglamorous problems —
              who has access to what, which vendor is a risk, what changed and why — and making them feel simple.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted">
              At Techcora Corporation I&apos;ve shipped inventory, tracking, multi-tenant and quick-commerce platforms. I&apos;m
              completing my B.Tech in Computer Science at SRM Institute of Science and Technology.
            </motion.p>

            <motion.dl variants={fadeUp} className="grid grid-cols-3 gap-3">
              {stats.map(s => (
                <div key={s.label} className="glass rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.ul variants={fadeUp} className="flex flex-wrap gap-2" aria-label="Focus areas">
              {profile.focus.map(f => (
                <li key={f} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">
                  {f}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
