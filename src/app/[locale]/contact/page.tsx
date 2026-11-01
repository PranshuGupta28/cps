import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { school } from "@/data/school";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMeta({
    locale: locale as Locale,
    path: "/contact",
    title: dict.contact.title,
    description: dict.contact.intro,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "hi" ? "hi" : "en") as Locale;
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: dict.nav.home, path: "/" },
          { name: c.title, path: "/contact" },
        ])}
      />
      <PageHero title={c.title} intro={c.intro} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-semibold text-brand-deep">{c.addressLabel}</h2>
              <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
                {school.address.line1}
                <br />
                {school.address.line2}
              </address>
              <a
                href={school.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {dict.cta.getDirections} ↗
              </a>
            </div>
            <div className="card p-6">
              <h2 className="font-semibold text-brand-deep">{c.phoneLabel}</h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {school.phones.map((p) => (
                  <li key={p.tel}>
                    <a
                      href={`tel:${p.tel}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {p.display}
                    </a>
                    <span className="text-ink-soft"> · {p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="font-semibold text-brand-deep">{c.emailLabel}</h2>
              <a
                href={`mailto:${school.email}`}
                className="mt-2 block text-sm font-medium text-brand hover:underline"
              >
                {school.email}
              </a>
            </div>
            <div className="card p-6">
              <h2 className="font-semibold text-brand-deep">
                {c.officeHours}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                {school.officeHours ?? c.officeHoursBody}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <ContactForm dict={dict} />
            <div className="card overflow-hidden">
              <iframe
                title={c.mapTitle}
                src={school.address.mapEmbed}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
