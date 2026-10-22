import Image from 'next/image';
import { profile } from '@/content/profile';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { HeroParallax } from './HeroParallax';
import { RevealText } from './RevealText';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function LandingHero() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip', background: '#0B0B0B' }}>
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-9">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <HeroParallax speed={0.25} className="relative z-10 overflow-hidden px-6 md:px-10">
        <RevealText
          as="h1"
          text={`Hi, i'm ${profile.name}`}
          delay={0.2}
          stagger={0.12}
          duration={1.1}
          wordClassName="hero-heading"
          className="mt-6 w-full whitespace-nowrap text-[10.4vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[10.8vw] md:mt-2 md:text-[11.6vw]"
        />
      </HeroParallax>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <div>
            <p
              className="font-light uppercase leading-[1.35] tracking-wide text-[#D7E2EA]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              <span className="block">a full-stack engineer</span>
              <span className="block">building intelligent</span>
              <span className="block">tools for enterprise</span>
              <span className="block">risk &amp; governance</span>
            </p>
            <span aria-hidden className="mt-4 block h-0.5 w-12 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0]" />
          </div>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
      <FadeIn
        delay={0.6}
        y={40}
        className="pointer-events-none absolute bottom-0 right-1/2 z-[15] w-[min(88vw,420px,62vh)] translate-x-1/2 sm:right-[8vw] sm:w-[min(44vw,73vh)] sm:translate-x-0 lg:right-[14vw]"
      >
        <HeroParallax speed={0.12} className="relative">
          <div
            aria-hidden
            className="absolute left-1/2 top-[58%] aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,70,245,0.6) 0%, rgba(120,45,200,0.3) 38%, transparent 68%)',
              filter: 'blur(48px)',
            }}
          />
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute left-1/2 top-[58%] w-[130%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          >
            <ellipse cx="50" cy="50" rx="46" ry="14" transform="rotate(-24 50 50)" fill="none" stroke="#A855F7" strokeOpacity="0.45" strokeWidth="0.25" />
          </svg>
          <Image
            src="/images/danielraj.png"
            alt={`${profile.fullName}, full-stack engineer, pointing at the viewer`}
            width={1262}
            height={1246}
            priority
            sizes="(min-width:640px) 44vw, 88vw"
            className="relative h-auto w-full select-none object-contain"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
            draggable={false}
          />
        </HeroParallax>
      </FadeIn>
    </section>
  );
}
