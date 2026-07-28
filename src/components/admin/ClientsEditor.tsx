"use client";

import type { Client } from "@/lib/cms/clients";

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

export function ClientsEditor({
  entry,
  onChange,
  onRemove,
}: {
  entry: Client;
  onChange: (entry: Client) => void;
  onRemove: () => void;
}) {
  function patch(patch: Partial<Client>) {
    onChange({ ...entry, ...patch });
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border-default bg-bg-secondary p-4">
      <div className="min-w-[200px] flex-1">
        <Field label="Nome do cliente" value={entry.name} onChange={(v) => patch({ name: v })} />
      </div>
      <div className="min-w-[200px] flex-1">
        <Field label="Site (opcional)" value={entry.url || ""} onChange={(v) => patch({ url: v })} />
      </div>
      <button type="button" onClick={onRemove} className="mb-1 text-sm text-red-400">
        Remover
      </button>
    </div>
  );
}

export function createClient(): Client {
  return { id: `client-${Date.now()}`, name: "Novo cliente", url: "" };
}
