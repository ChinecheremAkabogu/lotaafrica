import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { supabase } from "@/integrations/supabase/client";
import { projectSubmissionSchema } from "./project-schema";
import { LOTA_EMAIL } from "./site";

export const submitProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();

    // 1. Store the submission so no lead is ever lost.
    const { error } = await supabase.from("project_submissions").insert({
      id,
      full_name: data.fullName,
      email: data.email,
      country: data.country || null,
      category: data.category,
      location: data.location,
      description: data.description || null,
      budget: data.budget ?? null,
      timeline: data.timeline ?? null,
      consent: data.consent,
    });
    if (error) {
      console.error("Failed to store project submission", error.message);
      throw new Error("We couldn't save your project just now. Please try again in a moment.");
    }

    // 2. Email the submission to the Lota inbox through the FormSubmit relay.
    let emailed = false;
    try {
      const origin =
        getRequestHeader("origin") ??
        (getRequestHeader("host") ? `https://${getRequestHeader("host")}` : "https://lota.africa");
      const res = await fetch(`https://formsubmit.co/ajax/${LOTA_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/start-a-project`,
        },
        body: JSON.stringify({
          _subject: `New Lota project: ${data.category} — ${data.fullName}`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          "Reference": id,
          "Full name": data.fullName,
          "Email": data.email,
          "Country of residence": data.country || "Not provided",
          "Project category": data.category,
          "Project location": data.location,
          "Project description": data.description || "Not provided",
          "Estimated budget": data.budget ?? "Not provided",
          "Preferred start": data.timeline ?? "Not provided",
          "Submitted at": new Date().toISOString(),
        }),
      });
      const body = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      emailed = res.ok && (body?.success === true || body?.success === "true");
      if (!emailed) console.error("FormSubmit relay did not confirm delivery", res.status, body?.message);
    } catch (err) {
      console.error("FormSubmit relay failed", err instanceof Error ? err.message : err);
    }

    return { ok: true as const, id, emailed };
  });
