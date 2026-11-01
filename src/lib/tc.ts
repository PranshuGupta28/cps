import class10Data from "@/data/tc-class10.json";
import class12Data from "@/data/tc-class12.json";

export interface TcRecord {
  admissionNo: string;
  tcNo: string;
  name: string;
  class: string;
  dob: string; // ISO YYYY-MM-DD
  issueDate: string;
  status: "issued" | string;
}

function recordsFor(klass: "10" | "12"): TcRecord[] {
  const data = klass === "10" ? class10Data : class12Data;
  return (data as { records: TcRecord[] }).records;
}

const normaliseId = (s: string) =>
  s.trim().toLowerCase().replace(/[\s_-]+/g, "");

/**
 * Look up a Transfer Certificate by Admission No. or TC No. + DOB + class.
 * Returns only the minimal certificate fields — never the whole dataset.
 */
export function lookupTc(
  klass: "10" | "12",
  id: string,
  dob: string,
): TcRecord | null {
  const needle = normaliseId(id);
  const match = recordsFor(klass).find(
    (r) =>
      (normaliseId(r.admissionNo) === needle ||
        normaliseId(r.tcNo) === needle) &&
      r.dob === dob,
  );
  return match ?? null;
}
