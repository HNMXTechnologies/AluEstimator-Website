import { z } from "zod";

export const TEAM_SIZES = ["1–2", "3–8", "9–15", "15+"] as const;
export const CURRENT_TOOLS = ["Notebook", "Excel", "Billing app", "Other"] as const;
export const PLAN_IDS = ["basic", "pro", "enterprise"] as const;

export const demoSchema = z.object({
  name: z.string().trim().min(2, { error: "Please enter your name" }).max(80),
  firm: z.string().trim().min(2, { error: "Please enter your firm's name" }).max(120),
  city: z.string().trim().min(2, { error: "Please enter your city" }).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|0091|91(?=\d{10}$)|0(?=\d{10}$))/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, { error: "Enter a 10-digit Indian mobile number" })),
  teamSize: z.enum(TEAM_SIZES, { error: "Choose your team size" }),
  currentTool: z.enum(CURRENT_TOOLS, { error: "Choose what you use today" }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  plan: z.enum(PLAN_IDS).optional(),
  /** Honeypot — real visitors never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type DemoInput = z.input<typeof demoSchema>;
export type DemoData = z.output<typeof demoSchema>;

export type DemoResult = { ok: true } | { ok: false; error: string };
