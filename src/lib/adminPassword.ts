import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

/**
 * Hash format: scrypt$N$r$p$<salt base64>$<hash base64>
 * Generate with: npm run admin:hash-password
 */
const KEY_LENGTH = 64;

function scrypt(password: string, salt: Buffer, N: number, r: number, p: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, { N, r, p, maxmem: 256 * N * r }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashAdminPassword(password: string): Promise<string> {
  if (password.length < 12) throw new Error('PASSWORD_TOO_SHORT');
  const N = 32768;
  const r = 8;
  const p = 1;
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, N, r, p);
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyAdminPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.trim().split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (![N, r, p].every(Number.isInteger) || N < 16384 || N > 1048576 || r < 1 || r > 32 || p < 1 || p > 16) {
    return false;
  }
  const salt = Buffer.from(parts[4], 'base64');
  const expected = Buffer.from(parts[5], 'base64');
  if (salt.length < 16 || expected.length !== KEY_LENGTH) return false;
  const actual = await scrypt(password, salt, N, r, p);
  return timingSafeEqual(actual, expected);
}
