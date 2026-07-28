import { notFound } from "next/navigation";
import { AboutSection } from "@/components/AboutSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ContactCTA } from "@/components/ContactCTA";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuoteBanner } from "@/components/QuoteBanner";
import { getCertifications } from "@/content/certifications";
import { getClients } from "@/content/clients";
import { getExperience } from "@/content/experience";
import { getExtras } from "@/content/extras";
import { getProjects } from "@/content/projects";
import { getSite } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const currentLocale = locale as Locale;

  const [dict, site, projects, experience, certifications, clients, extras] = await Promise.all([
    getDictionary(currentLocale),
    getSite(),
    getProjects(),
    getExperience(),
    getCertifications(),
    getClients(),
    getExtras(),
  ]);

  return (
    <>
      <Hero locale={currentLocale} dict={dict} roles={extras.roles[currentLocale]} />
      <AboutSection dict={dict} />
      <CertificationsSection locale={currentLocale} dict={dict} certifications={certifications} />
      <ExperienceSection locale={currentLocale} dict={dict} experience={experience} />
      <ClientsSection dict={dict} clients={clients} />
      <QuoteBanner locale={currentLocale} extras={extras} />
      <ProjectsSection locale={currentLocale} dict={dict} projects={projects} />
      <ContactCTA dict={dict} site={site} />
    </>
  );
}
