'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { useId } from 'react';

type Props = { x: MotionValue<number>; y: MotionValue<number>; decorative?: boolean };

const skin = '#d69b6b';
const skinShade = '#c0835a';
const hair = '#261a14';

/**
 * Illustrated stand-in character (not a photo), rigged like the real avatar:
 * body breathes, head leans toward the cursor, pupils follow it, eyes blink.
 * Replaced automatically once artwork exists in /public/avatar.
 */
export function PlaceholderAvatar({ x, y, decorative = false }: Props) {
  // Unique gradient ids — the hero and the docked companion can both be on the page.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const jacket = `av-jacket-${uid}`;
  const face = `av-face-${uid}`;
  const headX = useTransform(x, v => v * 7);
  const headY = useTransform(y, v => v * 4);
  const headRotate = useTransform(x, v => v * 4);
  const pupilX = useTransform(x, v => v * 4.5);
  const pupilY = useTransform(y, v => v * 3);

  return (
    <svg
      viewBox="0 0 400 520"
      className="h-auto w-full overflow-visible"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'Illustrated avatar of Danielraj' })}
    >
      <defs>
        <linearGradient id={jacket} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4457" />
          <stop offset="1" stopColor="#252936" />
        </linearGradient>
        <radialGradient id={face} cx="0.42" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#e6ae7f" />
          <stop offset="1" stopColor={skinShade} />
        </radialGradient>
      </defs>

      {/* Body — breathes from its base */}
      <g className="origin-bottom animate-breathe [transform-box:fill-box]">
        <path d="M58 520 C 62 408, 112 350, 200 340 C 288 350, 338 408, 342 520 Z" fill={`url(#${jacket})`} />
        <path d="M172 300 h56 v46 c-12 14 -44 14 -56 0 z" fill={skinShade} />
        <path d="M162 344 L200 424 L238 344 Z" fill="#1c1f28" />
        <path d="M148 342 L200 432 L176 350 Z" fill="#4b5268" />
        <path d="M252 342 L200 432 L224 350 Z" fill="#4b5268" />
        <path d="M200 432 V520" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        <path d="M92 430 C 110 400, 130 392, 150 396" stroke="#555d75" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Head — leans toward the pointer */}
      <motion.g style={{ x: headX, y: headY, rotate: headRotate, originX: 0.5, originY: 1 }}>
        <ellipse cx="124" cy="202" rx="14" ry="20" fill={skinShade} />
        <ellipse cx="276" cy="202" rx="14" ry="20" fill={skinShade} />
        <ellipse cx="200" cy="196" rx="76" ry="90" fill={`url(#${face})`} />

        {/* Hair: soft curls */}
        <g fill={hair}>
          <path d="M120 186 C 108 112, 150 80, 200 82 C 256 80, 298 112, 282 190 C 276 152, 262 138, 240 132 C 220 148, 180 148, 160 136 C 140 142, 126 158, 120 186 Z" />
          <circle cx="140" cy="112" r="26" />
          <circle cx="174" cy="92" r="28" />
          <circle cx="214" cy="88" r="29" />
          <circle cx="252" cy="104" r="26" />
          <circle cx="274" cy="136" r="19" />
          <circle cx="128" cy="142" r="19" />
        </g>
        <path d="M186 96 C 196 84, 214 82, 226 90" stroke="#4a342a" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />

        {/* Beard + moustache */}
        <path
          d="M126 208 C 130 272, 168 302, 200 302 C 232 302, 270 272, 274 208 C 262 242, 242 252, 228 247 C 214 240, 186 240, 172 247 C 158 252, 138 242, 126 208 Z"
          fill="#2f221c"
        />
        <path d="M168 240 C 184 228, 216 228, 232 240 C 216 236, 184 236, 168 240 Z" fill="#2f221c" />
        <path d="M186 252 Q200 262 214 252" stroke="#e7b08a" strokeWidth="3" fill="none" strokeLinecap="round" />

        <ellipse cx="152" cy="224" rx="12" ry="6" fill="#e9826a" opacity="0.3" />
        <ellipse cx="248" cy="224" rx="12" ry="6" fill="#e9826a" opacity="0.3" />
        <path d="M200 198 Q195 220 205 225" stroke="#a8683f" strokeWidth="3" fill="none" strokeLinecap="round" />

        <path d="M150 168 Q168 159 186 166" stroke={hair} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M214 166 Q232 159 250 168" stroke={hair} strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Eyes — blink via a scaleY loop, pupils track the pointer */}
        <g className="origin-center animate-blink [transform-box:fill-box]">
          <ellipse cx="168" cy="191" rx="13" ry="9.5" fill="#fffdf7" />
          <ellipse cx="232" cy="191" rx="13" ry="9.5" fill="#fffdf7" />
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="168" cy="192" r="6.5" fill="#2a1c16" />
            <circle cx="232" cy="192" r="6.5" fill="#2a1c16" />
            <circle cx="170.5" cy="189" r="2.2" fill="#fff" />
            <circle cx="234.5" cy="189" r="2.2" fill="#fff" />
          </motion.g>
        </g>

        {/* Clear-frame glasses */}
        <g fill="rgb(255 255 255 / 0.1)" stroke="#f4efe4" strokeWidth="3">
          <rect x="140" y="171" width="56" height="42" rx="12" />
          <rect x="204" y="171" width="56" height="42" rx="12" />
        </g>
        <path d="M196 186 Q200 182 204 186 M140 186 L126 190 M260 186 L274 190" stroke="#f4efe4" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
