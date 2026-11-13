import nodemailer from "nodemailer";
import type { ProjectSubmission } from "./project-schema";
import { buildNotificationEmail } from "./notification-email";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function gmailSmtpCredentials(): { user: string; pass: string } | undefined {
  const user = process.env["GMAIL_USER"]?.trim();
  const pass = process.env["GMAIL_APP_PASSWORD"]?.replace(/\s+/g, "");
  if (!user || !pass) return undefined;
  return { user, pass };
}

/** Sends through Gmail SMTP. Used on Vercel, where Lovable's connector is not available. */
async function sendViaGmailSmtp(values: ProjectSubmission, reference: string, user: string, pass: string): Promise<void> {
  const email = buildNotificationEmail(values, reference);
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  try {
    await transport.sendMail({
      from: user,
      to: email.to,
      replyTo: { name: values.fullName.replace(/[\r\n]+/g, " ").trim(), address: email.replyTo },
      subject: email.subject,
      html: email.html,
    });
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "connection";
    const detail = error instanceof Error && error.message ? error.message : "Could not reach smtp.gmail.com";
    throw new Error(`Gmail SMTP failed (${code}): ${detail}`);
  }
}

/** Sends through Lovable's Gmail connector. Used when this app is hosted on Lovable. */
async function sendViaLovableGateway(raw: string): Promise<void> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) throw new Error("Gmail connection is not configured");

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

/** Sends the new-project notification to the Lota inbox. */
export async function sendSubmissionToLotaInbox(values: ProjectSubmission, reference: string): Promise<void> {
  const smtp = gmailSmtpCredentials();
  if (smtp) {
    await sendViaGmailSmtp(values, reference, smtp.user, smtp.pass);
    return;
  }

  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) {
    throw new Error("Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
  }
  await sendViaLovableGateway(buildNotificationEmail(values, reference).raw);
}
