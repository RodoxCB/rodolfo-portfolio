import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
import { getCertificationsDraft, saveCertifications, type Certification } from "@/lib/cms/certifications";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const entries = await getCertificationsDraft();
  return NextResponse.json(entries);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as Certification[];
    await saveCertifications(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
