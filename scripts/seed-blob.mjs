import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { head, put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");

const JSON_FILES = [
  "site.json",
  "projects.json",
  "experience.json",
  "certifications.json",
  "clients.json",
  "testimonials.json",
  "extras.json",
  "dictionaries/en.json",
  "dictionaries/pt.json",
];

async function blobExists(key) {
  try {
    await head(key);
    return true;
  } catch {
    return false;
  }
}

const ASSET_ROOTS = ["projects", "media"];

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function readRepoJson(relativePath) {
  const raw = await fs.readFile(path.join(dataDir, relativePath), "utf-8");
  return JSON.parse(raw);
}

async function collectPublicAssets(dir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = path.posix.join(base, entry.name);
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectPublicAssets(full, rel)));
      continue;
    }

    files.push(rel.replace(/\\/g, "/"));
  }

  return files;
}

async function uploadPublicAsset(relativeFromPublic) {
  const fullPath = path.join(root, "public", relativeFromPublic);
  const buffer = await fs.readFile(fullPath);
  const blob = await put(`media/${relativeFromPublic}`, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: contentTypeFor(fullPath),
  });

  return blob.url;
}

async function uploadJson(relativePath, data) {
  const payload = `${JSON.stringify(data, null, 2)}\n`;
  const blob = await put(`cms/${relativePath}`, payload, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  console.log(`✓ ${relativePath} → ${blob.url}`);
}

async function syncPublicAssets() {
  for (const rootDir of ASSET_ROOTS) {
    const absoluteDir = path.join(root, "public", rootDir);
    let files = [];
    try {
      files = await collectPublicAssets(absoluteDir, rootDir);
    } catch {
      continue;
    }

    for (const relativePath of files) {
      if (relativePath.endsWith(".svg")) continue;
      const url = await uploadPublicAsset(relativePath);
      console.log(`✓ media/${relativePath} → ${url}`);
    }
  }
}

async function seedJsonIfMissing(relativePath, data) {
  const key = `cms/${relativePath}`;
  if (await blobExists(key)) {
    console.log(`↷ ${relativePath} já existe no Blob — mantendo conteúdo do admin`);
    return;
  }
  await uploadJson(relativePath, data);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.log("BLOB_READ_WRITE_TOKEN não definido — pulando sync do CMS para o Blob.");
  process.exit(0);
}

// Assets can always be refreshed; CMS JSON must not overwrite admin edits.
await syncPublicAssets();

for (const relativePath of JSON_FILES) {
  const data = await readRepoJson(relativePath);
  await seedJsonIfMissing(relativePath, data);
}

console.log("\nCMS seed concluído no Vercel Blob.");
