/**
 * Server-only environment validation for the owner admin area.
 *
 * The public marketing site must keep building and serving when these are
 * absent, so validation is reported at startup (instrumentation.ts) and
 * enforced at request time: every admin page and API fails closed with a
 * safe message if a required variable is missing or malformed.
 */

export const REQUIRED_ADMIN_ENV = [
  'ADMIN_SESSION_SECRET',
  'ADMIN_OWNER_EMAILS',
  'ADMIN_PASSWORD_HASH',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
] as const;

export type AdminEnvReport = { ok: boolean; missing: string[]; invalid: string[] };

export function checkAdminEnv(env: NodeJS.ProcessEnv = process.env): AdminEnvReport {
  const missing = REQUIRED_ADMIN_ENV.filter((name) => !env[name]?.trim());
  const invalid: string[] = [];
  const secret = env.ADMIN_SESSION_SECRET?.trim() || '';
  if (secret && secret.length < 32) invalid.push('ADMIN_SESSION_SECRET (needs 32+ characters)');
  const hash = env.ADMIN_PASSWORD_HASH?.trim() || '';
  if (hash && !/^scrypt\$\d+\$\d+\$\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/.test(hash)) {
    invalid.push('ADMIN_PASSWORD_HASH (run: npm run admin:hash-password)');
  }
  const key = env.FIREBASE_PRIVATE_KEY || '';
  if (key && !key.includes('PRIVATE KEY')) invalid.push('FIREBASE_PRIVATE_KEY (not a PEM key)');
  return { ok: missing.length === 0 && invalid.length === 0, missing: [...missing], invalid };
}

export class AdminConfigError extends Error {
  constructor() {
    super('ADMIN_NOT_CONFIGURED');
  }
}

export function requireAdminEnv(): void {
  const report = checkAdminEnv();
  if (!report.ok) {
    // Names only; values are never logged.
    console.error('[admin-env] requireAdminEnv: admin area disabled', {
      missing: report.missing,
      invalid: report.invalid,
    });
    throw new AdminConfigError();
  }
}
