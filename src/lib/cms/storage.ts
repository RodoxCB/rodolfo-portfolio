import fs from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import { hasBlobStorage, isVercel } from "@/lib/env";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOB_PREFIX = "cms/";

function blobKey(relativePath: string) {
  return `${BLOB_PREFIX}${relativePath}`;
}

async function readFromDisk<T>(relativePath: string): Promise<T> {
  const filePath = path.join(DATA_DIR, relativePath);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
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
