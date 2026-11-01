"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

type State = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
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
      const res = await fetch("/api/contact", {
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

  return (
    <div className="card p-6">
      <h2 className="font-display text-xl text-brand-deep">
        {dict.contact.formTitle}
      </h2>
      {state === "success" ? (
        <div
          role="status"
          className="mt-4 rounded-lg bg-green-50 p-4 text-green-900"
        >
          <p className="font-bold">{f.successTitle}</p>
          <p className="mt-1 text-sm">{f.contactSuccess}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div>
            <label className="field-label" htmlFor="c-name">
              {f.name} *
            </label>
            <input id="c-name" name="name" required className="field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="c-email">
                {f.email} *
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                className="field"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="c-phone">
                {f.phoneOptional}
              </label>
              <input id="c-phone" name="phone" type="tel" className="field" />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="c-message">
              {f.message} *
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={4}
              required
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
            {state === "sending" ? f.sending : f.send}
          </button>
        </form>
      )}
    </div>
  );
}
