// Usage: npm run admin:hash-password
// Prompts for the owner password (hidden) and prints the ADMIN_PASSWORD_HASH value.
import { randomBytes, scrypt } from 'node:crypto';
import { createInterface } from 'node:readline';

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
rl._writeToOutput = (text) => { if (!rl.muted) rl.output.write(text); };
rl.question('Owner password (12+ characters): ', (password) => {
  rl.muted = false;
  rl.close();
  process.stdout.write('\n');
  if (password.length < 12) {
    console.error('Password must be at least 12 characters.');
    process.exit(1);
  }
  const N = 32768, r = 8, p = 1;
  const salt = randomBytes(16);
  scrypt(password, salt, 64, { N, r, p, maxmem: 256 * N * r }, (error, key) => {
    if (error) { console.error('Hashing failed:', error.message); process.exit(1); }
    console.log(`ADMIN_PASSWORD_HASH=scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${key.toString('base64')}`);
  });
});
rl.muted = true;
