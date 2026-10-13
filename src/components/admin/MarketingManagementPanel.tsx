'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { planAsMarkdown, type MarketingBrief, type MarketingRun } from '@/lib/marketingManagement/planner';

const initialBrief: MarketingBrief = {
  audience: 'Startup founders and small business owners in the US',
  goal: 'Book discovery calls for brand, website and AI marketing projects',
  tone: 'Direct, confident, plain English',
  publicFacts: '',
  competitorNotes: '',
  campaign: 'discovery-calls',
  mode: 'templates',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

/** Word-compatible export: an HTML document Word opens natively as .doc. */
function runAsWordHtml(run: MarketingRun): string {
  const block = (title: string, body: string) =>
    `<h2>${escapeHtml(title)}</h2>${body.split('\n').map((line) => `<p>${escapeHtml(line) || '&nbsp;'}</p>`).join('')}`;
  return [
    '<html><head><meta charset="utf-8"><title>Real Growth Agency marketing draft</title></head><body style="font-family:Calibri,Arial,sans-serif">',
    '<h1>Real Growth Agency marketing draft</h1>',
    `<p>Run: ${escapeHtml(run.id)}<br>Generated: ${escapeHtml(run.generatedAt)}<br>Provider: ${escapeHtml(run.provider)}</p>`,
    `<p><em>${escapeHtml(run.notice)}</em></p>`,
    ...run.plan.documents.map((item) => block(item.title, item.body)),
    ...run.plan.drafts.map((item) => block(`${item.channel}: ${item.title}`, item.body)),
    `<h2>Review checklist</h2><ul>${run.plan.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`,
    `<h2>Research links</h2><ul>${run.plan.researchLinks.map((link) => `<li>${escapeHtml(link.label)}: ${escapeHtml(link.url)}</li>`).join('')}</ul>`,
    '</body></html>',
  ].join('');
}

export function MarketingManagementPanel() {
  const [brief, setBrief] = useState(initialBrief);
  const [run, setRun] = useState<MarketingRun | null>(null);
  const [history, setHistory] = useState<MarketingRun[]>([]);
  const [busy, setBusy] = useState(false);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const active = useRef(true);
  const generation = useRef<AbortController | null>(null);
  const historyRequest = useRef<AbortController | null>(null);
  const historyVersion = useRef(0);

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      generation.current?.abort();
      historyRequest.current?.abort();
    };
  }, []);

  function change(key: keyof MarketingBrief, value: string) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (generation.current) return;
    const controller = new AbortController();
    generation.current = controller;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/admin/marketing-management', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; run?: MarketingRun; error?: string; reference?: string };
      if (response.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      if (!response.ok || !data.ok || !data.run) throw new Error((data.error || 'Draft could not be created.') + (data.reference ? ' Reference: ' + data.reference : ''));
      if (!active.current) return;
      const created = data.run;
      setRun(created);
      historyVersion.current += 1;
      historyRequest.current?.abort();
      setHistory((current) => [created, ...current.filter((item) => item.id !== created.id)].slice(0, 10));
      setMessage('Draft saved. Review every document and channel before use.');
    } catch (failure) {
      if (active.current && !controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'Draft could not be created.');
    } finally {
      generation.current = null;
      if (active.current) setBusy(false);
    }
  }

  async function loadHistory() {
    if (historyRequest.current) return;
    const controller = new AbortController();
    historyRequest.current = controller;
    const version = ++historyVersion.current;
    setHistoryBusy(true);
    setError('');
    try {
      const response = await fetch('/api/admin/marketing-management', { cache: 'no-store', credentials: 'include', signal: controller.signal });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; runs?: MarketingRun[]; error?: string };
      if (response.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      if (!response.ok || !data.ok || !Array.isArray(data.runs)) throw new Error(data.error || 'History could not be loaded.');
      if (active.current && version === historyVersion.current) {
        setHistory(data.runs);
        setMessage(data.runs.length ? 'Recent drafts loaded.' : 'No saved marketing drafts yet.');
      }
    } catch (failure) {
      if (active.current && !controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'History could not be loaded.');
    } finally {
      historyRequest.current = null;
      if (active.current) setHistoryBusy(false);
    }
  }

  async function copyDraft() {
    if (!run) return;
    try {
      await navigator.clipboard.writeText(planAsMarkdown(run));
      setMessage('Draft copied.');
    } catch {
      setError('Clipboard access is unavailable. Use Download for Word instead.');
    }
  }

  function downloadDraft() {
    if (!run) return;
    const objectUrl = URL.createObjectURL(new Blob(['﻿', runAsWordHtml(run)], { type: 'application/msword' }));
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = 'rga-marketing-' + run.brief.campaign.replace(/[^a-z0-9-]+/gi, '-').slice(0, 40) + '-' + run.id.slice(0, 8) + '.doc';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  return (
    <>
      <section className="adm-card">
        <p className="adm-note">Template mode makes no external AI request. Optional Gemini drafting uses the server key and may incur provider charges. Use public information only: no client confidential data.</p>
        <form onSubmit={(event) => void generate(event)} style={{ marginTop: 16 }}>
          <fieldset className="adm-form" disabled={busy}>
            <label htmlFor="marketing-audience">Target audience
              <input id="marketing-audience" required minLength={3} maxLength={200} value={brief.audience} onChange={(event) => change('audience', event.target.value)} />
            </label>
            <label htmlFor="marketing-goal">Campaign goal
              <input id="marketing-goal" required minLength={3} maxLength={300} value={brief.goal} onChange={(event) => change('goal', event.target.value)} />
            </label>
            <label htmlFor="marketing-tone">Brand tone
              <input id="marketing-tone" required minLength={3} maxLength={200} value={brief.tone} onChange={(event) => change('tone', event.target.value)} />
            </label>
            <label htmlFor="marketing-campaign">Campaign name for UTM links
              <input id="marketing-campaign" required maxLength={80} value={brief.campaign} onChange={(event) => change('campaign', event.target.value)} />
            </label>
            <label htmlFor="marketing-facts">Additional public facts and source URLs
              <textarea id="marketing-facts" rows={4} maxLength={3000} value={brief.publicFacts} onChange={(event) => change('publicFacts', event.target.value)} />
            </label>
            <label htmlFor="marketing-competitors">Competitor observations and source URLs
              <textarea id="marketing-competitors" rows={4} maxLength={3000} value={brief.competitorNotes} onChange={(event) => change('competitorNotes', event.target.value)} />
            </label>
            <label htmlFor="marketing-mode">Drafting mode
              <select id="marketing-mode" value={brief.mode} onChange={(event) => change('mode', event.target.value)}>
                <option value="templates">Templates: no external AI call</option>
                <option value="gemini">Gemini: provider quota or billing applies</option>
              </select>
            </label>
            <button className="adm-btn" type="submit">{busy ? 'Preparing draft…' : 'Create marketing draft'}</button>
          </fieldset>
        </form>
        <div className="adm-row">
          <button className="adm-btn adm-btn-ghost" type="button" disabled={historyBusy || busy} onClick={() => void loadHistory()}>
            {historyBusy ? 'Loading drafts…' : 'Load recent drafts'}
          </button>
        </div>
        {error && <p className="adm-alert" role="alert">{error}</p>}
        {message && <p className="adm-ok" role="status">{message}</p>}
        {history.length > 0 && (
          <div className="adm-form" style={{ marginTop: 12 }}>
            <label htmlFor="marketing-history">Open a saved draft
              <select id="marketing-history" value={run?.id || ''} disabled={busy} onChange={(event) => {
                const selected = history.find((item) => item.id === event.target.value);
                if (selected) {
                  setRun(selected);
                  setBrief(selected.brief);
                  setMessage('Saved draft opened.');
                }
              }}>
                <option value="">Choose a draft</option>
                {history.map((item) => (
                  <option key={item.id} value={item.id}>{item.generatedAt} · {item.brief.campaign} · {item.provider}</option>
                ))}
              </select>
            </label>
          </div>
        )}
      </section>
      {run && (
        <section className="adm-card">
          <h2>Draft for review</h2>
          <p>{run.notice}</p>
          <p>Created {run.generatedAt} · {run.provider}{run.model ? ' · ' + run.model : ''}</p>
          <div className="adm-row">
            <button className="adm-btn" type="button" onClick={() => void copyDraft()}>Copy full draft</button>
            <button className="adm-btn adm-btn-ghost" type="button" onClick={downloadDraft}>Download for Word</button>
          </div>
          <h3>Shared strategy documents</h3>
          {run.plan.documents.map((document) => (
            <details key={document.title}><summary>{document.title}</summary><p>{document.body}</p></details>
          ))}
          <h3>Channel drafts</h3>
          {run.plan.drafts.map((draft) => (
            <details key={draft.channel}><summary>{draft.channel} · {draft.title}</summary><p>{draft.body}</p></details>
          ))}
          <h3>Manual research</h3>
          <ul>{run.plan.researchLinks.map((link) => (
            <li key={link.label}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
          ))}</ul>
          <h3>Review before publishing</h3>
          <ul>{run.plan.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      )}
    </>
  );
}
