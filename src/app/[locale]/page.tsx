import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  formatDate,
  formatNumber,
  getDictionary,
  href,
  pick,
  type Locale,
} from "@/lib/i18n";
import { school } from "@/data/school";
import { getEvents, getGallery, getNews } from "@/lib/content";
import { schoolJsonLd } from "@/lib/seo";
import {
  ButtonLink,
  JsonLd,
  PhotoPlaceholder,
  Section,
  SectionTitle,
} from "@/components/ui";
import { ResultsChart } from "@/components/ResultsChart";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: `${dict.meta.titleSuffix}`,
    description: dict.meta.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://cpschakghat.com"}${href(locale as Locale, "/")}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://cpschakghat.com"}/en`,
        hi: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://cpschakghat.com"}/hi`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const h = dict.home;

  const [news, events, albums] = await Promise.all([
    getNews(),
    getEvents(),
    getGallery(),
  ]);
  const latestNews = news.slice(0, 3);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).slice(0, 4);
  const photos = albums.flatMap((a) =>
    a.photos.map((p) => ({ ...p, album: a.title })),
  );

  const stats = [
    { value: formatNumber(locale, school.staff.total), label: h.stats.teachers },
    {
      value: formatNumber(locale, school.infrastructure.classrooms.count),
      label: h.stats.classrooms,
    },
    {
      value: formatNumber(locale, school.infrastructure.labs.count),
      label: h.stats.labs,
    },
    {
      value: formatNumber(locale, Math.round(school.infrastructure.campusAreaSqm)),
      label: h.stats.campusArea,
    },
  ];

  return (
    <>
      <JsonLd data={schoolJsonLd(locale)} />

      {/* ---------- Hero ---------- */}
      <section className="relative bg-brand-deep text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-campus.jpg"
            alt={h.heroAlt}
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-brand-deep/40" />
        </div>
        <div className="container-x relative py-20 sm:py-28">
          <p className="inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-ink">
            {h.heroKicker} {school.admissionOpenYear}
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {h.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{h.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink locale={locale} to="/admissions" variant="gold">
              {dict.cta.apply}
            </ButtonLink>
            <ButtonLink locale={locale} to="/contact" variant="ghost-light">
              {dict.cta.bookTour}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <Section className="!py-8" id="stats">
        <div className="card grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="p-5 text-center">
              <p className="font-display text-3xl font-bold text-brand">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Leadership messages ---------- */}
      <Section>
        <SectionTitle title={h.messagesTitle} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              name:
                locale === "hi" ? school.director.nameHi : school.director.name,
              role: pick(locale, school.director.title),
              message: pick(locale, school.director.message),
              photo: school.director.photo,
            },
            {
              name:
                locale === "hi"
                  ? school.principal.nameHi
                  : school.principal.name,
              role: pick(locale, school.principal.title),
              message: pick(locale, school.principal.message),
              photo: school.principal.photo,
            },
          ].map((p) => (
            <article key={p.role} className="card flex gap-5 p-6">
              {p.photo ? (
                <Image
                  src={`/images/${p.photo}`}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-2xl font-bold text-brand"
                >
                  {p.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/, "").charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-display text-lg font-bold text-brand-deep">
                  {p.role}
                </h3>
                <p className="text-sm font-semibold text-ink">
                  {p.name}
                  {p.role === pick(locale, school.principal.title) ? (
                    <span className="font-normal text-ink-soft">
                      {" "}
                      · {school.principal.qualification}
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {p.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- Why CPS ---------- */}
      <Section className="!pt-0">
        <SectionTitle title={h.whyTitle} />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {h.whyPoints.map((w) => (
            <li key={w.title} className="card p-5">
              <h3 className="font-semibold text-brand-deep">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {w.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- News + upcoming dates ---------- */}
      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between">
              <SectionTitle title={h.newsTitle} />
              <Link
                href={href(locale, "/news")}
                className="text-sm font-semibold text-brand hover:underline"
              >
                {dict.cta.viewAll} →
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {latestNews.map((n) => (
                <li key={n.slug} className="card flex flex-col overflow-hidden">
                  {n.image ? (
                    <Image
                      src={`/images/${n.image}`}
                      alt=""
                      width={640}
                      height={300}
                      className="aspect-[2/1] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[2/1] w-full bg-brand-soft" />
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs text-ink-soft">
                      {formatDate(locale, n.date)}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug">
                      {pick(locale, n.title)}
                    </h3>
                    <Link
                      href={href(locale, `/news/${n.slug}`)}
                      className="mt-auto pt-2 text-sm font-semibold text-brand hover:underline"
                    >
                      {dict.cta.readMore} →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle title={h.eventsTitle} />
            <ul className="mt-6 space-y-3">
              {upcoming.map((e, i) => (
                <li key={i} className="card flex items-center gap-4 p-4">
                  <div className="w-14 shrink-0 rounded-lg bg-brand py-2 text-center text-white">
                    <span className="block text-xl font-bold leading-none">
                      {e.date.slice(8, 10)}
                    </span>
                    <span className="block text-[11px] uppercase">
                      {new Date(`${e.date}T00:00:00`).toLocaleString(
                        locale === "hi" ? "hi-IN" : "en-IN",
                        { month: "short" },
                      )}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">
                      {pick(locale, e.title)}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {formatDate(locale, e.date)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- Results ---------- */}
      <Section className="!pt-0">
        <SectionTitle title={h.resultsTitle} sub={h.resultsSub} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ResultsChart
            title={dict.disclosure.resultsTable.titleX}
            data={school.results.class10}
            labels={dict.disclosure.resultsTable}
          />
          <ResultsChart
            title={dict.disclosure.resultsTable.titleXII}
            data={school.results.class12}
            labels={dict.disclosure.resultsTable}
          />
        </div>
      </Section>

      {/* ---------- Gallery preview ---------- */}
      <Section className="!pt-0">
        <div className="flex items-end justify-between">
          <SectionTitle title={h.galleryTitle} />
          <Link
            href={href(locale, "/gallery")}
            className="text-sm font-semibold text-brand hover:underline"
          >
            {dict.cta.viewAll} →
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.slice(0, 4).map((p) => (
            <li key={p.src}>
              <Image
                src={`/images/${p.src}`}
                alt={pick(locale, p.alt)}
                width={p.width}
                height={p.height}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </li>
          ))}
          {photos.length === 0 &&
            [0, 1, 2, 3].map((i) => (
              <li key={i}>
                <PhotoPlaceholder label={dict.common.photoComingSoon} />
              </li>
            ))}
        </ul>
      </Section>

      {/* ---------- Parent quick links ---------- */}
      <Section className="!pt-0">
        <div className="card bg-brand-soft/60 p-6 sm:p-8">
          <SectionTitle title={h.quickLinksTitle} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {h.quickLinks.map((q) => (
              <li key={q.label}>
                <Link
                  href={href(locale, q.path)}
                  className="block rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-brand-soft"
                >
                  {q.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Enquiry strip ---------- */}
      <Section className="!pt-0">
        <div className="rounded-2xl bg-brand-deep px-6 py-10 text-white sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl sm:text-3xl">
                {h.enquiryTitle}
              </h2>
              <p className="mt-2 text-white/85">{h.enquiryBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink locale={locale} to="/admissions" variant="gold">
                {dict.cta.enquire}
              </ButtonLink>
              <a
                href={`tel:${school.phones[0].tel}`}
                className="btn btn-ghost-light"
              >
                {school.phones[0].display}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Map / contact ---------- */}
      <Section className="!pt-0">
        <SectionTitle title={h.mapTitle} />
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="card p-6">
            <address className="space-y-3 not-italic text-sm leading-relaxed">
              <p className="font-semibold text-brand-deep">{school.name}</p>
              <p className="text-ink-soft">
                {school.address.line1}
                <br />
                {school.address.line2}
              </p>
              {school.phones.map((p) => (
                <p key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="font-medium text-brand hover:underline"
                  >
                    {p.display}
                  </a>
                </p>
              ))}
              <p>
                <a
                  href={`mailto:${school.email}`}
                  className="font-medium text-brand hover:underline"
                >
                  {school.email}
                </a>
              </p>
            </address>
            <ButtonLink
              locale={locale}
              to={school.address.mapUrl}
              variant="outline"
              className="mt-5 !py-2 text-sm"
            >
              {dict.cta.getDirections}
            </ButtonLink>
          </div>
          <div className="card overflow-hidden lg:col-span-2">
            <iframe
              title={h.mapTitle}
              src={school.address.mapEmbed}
              className="h-full min-h-[300px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
