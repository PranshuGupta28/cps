import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s-]{7,16}$/, "invalid phone");

export const enquirySchema = z.object({
  childName: z.string().trim().min(2).max(80),
  classApplying: z.string().trim().min(1).max(40),
  parentName: z.string().trim().min(2).max(80),
  phone,
  email: z.union([z.literal(""), z.string().trim().email().max(120)]),
  message: z.string().trim().max(2000).default(""),
  // anti-spam
  website: z.string().max(0).optional().or(z.literal("")).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.union([z.literal(""), phone]),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional().or(z.literal("")).optional(),
});

export const tcLookupSchema = z.object({
  klass: z.enum(["10", "12"]),
  id: z.string().trim().min(3).max(40),
  dob: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type TcLookupInput = z.infer<typeof tcLookupSchema>;
