import { normalizeProject, MAX_PROJECT_IMAGES } from "./project-images";
import { readJsonFile, writeJsonFile } from "./storage";

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

export async function getProjects(): Promise<Project[]> {
  const projects = await readJsonFile<Project[]>("projects.json");
  return projects.map(normalizeProject);
}

export async function saveProjects(projects: Project[]) {
  const normalized = projects.map(normalizeProject).map((project) => ({
    ...project,
    images: project.images?.slice(0, MAX_PROJECT_IMAGES),
  }));
  await writeJsonFile("projects.json", normalized);
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}
