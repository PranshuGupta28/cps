# CPS Chakghat — School Website

Production website for **Central Public Sr. Sec. School (C.P.S.), Chakghat, Distt. Rewa (M.P.)**, replacing https://cpschakghat.com

Next.js (App Router) + TypeScript + Tailwind CSS v4 · bilingual (English + Hindi) · static-first.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en)
npm run test       # unit tests (validation, TC lookup, rate limiting)
npm run lint       # eslint
npm run build      # production build
```

## Environment

Copy `.env.example` to `.env.local`. All variables are optional for local dev:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO/sitemap/OG (default `https://cpschakghat.com`) |
| `RESEND_API_KEY` + `MAIL_FROM` | Send enquiry/contact form mail via Resend. Without them, submissions are logged to the server console and forms still succeed. |
| `ADMIN_PASSWORD` | Reserved for a future `/admin` area (not implemented — see below). |

## Editing content (no coding needed)

- **School facts** — `src/data/school.ts` (name, phones, email, board status, staff, results, social links). Values marked `TO CONFIRM` are hidden until filled.
- **Documents** — drop PDFs into `public/documents/` and register them in `src/data/documents.ts`.
- **News** — `content/news.json`; **Events** — `content/events.json`; **Notices** — `content/notices.json`; **Gallery albums** — `content/gallery.json`.
- **Photos** — drop files into `public/images/` and reference by filename.
- **TC records** — `src/data/tc-class10.json` / `tc-class12.json`, or import a CSV: `node scripts/import-tc-csv.mjs file.csv 10` (or `12`).

See `CONTENT_GUIDE.md` for formats and examples.

## Structure

```
src/app/[locale]/     all public pages, twice (en, hi)
src/app/api/          /api/enquiry, /api/contact, /api/tc-lookup
src/components/       chrome (header/footer) + forms + lists
src/data/             school.ts, documents.ts, tc-class*.json
src/i18n/             en.ts, hi.ts (all site copy, bilingual)
src/lib/              i18n, seo, validation (zod), rate-limit, email, tc, content
content/              news.json, events.json, notices.json, gallery.json
public/images/        photos + logo SVGs
public/documents/     official PDFs (13 re-hosted from the old site)
tests/                vitest unit tests
```

## Notes

- **Images:** only real school photos are used. Missing facility photos show a labelled "Photo coming soon" placeholder — never stock/AI imagery. Current photos are 640px Instagram exports; replace with originals when supplied.
- **Logo:** `public/images/logo.svg` is a vector redraw (the original wasn't available). Replace it with the school's real artwork if provided.
- **TC verification:** sample records only, clearly marked on the page. Real data goes through the CSV importer after the school approves.
- **Admin area:** intentionally not built — content is file-based (see CONTENT_GUIDE). If the school later wants self-service uploads, add a password-gated `/admin`.
- **i18n:** `/en` and `/hi` URL prefixes; root `/` redirects to `/en`. Hindi copy lives in `src/i18n/hi.ts` and needs a native review (see TO_CONFIRM.md).
- **Legacy redirects:** old URLs like `/mandatory-disclouser/`, `/tc-class-10th/` 301 to the new routes via `next.config.ts`.

## Deployment

Any Node host or Vercel. Build with `npm run build`, serve with `npm start`. Set `NEXT_PUBLIC_SITE_URL` and the mail env vars in the hosting panel.
