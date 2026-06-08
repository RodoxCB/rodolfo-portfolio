import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { getProjectCover } from "@/lib/cms/project-images";
import { shouldOptimizeImage } from "@/lib/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const content = project.content[locale];
  const cover = getProjectCover(project);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-default bg-bg-secondary transition-all hover:-translate-y-1 hover:border-border-hover">
      <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
        <Image
          src={cover}
          alt={content.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={!shouldOptimizeImage(cover)}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{content.title}</h3>
          {project.featured && (
            <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent-primary">
              {dict.projects.featured}
            </span>
          )}
        </div>

        <p className="mb-5 flex-1 text-sm text-text-secondary">{content.description}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-xs font-medium text-text-secondary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full border border-border-default px-2.5 py-0.5 text-xs text-text-secondary">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <Link
          href={localePath(locale, `/projects/${project.slug}`)}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-primary transition-all hover:gap-2"
        >
          {dict.projects.viewProject}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
