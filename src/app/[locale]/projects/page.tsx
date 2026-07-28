import { ProjectRow } from "@/components/ProjectRow";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects } from "@/content/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, projects] = await Promise.all([
    getDictionary(locale as Locale),
    getProjects(),
  ]);

  return (
    <section className="py-24">
      <div className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={dict.projects.featured} title={dict.projects.title} />
      </div>

      <div className="border-t border-border-default">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} locale={locale as Locale} dict={dict} />
        ))}
      </div>
    </section>
  );
}
