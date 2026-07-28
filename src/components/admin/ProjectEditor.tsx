"use client";

import type { Project, ProjectLocaleContent, ProjectPersona, ProjectStat } from "@/lib/cms/projects";
import type { Locale } from "@/i18n/config";
import { ProjectImagesManager } from "./ProjectImagesManager";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";
const detailsClass = "rounded-lg border border-border-default bg-bg-primary/40 p-3";
const summaryClass = "cursor-pointer text-xs font-semibold uppercase tracking-wider text-accent-primary";

function Field({
  label,
  value,
  onChange,
  onBlur,
  textarea,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className={labelClass}>
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={rows}
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

function linesToArray(raw: string) {
  return raw.split("\n");
}

function arrayToLines(lines: string[] | undefined) {
  return (lines ?? []).join("\n");
}

type LocaleListField = "responsibilities" | "deliverables" | "takeaways" | "otherComments";
type LocaleTextField = "category" | "role" | "company" | "tools" | "location" | "duration" | "introduction" | "challenge" | "process" | "results" | "contribution";

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

  function patchContent(lang: Locale, field: keyof ProjectLocaleContent, value: unknown) {
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

  function patchPersona(lang: Locale, index: number, persona: ProjectPersona) {
    const personas = [...(project.content[lang].personas ?? [])];
    personas[index] = persona;
    patchContent(lang, "personas", personas);
  }

  function addPersona(lang: Locale) {
    const personas = [...(project.content[lang].personas ?? []), { name: "", background: "", needs: "", challenges: "" }];
    patchContent(lang, "personas", personas);
  }

  function removePersona(lang: Locale, index: number) {
    const personas = (project.content[lang].personas ?? []).filter((_, i) => i !== index);
    patchContent(lang, "personas", personas);
  }

  function patchStat(lang: Locale, index: number, stat: ProjectStat) {
    const stats = [...(project.content[lang].stats ?? [])];
    stats[index] = stat;
    patchContent(lang, "stats", stats);
  }

  function addStat(lang: Locale) {
    const stats = [...(project.content[lang].stats ?? []), { value: "—", label: "" }];
    patchContent(lang, "stats", stats);
  }

  function removeStat(lang: Locale, index: number) {
    const stats = (project.content[lang].stats ?? []).filter((_, i) => i !== index);
    patchContent(lang, "stats", stats);
  }

  function commitTags() {
    patch({ tags: parseTagsInput(tagsText) });
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
          onChange={onTagsTextChange}
          onBlur={commitTags}
        />
        <Field
          label="Behance URL"
          value={project.links?.behance || ""}
          onChange={(v) => patch({ links: { ...project.links, behance: v } })}
        />
        <Field
          label="Live URL"
          value={project.links?.live || ""}
          onChange={(v) => patch({ links: { ...project.links, live: v } })}
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
        {(["en", "pt"] as const).map((lang) => {
          const content = project.content[lang];
          return (
            <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
              <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>

              <Field label="Título" value={content.title} onChange={(v) => patchContent(lang, "title", v)} />
              <Field
                label="Descrição"
                value={content.description}
                onChange={(v) => patchContent(lang, "description", v)}
                textarea
              />
              <Field
                label="Overview (1 item por linha)"
                value={content.overview.join("\n")}
                onChange={(v) => patchContent(lang, "overview", linesToArray(v))}
                onBlur={() => patchContent(lang, "overview", normalizeOverviewLines(content.overview))}
                textarea
              />

              <details className={detailsClass} open>
                <summary className={summaryClass}>Meta do case</summary>
                <div className="mt-3 grid gap-3">
                  <Field label="Categoria" value={content.category || ""} onChange={(v) => patchContent(lang, "category", v)} />
                  <Field label="Role" value={content.role || ""} onChange={(v) => patchContent(lang, "role", v)} />
                  <Field label="Company" value={content.company || ""} onChange={(v) => patchContent(lang, "company", v)} />
                  <Field label="Tools" value={content.tools || ""} onChange={(v) => patchContent(lang, "tools", v)} />
                  <Field label="Location" value={content.location || ""} onChange={(v) => patchContent(lang, "location", v)} />
                  <Field label="Duration" value={content.duration || ""} onChange={(v) => patchContent(lang, "duration", v)} />
                </div>
              </details>

              <details className={detailsClass}>
                <summary className={summaryClass}>Narrativa (introdução, desafio, processo)</summary>
                <div className="mt-3 grid gap-3">
                  <Field label="Introdução" value={content.introduction || ""} onChange={(v) => patchContent(lang, "introduction", v)} textarea />
                  <Field
                    label="Responsabilidades (1 por linha)"
                    value={arrayToLines(content.responsibilities)}
                    onChange={(v) => patchContent(lang, "responsibilities", linesToArray(v))}
                    onBlur={() => patchContent(lang, "responsibilities", normalizeOverviewLines(content.responsibilities ?? []))}
                    textarea
                  />
                  <Field label="O Desafio" value={content.challenge || ""} onChange={(v) => patchContent(lang, "challenge", v)} textarea />
                  <Field label="O Processo" value={content.process || ""} onChange={(v) => patchContent(lang, "process", v)} textarea />
                  <Field label="Resultados" value={content.results || ""} onChange={(v) => patchContent(lang, "results", v)} textarea />
                  <Field
                    label="Entregáveis (1 por linha)"
                    value={arrayToLines(content.deliverables)}
                    onChange={(v) => patchContent(lang, "deliverables", linesToArray(v))}
                    onBlur={() => patchContent(lang, "deliverables", normalizeOverviewLines(content.deliverables ?? []))}
                    textarea
                  />
                  <Field label="Minha Contribuição" value={content.contribution || ""} onChange={(v) => patchContent(lang, "contribution", v)} textarea />
                  <Field
                    label="Aprendizados (1 por linha)"
                    value={arrayToLines(content.takeaways)}
                    onChange={(v) => patchContent(lang, "takeaways", linesToArray(v))}
                    onBlur={() => patchContent(lang, "takeaways", normalizeOverviewLines(content.takeaways ?? []))}
                    textarea
                  />
                  <Field
                    label="Outros comentários (1 por linha, opcional)"
                    value={arrayToLines(content.otherComments)}
                    onChange={(v) => patchContent(lang, "otherComments", linesToArray(v))}
                    onBlur={() => patchContent(lang, "otherComments", normalizeOverviewLines(content.otherComments ?? []))}
                    textarea
                  />
                </div>
              </details>

              <details className={detailsClass}>
                <summary className={summaryClass}>Personas (opcional)</summary>
                <div className="mt-3 space-y-3">
                  {(content.personas ?? []).map((persona, index) => (
                    <div key={index} className="space-y-2 rounded-lg border border-border-default p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-tertiary">Persona {index + 1}</span>
                        <button type="button" onClick={() => removePersona(lang, index)} className="text-xs text-red-400">
                          Remover
                        </button>
                      </div>
                      <Field label="Nome" value={persona.name} onChange={(v) => patchPersona(lang, index, { ...persona, name: v })} />
                      <Field label="Contexto" value={persona.background} onChange={(v) => patchPersona(lang, index, { ...persona, background: v })} textarea rows={2} />
                      <Field label="Necessidades" value={persona.needs} onChange={(v) => patchPersona(lang, index, { ...persona, needs: v })} textarea rows={2} />
                      <Field label="Desafios" value={persona.challenges} onChange={(v) => patchPersona(lang, index, { ...persona, challenges: v })} textarea rows={2} />
                    </div>
                  ))}
                  <button type="button" onClick={() => addPersona(lang)} className="text-xs text-accent-primary hover:underline">
                    + Adicionar persona
                  </button>
                </div>
              </details>

              <details className={detailsClass}>
                <summary className={summaryClass}>Métricas (opcional — só dados reais)</summary>
                <div className="mt-3 space-y-3">
                  <p className="text-xs text-text-secondary">
                    Só adicione métricas medidas de fato. Deixe vazio se não houver dado real — o bloco fica oculto no site.
                  </p>
                  {(content.stats ?? []).map((stat, index) => (
                    <div key={index} className="flex items-end gap-3 rounded-lg border border-border-default p-3">
                      <div className="w-24">
                        <Field label="Valor" value={stat.value} onChange={(v) => patchStat(lang, index, { ...stat, value: v })} />
                      </div>
                      <div className="flex-1">
                        <Field label="Rótulo" value={stat.label} onChange={(v) => patchStat(lang, index, { ...stat, label: v })} />
                      </div>
                      <button type="button" onClick={() => removeStat(lang, index)} className="text-xs text-red-400">
                        Remover
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addStat(lang)} className="text-xs text-accent-primary hover:underline">
                    + Adicionar métrica
                  </button>
                </div>
              </details>

              <details className={detailsClass}>
                <summary className={summaryClass}>Citação e depoimento (opcional)</summary>
                <div className="mt-3 grid gap-3">
                  <Field
                    label="Citação de destaque"
                    value={content.pullQuote?.text || ""}
                    onChange={(v) => patchContent(lang, "pullQuote", { text: v, author: content.pullQuote?.author || "" })}
                    textarea
                    rows={2}
                  />
                  <Field
                    label="Autor da citação"
                    value={content.pullQuote?.author || ""}
                    onChange={(v) => patchContent(lang, "pullQuote", { text: content.pullQuote?.text || "", author: v })}
                  />
                  <Field
                    label="Depoimento do cliente"
                    value={content.testimonial?.quote || ""}
                    onChange={(v) =>
                      patchContent(lang, "testimonial", {
                        quote: v,
                        author: content.testimonial?.author || "",
                        role: content.testimonial?.role || "",
                      })
                    }
                    textarea
                  />
                  <Field
                    label="Autor do depoimento"
                    value={content.testimonial?.author || ""}
                    onChange={(v) =>
                      patchContent(lang, "testimonial", {
                        quote: content.testimonial?.quote || "",
                        author: v,
                        role: content.testimonial?.role || "",
                      })
                    }
                  />
                  <Field
                    label="Cargo do autor do depoimento"
                    value={content.testimonial?.role || ""}
                    onChange={(v) =>
                      patchContent(lang, "testimonial", {
                        quote: content.testimonial?.quote || "",
                        author: content.testimonial?.author || "",
                        role: v,
                      })
                    }
                  />
                </div>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function prepareProjectForSave(project: Project, tagsText?: string): Project {
  const tags = tagsText !== undefined ? parseTagsInput(tagsText) : project.tags;

  function cleanLocale(content: ProjectLocaleContent): ProjectLocaleContent {
    return {
      ...content,
      overview: normalizeOverviewLines(content.overview),
      responsibilities: content.responsibilities ? normalizeOverviewLines(content.responsibilities) : content.responsibilities,
      deliverables: content.deliverables ? normalizeOverviewLines(content.deliverables) : content.deliverables,
      takeaways: content.takeaways ? normalizeOverviewLines(content.takeaways) : content.takeaways,
      otherComments: content.otherComments ? normalizeOverviewLines(content.otherComments) : content.otherComments,
    };
  }

  return {
    ...project,
    tags,
    content: {
      en: cleanLocale(project.content.en),
      pt: cleanLocale(project.content.pt),
    },
  };
}
