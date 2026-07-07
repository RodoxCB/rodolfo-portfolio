import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");

const files = [
  "site.json",
  "projects.json",
  "dictionaries/en.json",
  "dictionaries/pt.json",
];

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.log("BLOB_READ_WRITE_TOKEN não definido — pulando sync do CMS para o Blob.");
  process.exit(0);
}

for (const relativePath of files) {
  const content = await fs.readFile(path.join(dataDir, relativePath), "utf-8");
  const blob = await put(`cms/${relativePath}`, content, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  console.log(`✓ ${relativePath} → ${blob.url}`);
}

console.log("\nCMS seed concluído no Vercel Blob.");
