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
  async headers() {
    return [
      {
        // The manual is a lead magnet: keep the file itself out of search so
        // the landing page ranks instead of a direct link to the PDF.
        source: '/downloads/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
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
