import { Mail } from "lucide-react";
import type { Site } from "@/content/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { CodeButton } from "./CodeButton";
import { SectionHeading } from "./SectionHeading";

export function ContactCTA({
  dict,
  site,
}: {
  dict: Dictionary;
  site: Site;
}) {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#0f766e_0%,transparent_55%)] opacity-25" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted">
          <Mail className="h-8 w-8 text-accent-primary" />
        </div>
        <SectionHeading title={dict.contact.title.replace("// ", "")} />
        <p className="mx-auto mb-12 mt-6 max-w-2xl font-mono text-base text-text-secondary">
          {dict.contact.subtitle}
        </p>
        <CodeButton href={`mailto:${site.email}`}>{dict.contact.cta}</CodeButton>
      </div>
    </section>
  );
}
