import type { Metadata } from "next";
import {
  formatDate,
  getDictionary,
  href,
  pick,
  type Locale,
} from "@/lib/i18n";
import { getNews } from "@/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";
import { NewsList } from "@/components/NewsList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/news",
    title: dict.newsPage.title,
    description: dict.newsPage.intro,
  });
}

const CATEGORY_LABELS: Record<string, { en: string; hi: string }> = {
  celebration: { en: "Celebrations", hi: "उत्सव" },
  academic: { en: "Academic", hi: "शैक्षणिक" },
  admission: { en: "Admissions", hi: "प्रवेश" },
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const news = await getNews();

  const items = news.map((n) => ({
    slug: n.slug,
    date: n.date,
    dateLabel: formatDate(locale, n.date),
    category: n.category,
    image: n.image,
    title: pick(locale, n.title),
    excerpt: pick(locale, n.excerpt),
  }));
  const categories = [...new Set(news.map((n) => n.category))].map(
    (c) => CATEGORY_LABELS[c]?.[locale] ?? c,
  );
  const catKeyByLabel = new Map(
    [...new Set(news.map((n) => n.category))].map((c) => [
      CATEGORY_LABELS[c]?.[locale] ?? c,
      c,
    ]),
  );
  // map translated chip labels back to category keys
  const itemsWithLabel = items.map((n) => ({
    ...n,
    category: CATEGORY_LABELS[n.category]?.[locale] ?? n.category,
  }));
  void catKeyByLabel;
  const years = [...new Set(news.map((n) => n.date.slice(0, 4)))].sort(
    (a, b) => (a < b ? 1 : -1),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.newsPage.title, path: "/news" },
        ])}
      />
      <PageHero title={dict.newsPage.title} intro={dict.newsPage.intro} />
      <Section>
        <NewsList
          items={itemsWithLabel}
          categories={categories}
          years={years}
          basePath={href(locale, "/news")}
          labels={{
            all: dict.common.all,
            filterCategory: dict.newsPage.filterCategory,
            filterYear: dict.newsPage.filterYear,
            noNews: dict.newsPage.noNews,
            readFull: dict.newsPage.readFull,
            photoComingSoon: dict.common.photoComingSoon,
          }}
        />
      </Section>
    </>
  );
}
