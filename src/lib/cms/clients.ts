import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type Client = {
  id: string;
  name: string;
  url?: string;
  logo?: string;
};

const FILE = "clients.json";

async function load(source: "live" | "draft") {
  return readBySource<Client[]>(FILE, source);
}

export async function getClients(): Promise<Client[]> {
  const source = await getContentSource();
  return load(source);
}

export async function getClientsDraft(): Promise<Client[]> {
  return readDraftOrLive<Client[]>(FILE);
}

export async function saveClients(entries: Client[]) {
  await writeDraft(FILE, entries);
}
