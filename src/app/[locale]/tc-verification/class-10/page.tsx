import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs, JsonLd, PageHero, Section } from "@/components/ui";
import { TcForm } from "@/components/forms/TcForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/tc-verification/class-10",
    title: `${dict.tc.title} — ${dict.tc.class10}`,
    description: dict.tc.intro,
  });
}

export default async function TcClass10Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const t = dict.tc;
  const title = `${t.title} — ${t.class10}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: t.title, path: "/tc-verification" },
          { name: t.class10, path: "/tc-verification/class-10" },
        ])}
      />
      <PageHero title={title} intro={t.intro} />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.home, path: "/" },
          { label: t.title, path: "/tc-verification" },
          { label: t.class10 },
        ]}
      />
      <Section>
        <div className="max-w-xl">
          <TcForm dict={dict} klass="10" />
        </div>
      </Section>
    </>
  );
}
