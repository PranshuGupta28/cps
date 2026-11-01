import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { href, type Locale } from "@/lib/i18n";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`container-x py-10 sm:py-14 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  sub,
  center = false,
}: {
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="font-display text-2xl sm:text-3xl text-brand-deep">
        {title}
      </h2>
      {sub ? (
        <p className="mt-2 text-ink-soft max-w-2xl mx-auto">{sub}</p>
      ) : null}
      <div
        aria-hidden
        className={`mt-3 h-1 w-14 rounded bg-gold ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}

export function PageHero({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-brand-deep text-white">
      <div className="container-x py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
        {intro ? (
          <p className="mt-3 max-w-2xl text-white/85 leading-relaxed">{intro}</p>
        ) : null}
      </div>
      <div className="h-1.5 bg-gold" aria-hidden />
    </div>
  );
}

export function ButtonLink({
  locale,
  to,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  locale: Locale;
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "gold" | "ghost-light";
  external?: boolean;
  className?: string;
}) {
  const cls = `btn btn-${variant} ${className}`;
  if (external || to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:")) {
    return (
      <a
        href={to}
        className={cls}
        {...(to.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href(locale, to)} className={cls}>
      {children}
    </Link>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "warn" | "success";
}) {
  const tones = {
    neutral: "bg-brand-soft text-brand-deep",
    warn: "bg-amber-100 text-amber-900",
    success: "bg-green-100 text-green-900",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Placeholder used where a real facility photo has not been supplied yet. */
export function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-brand-soft/50 text-ink-soft"
      role="img"
      aria-label={label}
    >
      <svg
        aria-hidden
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="m4.5 18 4.5-4.5 3.5 3.5 4-4 3 3" />
      </svg>
      <span className="text-sm font-medium px-4 text-center">{label}</span>
    </div>
  );
}

export function SmartImage({
  file,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  /** filename under /public/images */
  file: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  if (!file) return <PhotoPlaceholder label={alt} />;
  return (
    <Image
      src={`/images/${file}`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      className={`h-auto w-full rounded-xl object-cover ${className}`}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; path?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.path ? (
              <Link
                href={href(locale, item.path)}
                className="hover:text-brand underline-offset-2 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
