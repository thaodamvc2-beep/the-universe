import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/the-universe',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
