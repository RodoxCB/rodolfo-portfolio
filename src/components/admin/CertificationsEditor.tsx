"use client";

import type { Certification } from "@/lib/cms/certifications";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  );
}

export function CertificationsEditor({
  entry,
  onChange,
  onRemove,
}: {
  entry: Certification;
  onChange: (entry: Certification) => void;
  onRemove: () => void;
}) {
  function patch(patch: Partial<Certification>) {
    onChange({ ...entry, ...patch });
  }

  function patchContent(lang: "en" | "pt", field: "name" | "issuer", value: string) {
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
        <h3 className="font-medium">{entry.content.en.name || "Nova certificação"}</h3>
        <button type="button" onClick={onRemove} className="text-sm text-red-400">
          Remover
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Ano" value={entry.year} onChange={(v) => patch({ year: v })} />
        <Field label="URL da credencial (opcional)" value={entry.url || ""} onChange={(v) => patch({ url: v })} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {(["en", "pt"] as const).map((lang) => (
          <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
            <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>
            <Field label="Nome da certificação" value={entry.content[lang].name} onChange={(v) => patchContent(lang, "name", v)} />
            <Field label="Instituição" value={entry.content[lang].issuer} onChange={(v) => patchContent(lang, "issuer", v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function createCertification(): Certification {
  return {
    id: `certification-${Date.now()}`,
    year: "20XX",
    url: "",
    content: {
      en: { name: "New certification", issuer: "" },
      pt: { name: "Nova certificação", issuer: "" },
    },
  };
}
