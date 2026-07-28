import type { Dictionary } from "@/i18n/get-dictionary";
import { Eyebrow } from "./SectionHeading";

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="about-me" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-bg-secondary p-8 sm:p-12 md:p-16">
          <Eyebrow label={dict.about.subtitle} />
          <h2 className="mt-5 font-display text-3xl font-bold text-text-primary sm:text-4xl">{dict.about.title}</h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            {dict.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-border-default pt-8">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
              {dict.about.skillsTitle}
            </span>
            <span className="mx-1 hidden h-1 w-1 rounded-full bg-text-muted sm:inline-block" aria-hidden />
            <p className="text-sm text-text-secondary">
              {dict.about.skills.map((skill, index) => (
                <span key={skill}>
                  {skill}
                  {index < dict.about.skills.length - 1 && <span className="text-text-muted"> &middot; </span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
