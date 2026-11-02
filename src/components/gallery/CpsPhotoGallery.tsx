import Image from "next/image";
import Link from "next/link";
import {
  cpsGalleryPhotos,
  type GalleryCategory,
} from "@/data/gallery-photos";

type CpsPhotoGalleryProps = {
  limit?: number;
  category?: GalleryCategory;
  title?: string;
  description?: string;
  showViewAll?: boolean;
};

export default function CpsPhotoGallery({
  limit,
  category,
  title,
  description,
  showViewAll = true,
}: CpsPhotoGalleryProps) {
  const categoryPhotos = category
    ? cpsGalleryPhotos.filter((photo) => photo.category === category)
    : [...cpsGalleryPhotos];
  const photos = typeof limit === "number"
    ? categoryPhotos.slice(0, limit)
    : categoryPhotos;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
            Life at CPS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title ?? (category || "Glimpses of CPS")}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {description ??
              "A glimpse of learning, creativity, campus life and celebrations at our school."}
          </p>
        </div>

        {showViewAll && (
          <Link
            href="/gallery"
            className="inline-flex w-fit items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            View all photos <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <article
            key={photo.src}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="overflow-hidden bg-slate-100">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={960}
                height={720}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                {photo.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {photo.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
