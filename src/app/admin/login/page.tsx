import { redirect } from 'next/navigation';
import { checkAdminEnv } from '@/lib/adminEnv';
import { getOwnerSession } from '@/lib/apiSecurity';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const configured = checkAdminEnv().ok;
  if (configured && (await getOwnerSession())) redirect('/admin');
  return (
    <div className="adm-wrap adm-login">
      <p className="adm-brand"><span>Real Growth</span> Agency</p>
      <div className="adm-card" style={{ marginTop: 16 }}>
        <p className="adm-eyebrow">Owner Admin</p>
        <h1>Sign in</h1>
        {configured ? (
          <AdminLoginForm />
        ) : (
          <p className="adm-alert" role="alert">Owner admin is not configured yet. Add the admin environment variables in Vercel, then redeploy.</p>
        )}
      </div>
      <p style={{ marginTop: 16 }}><a href="/" style={{ color: 'var(--primary)' }}>Back to the website</a></p>
    </div>
  );
}
