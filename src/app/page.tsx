import CpsPhotoGallery from "@/components/gallery/CpsPhotoGallery";

import { redirect } from "next/navigation";

export default function RootPage() {
  <CpsPhotoGallery limit={6} />
  redirect("/en");
}
