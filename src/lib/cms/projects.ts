import { normalizeProject, MAX_PROJECT_IMAGES } from "./project-images";
import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type ProjectLocaleContent = {
  title: string;
  description: string;
  overview: string[];
};

export type Project = {
  slug: string;
  featured: boolean;
  tags: string[];
  thumbnail: string;
  images?: string[];
  links?: {
    live?: string;
    behance?: string;
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
