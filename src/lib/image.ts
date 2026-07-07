export function isBlobImage(url: string) {
  return url.includes("blob.vercel-storage.com");
}

function isLocalAsset(url: string) {
  return (
    url.startsWith("/media/") ||
    url.startsWith("/projects/") ||
    url.startsWith("/uploads/")
  );
}

export function shouldOptimizeImage(url: string) {
  if (isLocalAsset(url) || url.endsWith(".svg") || isBlobImage(url)) {
    return false;
  }

  return true;
}
