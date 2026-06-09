"use client";

import type { Project } from "@/lib/cms/projects";
import type { Locale } from "@/i18n/config";
import { ProjectImagesManager } from "./ProjectImagesManager";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";

function Field({
  label,
  value,
  onChange,
  onBlur,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  textarea?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={4}
          className={inputClass}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      )}
    </label>
  );
}

export function parseTagsInput(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatTagsInput(tags: string[]) {
  return tags.join(", ");
}

export function normalizeOverviewLines(lines: string[]) {
  return lines.map((line) => line.trimEnd()).filter((line) => line.length > 0);
}

type ProjectEditorProps = {
  project: Project;
  tagsText: string;
  onTagsTextChange: (value: string) => void;
  onChange: (project: Project) => void;
  onRemove: () => void;
};

export function ProjectEditor({ project, tagsText, onTagsTextChange, onChange, onRemove }: ProjectEditorProps) {

  function patch(patch: Partial<Project>) {
    onChange({ ...project, ...patch });
  }

  function patchContent(lang: Locale, field: "title" | "description" | "overview", value: string | string[]) {
    onChange({
      ...project,
      content: {
        ...project.content,
        [lang]: {
          ...project.content[lang],
          [field]: value,
        },
      },
    });
  }

  function commitTags() {
    patch({ tags: parseTagsInput(tagsText) });
  }

  function handleTagsChange(value: string) {
    onTagsTextChange(value);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium">{project.content.en.title || project.slug}</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) => patch({ featured: e.target.checked })}
            />
            Destaque
          </label>
          <button type="button" onClick={onRemove} className="text-sm text-red-400">
            Remover
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Slug" value={project.slug} onChange={(v) => patch({ slug: v })} />
        <Field
          label="Tags (separadas por vírgula)"
          value={tagsText}
          onChange={handleTagsChange}
          onBlur={commitTags}
        />
        <Field
          label="Behance URL"
          value={project.links?.behance || ""}
          onChange={(v) => patch({ links: { ...project.links, behance: v } })}
        />
      </div>

      <p className="text-xs text-text-secondary">
        Dica: digite as tags separadas por vírgula (ex.: UX/UI, HMI, Automotive). O campo sincroniza ao sair do input.
      </p>

      <ProjectImagesManager
        slug={project.slug}
        images={project.images ?? (project.thumbnail ? [project.thumbnail] : [])}
        thumbnail={project.thumbnail}
        onChange={(imagePatch) => patch(imagePatch)}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {(["en", "pt"] as const).map((lang) => (
          <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
            <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>
            <Field
              label="Título"
              value={project.content[lang].title}
              onChange={(v) => patchContent(lang, "title", v)}
            />
            <Field
              label="Descrição"
              value={project.content[lang].description}
              onChange={(v) => patchContent(lang, "description", v)}
              textarea
            />
            <Field
              label="Overview (1 item por linha)"
              value={project.content[lang].overview.join("\n")}
              onChange={(v) => patchContent(lang, "overview", v.split("\n"))}
              onBlur={() => patchContent(lang, "overview", normalizeOverviewLines(project.content[lang].overview))}
              textarea
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function prepareProjectForSave(project: Project, tagsText?: string): Project {
  const tags = tagsText !== undefined ? parseTagsInput(tagsText) : project.tags;

  return {
    ...project,
    tags,
    content: {
      en: {
        ...project.content.en,
        overview: normalizeOverviewLines(project.content.en.overview),
      },
      pt: {
        ...project.content.pt,
        overview: normalizeOverviewLines(project.content.pt.overview),
      },
    },
  };
}
