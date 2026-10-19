import { seeded } from '@/lib/motion';
import { Clouds } from './Clouds';

const DAY = 'linear-gradient(180deg, #8ec5e8 0%, #b9dcf0 38%, #cfe7f3 62%, #f7e6c4 100%)';
const NIGHT = 'linear-gradient(180deg, #0d1a33 0%, #1a2548 40%, #27305a 65%, #5b4a78 100%)';

function Stars() {
  const rand = seeded(7);
  const stars = Array.from({ length: 70 }, () => ({
    x: rand() * 100,
    y: rand() * 62,
    size: rand() < 0.15 ? 2.5 : 1.5,
    duration: 2 + rand() * 4,
    delay: -rand() * 6,
  }));
  return (
    <div className="night-only absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-[#fff8e1]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            ['--twinkle-duration' as string]: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Soft sun glow by day, moon with halo by night. */
function Sun() {
  return (
    <div className="absolute right-[8%] top-[10%] size-[min(46vw,420px)] md:right-[14%]">
      <div className="day-only absolute inset-0">
        <div className="absolute inset-0 animate-breathe rounded-full bg-[radial-gradient(closest-side,rgb(255_236_179/0.95),rgb(255_217_138/0.45)_45%,transparent)]" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(closest-side,#fff8e6,#ffe4a3)]" />
      </div>
      <div className="night-only absolute inset-0">
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(246_226_122/0.22),transparent)]" />
        <div className="absolute inset-[38%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_40%_40%,#fffbe9,#e8e0c4)]">
          <div className="absolute -right-[30%] -top-[10%] size-full rounded-full bg-[#1a2548]/85" />
        </div>
      </div>
    </div>
  );
}

/** Fixed, full-page sky behind everything. Day/night crossfade by opacity. */
export function Sky() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="day-only absolute inset-0" style={{ background: DAY }} />
      <div className="night-only absolute inset-0" style={{ background: NIGHT }} />
      <Stars />
      <Sun />
      <Clouds />
    </div>
  );
}
