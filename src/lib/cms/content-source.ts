import { cookies } from "next/headers";
import { isAdminAuthenticated } from "@/lib/auth";

export const PREVIEW_COOKIE = "cms_preview";

export type ContentSource = "live" | "draft";

export async function getContentSource(): Promise<ContentSource> {
  const cookieStore = await cookies();
  if (cookieStore.get(PREVIEW_COOKIE)?.value !== "1") {
    return "live";
  }

  const ok = await isAdminAuthenticated();
  return ok ? "draft" : "live";
}

export async function isPreviewMode(): Promise<boolean> {
  return (await getContentSource()) === "draft";
}

export function previewCookieOptions(enabled: boolean) {
  return {
    name: PREVIEW_COOKIE,
    value: enabled ? "1" : "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: enabled ? 60 * 60 * 8 : 0,
  };
}
