export function SectionHeading({
  prefix = "//",
  title,
}: {
  prefix?: string;
  title: string;
}) {
  return (
    <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
      <span className="font-mono text-accent-primary">{prefix} </span>
      <span className="font-display text-text-primary">{title}</span>
    </h2>
  );
}
