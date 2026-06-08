import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "./auth";

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function cmsSaveErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Erro ao salvar conteúdo.";
  return NextResponse.json({ error: message }, { status: 503 });
}
