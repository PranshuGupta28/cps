/**
 * Form e-mail delivery.
 *
 * If RESEND_API_KEY + MAIL_FROM are configured, mail is sent through the
 * Resend HTTP API (no SDK needed). Otherwise the message is logged — the
 * API route still returns success so forms work in development, and the
 * client always offers a WhatsApp/phone fallback.
 *
 * See .env.example for the variables.
 */

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail(msg: MailMessage): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;

  if (!apiKey || !from) {
    console.warn(
      "[email] RESEND_API_KEY or MAIL_FROM not set — logging instead.\n" +
        `  to: ${msg.to}\n  subject: ${msg.subject}\n${msg.text}`,
    );
    return { sent: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [msg.to],
        reply_to: msg.replyTo,
        subject: msg.subject,
        text: msg.text,
      }),
    });
    if (!res.ok) {
      console.error("[email] resend failed:", res.status, await res.text());
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] send error:", err);
    return { sent: false };
  }
}
