import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading title={dict.about.title} />
      <p className="mt-4 text-center font-mono text-accent-secondary">{dict.about.subtitle}</p>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-text-secondary">
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-mono text-lg text-accent-primary">{dict.about.skillsTitle}</h3>
        <div className="flex flex-wrap gap-3">
          {dict.about.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border-default bg-bg-secondary px-4 py-2 text-sm text-text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
