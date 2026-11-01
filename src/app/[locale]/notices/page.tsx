import type { Metadata } from "next";
import { formatDate, getDictionary, pick, type Locale } from "@/lib/i18n";
import { getNotices } from "@/lib/content";
import { getDocument } from "@/data/documents";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";
import { NoticesClient } from "@/components/NoticesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/notices",
    title: dict.notices.title,
    description: dict.notices.intro,
  });
}

export default async function NoticesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const notices = await getNotices();

  const items = notices.map((n) => {
    const doc = n.document ? getDocument(n.document) : null;
    return {
      date: n.date,
      dateLabel: formatDate(locale, n.date),
      title: pick(locale, n.title),
      body: pick(locale, n.body),
      documentUrl: doc?.file ? `/documents/${doc.file}` : null,
    };
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.notices.title, path: "/notices" },
        ])}
      />
      <PageHero title={dict.notices.title} intro={dict.notices.intro} />
      <Section>
        <NoticesClient
          items={items}
          labels={{
            searchPlaceholder: dict.common.searchPlaceholder,
            attachment: dict.notices.attachment,
            noAttachment: dict.notices.noAttachment,
            noResults: dict.common.noResults,
            viewDocument: dict.cta.viewDocument,
          }}
        />
      </Section>
    </>
  );
}
