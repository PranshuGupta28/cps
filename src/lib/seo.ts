import type { Metadata } from "next";
import { getDictionary, href, locales, type Locale } from "@/lib/i18n";
import { school, siteUrl } from "@/data/school";

export function pageMeta(opts: {
  locale: Locale;
  path: string; // locale-free path, e.g. "/about"
  title: string;
  description?: string;
}): Metadata {
  const { locale, path, title, description } = opts;
  const dict = getDictionary(locale);
  const canonical = `${siteUrl}${href(locale, path)}`;

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}${href(l, path)}`;
  languages["x-default"] = `${siteUrl}${href("en", path)}`;

  return {
    title: `${title} — ${dict.meta.titleSuffix}`,
    description: description ?? dict.meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: `${title} — ${dict.meta.titleSuffix}`,
      description: description ?? dict.meta.description,
      url: canonical,
      siteName: school.name,
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      type: "website",
    },
  };
}

export function schoolJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: school.name,
    alternateName: "C.P.S. Chakghat",
    description: dict.meta.description,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/images/logo.svg`,
    image: `${siteUrl}/images/hero-campus.jpg`,
    telephone: school.phones[0].tel,
    email: school.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ward No. 7, Nagar Parishad, Chakghat",
      addressLocality: "Teonthar",
      addressRegion: "Madhya Pradesh",
      postalCode: "486226",
      addressCountry: "IN",
    },
    sameAs: [school.social.instagram, school.social.facebook],
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${href(locale, item.path)}`,
    })),
  };
}
