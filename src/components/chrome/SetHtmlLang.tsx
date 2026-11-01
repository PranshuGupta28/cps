"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/** Keeps <html lang> in sync with the active locale. */
export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("lang-hi", locale === "hi");
  }, [locale]);
  return null;
}
