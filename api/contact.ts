import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* Override via env vars — see .env.example. */
const TO = process.env.CONTACT_TO ?? "sheliftorgan@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "SHELIFT Website <onboarding@resend.dev>";

/* Input guards — reject anything longer than a real enquiry would ever be. */
const LIMITS = { name: 100, email: 254, organization: 150, reason: 100, message: 5000 };
const MIN_MESSAGE = 10;

/* In-memory burst limiter: 5 submissions per IP per 15 min per instance. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trimmed string, or null when missing / not a string / over the limit. */
function readString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v.length <= max ? v : null;
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function ipOf(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

/** Same-origin + known production domains; blocks third-party sites scripting POSTs. */
function allowedOrigin(origin: string | undefined, host: string | undefined): boolean {
  if (!origin) return true; /* curl / server-to-server — still rate-limited below */
  try {
    const originHost = new URL(origin).host;
    const allowed = new Set(
      [host, "www.sheliftuganda.org", "sheliftuganda.org"].filter(Boolean) as string[],
    );
    return allowed.has(originHost);
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
  res.setHeader("Access-Control-Allow-Origin", origin ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!allowedOrigin(origin, req.headers.host)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (rateLimited(ipOf(req))) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  const body: Record<string, unknown> =
    req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};

  /* Honeypot — real users never see or fill this field. Bots that do get a
     fake success so they move on without knowing they were caught. */
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return res.status(200).json({ success: true });
  }

  const name = readString(body.name, LIMITS.name);
  const email = readString(body.email, LIMITS.email);
  const organization = readString(body.organization, LIMITS.organization) ?? "";
  const reason = readString(body.reason, LIMITS.reason) ?? "";
  const message = readString(body.message, LIMITS.message);

  if (!name || !email || !message || message.length < MIN_MESSAGE) {
    return res.status(400).json({ error: "Name, a valid email, and a message of at least 10 characters are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganization = escapeHtml(organization);
  const safeReason = escapeHtml(reason);
  const safeMessage = escapeHtml(message);

  const subject = reason ? `[${reason}] Message from ${name}` : `Message from ${name}`;

  const row = (label: string, value: string) => `
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">${label}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>`;

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="color: #8B1A1A;">New message from the SHELIFT website</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        ${row("Name", safeName)}
        ${row("Email", `<a href="mailto:${safeEmail}">${safeEmail}</a>`)}
        ${organization ? row("Organization", safeOrganization) : ""}
        ${reason ? row("Reason", safeReason) : ""}
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f9f8f1; border-radius: 8px; border-left: 4px solid #8B1A1A;">
        <p style="margin: 0 0 8px; font-weight: bold; color: #8B1A1A;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
}
