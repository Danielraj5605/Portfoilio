import type { ReactNode } from 'react';
import { IntroLoader } from '@/components/layout/IntroLoader';
import { Navbar } from '@/components/layout/Navbar';
import { Sky } from '@/components/scene/Sky';
import { Cursor } from '@/components/ui/Cursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sky />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Cursor />
      <IntroLoader />
    </>
  );
}
