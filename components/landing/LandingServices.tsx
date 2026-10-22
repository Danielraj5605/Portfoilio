import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';

const SERVICES = [
  {
    name: 'Workflow Automation',
    description: 'Scripts and small tools in Python and TypeScript that take over a repetitive step, such as generating a tested API client from a website instead of copying requests by hand.',
  },
  {
    name: 'AI Tools & Prototypes',
    description: 'LLM and ML features built into tools people can use: natural-language segmentation, log analysis and message screening, with the reasoning kept visible.',
  },
  {
    name: 'Testing AI Tools',
    description: 'Comparing models and providers on the same task and measuring the result, for example recall and precision on held-out data, so the choice rests on evidence.',
  },
  {
    name: 'Deployed Web Apps',
    description: 'End-to-end React and Node.js applications, shipped and live, from the interface to the REST API and the database behind it.',
  },
  {
    name: 'Docs & Explanations',
    description: 'Case studies and plain-language write-ups that explain how a tool works to people who are not engineers, so it actually gets adopted.',
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
