import { Award } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Certification } from "@/lib/cms/certifications";
import { SectionHeading } from "./SectionHeading";

export function CertificationsSection({
  locale,
  dict,
  certifications,
}: {
  locale: Locale;
  dict: Dictionary;
  certifications: Certification[];
}) {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="border-t border-border-default bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.certifications.title} />
        <p className="mt-3 text-center font-mono text-sm text-text-tertiary">{dict.certifications.subtitle}</p>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {certifications.map((cert) => {
            const content = cert.content[locale];
            const card = (
              <div className="flex h-full min-w-[240px] flex-col gap-3 rounded-2xl border border-border-default bg-bg-primary p-6 transition-colors hover:border-accent-primary/40 sm:min-w-0">
                <Award className="h-6 w-6 text-accent-primary" />
                <h3 className="font-semibold text-text-primary">{content.name}</h3>
                <p className="text-sm text-text-secondary">{content.issuer}</p>
                <p className="mt-auto font-mono text-xs text-text-tertiary">{cert.year}</p>
              </div>
            );

            return cert.url ? (
              <a key={cert.id} href={cert.url} target="_blank" rel="noopener noreferrer" className="shrink-0 sm:shrink">
                {card}
              </a>
            ) : (
              <div key={cert.id} className="shrink-0 sm:shrink">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
