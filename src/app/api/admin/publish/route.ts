import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";
import { publishAllDrafts } from "@/lib/cms/publish";

export const dynamic = "force-dynamic";

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const status = await publishAllDrafts();
    return NextResponse.json({ ok: true, ...status });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
