import 'server-only';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { requireAdminEnv } from './adminEnv';

let app: App | null = null;

/** Server-side Firestore. Client SDK access is denied by firestore.rules. */
export function getAdminDb(): Firestore {
  requireAdminEnv();
  if (!app) {
    app =
      getApps()[0] ||
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!.trim(),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!.trim(),
          // Vercel stores the PEM with literal \n sequences.
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
      });
  }
  return getFirestore(app);
}
