import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "Build a house or home",
  "Buy land",
  "Buy a house or property",
  "Buy a car",
  "Start a business",
  "Manage or expand an existing business",
  "Build a commercial property",
  "Other project",
] as const;

export const BUDGET_RANGES = [
  "Below ₦5 million",
  "₦5 million – ₦20 million",
  "₦20 million – ₦50 million",
  "₦50 million – ₦100 million",
  "₦100 million – ₦250 million",
  "Above ₦250 million",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "Immediately",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "Just exploring for now",
] as const;

export const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Belgium",
  "Italy",
  "Spain",
  "Sweden",
  "Norway",
  "Finland",
  "Switzerland",
  "United Arab Emirates",
  "Qatar",
  "Saudi Arabia",
  "South Africa",
  "Ghana",
  "Kenya",
  "Nigeria",
  "Australia",
  "New Zealand",
  "China",
  "Japan",
  "Other",
] as const;

export const projectSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  category: z.enum(PROJECT_CATEGORIES, {
    errorMap: () => ({ message: "Please choose what you'd like to accomplish" }),
  }),
  location: z
    .string()
    .trim()
    .min(2, "Tell us where the project will be executed")
    .max(200, "Location is too long"),
  description: z.string().trim().max(3000, "Please keep this under 3,000 characters").optional().or(z.literal("")),
  budget: z.enum(BUDGET_RANGES).optional(),
  timeline: z.enum(TIMELINES).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so we can contact you about your project" }),
  }),
});

export type ProjectSubmission = z.infer<typeof projectSubmissionSchema>;
