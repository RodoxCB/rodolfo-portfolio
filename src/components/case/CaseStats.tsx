import type { ProjectStat } from "@/lib/cms/projects";

export function CaseStats({ stats }: { stats: ProjectStat[] }) {
  if (stats.length === 0) return null;

  return (
    <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
      {stats.map((stat, index) => (
        <div key={index} className="border-l-2 border-accent-primary/40 pl-4">
          <p className="font-display text-3xl font-bold text-accent-primary sm:text-4xl">{stat.value}</p>
          <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
