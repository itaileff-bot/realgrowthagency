---
module: admin, marketing-management
tags: [auth, firestore, rate-limit, audit, robots]
problem_type: best_practice
---
# Owner admin + Marketing Management on a site with no prior auth

Ported from the DrRobHealth marketing module (PR #534/#536). RGA had no login,
no Firebase and no env vars, so the host helpers the module expects were built here.

## Decisions
- Login is email + scrypt password hash (`ADMIN_PASSWORD_HASH`) checked server-side,
  then an HMAC-signed, httpOnly, SameSite=Strict cookie (8h). No Firebase client SDK,
  so no public Firebase config ships to browsers.
- The developer email is on the allowlist but still needs the password. An
  email-only bypass was rejected: the login form cannot prove who typed the email.
- Rate limits live in Firestore and FAIL CLOSED (admin routes only). Login: 10 per
  15 min per IP and per email. Marketing: 5 runs and 30 history reads per hour.
- Draft + audit record commit in one batch: no unlogged success.
- `firestore.rules` denies all client access; only the Admin SDK reads or writes.
- Missing env vars never break the public site: `instrumentation.ts` warns at
  startup, admin pages show "not configured", APIs return 503.
- robots: `/api/` blocked for all; `/admin/` blocked for AI crawlers only. Search
  crawlers must be able to fetch admin pages to read their noindex (same reasoning
  as `/proposals/`).

## Verified
Unit tests (`npm test`), mutation of the allowlist caught by tests, `next build`,
curl E2E of every deny path, 375px screenshots. Not verified: real Firestore writes,
Gemini, live login, until the Vercel env vars are set.
