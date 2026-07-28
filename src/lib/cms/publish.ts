import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { hasDraftChanges, publishDraft, writeDraft, readDraftOrLive } from "./storage";

const CONTENT_FILES = [
  "site.json",
  "projects.json",
  "experience.json",
  "certifications.json",
  "clients.json",
  "testimonials.json",
  "extras.json",
  ...locales.map((locale) => `dictionaries/${locale}.json`),
] as const;

export async function getPublishStatus() {
  const checks = await Promise.all(
    CONTENT_FILES.map(async (file) => ({
      file,
      hasChanges: await hasDraftChanges(file),
    })),
  );

  return {
    hasUnpublishedChanges: checks.some((item) => item.hasChanges),
    files: checks,
  };
}

export async function publishAllDrafts() {
  // Ensure drafts exist so publish is a full snapshot of current admin state.
  for (const file of CONTENT_FILES) {
    const draft = await readDraftOrLive(file);
    await writeDraft(file, draft);
  }

  for (const file of CONTENT_FILES) {
    await publishDraft(file);
  }

  return getPublishStatus();
}

export function dictionaryPath(locale: Locale) {
  return `dictionaries/${locale}.json` as const;
}
