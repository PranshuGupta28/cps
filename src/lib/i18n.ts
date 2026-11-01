import { en } from "@/i18n/en";
import { hi } from "@/i18n/hi";

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries.en;
}

/** Localised path, e.g. href("hi", "/about") -> "/hi/about" */
export function href(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Pick a locale string from a { en, hi } record. */
export function pick(
  locale: Locale,
  value: { en: string; hi?: string } | string,
): string {
  if (typeof value === "string") return value;
  if (locale === "hi" && value.hi) return value.hi;
  return value.en;
}

export function formatDate(locale: Locale, iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatNumber(locale: Locale, n: number): string {
  return new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN").format(n);
}
