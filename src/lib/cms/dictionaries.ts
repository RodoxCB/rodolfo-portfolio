import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { readJsonFile, writeJsonFile } from "./storage";

export async function getDictionaryFromCms(locale: Locale): Promise<Dictionary> {
  return readJsonFile<Dictionary>(`dictionaries/${locale}.json`);
}

export async function saveDictionary(locale: Locale, data: Dictionary) {
  await writeJsonFile(`dictionaries/${locale}.json`, data);
}
