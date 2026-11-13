import type { ProjectSubmission } from "./project-schema";
import { LOTA_EMAIL } from "./site";

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Strip line breaks so visitor input can never inject extra email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function submissionRows(values: ProjectSubmission, reference: string): [string, string][] {
  return [
    ["Full name", values.fullName],
    ["Email", values.email],
    ["Country of residence", values.country || "Not provided"],
    ["Project category", values.category],
    ["Project location", values.location],
    ["Project description", values.description || "Not provided"],
    ["Estimated budget", values.budget ?? "Not provided"],
    ["Preferred start", values.timeline ?? "Not provided"],
    ["Reference", reference],
  ];
}

/** Builds the RFC 2822 message (base64url) that notifies the Lota inbox of a new project. */
export function buildNotificationEmail(values: ProjectSubmission, reference: string) {
  const to = LOTA_EMAIL;
  const replyTo = oneLine(values.email);
  const subject = `New Lota project: ${oneLine(values.category)} — ${oneLine(values.fullName)}`;
  const rows = submissionRows(values, reference)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #f1e4d8;font-weight:600;color:#7a4a2a;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:10px 14px;border-bottom:1px solid #f1e4d8;color:#2a1a12;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,sans-serif">
<div style="max-width:640px;margin:0 auto;padding:24px">
<h2 style="margin:0 0 6px;color:#e2611d">New project enquiry</h2>
<p style="margin:0 0 18px;color:#5b4636">Someone just submitted a project on the Lota Africa website. Reply to this email to reach them directly.</p>
<table style="width:100%;border-collapse:collapse;border:1px solid #f1e4d8;border-radius:8px">${rows}</table>
</div></body></html>`;

  const message = [
    `To: ${to}`,
    `Reply-To: ${header(oneLine(values.fullName))} <${replyTo}>`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    b64(html).replace(/.{1,76}/g, "$&\r\n"),
  ].join("\r\n");

  return {
    to,
    replyTo,
    subject,
    html,
    raw: b64(message).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  };
}
