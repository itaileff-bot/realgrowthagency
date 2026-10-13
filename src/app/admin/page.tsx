import { redirect } from 'next/navigation';
import { checkAdminEnv } from '@/lib/adminEnv';
import { getOwnerSession } from '@/lib/apiSecurity';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { RunMarketingManagementButton } from '@/components/admin/RunMarketingManagementButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  if (!checkAdminEnv().ok) redirect('/admin/login');
  const owner = await getOwnerSession();
  if (!owner) redirect('/admin/login');
  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <p className="adm-brand"><span>Real Growth</span> Agency</p>
        <LogoutButton />
      </div>
      <p className="adm-eyebrow">Owner Admin</p>
      <h1>Dashboard</h1>
      <p>Signed in as {owner.email}. Sessions expire after 8 hours.</p>
      <section className="adm-card">
        <h2>Marketing Management</h2>
        <p>Prepare five strategy documents and seven channel drafts (Article, LinkedIn, X, Reddit, Influencer, Video, GEO) from the public site facts and your brief. Nothing is published or sent automatically.</p>
        <div className="adm-row"><RunMarketingManagementButton /></div>
      </section>
      <p style={{ marginTop: 16 }}><a href="/" style={{ color: 'var(--primary)' }}>View the website</a></p>
    </div>
  );
}
