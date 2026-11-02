// Example full-gallery route.
// If src/app/gallery/page.tsx already exists, do NOT overwrite it;
// import and render <CpsPhotoGallery showViewAll={false} /> in its existing layout.

import type { Metadata } from "next";
import CpsPhotoGallery from "@/components/gallery/CpsPhotoGallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Central Public Senior Secondary School",
  description:
    "Explore campus life, student activities, cultural programmes and school events at Central Public Senior Secondary School, Chakghat.",
};

export default function GalleryPage() {
  return (
    <main>
      <CpsPhotoGallery showViewAll={false} />
    </main>
  );
}
