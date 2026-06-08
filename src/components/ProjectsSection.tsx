import type { Project } from "@/content/projects";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import { CodeButton } from "./CodeButton";
import { ProjectCard } from "./ProjectCard";
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
    <section className="bg-bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <SectionHeading title={dict.projects.title} />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} dict={dict} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <CodeButton href={localePath(locale, "/projects")}>{dict.projects.seeAll}</CodeButton>
        </div>
      </div>
    </section>
  );
}
