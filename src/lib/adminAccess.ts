/**
 * Owner allowlist. Only addresses in ADMIN_OWNER_EMAILS (comma separated)
 * plus the developer address may hold an owner session. The developer
 * address still needs the owner password: an email alone never grants
 * access, because the login form cannot prove who typed it.
 */
export const DEVELOPER_EMAIL = 'itai.leff@gmail.com';

export function ownerEmails(env: NodeJS.ProcessEnv = process.env): Set<string> {
  const list = (env.ADMIN_OWNER_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item));
  return new Set([...list, DEVELOPER_EMAIL]);
}

export function isOwnerEmail(email: string | null | undefined, env: NodeJS.ProcessEnv = process.env): boolean {
  const normalized = (email || '').trim().toLowerCase();
  if (!normalized) return false;
  return ownerEmails(env).has(normalized);
}
