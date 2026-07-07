import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");

const JSON_FILES = [
  "site.json",
  "projects.json",
  "dictionaries/en.json",
  "dictionaries/pt.json",
];

const ASSET_ROOTS = ["projects", "media"];

const LOCAL_ASSET_PREFIXES = ["/projects/", "/media/"];

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

function resolveLocalAsset(pathOrUrl, assetUrlByPath) {
  if (!pathOrUrl || !LOCAL_ASSET_PREFIXES.some((prefix) => pathOrUrl.startsWith(prefix))) {
    return pathOrUrl;
  }

  // SVGs ficam como caminho local — URLs do Blob para SVG quebram no next/image.
  if (pathOrUrl.endsWith(".svg")) return pathOrUrl;

  return assetUrlByPath.get(pathOrUrl) ?? pathOrUrl;
}

async function prepareProjectsForBlob(repoProjects) {
  const assetPaths = [];

  for (const rootDir of ASSET_ROOTS) {
    const absoluteDir = path.join(root, "public", rootDir);
    try {
      const files = await collectPublicAssets(absoluteDir, rootDir);
      assetPaths.push(...files);
    } catch {
      // diretório opcional
    }
  }

  const assetUrlByPath = new Map();

  for (const relativePath of assetPaths) {
    const publicPath = `/${relativePath}`;
    if (publicPath.endsWith(".svg")) continue;

    const url = await uploadPublicAsset(relativePath);
    assetUrlByPath.set(publicPath, url);
    console.log(`✓ media/${relativePath} → ${url}`);
  }

  return repoProjects.map((project) => {
    const thumbnail = resolveLocalAsset(project.thumbnail, assetUrlByPath);
    const images = project.images?.map((image) => resolveLocalAsset(image, assetUrlByPath));

    return {
      ...project,
      thumbnail,
      ...(images?.length ? { images } : {}),
    };
  });
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

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.log("BLOB_READ_WRITE_TOKEN não definido — pulando sync do CMS para o Blob.");
  process.exit(0);
}

const repoProjects = await readRepoJson("projects.json");
const projectsForBlob = await prepareProjectsForBlob(repoProjects);

for (const relativePath of JSON_FILES) {
  if (relativePath === "projects.json") {
    await uploadJson(relativePath, projectsForBlob);
    continue;
  }

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
