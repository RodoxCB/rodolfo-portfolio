import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type ExperienceLocaleContent = {
  role: string;
  period: string;
  description: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  current?: boolean;
  content: {
    en: ExperienceLocaleContent;
    pt: ExperienceLocaleContent;
  };
};

const FILE = "experience.json";

async function load(source: "live" | "draft") {
  return readBySource<ExperienceEntry[]>(FILE, source);
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  const source = await getContentSource();
  return load(source);
}

export async function getExperienceDraft(): Promise<ExperienceEntry[]> {
  return readDraftOrLive<ExperienceEntry[]>(FILE);
}

export async function saveExperience(entries: ExperienceEntry[]) {
  await writeDraft(FILE, entries);
}
