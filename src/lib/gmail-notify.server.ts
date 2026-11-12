import type { ProjectSubmission } from "./project-schema";
import { buildNotificationEmail } from "./notification-email";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

/** Sends the new-project notification from the connected Lota Gmail account to the Lota inbox. */
export async function sendSubmissionToLotaInbox(values: ProjectSubmission, reference: string): Promise<void> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) throw new Error("Gmail connection is not configured");

  const { raw } = buildNotificationEmail(values, reference);
  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gmail send failed [${res.status}]: ${body}`);
  }
}
