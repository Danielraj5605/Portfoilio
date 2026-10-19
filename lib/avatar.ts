import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export const POSES = ['idle', 'wave', 'pointing', 'thinking', 'laptop'] as const;
export type Pose = (typeof POSES)[number];

export type AvatarLayers = { body: string; head: string; pupils?: string };
export type AvatarAssets = {
  /** Single-image poses, e.g. /avatar/wave.webp */
  poses: Partial<Record<Pose, string>>;
  /** Optional layered rigs for eye/head tracking, e.g. /avatar/idle-head.png */
  layers: Partial<Record<Pose, AvatarLayers>>;
};

const EXTS = ['webp', 'png', 'avif'];

/**
 * Finds avatar artwork in public/avatar at build time. Missing files fall back
 * to the built-in illustrated placeholder, so the site works before art lands.
 */
export function getAvatarAssets(): AvatarAssets {
  const dir = path.join(process.cwd(), 'public', 'avatar');
  const files = fs.existsSync(dir) ? new Set(fs.readdirSync(dir)) : new Set<string>();
  const find = (base: string) => {
    const ext = EXTS.find(e => files.has(`${base}.${e}`));
    return ext ? `/avatar/${base}.${ext}` : undefined;
  };

  const assets: AvatarAssets = { poses: {}, layers: {} };
  for (const pose of POSES) {
    const single = find(pose);
    if (single) assets.poses[pose] = single;
    const body = find(`${pose}-body`);
    const head = find(`${pose}-head`);
    if (body && head) assets.layers[pose] = { body, head, pupils: find(`${pose}-pupils`) };
  }
  return assets;
}
