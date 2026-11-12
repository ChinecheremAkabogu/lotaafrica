import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BUDGET_RANGES,
  COUNTRIES,
  PROJECT_CATEGORIES,
  TIMELINES,
  projectSubmissionSchema,
  type ProjectSubmission,
} from "@/lib/project-schema";
import { submitProject } from "@/lib/submissions.functions";
import { LOTA_EMAIL, LOTA_TAGLINE } from "@/lib/site";
import { cn } from "@/lib/utils";

function Field({
  n,
  question,
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  n: number;
  question: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  htmlFor?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <p className="flex items-baseline gap-2 font-display text-lg font-bold">
        <span className="text-sm text-primary">{String(n).padStart(2, "0")}.</span> {question}
      </p>
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      {children}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly T[];
  value?: T;
  onChange: (v: T | undefined) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            type="button"
            role="radio"
            aria-checked={active}
            key={o}
            onClick={() => onChange(active ? undefined : o)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              active
                ? "border-transparent bg-sunset text-primary-foreground shadow-glow"
                : "border-input bg-background text-foreground hover:border-primary/50",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

const inputCls = "h-12 rounded-xl bg-background text-base";

export function ProjectForm() {
  const submit = useServerFn(submitProject);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectSubmission>({
    resolver: zodResolver(projectSubmissionSchema),
    defaultValues: { fullName: "", email: "", country: "", location: "", description: "" },
  });

  const onSubmit = async (values: ProjectSubmission) => {
    setServerError(null);
    try {
      await submit({ data: values });
      setDone(true);
      window.scrollTo({ top: document.getElementById("project-form")?.offsetTop ?? 0, behavior: "smooth" });
    } catch (e) {
      setServerError(
        e instanceof Error && e.message
          ? e.message
          : "Something went wrong. Please try again or email us directly.",
      );
    }
  };

  if (done) {
    return (
      <div className="animate-rise rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft md:p-14">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-sunset shadow-glow">
          <CheckCircle2 className="size-10 text-primary-foreground" />
        </span>
        <h3 className="mt-8 text-3xl font-extrabold md:text-4xl">We've received your project!</h3>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">Thank you for considering Lota.</p>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted-foreground">
          Your plans back home matter to us. Our team will review your submission and get in touch using the email address you
          provided. In the meantime, keep dreaming. We'll help you explore how to make it happen.
        </p>
        <p className="mt-8 font-serif text-2xl italic text-primary">{LOTA_TAGLINE}</p>
        <Button variant="outline" size="pill" className="mt-8" onClick={() => setDone(false)}>
          Submit another project
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-9 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10"
      aria-label="Project submission form"
    >
      <div className="grid gap-9 md:grid-cols-2">
        <Field n={1} question="What should we call you?" label="Full name" required error={errors.fullName?.message} htmlFor="fullName">
          <Input id="fullName" placeholder="Enter your full name" autoComplete="name" className={inputCls} {...register("fullName")} />
        </Field>
        <Field n={2} question="Where can we reach you?" label="Email address" required error={errors.email?.message} htmlFor="email">
          <Input id="email" type="email" placeholder="Enter your email address" autoComplete="email" className={inputCls} {...register("email")} />
        </Field>
        <Field n={3} question="Where are you currently based?" label="Country of residence" error={errors.country?.message}>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className={cn(inputCls, "w-full")} aria-label="Country of residence">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field n={5} question="Where would you like your project executed?" label="Project location" required error={errors.location?.message} htmlFor="location">
          <Input id="location" placeholder="City, State and Country" className={inputCls} {...register("location")} />
        </Field>
      </div>

      <Field n={4} question="What would you like to accomplish back home?" label="Project category" required error={errors.category?.message}>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <ChipGroup name="Project category" options={PROJECT_CATEGORIES} value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field n={6} question="Tell us a little about your plans." label="Project description" error={errors.description?.message} htmlFor="description">
        <Textarea
          id="description"
          rows={5}
          placeholder="Briefly describe what you want to build, buy or accomplish."
          className="rounded-xl bg-background text-base"
          {...register("description")}
        />
      </Field>

      <Field n={7} question="Do you have an estimated budget?" label="Estimated budget (optional)">
        <Controller
          control={control}
          name="budget"
          render={({ field }) => <ChipGroup name="Estimated budget" options={BUDGET_RANGES} value={field.value} onChange={field.onChange} />}
        />
      </Field>

      <Field n={8} question="When would you like to get started?" label="Preferred start">
        <Controller
          control={control}
          name="timeline"
          render={({ field }) => <ChipGroup name="Preferred start" options={TIMELINES} value={field.value} onChange={field.onChange} />}
        />
      </Field>

      <div className="space-y-2 rounded-2xl bg-muted p-5">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <Checkbox
                checked={field.value === true}
                onCheckedChange={(v) => field.onChange(v === true ? true : undefined)}
                className="mt-0.5 size-5"
                aria-label="I agree to be contacted"
              />
              <span>
                I agree to Lota Africa contacting me about my project and understand that my information will be handled according
                to the Privacy Policy.
              </span>
            </label>
          )}
        />
        {errors.consent && <p className="text-sm font-medium text-destructive">{errors.consent.message}</p>}
      </div>

      {serverError && (
        <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {serverError}{" "}
          <a href={`mailto:${LOTA_EMAIL}`} className="font-semibold underline">
            {LOTA_EMAIL}
          </a>
        </div>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Sending your project…
            </>
          ) : (
            <>
              Submit My Project <ArrowRight />
            </>
          )}
        </Button>
        <p className="text-sm italic text-muted-foreground">
          No commitment. No pressure. Just the first step towards making your plans happen.
        </p>
      </div>
      <p className="flex items-center gap-2 border-t border-border pt-6 text-sm text-muted-foreground">
        <Mail className="size-4 text-primary" /> Prefer email? Write to us at{" "}
        <a href={`mailto:${LOTA_EMAIL}`} className="font-semibold text-foreground underline-offset-4 hover:underline">
          {LOTA_EMAIL}
        </a>
      </p>
    </form>
  );
}
