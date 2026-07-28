"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profile-card/ProfileCard";
import type { Project } from "@/content/projects";
import { getProjectCover } from "@/lib/cms/project-images";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";

function ProjectCardComponent({
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
  // One tag keeps the subtitle readable inside the portrait card.
  const title = project.tags[0] ?? "";

  // Keeping this stable across re-renders lets ProfileCard's own memoization
  // (and its tilt engine, which is recreated via useMemo) actually take
  // effect instead of getting a "new" prop on every parent render.
  const handleContactClick = useCallback(() => {
    router.push(href);
  }, [router, href]);

  return (
    <article className="w-full">
      <ProfileCard
        name={content.title}
        title={title}
        handle={project.slug}
        status={project.featured ? dict.projects.featured : ""}
        contactText={dict.projects.viewProject}
        avatarUrl={cover}
        miniAvatarUrl={cover}
        showUserInfo
        variant="grid"
        enableMobileTilt={false}
        behindGlowColor="rgba(20, 184, 166, 0.45)"
        innerGradient="linear-gradient(145deg, rgba(15, 118, 110, 0.55) 0%, rgba(20, 184, 166, 0.28) 100%)"
        onContactClick={handleContactClick}
      />
    </article>
  );
}

export const ProjectCard = React.memo(ProjectCardComponent);
