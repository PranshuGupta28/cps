"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

type State = "idle" | "sending" | "success" | "error";

export function EnquiryForm({
  dict,
  whatsappNumber,
}: {
  dict: Dictionary;
  whatsappNumber: string | null;
}) {
  const [state, setState] = useState<State>("idle");
  const [invalid, setInvalid] = useState(false);
  const f = dict.form;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInvalid(false);
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        setInvalid(true);
        setState("error");
      } else if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const waText = encodeURIComponent(
    `Admission enquiry — CPS Chakghat`,
  );

  return (
    <div className="card p-6">
      {state === "success" ? (
        <div role="status" className="rounded-lg bg-green-50 p-4 text-green-900">
          <p className="font-bold">{f.successTitle}</p>
          <p className="mt-1 text-sm">{f.enquirySuccess}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          {/* honeypot — must stay empty */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div>
            <label className="field-label" htmlFor="childName">
              {f.childName} *
            </label>
            <input id="childName" name="childName" required className="field" />
          </div>
          <div>
            <label className="field-label" htmlFor="classApplying">
              {f.classApplying} *
            </label>
            <select
              id="classApplying"
              name="classApplying"
              required
              className="field"
              defaultValue=""
            >
              <option value="" disabled>
                {f.selectClass}
              </option>
              {f.classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="parentName">
              {f.parentName} *
            </label>
            <input id="parentName" name="parentName" required className="field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="phone">
                {f.phone} *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="field"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="email">
                {f.emailOptional}
              </label>
              <input id="email" name="email" type="email" className="field" />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="message">
              {f.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="field"
            />
          </div>
          {state === "error" && (
            <p role="alert" className="text-sm text-danger">
              {invalid ? f.invalid : f.error}
            </p>
          )}
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn btn-primary disabled:opacity-60"
          >
            {state === "sending" ? f.sending : f.submit}
          </button>
          {whatsappNumber ? (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-brand underline"
            >
              {f.whatsappFallback}
            </a>
          ) : null}
        </form>
      )}
    </div>
  );
}
