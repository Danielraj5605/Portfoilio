import type { Viewport } from 'next';
import type { ReactNode } from 'react';

export const viewport: Viewport = { themeColor: '#0C0C0C', width: 'device-width', initialScale: 1 };

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <main
      id="main"
      tabIndex={-1}
      data-landing
      data-theme="night"
      className="bg-[#0C0C0C] text-ink outline-none"
      style={{ fontFamily: 'var(--font-kanit), sans-serif', overflowX: 'clip' }}
    >
      {children}
    </main>
  );
}
