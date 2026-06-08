export function isVercel() {
  return process.env.VERCEL === "1";
}

export function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
