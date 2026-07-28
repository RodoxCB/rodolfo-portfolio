import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { previewCookieOptions } from "@/lib/cms/content-source";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as { enabled?: boolean };
  const enabled = body.enabled !== false;
  const response = NextResponse.json({ ok: true, preview: enabled });
  response.cookies.set(previewCookieOptions(enabled));
  return response;
}

export async function DELETE() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const response = NextResponse.json({ ok: true, preview: false });
  response.cookies.set(previewCookieOptions(false));
  return response;
}
