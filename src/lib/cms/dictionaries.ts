import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

function dictionaryPath(locale: Locale) {
  return `dictionaries/${locale}.json`;
}

export async function getDictionaryFromCms(locale: Locale): Promise<Dictionary> {
  const source = await getContentSource();
  return readBySource<Dictionary>(dictionaryPath(locale), source);
}

export async function getDictionaryDraft(locale: Locale): Promise<Dictionary> {
  return readDraftOrLive<Dictionary>(dictionaryPath(locale));
}

export async function saveDictionary(locale: Locale, data: Dictionary) {
  await writeDraft(dictionaryPath(locale), data);
}
