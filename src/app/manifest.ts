import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Real Growth Agency',
    short_name: 'Real Growth',
    description:
      'Websites, brands, apps and AI marketing engines built to be found, trusted and booked.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E8408A',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
