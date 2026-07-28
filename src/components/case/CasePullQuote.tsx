import type { ProjectPullQuote } from "@/lib/cms/projects";

export function CasePullQuote({ pullQuote }: { pullQuote?: ProjectPullQuote }) {
  if (!pullQuote?.text) return null;

  return (
    <blockquote className="mt-14 border-l-2 border-accent-primary py-2 pl-6">
      <p className="font-display text-xl italic leading-relaxed text-text-primary sm:text-2xl">
        &ldquo;{pullQuote.text}&rdquo;
      </p>
      {pullQuote.author && <p className="mt-3 font-mono text-sm text-text-tertiary">{pullQuote.author}</p>}
    </blockquote>
  );
}
