# Open items — need confirmation from the school

Everything below is hidden or placeholder on the site until confirmed. Fill in `src/data/school.ts` / `src/data/documents.ts` and delete each line when resolved.

## Identity & board
- [ ] **Board affiliation** — Instagram bio says "Affiliated to C.B.S.E. New Delhi"; the old About page described CBSE affiliation as a future plan. An `affiliation-letter.pdf` exists in documents. Confirm the current status → set `school.boardName`.
- [ ] **Director's name** — brief said "Prasant Pathak", other material suggests "Prashant Pathak" → confirm spelling + exact title → `school.director.name`.
- [ ] **Official email** — `cpseducationgroup@gmail.com` (site footer) vs `cpseducationgroups@gmail.com` (mandatory disclosure) → pick one → `school.email`.
- [ ] **WhatsApp number** — old widget said "No WhatsApp number found". Once provided → `school.whatsapp` (E.164 digits only, e.g. `919425357853`).
- [ ] **Established year** — old footer had "© 2017" → `school.establishedYear`.
- [ ] **Motto in Hindi** — currently "तमसो मा ज्योतिर्गमय" → `school.motto.hi`.

## People & messages
- [ ] Director's real message text + portrait photo → `school.director.message`, `.photo`.
- [ ] Principal's real message text + portrait photo → `school.principal.message`, `.photo`.
- [ ] Full staff list for the faculty page (the `teachers-list.xlsx` is already hosted).

## Operations
- [ ] **Classes offered** (e.g. Nursery–XII) → `school.classesOffered`.
- [ ] **Medium of instruction** → `school.mediumOfInstruction`.
- [ ] **XI–XII streams** → `school.seniorSecondaryStreams`.
- [ ] **Office hours** → `school.officeHours`.
- [ ] **Transport routes, sports facilities, library details** → `campus` + `admissions` copy.
- [ ] **Co-curricular activities / houses / clubs** → `student-life` copy.
- [ ] **Pay Fee / Parent Login URLs** (if any) → `school.payFeeUrl`, `school.parentLoginUrl`.
- [ ] **Admission eligibility rules** (age cut-offs per class).

## Data & documents
- [ ] **Real TC data** for Class 10/12 + privacy sign-off → `scripts/import-tc-csv.mjs` → `src/data/tc-class*.json` (currently SAMPLE records).
- [ ] **Book list PDF** — referenced by the disclosure but not found on the old site → upload → `documents.ts` (`book-list` entry).
- [ ] **Latest board results** beyond 2024, if 2025 results exist → `school.results` + `board-results` PDF.
- [ ] Fee structure for 2026–27 when issued.

## Media
- [ ] **Original logo** (AI/SVG/high-res PNG) → replace `public/images/logo.svg` + `icon.svg`.
- [ ] **Original campus photo** without the "Admission Open 2025" overlay → replace `public/images/hero-campus.jpg` (currently a crop of the Instagram post).
- [ ] **Original-resolution photos** of labs, library, classrooms, sports, transport, assembly → `public/images/` + `content/gallery.json` + `campus` photo slots.
- [ ] **Consent confirmation** for student photos pulled from Instagram before going live.

## Content
- [ ] **Hindi translation review** — all Hindi copy in `src/i18n/hi.ts` + content JSON `hi` fields need a native-speaker check.
- [ ] Verification that seeded news items (from Instagram posts) have correct dates/wording.

## Technical
- [ ] Domain switch-over plan for cpschakghat.com (the old site also runs on a Hostinger staging domain).
- [ ] `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `MAIL_FROM` set in the hosting env.
- [ ] Form delivery email inbox — decide who receives enquiries.
