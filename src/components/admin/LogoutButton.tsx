'use client';

import { useState } from 'react';

export function LogoutButton() {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } finally {
      window.location.assign('/admin/login');
    }
  }
  return (
    <button type="button" className="adm-btn adm-btn-ghost" disabled={busy} onClick={() => void logout()}>
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
