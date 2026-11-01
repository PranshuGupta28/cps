import { describe, expect, it } from "vitest";
import {
  contactSchema,
  enquirySchema,
  tcLookupSchema,
} from "@/lib/validation";

describe("enquirySchema", () => {
  const valid = {
    childName: "Aarav Sharma",
    classApplying: "Class 6–8",
    parentName: "Rahul Sharma",
    phone: "9425357853",
    email: "parent@example.com",
    message: "Please call back.",
  };

  it("accepts a valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it("accepts an empty optional email", () => {
    expect(enquirySchema.safeParse({ ...valid, email: "" }).success).toBe(true);
  });

  it("rejects a bad phone", () => {
    expect(enquirySchema.safeParse({ ...valid, phone: "abc" }).success).toBe(
      false,
    );
    expect(enquirySchema.safeParse({ ...valid, phone: "123" }).success).toBe(
      false,
    );
  });

  it("rejects a honeypot value", () => {
    expect(
      enquirySchema.safeParse({ ...valid, website: "spam.example" }).success,
    ).toBe(false);
  });

  it("rejects missing required fields", () => {
    expect(
      enquirySchema.safeParse({ ...valid, childName: "" }).success,
    ).toBe(false);
    expect(
      enquirySchema.safeParse({ ...valid, classApplying: "" }).success,
    ).toBe(false);
  });
});

describe("contactSchema", () => {
  const valid = {
    name: "Seema Gupta",
    email: "seema@example.com",
    phone: "",
    message: "I would like to visit the school on Monday morning.",
  };

  it("accepts a valid message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(
      contactSchema.safeParse({ ...valid, email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects too-short messages", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(
      false,
    );
  });
});

describe("tcLookupSchema", () => {
  it("accepts class 10 and 12 lookups", () => {
    for (const klass of ["10", "12"] as const) {
      expect(
        tcLookupSchema.safeParse({
          klass,
          id: "CPS-1001",
          dob: "2009-04-15",
        }).success,
      ).toBe(true);
    }
  });

  it("rejects other classes", () => {
    expect(
      tcLookupSchema.safeParse({ klass: "9", id: "CPS-1001", dob: "2009-04-15" })
        .success,
    ).toBe(false);
  });

  it("rejects a malformed dob", () => {
    expect(
      tcLookupSchema.safeParse({
        klass: "10",
        id: "CPS-1001",
        dob: "15-04-2009",
      }).success,
    ).toBe(false);
  });

  it("rejects a too-short id", () => {
    expect(
      tcLookupSchema.safeParse({ klass: "10", id: "ab", dob: "2009-04-15" })
        .success,
    ).toBe(false);
  });
});
