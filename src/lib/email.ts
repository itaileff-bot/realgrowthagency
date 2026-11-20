import 'server-only';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { checkOfferEnv } from './offerEnv';

let client: SESv2Client | null = null;

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

/**
 * Sends one email through AWS SES. Returns false without sending when SES is
 * not configured, so callers can treat email as best effort. Throws on an
 * SES failure; callers log it and carry on.
 */
export async function sendEmail(message: { to: string; subject: string; text: string; html?: string }): Promise<boolean> {
  if (!checkOfferEnv().ses) return false;
  if (!client) {
    client = new SESv2Client({
      region: process.env.AWS_SES_REGION!.trim(),
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!.trim(),
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!.trim(),
      },
    });
  }
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: process.env.SES_FROM_EMAIL!.trim(),
      Destination: { ToAddresses: [message.to] },
      Content: {
        Simple: {
          Subject: { Data: message.subject, Charset: 'UTF-8' },
          Body: {
            Text: { Data: message.text, Charset: 'UTF-8' },
            ...(message.html ? { Html: { Data: message.html, Charset: 'UTF-8' } } : {}),
          },
        },
      },
    }),
  );
  return true;
}

/** Where owner notifications go. Falls back to the first configured owner. */
export function notifyAddress(): string | null {
  const explicit = process.env.LEAD_NOTIFY_EMAIL?.trim();
  if (explicit) return explicit;
  const owner = (process.env.ADMIN_OWNER_EMAILS || '').split(',')[0]?.trim();
  return owner || null;
}
