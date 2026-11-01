# Content guide — CPS Chakghat website

How to update the site without touching page code. All content files use simple JSON — every text field has `en` (required) and `hi` (optional Hindi; English is shown if missing).

## Add a news item — `content/news.json`

```json
{
  "slug": "annual-day-2026",
  "date": "2026-02-10",
  "category": "celebration",
  "image": "annual-day.jpg",
  "title": { "en": "Annual Day 2026", "hi": "वार्षिकोत्सव 2026" },
  "excerpt": { "en": "Short summary…", "hi": "संक्षिप्त…" },
  "body": { "en": ["Paragraph 1…", "Paragraph 2…"], "hi": ["पैरा 1…"] }
}
```

- `slug` becomes the URL: `/en/news/annual-day-2026` — lowercase, hyphens, no spaces.
- `image`: a filename in `public/images/` or `null`.
- `category` is one of: `celebration`, `academic`, `admission` (add new keys to the `CATEGORY_LABELS` map in `src/app/[locale]/news/page.tsx` if needed).

## Add an event — `content/events.json`

```json
{
  "date": "2026-08-15",
  "title": { "en": "Independence Day", "hi": "स्वतंत्रता दिवस" },
  "category": "celebration",
  "description": { "en": "Flag hoisting at 8 am.", "hi": "…" }
}
```

## Add a notice — `content/notices.json`

```json
{
  "date": "2026-01-10",
  "title": { "en": "Winter timings", "hi": "…" },
  "body": { "en": "School opens at 9:30 am from 15 Jan.", "hi": "…" },
  "document": "annual-calendar"
}
```

`document` is the `id` of an entry in `src/data/documents.ts` (or `null`).

## Add a PDF — `public/documents/` + `src/data/documents.ts`

1. Copy the file into `public/documents/` with a clean name like `fee-structure-2026-27.pdf`.
2. Add an entry:

```ts
{
  id: "fee-structure-2026",
  title: { en: "Fee structure — session 2026–27", hi: "फीस संरचना — सत्र 2026–27" },
  file: "fee-structure-2026-27.pdf",
  category: "fees",           // affiliation|safety|fees|academic|committees|results|staff
  updatedOn: "2026-04-01",
  size: "320 KB",
}
```

- `file: null` shows a "Pending upload" state (e.g. the missing book list).
- `outdated: true` adds a "Needs update" badge — use it for stale documents instead of deleting them.

## Add gallery photos — `public/images/` + `content/gallery.json`

Copy photos into `public/images/`, then add them to an album:

```json
{ "src": "sports-day-1.jpg", "width": 640, "height": 640,
  "alt": { "en": "Students at sports day", "hi": "…" },
  "caption": { "en": "Sports day 2026", "hi": "…" } }
```

Real photos only — no stock or AI images.

## Update TC records — `src/data/tc-class10.json` / `tc-class12.json`

Convert the school's CSV export:

```bash
node scripts/import-tc-csv.mjs tc-class10.csv 10
```

CSV header: `admissionNo,tcNo,name,dob,issueDate,status` (dates `YYYY-MM-DD`).

## School facts — `src/data/school.ts`

Phones, email, WhatsApp, board name, staff counts, results, socials. Anything marked `TO CONFIRM` is hidden from the site until a real value is set — never invent one.

## Translations — `src/i18n/en.ts` + `src/i18n/hi.ts`

All page copy is in these two files with the same structure. Keep keys in sync; TypeScript will flag missing ones.
