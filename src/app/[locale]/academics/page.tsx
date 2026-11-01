import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { getDocument } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section, SectionTitle } from "@/components/ui";

function fill(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    template,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/academics",
    title: dict.academics.title,
    description: dict.academics.intro,
  });
}

export default async function AcademicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const a = dict.academics;
  const calendar = getDocument("annual-calendar");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: a.title, path: "/academics" },
        ])}
      />
      <PageHero title={a.title} intro={a.intro} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.classesTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {school.classesOffered ?? a.classesBody}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.mediumTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {school.mediumOfInstruction ?? a.mediumBody}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">
              {a.curriculumTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {school.boardName
                ? school.boardName
                : a.curriculumBody}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.streamsTitle}</h2>
            {school.seniorSecondaryStreams ? (
              <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
                {school.seniorSecondaryStreams.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {a.streamsBody}
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionTitle title={a.approachTitle} />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.approachPoints.map((p) => (
            <li key={p} className="card flex gap-3 p-5 text-sm text-ink-soft">
              <span aria-hidden className="mt-0.5 text-brand">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.labsTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {a.labsBody}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.supportTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {fill(a.supportBody, {
                se: `${school.staff.specialEducator.name} (${school.staff.specialEducator.qualification})`,
                cw: `${school.staff.counsellor.name} (${school.staff.counsellor.qualification})`,
              })}
            </p>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card bg-brand-soft/50 p-6">
            <h2 className="font-semibold text-brand-deep">{a.calendarTitle}</h2>
            <p className="mt-2 text-sm text-ink-soft">{a.calendarBody}</p>
            {calendar?.file ? (
              <a
                href={`/documents/${calendar.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-4 !py-2 text-sm"
              >
                {dict.cta.download} (PDF)
              </a>
            ) : null}
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">{a.facultyTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {fill(a.facultyBody, {
                pgt: school.staff.pgt,
                tgt: school.staff.tgt,
                prt: school.staff.prt,
                ntt: school.staff.ntt,
                other: school.staff.other,
              })}
            </p>
            <Link
              href={href(locale, "/academics/faculty")}
              className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
            >
              {a.facultyLink} →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
