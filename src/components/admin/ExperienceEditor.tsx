"use client";

import type { ExperienceEntry } from "@/lib/cms/experience";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={inputClass} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}

export function ExperienceEditor({
  entry,
  onChange,
  onRemove,
}: {
  entry: ExperienceEntry;
  onChange: (entry: ExperienceEntry) => void;
  onRemove: () => void;
}) {
  function patch(patch: Partial<ExperienceEntry>) {
    onChange({ ...entry, ...patch });
  }

  function patchContent(lang: "en" | "pt", field: "role" | "period" | "description", value: string) {
    onChange({
      ...entry,
      content: {
        ...entry.content,
        [lang]: {
          ...entry.content[lang],
          [field]: value,
        },
      },
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium">{entry.company || "Nova experiência"}</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input type="checkbox" checked={Boolean(entry.current)} onChange={(e) => patch({ current: e.target.checked })} />
            Cargo atual
          </label>
          <button type="button" onClick={onRemove} className="text-sm text-red-400">
            Remover
          </button>
        </div>
      </div>

      <Field label="Empresa" value={entry.company} onChange={(v) => patch({ company: v })} />

      <div className="grid gap-6 lg:grid-cols-2">
        {(["en", "pt"] as const).map((lang) => (
          <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
            <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>
            <Field label="Cargo" value={entry.content[lang].role} onChange={(v) => patchContent(lang, "role", v)} />
            <Field label="Período" value={entry.content[lang].period} onChange={(v) => patchContent(lang, "period", v)} />
            <Field
              label="Descrição"
              value={entry.content[lang].description}
              onChange={(v) => patchContent(lang, "description", v)}
              textarea
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function createExperienceEntry(): ExperienceEntry {
  return {
    id: `experience-${Date.now()}`,
    company: "Nova empresa",
    current: false,
    content: {
      en: { role: "", period: "", description: "" },
      pt: { role: "", period: "", description: "" },
    },
  };
}
