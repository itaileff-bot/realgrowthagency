'use client';

import { useState } from 'react';

export default function TrainingCheckoutButton({ label }: { label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function start() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/training/checkout', { method: 'POST' });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; url?: string; error?: string } | null;
      if (!response.ok || !result?.ok || !result.url) {
        setError(result?.error || 'We could not start the payment. Please try again.');
        setBusy(false);
        return;
      }
      window.location.assign(result.url);
    } catch {
      setError('We could not reach the server. Check your connection and try again.');
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="btn-primary offer-full" onClick={start} disabled={busy}>
        {busy ? 'Opening secure checkout...' : label}
      </button>
      {error && (
        <p className="offer-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
