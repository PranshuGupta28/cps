import CpsPhotoGallery from "@/components/gallery/CpsPhotoGallery";
import type { Metadata } from "next";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { getGallery } from "@/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { ButtonLink, JsonLd, PageHero, Section } from "@/components/ui";
import { GalleryView } from "@/components/GalleryView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/gallery",
    title: dict.gallery.title,
    description: dict.gallery.intro,
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const albums = (await getGallery()).map((a) => ({
    id: a.id,
    title: pick(locale, a.title),
    date: a.date,
    photos: a.photos.map((p) => ({
      src: p.src,
      width: p.width,
      height: p.height,
      alt: pick(locale, p.alt),
      caption: pick(locale, p.caption),
    })),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: dict.gallery.title, path: "/gallery" },
        ])}
      />
      <PageHero title={dict.gallery.title} intro={dict.gallery.intro} />
      <Section>
        <GalleryView
          albums={albums}
          labels={{
            photos: dict.gallery.photos,
            close: dict.a11y.closeLightbox,
            prev: dict.a11y.prevImage,
            next: dict.a11y.nextImage,
          }}
        />
        <div className="mt-10">
          <ButtonLink
            locale={locale}
            to={school.social.instagram}
            variant="outline"
          >
            {dict.gallery.viewOnInstagram} ↗
          </ButtonLink>
        </div>
      </Section>
       <CpsPhotoGallery showViewAll={false} />
    </>
  );
}
