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
    <section id="certifications" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={dict.certifications.subtitle} title={dict.certifications.title} />

        <div className="mt-12 flex flex-col flex-wrap gap-6 border-t border-border-default pt-6 sm:flex-row sm:gap-10">
          {certifications.map((cert) => {
            const content = cert.content[locale];
            const inner = (
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-accent-primary">
                  {content.name}
                </h3>
                <p className="text-sm text-text-secondary">{content.issuer}</p>
                <p className="font-mono text-xs text-text-tertiary">{cert.year}</p>
              </div>
            );

            return cert.url ? (
              <a key={cert.id} href={cert.url} target="_blank" rel="noopener noreferrer" className="group">
                {inner}
              </a>
            ) : (
              <div key={cert.id} className="group">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
