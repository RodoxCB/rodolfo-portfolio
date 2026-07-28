"use client";

import type { Extras } from "@/lib/cms/extras";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";
const sectionClass = "space-y-4 rounded-xl border border-border-default bg-bg-primary/40 p-4";

function Field({
  label,
  value,
  onChange,
  textarea,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      {hint ? <span className="mt-0.5 block text-xs text-text-muted">{hint}</span> : null}
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={inputClass} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}

export function ExtrasEditor({ value, onChange }: { value: Extras; onChange: (next: Extras) => void }) {
  return (
    <div className="space-y-6">
      <section className={sectionClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
          Cargos rotativos (Hero)
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="EN — um cargo por linha"
            value={value.roles.en.join("\n")}
            onChange={(raw) =>
              onChange({
                ...value,
                roles: { ...value.roles, en: raw.split("\n").map((r) => r.trim()).filter(Boolean) },
              })
            }
            textarea
          />
          <Field
            label="PT — um cargo por linha"
            value={value.roles.pt.join("\n")}
            onChange={(raw) =>
              onChange({
                ...value,
                roles: { ...value.roles, pt: raw.split("\n").map((r) => r.trim()).filter(Boolean) },
              })
            }
            textarea
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">Citação de impacto</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Texto EN"
            value={value.quote.text.en}
            onChange={(v) => onChange({ ...value, quote: { ...value.quote, text: { ...value.quote.text, en: v } } })}
            textarea
          />
          <Field
            label="Texto PT"
            value={value.quote.text.pt}
            onChange={(v) => onChange({ ...value, quote: { ...value.quote, text: { ...value.quote.text, pt: v } } })}
            textarea
          />
        </div>
        <Field
          label="Autor"
          value={value.quote.author}
          onChange={(v) => onChange({ ...value, quote: { ...value.quote, author: v } })}
        />
      </section>
    </div>
  );
}
