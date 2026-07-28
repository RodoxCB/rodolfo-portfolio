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
    <section id="experience" className="border-t border-border-default bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.experience.title} />
        <p className="mt-3 text-center font-mono text-sm text-text-tertiary">{dict.experience.subtitle}</p>

        <div className="relative mt-14 space-y-10 border-l border-border-default pl-8 sm:pl-10">
          {experience.map((entry) => {
            const content = entry.content[locale];
            return (
              <div key={entry.id} className="relative">
                <span
                  className={`absolute -left-[calc(2rem+1px)] top-1 h-3 w-3 rounded-full border-2 sm:-left-[calc(2.5rem+1px)] ${
                    entry.current
                      ? "border-accent-primary bg-accent-primary"
                      : "border-border-hover bg-bg-primary"
                  }`}
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-text-primary">{content.role}</h3>
                  {entry.current && (
                    <span className="rounded-full bg-accent-muted px-3 py-0.5 font-mono text-xs text-accent-primary">
                      {dict.experience.current}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-accent-primary">{entry.company}</p>
                <p className="mt-1 font-mono text-xs text-text-tertiary">{content.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{content.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
