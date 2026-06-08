import type { Project } from "./projects";
import { isManagedUpload } from "./upload-url";

export const MAX_PROJECT_IMAGES = 5;

export function isUploadPath(path: string) {
  return isManagedUpload(path);
}

export function normalizeProject(project: Project): Project {
  const images = (project.images?.length ? project.images : project.thumbnail ? [project.thumbnail] : []).slice(
    0,
    MAX_PROJECT_IMAGES,
  );
  const thumbnail = project.thumbnail || images[0] || "/projects/volks-connect.svg";

  return { ...project, images, thumbnail };
}

export function getProjectCover(project: Project) {
  return project.thumbnail || project.images?.[0] || "/projects/volks-connect.svg";
}
