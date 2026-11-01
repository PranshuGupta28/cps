import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { getDocument } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section, SectionTitle } from "@/components/ui";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/admissions",
    title: dict.admissions.title,
    description: dict.admissions.intro.replace(
      "{year}",
      school.admissionOpenYear,
    ),
  });
}

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const a = dict.admissions;
  const feeDoc = getDocument("fee-structure");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: a.title, path: "/admissions" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <PageHero
        title={a.title}
        intro={a.intro.replace("{year}", school.admissionOpenYear)}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={a.processTitle} />
            <ol className="mt-6 space-y-4">
              {a.steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-ink-soft">
                    {s}
                  </p>
                </li>
              ))}
            </ol>

            <div className="card mt-8 p-6">
              <h3 className="font-semibold text-brand-deep">
                {a.eligibilityTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {a.eligibilityBody}
              </p>
            </div>

            <div className="card mt-6 p-6">
              <h3 className="font-semibold text-brand-deep">{a.docsTitle}</h3>
              <ul className="mt-3 space-y-1.5">
                {a.docs.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-ink-soft">
                    <span aria-hidden className="mt-0.5 text-brand">
                      •
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="card border-amber-300 bg-amber-50 p-5">
              <h3 className="flex items-center gap-2 font-bold text-amber-900">
                <span aria-hidden>⚠</span> {a.fraudNoticeTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-amber-900">
                {a.fraudNotice}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-xl text-brand-deep">
                {a.formTitle}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{a.formBody}</p>
              <div className="mt-4">
                <EnquiryForm dict={dict} whatsappNumber={school.whatsapp} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="card flex flex-wrap items-center justify-between gap-4 bg-brand-soft/50 p-6">
          <div>
            <h2 className="font-semibold text-brand-deep">{a.feesTitle}</h2>
            <p className="mt-1 text-sm text-ink-soft">{a.feesBody}</p>
          </div>
          {feeDoc?.file ? (
            <a
              href={`/documents/${feeDoc.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {a.feesLink}
            </a>
          ) : null}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionTitle title={a.faqTitle} />
        <div className="mt-6 space-y-3">
          {a.faqs.map((f) => (
            <details key={f.q} className="disclosure-section card p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                {f.q}
                <span aria-hidden className="ml-3 text-brand">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
