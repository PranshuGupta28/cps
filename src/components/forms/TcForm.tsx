"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

interface TcResult {
  name: string;
  admissionNo: string;
  tcNo: string;
  class: string;
  issueDate: string;
  status: string;
}

type State = "idle" | "verifying" | "found" | "notfound" | "error";

export function TcForm({
  dict,
  klass,
}: {
  dict: Dictionary;
  klass: "10" | "12";
}) {
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<TcResult | null>(null);
  const t = dict.tc;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("verifying");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/tc-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, klass }),
      });
      if (res.status === 404) setState("notfound");
      else if (res.ok) {
        setResult((await res.json()).record);
        setState("found");
      } else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="card p-6">
      <h2 className="font-display text-xl text-brand-deep">{t.formTitle}</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
        <div>
          <label className="field-label" htmlFor="tc-id">
            {t.idLabel} *
          </label>
          <input id="tc-id" name="id" required className="field" />
          <p className="mt-1 text-xs text-ink-soft">{t.idHelp}</p>
        </div>
        <div>
          <label className="field-label" htmlFor="tc-dob">
            {t.dobLabel} *
          </label>
          <input
            id="tc-dob"
            name="dob"
            type="date"
            required
            className="field"
          />
          <p className="mt-1 text-xs text-ink-soft">{t.dobHelp}</p>
        </div>
        <button
          type="submit"
          disabled={state === "verifying"}
          className="btn btn-primary disabled:opacity-60"
        >
          {state === "verifying" ? t.verifying : t.verify}
        </button>
      </form>

      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {dict.form.error}
        </p>
      )}

      {state === "notfound" && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4"
        >
          <p className="font-bold text-amber-900">{t.resultNotFound}</p>
          <p className="mt-1 text-sm text-amber-900">{t.notFoundBody}</p>
        </div>
      )}

      {state === "found" && result && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-green-300 bg-green-50 p-5 print:border-gray-400"
        >
          <p className="flex items-center gap-2 font-bold text-green-900">
            <span aria-hidden>✓</span> {t.resultFound}
          </p>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {(
              [
                ["name", result.name],
                ["admissionNo", result.admissionNo],
                ["tcNo", result.tcNo],
                ["class", result.class],
                ["issueDate", result.issueDate],
                ["status", t.statusIssued],
              ] as const
            ).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-3 border-b border-green-200 pb-1.5">
                <dt className="text-green-900/80">{t.fields[key]}</dt>
                <dd className="font-semibold text-green-950">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex gap-3 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-outline !py-1.5 text-sm"
            >
              {t.print}
            </button>
            <button
              type="button"
              onClick={() => {
                setState("idle");
                setResult(null);
              }}
              className="btn btn-ghost-light !border-line !text-ink !py-1.5 text-sm hover:!bg-brand-soft"
            >
              {t.verifyAnother}
            </button>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs leading-relaxed text-ink-soft">{t.privacy}</p>
      <p className="mt-2 rounded bg-brand-soft px-3 py-2 text-xs font-medium text-brand-deep">
        {t.sampleNote}
      </p>
    </div>
  );
}
