import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section, SectionTitle } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/about",
    title: dict.about.title,
    description: dict.about.intro,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: a.title, path: "/about" },
        ])}
      />
      <PageHero title={a.title} intro={a.intro} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={a.storyTitle} />
            <p className="mt-4 leading-relaxed text-ink-soft">{a.story}</p>

            <div className="mt-8 grid gap-4">
              <div className="card border-l-4 border-l-gold p-5">
                <h3 className="font-semibold text-brand-deep">{a.visionTitle}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {pick(locale, school.vision)}
                </p>
              </div>
              <div className="card border-l-4 border-l-brand p-5">
                <h3 className="font-semibold text-brand-deep">
                  {a.missionTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {pick(locale, school.mission)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle title={a.leadershipTitle} />
            <div className="mt-4 space-y-5">
              <article className="card p-6">
                <h3 className="font-display text-lg font-bold text-brand-deep">
                  {a.directorTitle}
                </h3>
                <p className="mt-1 text-sm font-semibold">
                  {locale === "hi" ? school.director.nameHi : school.director.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {pick(locale, school.director.message)}
                </p>
                {school.director.photo ? (
                  <Image
                    src={`/images/${school.director.photo}`}
                    alt=""
                    width={400}
                    height={400}
                    className="mt-4 rounded-xl"
                  />
                ) : null}
              </article>
              <article className="card p-6">
                <h3 className="font-display text-lg font-bold text-brand-deep">
                  {a.principalTitle}
                </h3>
                <p className="mt-1 text-sm font-semibold">
                  {locale === "hi"
                    ? school.principal.nameHi
                    : school.principal.name}
                  <span className="font-normal text-ink-soft">
                    {" "}
                    · {school.principal.qualification}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {pick(locale, school.principal.message)}
                </p>
                {school.principal.photo ? (
                  <Image
                    src={`/images/${school.principal.photo}`}
                    alt=""
                    width={400}
                    height={400}
                    className="mt-4 rounded-xl"
                  />
                ) : null}
              </article>
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={a.valuesTitle} />
            <p className="mt-4 leading-relaxed text-ink-soft">
              {a.valuesIntro}
            </p>
            <ul className="mt-4 space-y-2">
              {a.values.map((v) => (
                <li key={v} className="flex gap-2.5 text-sm text-ink-soft">
                  <span aria-hidden className="mt-1 text-brand">
                    ●
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="card h-fit bg-brand-soft/50 p-6">
            <SectionTitle title={a.futureTitle} />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {a.futureBody}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
