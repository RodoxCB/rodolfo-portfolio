import fs from "fs/promises";
import path from "path";
import { del, put } from "@vercel/blob";
import { hasBlobStorage } from "@/lib/env";
import { isBlobUploadUrl, isLocalUploadPath } from "./upload-url";

export { isBlobUploadUrl, isLocalUploadPath, isManagedUpload } from "./upload-url";

export async function uploadProjectImage(
  pathname: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  if (!hasBlobStorage()) return "";

  const blob = await put(pathname, buffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
  });
  return blob.url;
}

export async function deleteUploadedImage(url: string) {
  if (isBlobUploadUrl(url)) {
    await del(url);
    return;
  }

  if (isLocalUploadPath(url)) {
    const fullPath = path.join(process.cwd(), "public", url.replace(/\//g, path.sep));

    try {
      await fs.unlink(fullPath);
    } catch {
      // arquivo pode já ter sido removido
    }
  }
}
