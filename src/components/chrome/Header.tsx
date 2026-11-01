"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { href, type Locale } from "@/lib/i18n";

interface NavEntry {
  label: string;
  path: string;
}

export function Header({
  locale,
  schoolName,
  logoAlt,
  applyLabel,
  menuLabels,
  primary,
  more,
}: {
  locale: Locale;
  schoolName: string;
  logoAlt: string;
  applyLabel: string;
  menuLabels: { open: string; close: string; more: string; nav: string };
  primary: NavEntry[];
  more: NavEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === href(locale, path) ||
    (path !== "/" && pathname?.startsWith(href(locale, path) + "/"));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex items-center gap-3 py-2.5">
        <Link
          href={href(locale, "/")}
          className="flex items-center gap-3 min-w-0"
        >
          <Image
            src="/images/logo.svg"
            alt={logoAlt}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0"
            priority
          />
          <div className="min-w-0 leading-tight">
            <span className="block font-display text-base sm:text-lg font-bold text-brand-deep truncate">
              {schoolName}
            </span>
            <span className="block text-[11px] sm:text-xs text-ink-soft">
              Chakghat, Distt. Rewa (M.P.)
            </span>
          </div>
        </Link>

        <nav
          aria-label={menuLabels.nav}
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {primary.map((item) => (
            <Link
              key={item.path}
              href={href(locale, item.path)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-soft hover:text-brand-deep ${
                isActive(item.path) ? "text-brand-deep bg-brand-soft" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-brand-soft hover:text-brand-deep"
            >
              {menuLabels.more} ▾
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border border-line bg-white py-1 shadow-lg">
                {more.map((item) => (
                  <Link
                    key={item.path}
                    href={href(locale, item.path)}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-brand-soft hover:text-brand-deep ${
                      isActive(item.path) ? "text-brand-deep font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href={href(locale, "/admissions")}
            className="btn btn-primary ml-2 !py-2 text-sm"
          >
            {applyLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? menuLabels.close : menuLabels.open}
        >
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
          {open ? menuLabels.close : menuLabels.open}
        </button>
      </div>

      {open && (
        <nav
          aria-label={menuLabels.nav}
          className="border-t border-line bg-white lg:hidden"
        >
          <div className="container-x grid gap-1 py-3">
            {[...primary, ...more].map((item) => (
              <Link
                key={item.path}
                href={href(locale, item.path)}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-soft ${
                  isActive(item.path) ? "bg-brand-soft text-brand-deep" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={href(locale, "/admissions")}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2"
            >
              {applyLabel}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
