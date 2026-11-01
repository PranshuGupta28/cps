import type { MetadataRoute } from "next";
import { getNews } from "@/lib/content";
import { href, locales } from "@/lib/i18n";
import { siteUrl } from "@/data/school";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/about",
    "/academics",
    "/academics/faculty",
    "/admissions",
    "/campus",
    "/student-life",
    "/news",
    "/events",
    "/notices",
    "/gallery",
    "/tc-verification",
    "/tc-verification/class-10",
    "/tc-verification/class-12",
    "/downloads",
    "/mandatory-disclosure",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/accessibility",
    "/sitemap",
  ];

  const news = await getNews();
  const allPaths = [...staticPaths, ...news.map((n) => `/news/${n.slug}`)];

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${siteUrl}${href(locale, path)}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}${href(l, path)}`]),
        ),
      },
    })),
  );
}
