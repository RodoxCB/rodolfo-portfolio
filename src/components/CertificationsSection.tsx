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

  const sorted = [...certifications].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="certifications" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={dict.certifications.subtitle} title={dict.certifications.title} />

        <div className="mt-12 flex flex-col flex-wrap gap-6 border-t border-border-default pt-6 sm:flex-row sm:gap-10">
          {sorted.map((cert) => {
            const content = cert.content[locale];
            const inner = (
              <div className="flex flex-col gap-1">
                {cert.featured ? (
                  <p className="font-mono text-xs uppercase tracking-wide text-accent-primary">
                    {dict.certifications.featured}
                  </p>
                ) : null}
                <h3
                  className={
                    cert.featured
                      ? "text-lg font-bold text-text-primary transition-colors group-hover:text-accent-primary"
                      : "font-semibold text-text-primary transition-colors group-hover:text-accent-primary"
                  }
                >
                  {content.name}
                </h3>
                <p className="text-sm text-text-secondary">{content.issuer}</p>
                <p className="font-mono text-xs text-text-tertiary">{cert.year}</p>
              </div>
            );

            const featuredClass = cert.featured
              ? "rounded-2xl border border-accent-primary/40 bg-accent-primary/5 p-5 basis-full sm:basis-auto"
              : "";

            return cert.url ? (
              <a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${featuredClass}`}
              >
                {inner}
              </a>
            ) : (
              <div key={cert.id} className={`group ${featuredClass}`}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
