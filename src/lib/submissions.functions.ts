import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { projectSubmissionSchema } from "./project-schema";

/** Stores a project enquiry. Email delivery to the Lota inbox happens in the browser (see email-relay.ts). */
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
    return { ok: true as const, id };
  });
