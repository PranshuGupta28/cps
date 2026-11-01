import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { getDocument } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  Breadcrumbs,
  JsonLd,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/academics/faculty",
    title: dict.academics.facultyTitle,
  });
}

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const a = dict.academics;
  const teachersDoc = getDocument("teachers-list");

  const groups = [
    {
      label: dict.disclosure.labels.pgt,
      count: school.staff.pgt,
      note: "Post Graduate Teachers",
    },
    {
      label: dict.disclosure.labels.tgt,
      count: school.staff.tgt,
      note: "Trained Graduate Teachers",
    },
    {
      label: dict.disclosure.labels.prt,
      count: school.staff.prt,
      note: "Primary Teachers",
    },
    {
      label: dict.disclosure.labels.ntt,
      count: school.staff.ntt,
      note: "Nursery Teachers",
    },
    {
      label: dict.disclosure.labels.otherTeacher,
      count: school.staff.other,
      note: "Other educators",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: a.title, path: "/academics" },
          { name: a.facultyTitle, path: "/academics/faculty" },
        ])}
      />
      <PageHero title={a.facultyTitle} intro={a.facultyBody
        .replace("{pgt}", String(school.staff.pgt))
        .replace("{tgt}", String(school.staff.tgt))
        .replace("{prt}", String(school.staff.prt))
        .replace("{ntt}", String(school.staff.ntt))
        .replace("{other}", String(school.staff.other))} />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.home, path: "/" },
          { label: a.title, path: "/academics" },
          { label: a.facultyTitle },
        ]}
      />

      <Section>
        <SectionTitle title={`${school.staff.total} ${dict.home.stats.teachers}`} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((g) => (
            <li key={g.label} className="card p-5 text-center">
              <p className="font-display text-3xl font-bold text-brand">
                {g.count}
              </p>
              <p className="mt-1 font-semibold">{g.label}</p>
              <p className="text-xs text-ink-soft">{g.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">
              {dict.disclosure.labels.specialEducator}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {school.staff.specialEducator.name},{" "}
              {school.staff.specialEducator.qualification}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">
              {dict.disclosure.labels.counsellor}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {school.staff.counsellor.name},{" "}
              {school.staff.counsellor.qualification}
            </p>
          </div>
        </div>

        <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <h2 className="font-semibold text-brand-deep">
              {dict.disclosure.labels.teachersList}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              {dict.disclosure.labels.ratio}: {school.staff.teacherSectionRatio}
            </p>
          </div>
          {teachersDoc?.file ? (
            <a
              href={`/documents/${teachersDoc.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {dict.cta.download} (.xlsx)
            </a>
          ) : null}
        </div>
      </Section>
    </>
  );
}
