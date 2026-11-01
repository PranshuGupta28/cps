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
    path: "/accessibility",
    title: dict.legal.accessibility.title,
  });
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const l = dict.legal.accessibility;
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
