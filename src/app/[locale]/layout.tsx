import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PreviewBanner } from "@/components/PreviewBanner";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isPreviewMode } from "@/lib/cms/content-source";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [dict, site, preview] = await Promise.all([
    getDictionary(locale as Locale),
    getSite(),
    isPreviewMode(),
  ]);

  const mainPadding = preview
    ? "pt-[calc(7rem+env(safe-area-inset-top,0px))] md:pt-[calc(8rem+env(safe-area-inset-top,0px))]"
    : "pt-[calc(4rem+env(safe-area-inset-top,0px))] md:pt-[calc(5rem+env(safe-area-inset-top,0px))]";

  return (
    <div className="flex min-h-screen flex-col">
      {preview ? <PreviewBanner locale={locale} /> : null}
      <Header locale={locale as Locale} dict={dict} preview={preview} />
      <main className={`flex-1 ${mainPadding}`}>{children}</main>
      <Footer locale={locale as Locale} dict={dict} site={site} />
    </div>
  );
}
