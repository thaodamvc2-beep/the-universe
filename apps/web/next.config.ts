import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_ASSET_BASE_PATH: process.env.VERCEL ? '' : process.env.NEXT_PUBLIC_BASE_PATH ?? '/the-universe',
  },
  reactStrictMode: true,
  output: 'export',
  // GitHub Pages serves the app from /the-universe; Vercel serves this project at the domain root.
  basePath: process.env.VERCEL ? '' : process.env.NEXT_PUBLIC_BASE_PATH ?? '/the-universe',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
