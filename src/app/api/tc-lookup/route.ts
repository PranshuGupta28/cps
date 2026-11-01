import { tcLookupSchema } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { lookupTc } from "@/lib/tc";

export async function POST(req: Request) {
  // Stricter limit for record lookups: 10 per IP per 10 minutes.
  if (!rateLimit(clientKey(req, "tc"), 10, 10 * 60 * 1000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const parsed = tcLookupSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const { klass, id, dob } = parsed.data;
  const record = lookupTc(klass, id, dob);
  if (!record) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  // Return only the minimal certificate fields.
  return Response.json({
    record: {
      name: record.name,
      admissionNo: record.admissionNo,
      tcNo: record.tcNo,
      class: record.class,
      issueDate: record.issueDate,
      status: record.status,
    },
  });
}
