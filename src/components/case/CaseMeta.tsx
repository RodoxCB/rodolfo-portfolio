import type { Dictionary } from "@/i18n/get-dictionary";
import type { ProjectLocaleContent } from "@/lib/cms/projects";

export function CaseMeta({ content, dict }: { content: ProjectLocaleContent; dict: Dictionary }) {
  const items = [
    { label: dict.case.role, value: content.role },
    { label: dict.case.company, value: content.company },
    { label: dict.case.tools, value: content.tools },
    { label: dict.case.location, value: content.location },
    { label: dict.case.duration, value: content.duration },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border-default bg-bg-secondary p-6 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">{item.label}</p>
          <p className="mt-1 text-sm font-medium text-text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
