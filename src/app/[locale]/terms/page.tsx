import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { PageHero, Section } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/terms",
    title: dict.legal.terms.title,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const l = dict.legal.terms;
  return (
    <>
      <PageHero title={l.title} />
      <Section>
        <div className="prose-cps max-w-3xl">
          {l.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
