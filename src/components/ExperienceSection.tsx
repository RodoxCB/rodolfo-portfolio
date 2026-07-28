import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { ExperienceEntry } from "@/lib/cms/experience";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection({
  locale,
  dict,
  experience,
}: {
  locale: Locale;
  dict: Dictionary;
  experience: ExperienceEntry[];
}) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={dict.experience.subtitle} title={dict.experience.title} />

        <div className="mt-14 divide-y divide-border-default">
          {experience.map((entry) => {
            const content = entry.content[locale];
            return (
              <div key={entry.id} className="grid gap-3 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10 first:pt-0">
                <div>
                  <p className="font-mono text-xs text-text-tertiary">{content.period}</p>
                  <p className="mt-1 text-sm font-medium text-accent-primary">{entry.company}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-semibold text-text-primary">{content.role}</h3>
                    {entry.current && (
                      <span className="rounded-full bg-accent-muted px-3 py-0.5 font-mono text-xs text-accent-primary">
                        {dict.experience.current}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{content.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
