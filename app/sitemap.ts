import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl.replace(/\/$/, '');
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(p => ({ url: `${base}/work/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
