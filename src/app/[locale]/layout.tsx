import { notFound } from "next/navigation";
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { school } from "@/data/school";
import { UtilityBar } from "@/components/chrome/UtilityBar";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { WhatsAppFloat } from "@/components/chrome/WhatsAppFloat";
import { BackToTop } from "@/components/chrome/BackToTop";
import { SetHtmlLang } from "@/components/chrome/SetHtmlLang";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const primary = [
    { label: dict.nav.about, path: "/about" },
    { label: dict.nav.academics, path: "/academics" },
    { label: dict.nav.admissions, path: "/admissions" },
    { label: dict.nav.campus, path: "/campus" },
    { label: dict.nav.studentLife, path: "/student-life" },
    { label: dict.nav.news, path: "/news" },
    { label: dict.nav.gallery, path: "/gallery" },
  ];
  const more = [
    { label: dict.nav.notices, path: "/notices" },
    { label: dict.nav.tcVerification, path: "/tc-verification" },
    { label: dict.nav.downloads, path: "/downloads" },
    { label: dict.nav.disclosure, path: "/mandatory-disclosure" },
    { label: dict.nav.contact, path: "/contact" },
  ];

  return (
    <>
      <SetHtmlLang locale={locale} />
      <a href="#main" className="skip-link">
        {dict.a11y.skipToContent}
      </a>
      <UtilityBar locale={locale} dict={dict} />
      <Header
        locale={locale}
        schoolName={locale === "hi" ? school.nameHi : school.name}
        logoAlt={dict.a11y.logoAlt}
        applyLabel={dict.nav.apply}
        menuLabels={{
          open: dict.a11y.openMenu,
          close: dict.a11y.closeMenu,
          more: dict.nav.more,
          nav: dict.a11y.mainNav,
        }}
        primary={primary}
        more={more}
      />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFloat number={school.whatsapp} label={dict.cta.whatsappUs} />
      <BackToTop label={dict.a11y.backToTop} />
    </>
  );
}
