import { normalizeProject, MAX_PROJECT_IMAGES } from "./project-images";
import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type ProjectPersona = {
  name: string;
  background: string;
  needs: string;
  challenges: string;
};

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectPullQuote = {
  text: string;
  author: string;
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type ProjectLocaleContent = {
  title: string;
  description: string;
  overview: string[];
  /** Short case category shown above the title, e.g. "Business Case" or "UX Case". */
  category?: string;
  role?: string;
  company?: string;
  tools?: string;
  location?: string;
  duration?: string;
  introduction?: string;
  responsibilities?: string[];
  challenge?: string;
  process?: string;
  personas?: ProjectPersona[];
  /** Real, measured metrics only — leave empty rather than inventing numbers. */
  stats?: ProjectStat[];
  pullQuote?: ProjectPullQuote;
  results?: string;
  deliverables?: string[];
  contribution?: string;
  testimonial?: ProjectTestimonial;
  otherComments?: string[];
  takeaways?: string[];
};

export type Project = {
  slug: string;
  featured: boolean;
  tags: string[];
  thumbnail: string;
  images?: string[];
  links?: {
    live?: string;
    googlePlay?: string;
  };
  content: {
    en: ProjectLocaleContent;
    pt: ProjectLocaleContent;
  };
};

export { MAX_PROJECT_IMAGES };

async function loadProjects(source: "live" | "draft") {
  const projects = await readBySource<Project[]>("projects.json", source);
  return projects.map(normalizeProject);
}

export async function getProjects(): Promise<Project[]> {
  const source = await getContentSource();
  return loadProjects(source);
}

/** Always reads published projects — safe for generateStaticParams / build. */
export async function getProjectsLive(): Promise<Project[]> {
  return loadProjects("live");
}

export async function getProjectsDraft(): Promise<Project[]> {
  const projects = await readDraftOrLive<Project[]>("projects.json");
  return projects.map(normalizeProject);
}

export async function saveProjects(projects: Project[]) {
  const normalized = projects.map(normalizeProject).map((project) => ({
    ...project,
    images: project.images?.slice(0, MAX_PROJECT_IMAGES),
  }));
  await writeDraft("projects.json", normalized);
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}
