import { contactSchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { school } from "@/data/school";

export async function POST(req: Request) {
  if (!rateLimit(clientKey(req, "contact"), 5, 10 * 60 * 1000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const d = parsed.data;
  await sendEmail({
    to: school.email,
    subject: `Website contact — ${d.name}`,
    replyTo: d.email,
    text: [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "—"}`,
      "",
      d.message,
    ].join("\n"),
  });

  return Response.json({ ok: true });
}
