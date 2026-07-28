import type { Project } from "@/content/projects";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import { CodeButton } from "./CodeButton";
import { ProjectRow } from "./ProjectRow";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: Project[];
}) {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="portfolio" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={dict.projects.featured} title={dict.projects.title} />
      </div>

      <div className="border-t border-border-default">
        {featured.map((project) => (
          <ProjectRow key={project.slug} project={project} locale={locale} dict={dict} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <CodeButton href={localePath(locale, "/projects")}>{dict.projects.seeAll}</CodeButton>
      </div>
    </section>
  );
}
