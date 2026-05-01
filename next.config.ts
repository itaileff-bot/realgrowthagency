import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'drinkape.com',
      },
      {
        protocol: 'https',
        hostname: 'www.myfamousfinds.com',
      },
      {
        protocol: 'https',
        hostname: 'www.chefprepforyou.com',
      },
    ],
  },
};

export default nextConfig;
