import { UserRound } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ProjectPersona } from "@/lib/cms/projects";

export function CasePersonas({ personas, dict }: { personas: ProjectPersona[]; dict: Dictionary }) {
  if (personas.length === 0) return null;

  return (
    <div className="mt-14">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent-primary">{dict.case.personas}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {personas.map((persona, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-muted">
                <UserRound className="h-5 w-5 text-accent-primary" />
              </div>
              <p className="font-semibold text-text-primary">{persona.name}</p>
            </div>
            <p className="text-sm text-text-secondary">{persona.background}</p>
            <div>
              <p className="font-mono text-xs uppercase text-text-tertiary">{dict.case.personaNeeds}</p>
              <p className="mt-1 text-sm text-text-secondary">{persona.needs}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-text-tertiary">{dict.case.personaChallenges}</p>
              <p className="mt-1 text-sm text-text-secondary">{persona.challenges}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
