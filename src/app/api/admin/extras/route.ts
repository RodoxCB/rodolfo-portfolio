import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
import { getExtrasDraft, saveExtras, type Extras } from "@/lib/cms/extras";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const extras = await getExtrasDraft();
  return NextResponse.json(extras);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as Extras;
    await saveExtras(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
