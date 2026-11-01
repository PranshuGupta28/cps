import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, type Locale } from "@/lib/i18n";
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
    path: "/sitemap",
    title: dict.legal.sitemap.title,
  });
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);

  const links = [
    [dict.nav.home, "/"],
    [dict.nav.about, "/about"],
    [dict.nav.academics, "/academics"],
    [dict.nav.faculty, "/academics/faculty"],
    [dict.nav.admissions, "/admissions"],
    [dict.nav.campus, "/campus"],
    [dict.nav.studentLife, "/student-life"],
    [dict.nav.news, "/news"],
    [dict.newsPage.eventsTab, "/events"],
    [dict.nav.notices, "/notices"],
    [dict.nav.gallery, "/gallery"],
    [dict.nav.tcVerification, "/tc-verification"],
    [`${dict.tc.title} — ${dict.tc.class10}`, "/tc-verification/class-10"],
    [`${dict.tc.title} — ${dict.tc.class12}`, "/tc-verification/class-12"],
    [dict.nav.downloads, "/downloads"],
    [dict.nav.disclosure, "/mandatory-disclosure"],
    [dict.nav.contact, "/contact"],
    [dict.legal.privacy.title, "/privacy-policy"],
    [dict.legal.terms.title, "/terms"],
    [dict.legal.accessibility.title, "/accessibility"],
  ] as const;

  return (
    <>
      <PageHero title={dict.legal.sitemap.title} />
      <Section>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(([label, path]) => (
            <li key={path}>
              <Link
                href={href(locale, path)}
                className="block rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-brand-deep hover:bg-brand-soft"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
