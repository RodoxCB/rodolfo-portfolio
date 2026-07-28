import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
import { getExperienceDraft, saveExperience, type ExperienceEntry } from "@/lib/cms/experience";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const entries = await getExperienceDraft();
  return NextResponse.json(entries);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as ExperienceEntry[];
    await saveExperience(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
