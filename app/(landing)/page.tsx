import { Suspense } from 'react';
import { LandingAbout } from '@/components/landing/LandingAbout';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingMarquee } from '@/components/landing/LandingMarquee';
import { LandingProjects } from '@/components/landing/LandingProjects';
import { LandingServices } from '@/components/landing/LandingServices';
import { Footer } from '@/components/layout/Footer';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingMarquee />
      <LandingAbout />
      <LandingServices />
      <LandingProjects />
      <Suspense>
        <Skills />
      </Suspense>
      <Suspense>
        <Experience />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
