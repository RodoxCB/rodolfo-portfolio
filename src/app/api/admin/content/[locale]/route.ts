import { NextResponse } from "next/server";
import { cmsSaveErrorResponse, requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
import { getDictionaryFromCms, saveDictionary } from "@/lib/cms/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { locale } = await params;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const dictionary = await getDictionaryFromCms(locale as Locale);
  return NextResponse.json(dictionary);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { locale } = await params;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Dictionary;
    await saveDictionary(locale as Locale, body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return cmsSaveErrorResponse(error);
  }
}
