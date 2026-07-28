"use client";

import type { Testimonial } from "@/lib/cms/testimonials";

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

export function TestimonialsEditor({
  entry,
  onChange,
  onRemove,
}: {
  entry: Testimonial;
  onChange: (entry: Testimonial) => void;
  onRemove: () => void;
}) {
  function patch(patch: Partial<Testimonial>) {
    onChange({ ...entry, ...patch });
  }

  function patchContent(lang: "en" | "pt", field: "role" | "quote", value: string) {
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
        <h3 className="font-medium">{entry.name || "Novo depoimento"}</h3>
        <button type="button" onClick={onRemove} className="text-sm text-red-400">
          Remover
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome" value={entry.name} onChange={(v) => patch({ name: v })} />
        <Field label="Empresa (opcional)" value={entry.company || ""} onChange={(v) => patch({ company: v })} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {(["en", "pt"] as const).map((lang) => (
          <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
            <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>
            <Field label="Cargo" value={entry.content[lang].role} onChange={(v) => patchContent(lang, "role", v)} />
            <Field label="Depoimento" value={entry.content[lang].quote} onChange={(v) => patchContent(lang, "quote", v)} textarea />
          </div>
        ))}
      </div>
    </div>
  );
}

export function createTestimonial(): Testimonial {
  return {
    id: `testimonial-${Date.now()}`,
    name: "Novo depoimento",
    company: "",
    content: {
      en: { role: "", quote: "" },
      pt: { role: "", quote: "" },
    },
  };
}
