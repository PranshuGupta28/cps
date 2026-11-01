"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface NewsCard {
  slug: string;
  date: string;
  dateLabel: string;
  category: string;
  image: string | null;
  title: string;
  excerpt: string;
}

export function NewsList({
  items,
  categories,
  years,
  labels,
  basePath,
}: {
  items: NewsCard[];
  categories: string[];
  years: string[];
  labels: {
    all: string;
    filterCategory: string;
    filterYear: string;
    noNews: string;
    readFull: string;
    photoComingSoon: string;
  };
  basePath: string; // /{locale}/news
}) {
  const [cat, setCat] = useState("all");
  const [year, setYear] = useState("all");

  const filtered = useMemo(
    () =>
      items.filter(
        (n) =>
          (cat === "all" || n.category === cat) &&
          (year === "all" || n.date.startsWith(year)),
      ),
    [items, cat, year],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group">
        <span className="text-sm font-semibold text-ink-soft">
          {labels.filterCategory}:
        </span>
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
            key={c}
            type="button"
            className="chip"
            data-active={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
        <span className="ml-2 text-sm font-semibold text-ink-soft">
          {labels.filterYear}:
        </span>
        <button
          type="button"
          className="chip"
          data-active={year === "all"}
          onClick={() => setYear("all")}
        >
          {labels.all}
        </button>
        {years.map((y) => (
          <button
            key={y}
            type="button"
            className="chip"
            data-active={year === y}
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-ink-soft">{labels.noNews}</p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => (
            <li key={n.slug} className="card overflow-hidden flex flex-col">
              {n.image ? (
                <Image
                  src={`/images/${n.image}`}
                  alt=""
                  width={640}
                  height={320}
                  className="aspect-[2/1] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/1] w-full items-center justify-center bg-brand-soft text-sm text-ink-soft">
                  {labels.photoComingSoon}
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {n.category} · {n.dateLabel}
                </p>
                <h3 className="mt-1.5 font-semibold leading-snug">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
                  {n.excerpt}
                </p>
                <Link
                  href={`${basePath}/${n.slug}`}
                  className="mt-auto pt-3 text-sm font-semibold text-brand underline-offset-2 hover:underline"
                >
                  {labels.readFull} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
