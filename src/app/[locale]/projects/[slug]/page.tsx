import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, getProjects } from "@/content/projects";
import { getProjectCover } from "@/lib/cms/project-images";
import { shouldOptimizeImage } from "@/lib/image";
import { getSite } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.flatMap((project) =>
    ["en", "pt"].map((locale) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const [project, dict, site] = await Promise.all([
    getProject(slug),
    getDictionary(locale as Locale),
    getSite(),
  ]);

  if (!project) notFound();

  const content = project.content[locale as Locale];
  const cover = getProjectCover(project);
  const gallery = project.images?.length ? project.images : [cover];

  return (
    <article className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href={localePath(locale as Locale, "/projects")}
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.projects.seeAll}
      </Link>

      <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-border-default bg-bg-secondary">
        <Image
          src={cover}
          alt={content.title}
          fill
          className="object-cover"
          priority
          unoptimized={!shouldOptimizeImage(cover)}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-bg-tertiary px-3 py-1 text-xs text-text-secondary">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold md:text-4xl">{content.title}</h1>
      <p className="mt-4 text-lg text-text-secondary">{content.description}</p>

      <ul className="mt-10 space-y-4">
        {content.overview.map((item) => (
          <li key={item} className="flex gap-3 text-text-secondary">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {gallery.length > 1 && (
        <div className="mt-12">
          <h2 className="mb-4 font-mono text-sm text-accent-primary">// Gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <div
                key={image}
                className="relative aspect-video overflow-hidden rounded-xl border border-border-default bg-bg-secondary"
              >
                <Image
                  src={image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  unoptimized={!shouldOptimizeImage(image)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent-primary/40 bg-accent-muted px-4 py-2 text-sm text-accent-primary hover:border-accent-primary hover:bg-accent-muted"
          >
            {dict.projects.viewLive}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {project.links?.behance && (
          <a
            href={project.links.behance}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-default px-4 py-2 text-sm hover:border-border-hover hover:bg-bg-tertiary"
          >
            Behance
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border-default px-4 py-2 text-sm hover:border-border-hover hover:bg-bg-tertiary"
        >
          {dict.contact.email}
        </a>
      </div>
    </article>
  );
}
