import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "./SectionHeading";

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="about-me" className="border-t border-border-default bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.about.title} />
        <p className="mt-3 text-center font-mono text-sm text-text-tertiary">{dict.about.subtitle}</p>

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-base leading-relaxed text-text-secondary sm:text-lg">
          {dict.about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-accent-primary">
            {dict.about.skillsTitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {dict.about.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border-default bg-bg-secondary px-4 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
