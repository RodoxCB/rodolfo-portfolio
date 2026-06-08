export function isBlobImage(url: string) {
  return url.includes("blob.vercel-storage.com");
}

export function shouldOptimizeImage(url: string) {
  return !url.endsWith(".svg") && !isBlobImage(url);
}
