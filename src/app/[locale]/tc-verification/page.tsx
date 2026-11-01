import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, type Locale } from "@/lib/i18n";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/tc-verification",
    title: dict.tc.title,
    description: dict.tc.intro,
  });
}

export default async function TcVerificationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const t = dict.tc;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: t.title, path: "/tc-verification" },
        ])}
      />
      <PageHero title={t.title} intro={t.intro} />
      <Section>
        <h2 className="font-display text-xl text-brand-deep">{t.chooseClass}</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 max-w-2xl">
          {(
            [
              ["10", t.class10],
              ["12", t.class12],
            ] as const
          ).map(([k, label]) => (
            <Link
              key={k}
              href={href(locale, `/tc-verification/class-${k}`)}
              className="card flex items-center justify-between p-6 transition-colors hover:border-brand hover:bg-brand-soft/40"
            >
              <span className="font-display text-2xl font-bold text-brand-deep">
                {label}
              </span>
              <span aria-hidden className="text-2xl text-brand">
                →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {t.privacy}
        </p>
      </Section>
    </>
  );
}
