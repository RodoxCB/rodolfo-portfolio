import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionToken,
  getAdminPassword,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  const options = sessionCookieOptions(token);
  cookieStore.set(options);

  return NextResponse.json({ ok: true });
}
