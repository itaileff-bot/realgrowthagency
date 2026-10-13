/**
 * Runs once when the Next.js server starts. Reports missing admin env vars
 * by name so a misconfigured deployment is visible in Vercel logs. It never
 * throws: the public site must stay up even when the admin area is not
 * configured.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const { checkAdminEnv } = await import('./lib/adminEnv');
  const report = checkAdminEnv();
  if (!report.ok) {
    console.warn('[startup] Owner admin area disabled until env vars are set', {
      missing: report.missing,
      invalid: report.invalid,
    });
  }
}
