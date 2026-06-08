import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
import { getProjects, saveProjects, MAX_PROJECT_IMAGES, type Project } from "@/lib/cms/projects";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as Project[];

  for (const project of body) {
    if ((project.images?.length ?? 0) > MAX_PROJECT_IMAGES) {
      return NextResponse.json(
        { error: `Projeto "${project.slug}" excede o máximo de ${MAX_PROJECT_IMAGES} imagens` },
        { status: 400 },
      );
    }
  }

  try {
    await saveProjects(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
