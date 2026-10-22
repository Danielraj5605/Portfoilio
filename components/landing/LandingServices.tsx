import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';

const SERVICES = [
  {
    name: 'Full-Stack Development',
    description: 'End-to-end web applications with React and Node.js, from responsive interfaces to REST APIs and the data behind them.',
  },
  {
    name: 'AI-Powered Products',
    description: 'AI features such as scam detection, natural-language segmentation and LLM log analysis, designed so the reasoning stays visible and results can be trusted.',
  },
  {
    name: 'Security & Fraud Detection',
    description: 'ML-powered tools such as scam-message and phishing-URL detectors that explain their verdicts in plain language.',
  },
  {
    name: 'API Integration',
    description: 'Connecting services and data sources, then tuning performance so order flows, tracking and reports stay fast and reliable.',
  },
  {
    name: 'Multi-Tenant Dashboards',
    description: 'Branch- and role-based analytics with access control, for organisations that need one product across many teams.',
  },
];

export function LandingServices() {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] bg-white px-5 py-14 sm:rounded-t-[50px] sm:px-8 sm:py-16 md:rounded-t-[60px] md:px-10 md:py-20"
    >
      <RevealText
        text="Services"
        className="mb-8 text-center font-black uppercase leading-none sm:mb-10 md:mb-14"
        style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      />

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((s, i) => (
          <FadeIn
            key={s.name}
            delay={i * 0.1}
            className="group flex gap-4 py-6 sm:gap-8 sm:py-7 md:gap-12 md:py-8"
            style={{ borderTop: i === 0 ? undefined : '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span className="shrink-0 font-black leading-none transition-transform duration-500 ease-out group-hover:translate-x-2" style={{ color: '#0C0C0C', fontSize: 'clamp(2.5rem, 6vw, 88px)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col justify-center gap-3 transition-transform duration-500 ease-out group-hover:translate-x-3" style={{ color: '#0C0C0C' }}>
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {s.name}
              </h3>
              <p className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                {s.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
