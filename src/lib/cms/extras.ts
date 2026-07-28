import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type Extras = {
  roles: {
    en: string[];
    pt: string[];
  };
  quote: {
    text: {
      en: string;
      pt: string;
    };
    author: string;
  };
};

const FILE = "extras.json";

async function load(source: "live" | "draft") {
  return readBySource<Extras>(FILE, source);
}

export async function getExtras(): Promise<Extras> {
  const source = await getContentSource();
  return load(source);
}

export async function getExtrasDraft(): Promise<Extras> {
  return readDraftOrLive<Extras>(FILE);
}

export async function saveExtras(data: Extras) {
  await writeDraft(FILE, data);
}
