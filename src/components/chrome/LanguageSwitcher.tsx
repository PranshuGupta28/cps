"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const target: Locale = locale === "en" ? "hi" : "en";
  const rest = pathname?.replace(/^\/(en|hi)/, "") ?? "";
  return (
    <Link
      href={`/${target}${rest || "/"}`}
      hrefLang={target}
      className="inline-flex items-center gap-1 rounded-md border border-white/30 px-2 py-0.5 text-xs font-semibold text-white hover:bg-white/10"
      aria-label={label}
    >
      {label}
    </Link>
  );
}
