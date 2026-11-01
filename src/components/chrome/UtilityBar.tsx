import { school } from "@/data/school";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function UtilityBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="bg-brand-deep text-white no-print">
      <div className="container-x flex items-center gap-4 py-1.5 text-xs">
        <a
          href={`tel:${school.phones[0].tel}`}
          className="hidden items-center gap-1.5 hover:underline sm:inline-flex"
        >
          <span aria-hidden>📞</span> {school.phones[0].display}
        </a>
        <a
          href={`mailto:${school.email}`}
          className="hidden items-center gap-1.5 hover:underline md:inline-flex"
        >
          <span aria-hidden>✉️</span> {school.email}
        </a>
        <span className="hidden lg:inline text-white/70">
          {dict.home.heroKicker} {school.admissionOpenYear}
        </span>
        <div className="ml-auto flex items-center gap-3">
          {school.payFeeUrl ? (
            <a
              href={school.payFeeUrl}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.topbar.payFee}
            </a>
          ) : null}
          {school.parentLoginUrl ? (
            <a
              href={school.parentLoginUrl}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.topbar.parentLogin}
            </a>
          ) : null}
          <LanguageSwitcher locale={locale} label={dict.a11y.switchLanguage} />
        </div>
      </div>
    </div>
  );
}
