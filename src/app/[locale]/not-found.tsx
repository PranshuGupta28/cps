import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export default function NotFound() {
  // not-found pages don't reliably receive params — default to English.
  const dict = getDictionary("en");
  return (
    <div className="container-x py-20 text-center">
      <p className="font-display text-6xl font-bold text-brand-deep">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{dict.notFound.title}</h1>
      <p className="mt-2 text-ink-soft">{dict.notFound.body}</p>
      <Link href="/en" className="btn btn-primary mt-6">
        {dict.notFound.home}
      </Link>
    </div>
  );
}
