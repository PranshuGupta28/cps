import type { Metadata } from "next";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { documents } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";
import { DownloadsClient } from "@/components/DownloadsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/downloads",
    title: dict.downloads.title,
    description: dict.downloads.intro,
  });
}

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const d = dict.downloads;

  const items = documents.map((doc) => ({
    id: doc.id,
    title: pick(locale, doc.title),
    file: doc.file,
    category: doc.category,
    updatedOn: doc.updatedOn,
    size: doc.size,
    outdated: doc.outdated,
  }));

  const categories = Object.entries(d.categories).map(([id, label]) => ({
    id,
    label,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: d.title, path: "/downloads" },
        ])}
      />
      <PageHero title={d.title} intro={d.intro} />
      <Section>
        <DownloadsClient
          items={items}
          categories={categories}
          labels={{
            searchPlaceholder: dict.common.searchPlaceholder,
            all: dict.common.all,
            download: dict.cta.download,
            pendingUpload: dict.common.pendingUpload,
            needsUpdate: dict.common.needsUpdate,
            updatedOn: dict.common.updatedOn,
            fileSize: dict.common.fileSize,
            noResults: dict.common.noResults,
          }}
        />
      </Section>
    </>
  );
}
