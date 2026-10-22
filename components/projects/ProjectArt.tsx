import Image from 'next/image';
import type { Project } from '@/content/projects';

/**
 * Generated cover illustration for a case study: a painterly sky in the
 * project's palette, a rolling hill, and a motif for the product. Motifs move
 * on card hover (transform only). Decorative.
 */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        width={1440}
        height={900}
        sizes="(min-width:1024px) 60vw, 100vw"
        className={`${className} object-cover object-top`}
      />
    );
  }
  const [a, b] = project.palette;
  const id = `art-${project.slug}`;

  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={b} />
          <stop offset="1" stopColor={a} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6d8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6d8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id}-sky)`} />
      <circle cx="470" cy="90" r="120" fill={`url(#${id}-sun)`} />
      {/* soft clouds */}
      <g fill="#fff" opacity="0.35" className="transition-transform duration-[1.5s] ease-out group-hover:translate-x-6">
        <ellipse cx="120" cy="80" rx="70" ry="18" />
        <ellipse cx="160" cy="68" rx="40" ry="20" />
        <ellipse cx="380" cy="140" rx="60" ry="14" />
      </g>

      <g className="origin-center transition-transform duration-700 ease-out [transform-box:fill-box] group-hover:scale-105">
        {project.art === 'radar' && <Radar />}
        {project.art === 'keys' && <Keys />}
        {project.art === 'chat' && <Chat />}
        {project.art === 'orbit' && <Orbit />}
      </g>

      {/* hills */}
      <path d="M0 330 C 120 290, 230 310, 330 320 C 440 330, 520 290, 600 300 V400 H0 Z" fill="#000" opacity="0.12" />
      <path d="M0 360 C 160 330, 300 370, 420 350 C 500 338, 560 346, 600 352 V400 H0 Z" fill="#000" opacity="0.2" />
    </svg>
  );
}

const ink = 'rgb(28 40 48 / 0.78)';
const paper = 'rgb(255 253 247 / 0.9)';

/** Rotating layers use absolute coordinates + a view-box origin so they spin about the motif's centre. */
const spin = (duration: number, cx: number, cy: number) => ({
  className: 'animate-orbit',
  style: { ['--orbit-duration' as string]: `${duration}s`, transformBox: 'view-box' as const, transformOrigin: `${cx}px ${cy}px` },
});

function Radar() {
  return (
    <g>
      <path d="M300 80 A120 120 0 0 1 404 140 L300 200 Z" fill={paper} opacity="0.35" {...spin(8, 300, 200)} />
      <g transform="translate(300 200)">
      {[40, 80, 120].map(r => (
        <circle key={r} r={r} fill="none" stroke={paper} strokeWidth="2" opacity={0.9 - r / 200} />
      ))}
      <circle cx="50" cy="-40" r="7" fill="#fff" />
      <circle cx="-70" cy="30" r="5" fill="#fff" opacity="0.8" />
      <circle cx="20" cy="80" r="6" fill={ink} />
      {/* shield */}
      <path d="M0 -34 L28 -22 V4 C 28 24, 14 36, 0 42 C -14 36, -28 24, -28 4 V-22 Z" fill={ink} />
      <path d="M-10 2 L-2 10 L12 -8" stroke={paper} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

function Keys() {
  const nodes = [
    [170, 130], [300, 100], [430, 140], [220, 240], [380, 250], [300, 180],
  ];
  return (
    <g>
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={paper} strokeWidth="1.5" opacity="0.35" />
        )),
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 0 : 12} fill={i % 2 ? paper : ink} />
      ))}
      {/* padlock at the hub */}
      <g transform="translate(300 180)">
        <path d="M-18 -6 V-20 C -18 -34, 18 -34, 18 -20 V-6" stroke={ink} strokeWidth="7" fill="none" />
        <rect x="-28" y="-8" width="56" height="44" rx="10" fill={ink} />
        <circle cy="10" r="6" fill={paper} />
      </g>
    </g>
  );
}

function Chat() {
  return (
    <g>
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-2">
        <rect x="140" y="110" width="220" height="64" rx="22" fill={paper} />
        <path d="M170 172 l-8 22 l26 -20 z" fill={paper} />
        <rect x="165" y="132" width="140" height="8" rx="4" fill={ink} opacity="0.5" />
        <rect x="165" y="150" width="90" height="8" rx="4" fill={ink} opacity="0.35" />
      </g>
      <g className="transition-transform delay-100 duration-700 ease-out group-hover:-translate-y-2">
        <rect x="250" y="200" width="210" height="76" rx="22" fill={ink} />
        <path d="M430 274 l10 22 l-28 -20 z" fill={ink} />
        <rect x="275" y="222" width="150" height="8" rx="4" fill={paper} opacity="0.8" />
        <rect x="275" y="240" width="110" height="8" rx="4" fill={paper} opacity="0.6" />
        <rect x="275" y="256" width="60" height="6" rx="3" fill="#ffd98a" />
      </g>
    </g>
  );
}

function Orbit() {
  const [cx, cy] = [300, 195];
  return (
    <g>
      <circle cx={cx} cy={cy} r="95" fill="none" stroke={paper} strokeWidth="2" strokeDasharray="4 8" opacity="0.7" />
      <circle cx={cx} cy={cy} r="55" fill="none" stroke={paper} strokeWidth="2" opacity="0.45" />
      <g {...spin(18, cx, cy)}>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <circle
            key={deg}
            cx={cx + Math.cos((deg * Math.PI) / 180) * 95}
            cy={cy + Math.sin((deg * Math.PI) / 180) * 95}
            r={i % 2 ? 9 : 13}
            fill={i % 2 ? ink : paper}
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="30" fill={ink} />
      <path d={`M${cx - 10} ${cy - 2} L${cx} ${cy + 10} L${cx + 14} ${cy - 12}`} stroke={paper} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
