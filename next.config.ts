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
  async redirects() {
    return [
      {
        // Short, shareable link for the Project Rhapsody world proposal.
        source: '/ProjectRhapsodyWorld',
        destination: '/proposals/checkpoint/rhapsody/world',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
