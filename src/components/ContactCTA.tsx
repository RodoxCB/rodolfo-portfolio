import { ChevronRight, MapPin } from "lucide-react";
import type { Site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Eyebrow } from "./SectionHeading";

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
    <section id="contact-me" className="relative overflow-hidden bg-bg-primary py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#0f766e_0%,transparent_55%)] opacity-20" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Eyebrow label={dict.contact.subtitle} />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-8">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-text-primary sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {dict.contact.title.replace("// ", "")}
            </span>
          </h2>

          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="group flex items-center gap-2 text-base text-text-secondary transition-colors hover:text-accent-primary"
              >
                <ChevronRight className="h-4 w-4 shrink-0 text-accent-primary transition-transform group-hover:translate-x-1" />
                <span className="text-text-tertiary">{dict.contact[link.key]}:</span>
                <span className="font-medium text-text-primary group-hover:text-accent-primary">{link.label}</span>
              </a>
            ))}

            <div className="flex items-start gap-2 pt-2 text-base text-text-secondary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" />
              <p>{dict.contact.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
