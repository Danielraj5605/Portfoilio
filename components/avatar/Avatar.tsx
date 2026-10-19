'use client';

import Image from 'next/image';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import type { AvatarAssets, AvatarLayers, Pose } from '@/lib/avatar';
import { usePointerTracking } from '@/lib/hooks/usePointerTracking';
import { PlaceholderAvatar } from './PlaceholderAvatar';
import { SpeechBubble } from './SpeechBubble';

type Props = {
  assets: AvatarAssets;
  pose?: Pose;
  bubble?: string | null;
  /** The hero avatar is above the fold — load it eagerly */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Which side of the figure the speech bubble opens toward */
  bubbleSide?: 'left' | 'right';
  /** Purely decorative copy (e.g. the docked companion) — no accessible name */
  decorative?: boolean;
};

const FALLBACK_ORDER: Pose[] = ['idle', 'wave', 'pointing', 'thinking', 'laptop'];

function resolve<T>(map: Partial<Record<Pose, T>>, pose: Pose): [Pose, T] | null {
  for (const p of [pose, ...FALLBACK_ORDER]) if (map[p]) return [p, map[p] as T];
  return null;
}

/** Layered rig: body breathes, head leans, pupils track further than the head. */
function LayeredRig({ layers, x, y, priority, sizes }: { layers: AvatarLayers; x: MotionValue<number>; y: MotionValue<number>; priority?: boolean; sizes: string }) {
  const headX = useTransform(x, v => v * 8);
  const headY = useTransform(y, v => v * 5);
  const headRotate = useTransform(x, v => v * 3);
  const pupilX = useTransform(x, v => v * 12);
  const pupilY = useTransform(y, v => v * 8);
  return (
    <>
      <div className="absolute inset-0 origin-bottom animate-breathe">
        <Image src={layers.body} alt="" fill sizes={sizes} priority={priority} className="object-contain" />
      </div>
      <motion.div style={{ x: headX, y: headY, rotate: headRotate, originY: 0.6 }} className="absolute inset-0">
        {layers.pupils && (
          <motion.div style={{ x: pupilX, y: pupilY }} className="absolute inset-0">
            <Image src={layers.pupils} alt="" fill sizes={sizes} priority={priority} className="object-contain" />
          </motion.div>
        )}
        <Image src={layers.head} alt="" fill sizes={sizes} priority={priority} className="object-contain" />
      </motion.div>
    </>
  );
}

/**
 * The living avatar: floats, breathes, and reacts to the cursor.
 * Uses the richest artwork available in /public/avatar — a layered rig, then
 * single-image poses (tilt toward the cursor), then the illustrated placeholder.
 * Switching `pose` crossfades between poses (opacity only).
 */
export function Avatar({
  assets,
  pose = 'idle',
  bubble = null,
  priority,
  sizes = '(min-width: 768px) 40vw, 80vw',
  className = '',
  bubbleSide = 'right',
  decorative = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = usePointerTracking(ref);
  const tiltY = useTransform(x, v => v * 8);
  const tiltX = useTransform(y, v => v * -5);

  const layered = resolve(assets.layers, pose);
  const hasImages = Object.keys(assets.poses).length > 0;
  const active = resolve(assets.poses, pose)?.[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <SpeechBubble
        text={bubble}
        tail={bubbleSide === 'right' ? 'left' : 'right'}
        className={`absolute z-10 ${bubbleSide === 'right' ? '-top-2 left-[58%] md:left-[62%]' : '-top-10 right-[62%]'}`}
      />

      {/* Bottom fade lets a bust-length figure melt into the meadow */}
      <div className="animate-float [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]">
        {layered ? (
          <div className="relative aspect-[4/5]">
            <LayeredRig layers={layered[1]} x={x} y={y} priority={priority} sizes={sizes} />
          </div>
        ) : hasImages ? (
          <motion.div style={{ rotateY: tiltY, rotateX: tiltX, transformPerspective: 900 }} className="relative aspect-[4/5]">
            {(Object.entries(assets.poses) as [Pose, string][]).map(([p, src]) => (
              <div
                key={p}
                className="absolute inset-0 origin-bottom animate-breathe transition-opacity duration-700"
                style={{ opacity: p === active ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={p === active && !decorative ? 'Illustrated avatar of Danielraj' : ''}
                  fill
                  sizes={sizes}
                  priority={priority && p === active}
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <PlaceholderAvatar x={x} y={y} decorative={decorative} />
        )}
      </div>
    </div>
  );
}
