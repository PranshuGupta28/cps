import { enquirySchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { school } from "@/data/school";

export async function POST(req: Request) {
  // 5 enquiries per IP per 10 minutes
  if (!rateLimit(clientKey(req, "enquiry"), 5, 10 * 60 * 1000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot filled -> pretend success, send nothing.
  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const d = parsed.data;
  await sendEmail({
    to: school.email,
    subject: `Admission enquiry — ${d.childName} (${d.classApplying})`,
    replyTo: d.email || undefined,
    text: [
      `Child's name: ${d.childName}`,
      `Class applying for: ${d.classApplying}`,
      `Parent's name: ${d.parentName}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email || "—"}`,
      "",
      d.message ? `Message:\n${d.message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return Response.json({ ok: true });
}
