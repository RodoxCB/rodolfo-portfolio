import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { getPublishStatus } from "@/lib/cms/publish";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const status = await getPublishStatus();
  return NextResponse.json(status);
}
