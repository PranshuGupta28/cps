import type { Metadata } from "next";
import {
  formatDate,
  getDictionary,
  pick,
  type Locale,
} from "@/lib/i18n";
import { getEvents, type EventItem } from "@/lib/content";
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
    path: "/events",
    title: dict.newsPage.eventsTab,
  });
}

function EventList({
  items,
  locale,
}: {
  items: EventItem[];
  locale: Locale;
}) {
  return (
    <ul className="space-y-3">
      {items.map((e, i) => (
        <li key={i} className="card flex gap-4 p-5">
          <div className="w-16 shrink-0 rounded-lg bg-brand py-2 text-center text-white">
            <span className="block text-xl font-bold leading-none">
              {e.date.slice(8, 10)}
            </span>
            <span className="block text-[11px] uppercase">
              {new Date(`${e.date}T00:00:00`).toLocaleString(
                locale === "hi" ? "hi-IN" : "en-IN",
                { month: "short" },
              )}
            </span>
            <span className="block text-[11px]">{e.date.slice(0, 4)}</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold">{pick(locale, e.title)}</h3>
            <p className="mt-0.5 text-sm text-ink-soft">
              {pick(locale, e.description)}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {formatDate(locale, e.date)} · {e.category}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: upcoming.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.title.en,
        startDate: e.date,
        description: e.description.en,
        location: {
          "@type": "Place",
          name: "Central Public Sr. Sec. School, Chakghat",
        },
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.newsPage.eventsTab, path: "/events" },
        ])}
      />
      <JsonLd data={eventJsonLd} />
      <PageHero title={dict.newsPage.eventsTab} intro={dict.newsPage.intro} />
      <Section>
        <SectionTitle title={dict.home.eventsTitle} />
        <div className="mt-6">
          <EventList items={upcoming} locale={locale} />
        </div>
        {past.length > 0 ? (
          <div className="mt-10">
            <SectionTitle title={dict.newsPage.pastEvents} />
            <div className="mt-6 opacity-80">
              <EventList items={past} locale={locale} />
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
