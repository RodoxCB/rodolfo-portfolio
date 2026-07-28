import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Project } from "@/lib/cms/projects";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";

export function CaseNextProject({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const content = project.content[locale];

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="group mt-20 flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-secondary p-8 transition-colors hover:border-accent-primary/50"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">{dict.case.nextProject}</p>
        <p className="mt-2 text-xl font-bold text-text-primary sm:text-2xl">{content.title}</p>
      </div>
      <ArrowRight className="h-6 w-6 shrink-0 text-accent-primary transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
