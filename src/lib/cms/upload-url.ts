const LOCAL_UPLOAD_PREFIX = "/uploads/projects/";
const BLOB_HOST = ".blob.vercel-storage.com";

export function isLocalUploadPath(path: string) {
  return path.startsWith(LOCAL_UPLOAD_PREFIX);
}

export function isBlobUploadUrl(url: string) {
  return url.includes(BLOB_HOST);
}

export function isManagedUpload(url: string) {
  return isLocalUploadPath(url) || isBlobUploadUrl(url);
}
