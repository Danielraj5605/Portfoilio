import { seeded } from '@/lib/motion';

type Props = { count?: number; seed?: number; className?: string };

/**
 * Day: golden dust motes drifting up through sunlight.
 * Night: fireflies blinking over the grass.
 * Transform/opacity keyframes only; both sets crossfade with the theme.
 */
export function Particles({ count = 18, seed = 3, className = '' }: Props) {
  const rand = seeded(seed);
  const motes = Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: 30 + rand() * 65,
    size: 3 + rand() * 4,
    drift: (rand() - 0.5) * 120,
    duration: 9 + rand() * 10,
    delay: -rand() * 18,
  }));
  const flies = Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: 50 + rand() * 45,
    size: 3 + rand() * 3,
    drift: (rand() - 0.5) * 80,
    duration: 6 + rand() * 7,
    delay: -rand() * 12,
  }));

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="day-only absolute inset-0">
        {motes.map((m, i) => (
          <span
            key={i}
            className="absolute animate-mote rounded-full bg-[radial-gradient(closest-side,#fff6d8,rgb(255_217_138/0.6),transparent)]"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: m.size * 2,
              height: m.size * 2,
              ['--mote-x' as string]: `${m.drift}px`,
              ['--mote-duration' as string]: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="night-only absolute inset-0">
        {flies.map((f, i) => (
          <span
            key={i}
            className="absolute animate-firefly rounded-full bg-[radial-gradient(closest-side,#fffbd1,rgb(246_226_122/0.7)_40%,transparent)]"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size * 4,
              height: f.size * 4,
              ['--mote-x' as string]: `${f.drift}px`,
              ['--mote-duration' as string]: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
