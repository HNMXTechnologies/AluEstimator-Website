"use server";

import { Resend } from "resend";
import { demoSchema, type DemoInput, type DemoResult } from "@/lib/demo-schema";
import { site } from "@/content/site";

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Receives a demo request and emails it to the sales inbox via Resend.
 * Env: RESEND_API_KEY, LEAD_TO_EMAIL (default sales@), LEAD_FROM_EMAIL.
 * Without RESEND_API_KEY (local development) the lead is logged to the console.
 */
export async function submitDemoRequest(input: DemoInput): Promise<DemoResult> {
  const parsed = demoSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the highlighted fields and try again." };
  const d = parsed.data;

  // Silently accept bot submissions without sending anything.
  if (d.website) return { ok: true };

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Firm", d.firm],
    ["City", d.city],
    ["Phone / WhatsApp", `+91 ${d.phone}`],
    ["Team size", d.teamSize],
    ["Uses today", d.currentTool],
    ["Interested plan", d.plan ?? "—"],
    ["Message", d.message || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[demo request — RESEND_API_KEY not set, not emailed]\n${text}`);
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL ?? "AluEstimator Website <onboarding@resend.dev>",
      to: process.env.LEAD_TO_EMAIL ?? site.emails.sales,
      subject: `Demo request: ${d.firm}, ${d.city}`,
      text,
      html: `<h2>New demo request</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${escape(k)}</b></td><td>${escape(v)}</td></tr>`)
        .join("")}</table>`,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (e) {
    console.error("Demo request email failed", e);
    return {
      ok: false,
      error: `Sorry, we couldn't send that. Please WhatsApp or call us on ${site.phoneDisplay}.`,
    };
  }
}
