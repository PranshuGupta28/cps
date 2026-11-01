import { describe, expect, it } from "vitest";
import { lookupTc } from "@/lib/tc";
import { rateLimit, _resetRateLimits } from "@/lib/rate-limit";

describe("lookupTc", () => {
  it("finds a record by admission number", () => {
    const r = lookupTc("10", "CPS-1001", "2009-04-15");
    expect(r?.tcNo).toBe("TC10-2024-001");
  });

  it("finds a record by TC number", () => {
    const r = lookupTc("12", "TC12-2024-001", "2007-03-10");
    expect(r?.admissionNo).toBe("CPS-2001");
  });

  it("matches ids case- and separator-insensitively", () => {
    const r = lookupTc("10", "cps 1001", "2009-04-15");
    expect(r).not.toBeNull();
  });

  it("rejects a wrong dob", () => {
    expect(lookupTc("10", "CPS-1001", "2009-04-16")).toBeNull();
  });

  it("rejects a record in the wrong class dataset", () => {
    expect(lookupTc("12", "CPS-1001", "2009-04-15")).toBeNull();
  });

  it("rejects unknown ids", () => {
    expect(lookupTc("10", "ZZZ-999", "2009-04-15")).toBeNull();
  });
});

describe("rateLimit", () => {
  it("allows up to the limit then blocks", () => {
    _resetRateLimits();
    const key = "test:1.2.3.4";
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(true);
    expect(rateLimit(key, 3, 60_000)).toBe(false);
  });

  it("tracks keys independently", () => {
    _resetRateLimits();
    expect(rateLimit("test:a", 1, 60_000)).toBe(true);
    expect(rateLimit("test:b", 1, 60_000)).toBe(true);
  });
});
