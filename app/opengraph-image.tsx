import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const alt = `${profile.fullName} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated social card: meadow sky, sun glow and hills — no photo. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 88px',
          background: 'linear-gradient(180deg, #8ec5e8 0%, #cfe7f3 60%, #f7e6c4 100%)',
          position: 'relative',
          color: '#1c2830',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 40,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: 'radial-gradient(closest-side, rgba(255,236,179,0.95), rgba(255,217,138,0.4) 50%, transparent)',
          }}
        />
        <svg width="1200" height="220" viewBox="0 0 1440 320" style={{ position: 'absolute', left: 0, bottom: 0 }}>
          <path d="M0 220 C 180 120, 340 150, 520 170 C 700 190, 820 80, 1020 110 C 1200 140, 1320 190, 1440 150 L1440 320 L0 320 Z" fill="#a9c79a" />
          <path d="M0 250 C 260 190, 520 300, 780 260 C 1040 220, 1220 170, 1440 210 L1440 320 L0 320 Z" fill="#3f6b45" />
        </svg>
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: '#4d5a62', display: 'flex' }}>
          {profile.title}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 12, display: 'flex' }}>{profile.fullName}</div>
        <div style={{ fontSize: 36, marginTop: 20, maxWidth: 820, lineHeight: 1.3, display: 'flex' }}>{profile.headline}</div>
      </div>
    ),
    size,
  );
}
