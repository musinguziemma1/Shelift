import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "sheliftorgan@gmail.com";
const FROM = "SHELIFT Website <onboarding@resend.dev>";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, organization, reason, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const subject = reason ? `[${reason}] Message from ${name}` : `Message from ${name}`;

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="color: #8B1A1A;">New message from the SHELIFT website</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${organization ? `
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Organization</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${organization}</td>
        </tr>` : ""}
        ${reason ? `
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Reason</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${reason}</td>
        </tr>` : ""}
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f9f8f1; border-radius: 8px; border-left: 4px solid #8B1A1A;">
        <p style="margin: 0 0 8px; font-weight: bold; color: #8B1A1A;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
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
