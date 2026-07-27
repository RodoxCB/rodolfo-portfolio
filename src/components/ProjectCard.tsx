"use client";

import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profile-card/ProfileCard";
import type { Project } from "@/content/projects";
import { getProjectCover } from "@/lib/cms/project-images";
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
  const router = useRouter();
  const content = project.content[locale];
  const cover = getProjectCover(project);
  const href = localePath(locale, `/projects/${project.slug}`);
  const title = project.tags.slice(0, 2).join(" · ");

  return (
    <article className="h-full">
      <ProfileCard
        className="h-full"
        name={content.title}
        title={title}
        handle={project.slug}
        status={project.featured ? dict.projects.featured : ""}
        contactText={dict.projects.viewProject}
        avatarUrl={cover}
        miniAvatarUrl={cover}
        showUserInfo
        enableTilt
        enableMobileTilt={false}
        behindGlowEnabled
        behindGlowColor="rgba(20, 184, 166, 0.45)"
        innerGradient="linear-gradient(145deg, rgba(15, 118, 110, 0.55) 0%, rgba(20, 184, 166, 0.28) 100%)"
        onContactClick={() => router.push(href)}
      />
    </article>
  );
}
