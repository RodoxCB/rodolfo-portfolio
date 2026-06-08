import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/admin-api";
import { deleteUploadedImage, uploadProjectImage } from "@/lib/cms/blob-upload";
import { MAX_PROJECT_IMAGES } from "@/lib/cms/project-images";
import { hasBlobStorage, isVercel } from "@/lib/env";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg"]);

function sanitizeSlug(value: string) {
  return value.replace(/[^a-z0-9-]/gi, "").toLowerCase();
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");
  const slug = formData.get("slug");
  const currentCount = Number(formData.get("currentCount") ?? 0);

  if (!(file instanceof File) || typeof slug !== "string") {
    return NextResponse.json({ error: "Arquivo e slug são obrigatórios" }, { status: 400 });
  }

  if (currentCount >= MAX_PROJECT_IMAGES) {
    return NextResponse.json({ error: `Máximo de ${MAX_PROJECT_IMAGES} imagens por projeto` }, { status: 400 });
  }

  const safeSlug = sanitizeSlug(slug);
  if (!safeSlug) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Formato não suportado. Use JPG, PNG, WebP, GIF ou SVG." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Arquivo muito grande (máx. 5MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (hasBlobStorage()) {
    const url = await uploadProjectImage(`uploads/projects/${safeSlug}/${filename}`, buffer, file.type);
    return NextResponse.json({ url });
  }

  if (isVercel()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN não configurado. Crie um Blob Store na Vercel (Storage → Blob) e vincule ao projeto.",
      },
      { status: 503 },
    );
  }

  const dir = path.join(process.cwd(), "public", "uploads", "projects", safeSlug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/projects/${safeSlug}/${filename}` });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const imagePath = new URL(request.url).searchParams.get("path");
  if (!imagePath) {
    return NextResponse.json({ error: "Caminho inválido" }, { status: 400 });
  }

  await deleteUploadedImage(imagePath);
  return NextResponse.json({ ok: true });
}
