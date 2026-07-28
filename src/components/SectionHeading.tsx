export function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1 w-9 shrink-0 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" aria-hidden />
      <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">{label}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow && (
        <div className={centered ? "mb-5 flex justify-center" : "mb-5"}>
          <Eyebrow label={eyebrow} />
        </div>
      )}
      <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-base text-text-secondary ${centered ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
