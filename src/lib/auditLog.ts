import 'server-only';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from './firebaseAdmin';

export type AuditEntry = {
  action: string;
  actorEmail: string;
  actorUid: string;
  details?: Record<string, unknown>;
};

/** Writes one admin audit record. Callers decide whether a failure is fatal. */
export async function writeAuditLog(entry: AuditEntry): Promise<void> {
  await getAdminDb()
    .collection('auditLogs')
    .add({ ...entry, details: entry.details || {}, createdAt: FieldValue.serverTimestamp() });
}
