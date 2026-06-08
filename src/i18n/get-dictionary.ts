import type { Locale } from "./config";
import type { Dictionary } from "./dictionary";
import { getDictionaryFromCms } from "@/lib/cms/dictionaries";

export type { Dictionary };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return getDictionaryFromCms(locale);
}
