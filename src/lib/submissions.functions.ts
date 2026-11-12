import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { projectSubmissionSchema } from "./project-schema";

/** Stores a project enquiry, then emails it to the Lota inbox via the connected Gmail account. */
export const submitProject = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => projectSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
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

    // The enquiry is already saved, so an email failure must not fail the visitor's submission.
    try {
      const { sendSubmissionToLotaInbox } = await import("./gmail-notify.server");
      await sendSubmissionToLotaInbox(data, id);
    } catch (e) {
      console.error("Failed to email project submission", id, e instanceof Error ? e.message : e);
    }
    return { ok: true as const, id };
  });
