import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, href, pick, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { getNews } from "@/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  ButtonLink,
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
    path: "/student-life",
    title: dict.studentLife.title,
    description: dict.studentLife.intro,
  });
}

export default async function StudentLifePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const s = dict.studentLife;
  const celebrations = (await getNews()).filter(
    (n) => n.category === "celebration",
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: s.title, path: "/student-life" },
        ])}
      />
      <PageHero title={s.title} intro={s.intro} />

      <Section>
        <SectionTitle title={s.eventsTitle} />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {celebrations
            .filter((n) => n.image)
            .map((n) => (
              <li key={n.slug} className="card overflow-hidden">
                <Image
                  src={`/images/${n.image}`}
                  alt={pick(locale, n.title)}
                  width={640}
                  height={400}
                  className="aspect-[8/5] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-brand-deep">
                    {pick(locale, n.title)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {pick(locale, n.excerpt)}
                  </p>
                  <Link
                    href={href(locale, `/news/${n.slug}`)}
                    className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    {dict.cta.readMore} →
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">
              {s.activitiesTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {s.activitiesBody}
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-brand-deep">
              {s.achievementsTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {s.achievementsBody}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ButtonLink
            locale={locale}
            to={school.social.instagram}
            variant="outline"
          >
            {s.instagramNote} ↗
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
