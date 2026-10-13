import type { Metadata } from 'next';
import '@/styles/admin.css';

// Private area: never indexed, never cached, never followed.
export const metadata: Metadata = {
  title: 'Owner Admin',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
