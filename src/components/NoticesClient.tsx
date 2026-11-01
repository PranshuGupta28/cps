"use client";

import { useMemo, useState } from "react";

export interface NoticeView {
  date: string;
  dateLabel: string;
  title: string;
  body: string;
  documentUrl: string | null;
}

export function NoticesClient({
  items,
  labels,
}: {
  items: NoticeView[];
  labels: {
    searchPlaceholder: string;
    attachment: string;
    noAttachment: string;
    noResults: string;
    viewDocument: string;
  };
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      items.filter(
        (n) =>
          n.title.toLowerCase().includes(q.toLowerCase()) ||
          n.body.toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q],
  );

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={labels.searchPlaceholder}
        aria-label={labels.searchPlaceholder}
        className="field max-w-md"
      />
      {filtered.length === 0 ? (
        <p className="mt-8 text-ink-soft">{labels.noResults}</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {filtered.map((n, i) => (
            <li key={i} className="card flex gap-4 p-5">
              <div className="w-16 shrink-0 rounded-lg bg-brand-soft py-2 text-center">
                <span className="block text-xs text-brand-deep">
                  {n.dateLabel.split(" ").slice(0, 2).join(" ")}
                </span>
                <span className="block text-lg font-bold text-brand-deep">
                  {n.date.slice(0, 4)}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold">{n.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{n.body}</p>
                {n.documentUrl ? (
                  <a
                    href={n.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand underline-offset-2 hover:underline"
                  >
                    {labels.viewDocument} ↗
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
