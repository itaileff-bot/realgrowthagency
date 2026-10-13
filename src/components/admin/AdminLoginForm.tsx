'use client';

import { useState, type FormEvent } from 'react';

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok || !data.ok) throw new Error((data.error || 'Sign in failed.') + (data.reference ? ' Reference: ' + data.reference : ''));
      setPassword('');
      // Full navigation so the server reads the new httpOnly cookie.
      window.location.assign('/admin');
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Sign in failed.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)}>
      <fieldset className="adm-form" disabled={busy}>
        <label htmlFor="admin-email">Email
          <input id="admin-email" type="email" autoComplete="username" required maxLength={200} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label htmlFor="admin-password">Password
          <input id="admin-password" type="password" autoComplete="current-password" required maxLength={200} value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error && <p className="adm-alert" role="alert">{error}</p>}
        <button className="adm-btn" type="submit">{busy ? 'Signing in…' : 'Sign in'}</button>
      </fieldset>
    </form>
  );
}
