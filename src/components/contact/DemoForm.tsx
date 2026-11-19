"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, useSyncExternalStore, useTransition, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { submitDemoRequest } from "@/app/contact/actions";
import { WhatsAppIcon, buttonClass } from "@/components/ui/Button";
import { plans } from "@/content/pricing";
import { site } from "@/content/site";
import { CURRENT_TOOLS, PLAN_IDS, TEAM_SIZES, demoSchema, type DemoData, type DemoInput } from "@/lib/demo-schema";
import { cn } from "@/lib/utils";

const inputCls =
  "min-h-12 w-full rounded-lg border bg-surface px-3.5 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25";

function Field({ label, error, hint, optional, children }: { label: string; error?: FieldError; hint?: string; optional?: boolean; children: (id: string, describedBy?: string) => ReactNode }) {
  const id = useId();
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children(id, describedBy)}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-[#b42318] dark:text-[#ff8a7a]">{error.message}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

function ChoiceGroup({ legend, name, options, register, error }: { legend: string; name: "teamSize" | "currentTool"; options: readonly string[]; register: ReturnType<typeof useForm<DemoInput>>["register"]; error?: FieldError }) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-1.5 text-sm font-medium text-ink">{legend}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => (
          <label
            key={o}
            className="relative flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-line-strong bg-surface px-2 text-center text-sm font-medium transition-colors hover:border-accent has-[:checked]:border-brand has-[:checked]:bg-accent-soft has-[:checked]:text-brand has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent dark:has-[:checked]:border-accent dark:has-[:checked]:text-accent"
          >
            <input type="radio" value={o} {...register(name)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-[#b42318] dark:text-[#ff8a7a]">{error.message}</p>}
    </fieldset>
  );
}

const noop = () => () => {};
/** ?plan= from pricing links, read on the client so the page stays fully static. */
function usePlanParam(): DemoInput["plan"] {
  const raw = useSyncExternalStore(
    noop,
    () => new URLSearchParams(window.location.search).get("plan"),
    () => null,
  );
  return (PLAN_IDS as readonly string[]).includes(raw ?? "") ? (raw as DemoInput["plan"]) : undefined;
}

export function DemoForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();
  const plan = usePlanParam();

  const { register, handleSubmit, formState: { errors } } = useForm<DemoInput, unknown, DemoData>({
    resolver: zodResolver(demoSchema),
    defaultValues: { message: "", website: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: DemoData) => {
    setServerError(undefined);
    startTransition(async () => {
      const res = await submitDemoRequest({ ...data, plan });
      if (res.ok) setDone(true);
      else setServerError(res.error);
    });
  };

  const planName = plans.find((p) => p.id === plan)?.name;

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-lift sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="mx-auto size-14 text-success" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">Thanks — we&apos;ll call you within one working day.</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">Want to talk sooner? Message us on WhatsApp and share a few window sizes from a current job.</p>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "lg", "mt-6")}>
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" exit={reduce ? undefined : { opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-5">
            <div>
              <h2 className="text-2xl font-semibold">Book a free demo</h2>
              <p className="mt-1 text-sm text-muted">
                {site.offer.demoMinutes} minutes, online or at your workshop.{planName ? ` You're interested in the ${planName} plan.` : ""}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                {(id, d) => <input id={id} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={d} {...register("name")} className={cn(inputCls, errors.name ? "border-[#b42318]" : "border-line-strong")} />}
              </Field>
              <Field label="Firm name" error={errors.firm}>
                {(id, d) => <input id={id} autoComplete="organization" aria-invalid={!!errors.firm} aria-describedby={d} {...register("firm")} className={cn(inputCls, errors.firm ? "border-[#b42318]" : "border-line-strong")} />}
              </Field>
              <Field label="City" error={errors.city}>
                {(id, d) => <input id={id} autoComplete="address-level2" aria-invalid={!!errors.city} aria-describedby={d} {...register("city")} className={cn(inputCls, errors.city ? "border-[#b42318]" : "border-line-strong")} />}
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone} hint="10-digit mobile number">
                {(id, d) => (
                  <div className={cn("flex items-center rounded-lg border bg-surface focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25", errors.phone ? "border-[#b42318]" : "border-line-strong")}>
                    <span className="pl-3.5 text-base text-muted">+91</span>
                    <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" aria-invalid={!!errors.phone} aria-describedby={d} {...register("phone")} className="min-h-12 w-full min-w-0 bg-transparent px-2.5 text-base text-ink outline-none" />
                  </div>
                )}
              </Field>
            </div>

            <ChoiceGroup legend="Team size" name="teamSize" options={TEAM_SIZES} register={register} error={errors.teamSize} />
            <ChoiceGroup legend="What do you use today?" name="currentTool" options={CURRENT_TOOLS} register={register} error={errors.currentTool} />

            <Field label="Message" optional error={errors.message}>
              {(id, d) => (
                <textarea
                  id={id}
                  rows={4}
                  aria-describedby={d}
                  placeholder="e.g. We do mostly 27mm sliding and domal windows, and send pipes for powder coating."
                  {...register("message")}
                  className={cn(inputCls, "min-h-28 resize-y py-3 border-line-strong")}
                />
              )}
            </Field>

            {/* honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
            </div>

            {serverError && (
              <p role="alert" className="rounded-lg border border-[#b42318]/30 bg-[#b42318]/8 px-4 py-3 text-sm text-[#b42318] dark:text-[#ff8a7a]">{serverError}</p>
            )}

            <button type="submit" disabled={pending} className={buttonClass("primary", "lg", "w-full sm:w-auto sm:justify-self-start")}>
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? "Sending…" : "Book my free demo"}
            </button>
            <p className="text-xs text-muted">
              We&apos;ll only use these details to arrange your demo. See our <a href="/legal/privacy" className="underline underline-offset-2">privacy policy</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
