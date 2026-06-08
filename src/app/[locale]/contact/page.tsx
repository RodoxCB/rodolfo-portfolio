import { Mail, MapPin } from "lucide-react";
import { getSite } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, site] = await Promise.all([
    getDictionary(locale as Locale),
    getSite(),
  ]);

  const links = [
    { key: "email" as const, href: `mailto:${site.email}`, label: site.email },
    { key: "linkedin" as const, href: site.links.linkedin, label: "linkedin.com/in/rodolfo-behr-30134674" },
    { key: "behance" as const, href: site.links.behance, label: "behance.net/rodolfobehr" },
    { key: "github" as const, href: site.links.github, label: "github.com/RodoxCB" },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading title={dict.contact.pageTitle} />
      <p className="mt-4 text-center text-text-secondary">{dict.contact.pageSubtitle}</p>

      <div className="mt-12 space-y-4">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.key === "email" ? undefined : "_blank"}
            rel={link.key === "email" ? undefined : "noreferrer"}
            className="flex items-center justify-between rounded-xl border border-border-default bg-bg-secondary px-5 py-4 transition-colors hover:border-border-hover hover:bg-bg-tertiary"
          >
            <span className="text-sm text-text-tertiary">{dict.contact[link.key]}</span>
            <span className="text-sm font-medium text-text-primary">{link.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-border-default bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" />
        <p>{dict.contact.location}</p>
      </div>

      <div className="mt-8 text-center">
        <a
          href={`mailto:${site.email}`}
          className="code-button inline-flex items-center gap-2 rounded-lg bg-bg-secondary px-6 py-3 font-mono text-base font-semibold text-text-primary"
        >
          <Mail className="h-4 w-4" />
          {dict.contact.cta}
        </a>
      </div>
    </section>
  );
}
