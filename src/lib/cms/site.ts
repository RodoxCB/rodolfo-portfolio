import { readJsonFile, writeJsonFile } from "./storage";

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
  return readJsonFile<SiteConfig>("site.json");
}

export async function saveSiteConfig(data: SiteConfig) {
  await writeJsonFile("site.json", data);
}
