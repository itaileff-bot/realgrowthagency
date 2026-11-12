import { ImageResponse } from 'next/og';

/**
 * Default social preview for the agency site (homepage and blog). Generated at
 * build time, so there is no binary asset to maintain. The proposal pages set
 * their own image explicitly and are not affected.
 */
export const alt = 'Real Growth Agency: websites, brands and AI marketing for startups';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(135deg, #f8f7ff 0%, #ffffff 50%, #fff5f5 100%)',
          color: '#1a1a2e',
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(90deg, #6C3CE9, #FF6B6B)',
            color: '#ffffff',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          RG
        </div>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, marginTop: 40 }}>
          Real Growth Agency
        </div>
        <div style={{ display: 'flex', fontSize: 38, marginTop: 24, color: '#4a4a68' }}>
          Websites, brands and AI marketing for startups
        </div>
      </div>
    ),
    size,
  );
}
