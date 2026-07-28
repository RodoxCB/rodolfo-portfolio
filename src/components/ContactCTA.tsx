import { Mail, MapPin } from "lucide-react";
import type { Site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "./SectionHeading";

export function ContactCTA({
  dict,
  site,
}: {
  dict: Dictionary;
  site: Site;
}) {
  const links = [
    { key: "email" as const, href: `mailto:${site.email}`, label: site.email, external: false },
    { key: "linkedin" as const, href: site.links.linkedin, label: "linkedin.com/in/rodolfo-behr-30134674", external: true },
    { key: "behance" as const, href: site.links.behance, label: "behance.net/rodolfobehr", external: true },
    { key: "github" as const, href: site.links.github, label: "github.com/RodoxCB", external: true },
  ];

  return (
    <section id="contact-me" className="relative overflow-hidden border-t border-border-default bg-bg-primary py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#0f766e_0%,transparent_55%)] opacity-25" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted">
          <Mail className="h-8 w-8 text-accent-primary" />
        </div>
        <SectionHeading title={dict.contact.title.replace("// ", "")} />
        <p className="mx-auto mb-12 mt-6 max-w-2xl font-mono text-base text-text-secondary">
          {dict.contact.subtitle}
        </p>

        <div className="space-y-4 text-left">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="flex items-center justify-between rounded-xl border border-border-default bg-bg-secondary px-5 py-4 transition-colors hover:border-border-hover hover:bg-bg-tertiary"
            >
              <span className="text-sm text-text-tertiary">{dict.contact[link.key]}</span>
              <span className="text-sm font-medium text-text-primary">{link.label}</span>
            </a>
          ))}

          <div className="flex items-start gap-3 rounded-xl border border-border-default bg-bg-secondary px-5 py-4 text-sm text-text-secondary">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" />
            <p>{dict.contact.location}</p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href={`mailto:${site.email}`}
            className="code-button inline-flex items-center gap-2 rounded-lg bg-bg-secondary px-6 py-3 font-mono text-base font-semibold text-text-primary"
          >
            <Mail className="h-4 w-4" />
            {dict.contact.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
