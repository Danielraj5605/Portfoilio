import { BrainCircuit, Code2, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { Float } from './Float';
import { RevealText } from './RevealText';

const ABOUT_TEXT =
  "I'm a full-stack engineer and final-year Computer Science student at SRM (CGPA 8.31). I like finding the repetitive, slow step in a process and building a simple tool that removes it. Ghost API turns a manual DevTools hunt into a tested client, Log Whisperer explains the cause of an alert instead of just the error, and ScamShield explains its verdict in plain words. I've shipped production web products at Techcora since July 2025, and I'm looking to apply the same problem-first approach to AI tools and workflows for design teams.";

const DECOS: { Icon: LucideIcon; position: string; size: string; delay: number; x: number; tilt: string }[] = [
  { Icon: Code2, position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', size: 'size-[96px] sm:size-[128px] md:size-[168px]', delay: 0.1, x: -80, tilt: '-rotate-6' },
  { Icon: ShieldCheck, position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', size: 'size-[84px] sm:size-[112px] md:size-[144px]', delay: 0.25, x: -80, tilt: 'rotate-6' },
  { Icon: BrainCircuit, position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', size: 'size-[96px] sm:size-[128px] md:size-[168px]', delay: 0.15, x: 80, tilt: 'rotate-6' },
  { Icon: Sparkles, position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', size: 'size-[96px] sm:size-[136px] md:size-[176px]', delay: 0.3, x: 80, tilt: '-rotate-6' },
];

export function LandingAbout() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
      style={{ background: '#0C0C0C' }}
    >
      {DECOS.map(({ Icon, position, size, delay, x, tilt }) => (
        <FadeIn key={position} delay={delay} x={x} y={0} duration={0.9} className={`absolute ${position}`}>
          <Float delay={delay * 3}>
            <div
              aria-hidden
              className={`${size} ${tilt} grid place-items-center rounded-[28%] text-white`}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              }}
            >
              <Icon className="size-1/2" strokeWidth={1.5} />
            </div>
          </Float>
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <RevealText
          text="About me"
          wordClassName="hero-heading"
          className="text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      <div className="relative z-10">
        <ContactButton />
      </div>
    </section>
  );
}
