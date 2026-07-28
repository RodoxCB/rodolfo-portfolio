import type { ProjectStat } from "@/lib/cms/projects";

export function CaseStats({ stats }: { stats: ProjectStat[] }) {
  if (stats.length === 0) return null;

  return (
    <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-2xl border border-border-default bg-bg-secondary p-6 text-center">
          <p className="font-display text-3xl font-bold text-accent-primary">{stat.value}</p>
          <p className="mt-2 text-xs text-text-secondary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
