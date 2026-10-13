import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { checkAdminEnv } from '@/lib/adminEnv';
import { getOwnerSession } from '@/lib/apiSecurity';
import { MarketingManagementPanel } from '@/components/admin/MarketingManagementPanel';
import { LogoutButton } from '@/components/admin/LogoutButton';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Marketing workspace', robots: { index: false, follow: false } };

export default async function MarketingManagementPage() {
  if (!checkAdminEnv().ok) redirect('/admin/login');
  const owner = await getOwnerSession();
  if (!owner) redirect('/admin/login');
  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <Link href="/admin" className="adm-btn adm-btn-ghost">Back to Owner Admin</Link>
        <LogoutButton />
      </div>
      <p className="adm-eyebrow">Owner Admin · Marketing</p>
      <h1>Marketing workspace</h1>
      <p>Prepare strategy documents, channel drafts and campaign links from public agency facts and your brief. Review and export before publishing.</p>
      <MarketingManagementPanel />
    </div>
  );
}
