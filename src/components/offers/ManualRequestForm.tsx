'use client';

import { useState, type FormEvent } from 'react';

type Props = {
  /** 'api' saves the lead on our server. 'fallback' posts to the same form relay the contact form uses. */
  mode: 'api' | 'fallback';
  thanksUrl: string;
};

const FALLBACK_ACTION = 'https://formsubmit.co/itai.leff@gmail.com';

export default function ManualRequestForm({ mode, thanksUrl }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (mode !== 'api') return; // native POST to the form relay
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/manual-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          company: String(data.get('company') || ''),
        }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; downloadUrl?: string } | null;
      if (!response.ok || !result?.ok || !result.downloadUrl) {
        setError(result?.error || 'Something went wrong. Please try again.');
        setStatus('idle');
        return;
      }
      setDownloadUrl(result.downloadUrl);
      setStatus('done');
    } catch {
      setError('We could not reach the server. Check your connection and try again.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className="offer-form-card" role="status">
        <h2>Your manual is ready</h2>
        <p>We have also emailed you the link so you can find it later.</p>
        <a className="btn-primary offer-full" href={downloadUrl} download>
          Download the manual (PDF)
        </a>
        <p className="offer-small">
          Want a guide while you build? <a href="/website-training">See the live training</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact-form offer-form-card"
      onSubmit={onSubmit}
      action={mode === 'fallback' ? FALLBACK_ACTION : undefined}
      method={mode === 'fallback' ? 'POST' : undefined}
    >
      <h2>Get the free manual</h2>
      {mode === 'fallback' && (
        <>
          <input type="hidden" name="_subject" value="Free Website Manual request - Real Growth Agency" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={thanksUrl} />
          <input type="text" name="_honey" className="offer-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </>
      )}
      <div className="form-group">
        <label htmlFor="manual-name">First name</label>
        <input id="manual-name" type="text" name="name" autoComplete="given-name" maxLength={100} required />
      </div>
      <div className="form-group">
        <label htmlFor="manual-email">Email</label>
        <input id="manual-email" type="email" name="email" autoComplete="email" maxLength={200} required />
      </div>
      {mode === 'api' && (
        <div className="offer-hp" aria-hidden="true">
          <label htmlFor="manual-company">Company</label>
          <input id="manual-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      )}
      {error && (
        <p className="offer-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary offer-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send me the manual'}
      </button>
      <p className="offer-small">
        We will email you the manual and occasional website tips. Unsubscribe any time.
      </p>
    </form>
  );
}
