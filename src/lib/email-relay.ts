import type { ProjectSubmission } from "./project-schema";
import { LOTA_EMAIL } from "./site";

/**
 * Emails a submission to the Lota inbox through the FormSubmit relay.
 * Runs in the browser so FormSubmit sees the real website as the sender.
 * Never throws: the submission is already stored, so email is best-effort.
 */
export async function emailSubmissionToLota(values: ProjectSubmission, reference: string): Promise<boolean> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${LOTA_EMAIL}`, {
      method: "POST",
      keepalive: true,
      signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Lota project: ${values.category} — ${values.fullName}`,
        _template: "table",
        _captcha: "false",
        _replyto: values.email,
        Reference: reference,
        "Full name": values.fullName,
        Email: values.email,
        "Country of residence": values.country || "Not provided",
        "Project category": values.category,
        "Project location": values.location,
        "Project description": values.description || "Not provided",
        "Estimated budget": values.budget ?? "Not provided",
        "Preferred start": values.timeline ?? "Not provided",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
