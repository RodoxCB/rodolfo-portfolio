import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { getProjectCover } from "@/lib/cms/project-images";
import { shouldOptimizeImage } from "@/lib/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";

export function ProjectRow({
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
  const href = localePath(locale, `/projects/${project.slug}`);
  const category = content.category || project.tags[0];

  return (
    <Link
      href={href}
      className="group relative flex min-h-[18rem] items-center overflow-hidden border-b border-border-default sm:min-h-[22rem] lg:min-h-[28rem]"
    >
      <div className="absolute inset-0">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover opacity-40 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-55"
          unoptimized={!shouldOptimizeImage(cover)}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-bg-primary via-bg-primary/85 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full justify-end px-4 sm:px-6 lg:px-8">
        <div className="max-w-md text-left">
          {category && (
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-primary">{category}</p>
          )}
          <h3 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl md:text-4xl">
            {content.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{content.description}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors group-hover:text-accent-primary">
            {dict.projects.viewProject}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
