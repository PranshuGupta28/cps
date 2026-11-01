#!/usr/bin/env node
/**
 * Import a CSV of Transfer Certificates into a JSON file used by the
 * TC-verification API.
 *
 * Usage:
 *   node scripts/import-tc-csv.mjs <input.csv> <class:10|12>
 *
 * Expected CSV header (first row):
 *   admissionNo,tcNo,name,dob,issueDate,status
 *   CPS-1001,TC10-2024-001,Aarav Sharma,2009-04-15,2024-05-10,issued
 *
 * All dates must be ISO format YYYY-MM-DD. The output is written to
 * src/data/tc-class{10|12}.json — review it before committing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [csvPath, klass] = process.argv.slice(2);
if (!csvPath || !["10", "12"].includes(klass ?? "")) {
  console.error("Usage: node scripts/import-tc-csv.mjs <input.csv> <10|12>");
  process.exit(1);
}

const raw = readFileSync(csvPath, "utf-8").trim();
const [headerLine, ...lines] = raw.split(/\r?\n/);
const headers = headerLine.split(",").map((h) => h.trim());

const required = ["admissionNo", "tcNo", "name", "dob", "issueDate", "status"];
for (const r of required) {
  if (!headers.includes(r)) {
    console.error(`Missing required column: ${r}`);
    process.exit(1);
  }
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const records = lines.map((line, i) => {
  const cells = line.split(",").map((c) => c.trim());
  const row = Object.fromEntries(headers.map((h, j) => [h, cells[j] ?? ""]));
  if (!isoDate.test(row.dob) || !isoDate.test(row.issueDate)) {
    console.error(
      `Row ${i + 2}: dob and issueDate must be YYYY-MM-DD (got "${row.dob}", "${row.issueDate}")`,
    );
    process.exit(1);
  }
  return {
    admissionNo: row.admissionNo,
    tcNo: row.tcNo,
    name: row.name,
    class: klass,
    dob: row.dob,
    issueDate: row.issueDate,
    status: row.status || "issued",
  };
});

const out = path.join(process.cwd(), "src", "data", `tc-class${klass}.json`);
writeFileSync(out, JSON.stringify({ records }, null, 2) + "\n");
console.log(`Wrote ${records.length} records to ${out}`);
