"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryPhotoView {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface GalleryAlbumView {
  id: string;
  title: string;
  date: string;
  photos: GalleryPhotoView[];
}

export function GalleryView({
  albums,
  labels,
}: {
  albums: GalleryAlbumView[];
  labels: {
    photos: string;
    close: string;
    prev: string;
    next: string;
  };
}) {
  const [albumId, setAlbumId] = useState(albums[0]?.id ?? "");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const album = albums.find((a) => a.id === albumId) ?? albums[0];
  const photos = album?.photos ?? [];

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Albums">
        {albums.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === album?.id}
            className="chip"
            data-active={a.id === album?.id}
            onClick={() => {
              setAlbumId(a.id);
              setLightbox(null);
            }}
          >
            {a.title}
          </button>
        ))}
      </div>

      {album && (
        <div className="mt-6">
          <h2 className="font-display text-xl text-brand-deep">
            {album.title}
            <span className="ml-2 text-sm font-normal text-ink-soft">
              {album.photos.length} {labels.photos}
            </span>
          </h2>
          <ul className="mt-4 columns-2 gap-4 sm:columns-3">
            {album.photos.map((p, i) => (
              <li key={p.src} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="block w-full overflow-hidden rounded-xl border border-line"
                  aria-label={p.alt}
                >
                  <Image
                    src={`/images/${p.src}`}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="w-full object-cover transition-transform hover:scale-[1.02]"
                  />
                </button>
                <p className="mt-1.5 text-xs text-ink-soft">{p.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lightbox !== null && photos[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[lightbox].caption}
          className="fixed inset-0 z-[80] flex flex-col bg-black/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
          >
            ✕ {labels.close}
          </button>
          <div
            className="flex flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => step(-1)}
              className="mr-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
            >
              ←
            </button>
            <figure className="max-h-[82vh] max-w-4xl">
              <Image
                src={`/images/${photos[lightbox].src}`}
                alt={photos[lightbox].alt}
                width={photos[lightbox].width}
                height={photos[lightbox].height}
                className="max-h-[74vh] w-auto rounded-lg object-contain"
                priority
              />
              <figcaption className="mt-3 text-center text-sm text-white/85">
                {photos[lightbox].caption}
              </figcaption>
            </figure>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => step(1)}
              className="ml-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
