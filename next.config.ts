import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    // Tree-shake icon/animation barrels so only what's used ships.
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;
