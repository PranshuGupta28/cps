import Link from "next/link";
import Image from "next/image";
import { school } from "@/data/school";
import { href, type Dictionary, type Locale } from "@/lib/i18n";
import { CopyrightYear } from "./CopyrightYear";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const f = dict.footer;
  const quickLinks = [
    { label: dict.nav.tcVerification, path: "/tc-verification" },
    { label: dict.nav.disclosure, path: "/mandatory-disclosure" },
    { label: dict.nav.gallery, path: "/gallery" },
    { label: dict.nav.downloads, path: "/downloads" },
    { label: dict.nav.notices, path: "/notices" },
    { label: dict.nav.contact, path: "/contact" },
  ];
  const legalLinks = [
    { label: dict.legal.privacy.title, path: "/privacy-policy" },
    { label: dict.legal.terms.title, path: "/terms" },
    { label: dict.legal.accessibility.title, path: "/accessibility" },
    { label: dict.legal.sitemap.title, path: "/sitemap" },
  ];

  return (
    <footer className="bg-brand-deep text-white no-print">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-mono.svg"
              alt={dict.a11y.logoAlt}
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="font-display font-bold leading-tight">
              {locale === "hi" ? school.nameHi : school.name}
            </div>
          </div>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">{f.about}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={school.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline-offset-2 hover:underline"
            >
              Instagram
            </a>
            <a
              href={school.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline-offset-2 hover:underline"
            >
              Facebook
            </a>
            <a
              href={school.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline-offset-2 hover:underline"
            >
              YouTube
            </a>
          </div>
        </div>

        <nav aria-label={f.quickLinks}>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            {f.quickLinks}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.path}>
                <Link
                  href={href(locale, l.path)}
                  className="text-white/85 hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.compliance}>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            {f.compliance}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.path}>
                <Link
                  href={href(locale, l.path)}
                  className="text-white/85 hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">
            {f.contactUs}
          </h3>
          <address className="mt-3 space-y-2 text-sm not-italic text-white/85">
            <p>
              {school.address.line1}
              <br />
              {school.address.line2}
            </p>
            {school.phones.map((p) => (
              <p key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:underline">
                  {p.display}
                </a>
              </p>
            ))}
            <p>
              <a href={`mailto:${school.email}`} className="hover:underline">
                {school.email}
              </a>
            </p>
            <p>
              <a
                href={school.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {dict.cta.getDirections}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x py-4">
          <p className="rounded-lg bg-white/10 px-4 py-2.5 text-xs leading-relaxed text-gold">
            ⚠ {f.fraud}
          </p>
          <p className="mt-3 text-center text-xs text-white/70">
            © <CopyrightYear /> {school.name}, Chakghat. {f.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
