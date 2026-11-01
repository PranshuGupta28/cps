import type { Metadata } from "next";
import { getDictionary, pick, type Dictionary, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { documents, type SchoolDocument } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";
import { ResultsChart } from "@/components/ResultsChart";
import { CollapsibleSection } from "@/components/CollapsibleSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/mandatory-disclosure",
    title: dict.disclosure.title,
    description: dict.disclosure.intro,
  });
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr className="border-b border-line last:border-0">
      <th
        scope="row"
        className="w-1/2 py-3 pr-4 text-left align-top text-sm font-semibold text-ink"
      >
        {label}
      </th>
      <td className="py-3 text-sm text-ink-soft">{value}</td>
    </tr>
  );
}

function DocTable({
  list,
  dict,
  locale,
}: {
  list: SchoolDocument[];
  dict: Dictionary;
  locale: Locale;
}) {
  const d = dict.disclosure;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-soft">
            <th className="py-2 pr-3">{d.docsTable.sn}</th>
            <th className="py-2 pr-3">{d.docsTable.doc}</th>
            <th className="py-2">{d.docsTable.view}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((doc, i) => (
            <tr key={doc.id} className="border-b border-line last:border-0">
              <td className="py-2.5 pr-3 text-sm text-ink-soft">{i + 1}</td>
              <td className="py-2.5 pr-3 text-sm font-medium">
                {pick(locale, doc.title)}
              </td>
              <td className="py-2.5 text-sm">
                {doc.file ? (
                  <a
                    href={`/documents/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand hover:underline"
                  >
                    {dict.cta.viewDocument} ↗
                  </a>
                ) : (
                  <span className="text-ink-soft">
                    {dict.common.pendingUpload}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultsTable({
  title,
  data,
  labels,
}: {
  title: string;
  data: readonly { year: number; registered: number; passed: number }[];
  labels: Dictionary["disclosure"]["resultsTable"];
}) {
  return (
    <div className="overflow-x-auto">
      <h3 className="mb-2 font-semibold text-brand-deep">{title}</h3>
      <table className="w-full min-w-[420px] text-left">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-soft">
            <th className="py-2 pr-3">{labels.year}</th>
            <th className="py-2 pr-3">{labels.registered}</th>
            <th className="py-2 pr-3">{labels.passed}</th>
            <th className="py-2">{labels.passPct}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.year} className="border-b border-line last:border-0">
              <td className="py-2.5 pr-3 text-sm font-medium">{r.year}</td>
              <td className="py-2.5 pr-3 text-sm">{r.registered}</td>
              <td className="py-2.5 pr-3 text-sm">{r.passed}</td>
              <td className="py-2.5 text-sm font-semibold text-brand-deep">
                {Math.round((r.passed / r.registered) * 10000) / 100}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function DisclosurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const d = dict.disclosure;
  const L = d.labels;

  const sections = [
    { id: "section-a", title: d.sectionA },
    { id: "section-b", title: d.sectionB },
    { id: "section-c", title: d.sectionC },
    { id: "section-d", title: d.sectionD },
    { id: "section-e", title: d.sectionE },
  ];

  const docsB = documents.filter((doc) =>
    [
      "affiliation-letter",
      "society-registration",
      "noc",
      "rte-recognition",
      "building-safety",
      "fire-safety",
      "self-certification",
      "water-sanitation",
    ].includes(doc.id),
  );
  const docsC = documents.filter((doc) =>
    [
      "fee-structure",
      "annual-calendar",
      "smc-list",
      "pta-list",
      "board-results",
    ].includes(doc.id),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: d.title, path: "/mandatory-disclosure" },
        ])}
      />
      <PageHero title={d.title} intro={d.intro} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* sticky index — desktop */}
          <nav aria-label={d.indexTitle} className="no-print hidden lg:block">
            <div className="sticky top-24 card p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                {d.indexTitle}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-brand-deep hover:underline"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-6 min-w-0">
            <CollapsibleSection id="section-a" title={d.sectionA}>
              <table className="w-full">
                <tbody>
                  <Row
                    label={L.schoolName}
                    value="CENTRAL PUBLIC SR. SEC. SCHOOL (C.P.S)"
                  />
                  <Row label={L.affiliationNo} value={school.affiliationNo} />
                  <Row label={L.schoolCode} value={school.schoolCode} />
                  <Row
                    label={L.address}
                    value={`${school.address.line1}, ${school.address.line2}`}
                  />
                  <Row label={L.principalName} value={school.principal.name} />
                  <Row
                    label={L.principalQualification}
                    value={school.principal.qualification}
                  />
                  <Row label={L.email} value={school.email} />
                  <Row
                    label={L.contact}
                    value={school.phones
                      .map((p) => p.display.replace("+91-", ""))
                      .join(", ")}
                  />
                </tbody>
              </table>
            </CollapsibleSection>

            <CollapsibleSection id="section-b" title={d.sectionB}>
              <DocTable list={docsB} dict={dict} locale={locale} />
            </CollapsibleSection>

            <CollapsibleSection id="section-c" title={d.sectionC}>
              <DocTable list={docsC} dict={dict} locale={locale} />
              <div className="mt-8 space-y-8">
                <ResultsTable
                  title={d.resultsTable.titleX}
                  data={school.results.class10}
                  labels={d.resultsTable}
                />
                <ResultsTable
                  title={d.resultsTable.titleXII}
                  data={school.results.class12}
                  labels={d.resultsTable}
                />
              </div>
              <div className="no-print mt-8 grid gap-6 md:grid-cols-2">
                <ResultsChart
                  title={d.resultsTable.titleX}
                  data={school.results.class10}
                  labels={d.resultsTable}
                />
                <ResultsChart
                  title={d.resultsTable.titleXII}
                  data={school.results.class12}
                  labels={d.resultsTable}
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="section-d" title={d.sectionD}>
              <table className="w-full">
                <tbody>
                  <Row label={L.principal} value={school.principal.name} />
                  <Row label={L.totalTeachers} value={school.staff.total} />
                  <Row label={`• ${L.pgt}`} value={school.staff.pgt} />
                  <Row label={`• ${L.tgt}`} value={school.staff.tgt} />
                  <Row label={`• ${L.prt}`} value={school.staff.prt} />
                  <Row label={`• ${L.ntt}`} value={school.staff.ntt} />
                  <Row label={`• ${L.otherTeacher}`} value={school.staff.other} />
                  <Row label={L.ratio} value={school.staff.teacherSectionRatio} />
                  <Row
                    label={L.specialEducator}
                    value={`${school.staff.specialEducator.name}, ${school.staff.specialEducator.qualification}`}
                  />
                  <Row
                    label={L.counsellor}
                    value={`${school.staff.counsellor.name}, ${school.staff.counsellor.qualification}`}
                  />
                </tbody>
              </table>
            </CollapsibleSection>

            <CollapsibleSection id="section-e" title={d.sectionE}>
              <table className="w-full">
                <tbody>
                  <Row
                    label={L.campusArea}
                    value={`${school.infrastructure.campusAreaSqm} m²`}
                  />
                  <Row
                    label={L.classrooms}
                    value={`${school.infrastructure.classrooms.count} / ${school.infrastructure.classrooms.eachSqm} m²`}
                  />
                  <Row
                    label={L.labs}
                    value={`${school.infrastructure.labs.count} / ${school.infrastructure.labs.eachSqm} m²`}
                  />
                  <Row
                    label={L.internet}
                    value={school.infrastructure.internet ? L.yes : "—"}
                  />
                  <Row
                    label={L.girlsToilets}
                    value={school.infrastructure.girlsToilets}
                  />
                  <Row
                    label={L.boysToilets}
                    value={school.infrastructure.boysToilets}
                  />
                  <Row
                    label={L.inspectionVideo}
                    value={
                      <a
                        href={school.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand hover:underline"
                      >
                        {dict.cta.watchVideo} ↗
                      </a>
                    }
                  />
                  <Row
                    label={L.teachersList}
                    value={
                      <a
                        href="/documents/teachers-list.xlsx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand hover:underline"
                      >
                        {dict.cta.download} (.xlsx)
                      </a>
                    }
                  />
                </tbody>
              </table>
            </CollapsibleSection>

            <p className="text-xs text-ink-soft">{d.dataNote}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
