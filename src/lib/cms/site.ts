import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type SiteConfig = {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: {
    linkedin: string;
    behance: string;
    github: string;
  };
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const source = await getContentSource();
  return readBySource<SiteConfig>("site.json", source);
}

export async function getSiteConfigDraft(): Promise<SiteConfig> {
  return readDraftOrLive<SiteConfig>("site.json");
}

export async function saveSiteConfig(data: SiteConfig) {
  await writeDraft("site.json", data);
}
