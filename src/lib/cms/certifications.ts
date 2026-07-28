import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type CertificationLocaleContent = {
  name: string;
  issuer: string;
};

export type Certification = {
  id: string;
  year: string;
  url?: string;
  content: {
    en: CertificationLocaleContent;
    pt: CertificationLocaleContent;
  };
};

const FILE = "certifications.json";

async function load(source: "live" | "draft") {
  return readBySource<Certification[]>(FILE, source);
}

export async function getCertifications(): Promise<Certification[]> {
  const source = await getContentSource();
  return load(source);
}

export async function getCertificationsDraft(): Promise<Certification[]> {
  return readDraftOrLive<Certification[]>(FILE);
}

export async function saveCertifications(entries: Certification[]) {
  await writeDraft(FILE, entries);
}
