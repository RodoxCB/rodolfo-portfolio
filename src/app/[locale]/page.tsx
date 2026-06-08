import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { getSite } from "@/content/site";
import { getProjects } from "@/content/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, site, projects] = await Promise.all([
    getDictionary(locale as Locale),
    getSite(),
    getProjects(),
  ]);

  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />
      <ProjectsSection locale={locale as Locale} dict={dict} projects={projects} />
      <ContactCTA dict={dict} site={site} />
    </>
  );
}
