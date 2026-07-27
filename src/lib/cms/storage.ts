import fs from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import { hasBlobStorage, isVercel } from "@/lib/env";
import type { ContentSource } from "./content-source";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOB_PREFIX = "cms/";

function blobKey(relativePath: string) {
  return `${BLOB_PREFIX}${relativePath}`;
}

export function resolveContentPath(relativePath: string, source: ContentSource = "live") {
  return source === "draft" ? `drafts/${relativePath}` : relativePath;
}

async function readFromDisk<T>(relativePath: string): Promise<T> {
  const filePath = path.join(DATA_DIR, relativePath);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function existsOnDisk(relativePath: string): Promise<boolean> {
  try {
    await fs.access(path.join(DATA_DIR, relativePath));
    return true;
  } catch {
    return false;
  }
}

export async function jsonFileExists(relativePath: string): Promise<boolean> {
  if (hasBlobStorage()) {
    try {
      await head(blobKey(relativePath));
      return true;
    } catch {
      return existsOnDisk(relativePath);
    }
  }

  return existsOnDisk(relativePath);
}

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  if (hasBlobStorage()) {
    try {
      const meta = await head(blobKey(relativePath));
      const response = await fetch(meta.url, { cache: "no-store" });
      if (!response.ok) throw new Error("Blob fetch failed");
      return (await response.json()) as T;
    } catch {
      return readFromDisk<T>(relativePath);
    }
  }

  return readFromDisk<T>(relativePath);
}

/** Reads draft if present, otherwise falls back to the live file. */
export async function readDraftOrLive<T>(relativePath: string): Promise<T> {
  const draftPath = resolveContentPath(relativePath, "draft");
  if (await jsonFileExists(draftPath)) {
    return readJsonFile<T>(draftPath);
  }
  return readJsonFile<T>(relativePath);
}

export async function readBySource<T>(
  relativePath: string,
  source: ContentSource,
): Promise<T> {
  if (source === "draft") {
    return readDraftOrLive<T>(relativePath);
  }
  return readJsonFile<T>(relativePath);
}

export async function writeJsonFile<T>(relativePath: string, data: T): Promise<void> {
  const payload = `${JSON.stringify(data, null, 2)}\n`;

  if (hasBlobStorage()) {
    await put(blobKey(relativePath), payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  if (isVercel()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN não configurado. Crie um Blob Store na Vercel e adicione o token nas variáveis de ambiente.",
    );
  }

  const filePath = path.join(DATA_DIR, relativePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, payload, "utf-8");
}

export async function writeDraft<T>(relativePath: string, data: T): Promise<void> {
  await writeJsonFile(resolveContentPath(relativePath, "draft"), data);
}

export async function publishDraft(relativePath: string): Promise<void> {
  const draftPath = resolveContentPath(relativePath, "draft");
  const data = (await jsonFileExists(draftPath))
    ? await readJsonFile(draftPath)
    : await readJsonFile(relativePath);
  await writeJsonFile(relativePath, data);
}

export function stableStringify(value: unknown): string {
  return JSON.stringify(value);
}

export async function hasDraftChanges(relativePath: string): Promise<boolean> {
  const draftPath = resolveContentPath(relativePath, "draft");
  if (!(await jsonFileExists(draftPath))) return false;

  try {
    const [draft, live] = await Promise.all([
      readJsonFile(draftPath),
      readJsonFile(relativePath),
    ]);
    return stableStringify(draft) !== stableStringify(live);
  } catch {
    return true;
  }
}
