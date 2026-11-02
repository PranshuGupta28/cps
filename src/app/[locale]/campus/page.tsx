import CpsPhotoGallery from "@/components/gallery/CpsPhotoGallery";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  JsonLd,
  PageHero,
  PhotoPlaceholder,
  Section,
  SmartImage,
} from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/campus",
    title: dict.campus.title,
    description: dict.campus.intro,
  });
}

/** Slot for a real facility photo — add the file to public/images and set the filename here. */
const facilityPhotos: (string | null)[] = [
  "hero-campus.jpg", // classrooms / building
  null, // laboratories
  null, // computer lab
  null, // library
  null, // sports
  null, // transport
  null, // safety
  null, // inspection video
];

export default async function CampusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const c = dict.campus;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: c.title, path: "/campus" },
        ])}
      />
      <PageHero title={c.title} intro={c.intro} />

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.facilities.map((f, i) => {
            const photo = facilityPhotos[i] ?? null;
            const isVideo = f.title.toLowerCase().includes("video") || i === 7;
            return (
              <li key={f.title} className="card overflow-hidden">
                {isVideo ? (
                  <a
                    href={school.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex aspect-[4/3] items-center justify-center bg-brand-deep text-white"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">
                      ▶
                    </span>
                    <span className="absolute bottom-3 text-sm font-semibold">
                      {dict.cta.watchVideo} ↗
                    </span>
                  </a>
                ) : photo ? (
                  <SmartImage
                    file={photo}
                    alt={f.title}
                    width={578}
                    height={170}
                    className="!rounded-none aspect-[4/3]"
                  />
                ) : (
                  <PhotoPlaceholder label={dict.common.photoComingSoon} />
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-brand-deep">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {f.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
                <p className="mt-8 rounded-lg bg-brand-soft px-4 py-3 text-sm text-brand-deep">
          {c.photoNote}
        </p>
      </Section>

      {/* Campus Photo Gallery */}
      <CpsPhotoGallery
        category="Campus & Facilities"
        title="Our Campus & Facilities"
      />

    </>
  );
}
