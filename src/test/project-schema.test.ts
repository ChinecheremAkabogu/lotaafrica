import { describe, expect, it } from "vitest";
import { projectSubmissionSchema } from "@/lib/project-schema";

const valid = {
  fullName: "Ada Okafor",
  email: "ada@example.com",
  category: "Buy land",
  location: "Lekki, Lagos, Nigeria",
  consent: true,
};

describe("project submission rules", () => {
  it("accepts a submission with only the required fields", () => {
    expect(projectSubmissionSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a submission without consent to be contacted", () => {
    expect(projectSubmissionSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("requires name, email, category and location", () => {
    for (const key of ["fullName", "email", "category", "location"] as const) {
      const { [key]: _omit, ...rest } = valid;
      expect(projectSubmissionSchema.safeParse(rest).success).toBe(false);
    }
  });

  it("rejects a budget that is not one of the listed ranges", () => {
    expect(projectSubmissionSchema.safeParse({ ...valid, budget: "₦1 billion" }).success).toBe(false);
  });
});
