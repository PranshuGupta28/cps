import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDate,
  getDictionary,
  href,
  locales,
  pick,
  type Locale,
} from "@/lib/i18n";
import { getNews, getNewsItem } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteUrl } from "@/data/school";
import { JsonLd, PageHero } from "@/components/ui";

export async function generateStaticParams() {
  const news = await getNews();
  return locales.flatMap((locale) =>
    news.map((n) => ({ locale, slug: n.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return {};
  const loc = (locale === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(loc);
  const languages: Record<string, string> = {};
  for (const l of locales)
    languages[l] = `${siteUrl}${href(l, `/news/${slug}`)}`;
  return {
    title: `${pick(loc, item.title)} — ${dict.meta.titleSuffix}`,
    description: pick(loc, item.excerpt),
    alternates: {
      canonical: `${siteUrl}${href(loc, `/news/${slug}`)}`,
      languages,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const item = await getNewsItem(slug);
  if (!item) notFound();

  const paragraphs =
    locale === "hi" && item.body.hi ? item.body.hi : item.body.en;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.newsPage.title, path: "/news" },
          { name: pick(locale, item.title), path: `/news/${slug}` },
        ])}
      />
      <PageHero
        title={pick(locale, item.title)}
        intro={`${dict.newsPage.publishedOn} ${formatDate(locale, item.date)}`}
      />
      <article className="container-x max-w-3xl py-10">
        {item.image ? (
          <figure>
            <Image
              src={`/images/${item.image}`}
              alt={dict.newsPage.relatedImage}
              width={640}
              height={400}
              className="w-full rounded-xl object-cover"
              priority
            />
          </figure>
        ) : null}
        <div className="prose-cps mt-6">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          href={href(locale, "/news")}
          className="mt-8 inline-block font-semibold text-brand hover:underline"
        >
          ← {dict.newsPage.backToNews}
        </Link>
      </article>
    </>
  );
}
