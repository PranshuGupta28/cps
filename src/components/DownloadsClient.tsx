"use client";

import { useMemo, useState } from "react";

export interface DownloadItem {
  id: string;
  title: string;
  file: string | null;
  category: string;
  updatedOn: string;
  size?: string;
  outdated?: boolean;
}

export function DownloadsClient({
  items,
  categories,
  labels,
}: {
  items: DownloadItem[];
  categories: { id: string; label: string }[];
  labels: {
    searchPlaceholder: string;
    all: string;
    download: string;
    pendingUpload: string;
    needsUpdate: string;
    updatedOn: string;
    fileSize: string;
    noResults: string;
  };
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () =>
      items.filter(
        (d) =>
          (cat === "all" || d.category === cat) &&
          d.title.toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q, cat],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.searchPlaceholder}
          className="field !w-auto min-w-56 flex-1 sm:flex-none"
        />
        <div className="flex flex-wrap gap-2" role="group">
          <button
            type="button"
            className="chip"
            data-active={cat === "all"}
            onClick={() => setCat("all")}
          >
            {labels.all}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              data-active={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-ink-soft">{labels.noResults}</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((d) => (
            <li key={d.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug">{d.title}</h3>
                {d.outdated ? (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                    {labels.needsUpdate}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                {labels.updatedOn} {d.updatedOn}
                {d.size ? ` · ${labels.fileSize} ${d.size}` : ""}
              </p>
              <div className="mt-4">
                {d.file ? (
                  <a
                    href={`/documents/${d.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !py-1.5 text-sm"
                  >
                    {labels.download}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-ink-soft">
                    {labels.pendingUpload}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
