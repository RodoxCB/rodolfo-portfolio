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
    <div className="flex flex-wrap gap-x-8 gap-y-5 border-y border-border-default py-6">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">{item.label}</p>
          <p className="mt-1 text-sm font-medium text-text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
