import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist_Mono, Inter, Kanit } from 'next/font/google';
import type { ReactNode } from 'react';
import { Providers } from '@/components/providers/Providers';
import { profile } from '@/content/profile';
import { bootScript } from '@/lib/boot';
import './globals.css';

// Weight axis only — the SOFT/opsz axes tripled the file (120 kB) for little visible gain.
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const kanit = Kanit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'], variable: '--font-kanit', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const title = `${profile.fullName} — ${profile.title}`;
const description = `${profile.headline} ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.fullName}` },
  description,
  authors: [{ name: profile.fullName }],
  keywords: [...profile.focus, 'Full-stack engineer', 'AI', 'TPRM', 'Access governance', 'Portfolio'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', title, description, url: '/', siteName: profile.fullName, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#8ec5e8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="day"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} ${kanit.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-accent px-5 py-3 font-semibold text-on-accent transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: profile.fullName,
              jobTitle: profile.title,
              url: profile.siteUrl,
              knowsAbout: profile.focus,
              sameAs: [profile.links.github, profile.links.linkedin],
            }),
          }}
        />
      </body>
    </html>
  );
}
