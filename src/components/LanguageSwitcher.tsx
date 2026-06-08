"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const labels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchLocale(nextLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-secondary px-3 py-2 text-sm text-text-secondary transition-colors hover:border-border-hover hover:bg-bg-tertiary"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span>{labels[locale]}</span>
        <ChevronDown className="h-4 w-4 text-text-tertiary" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[140px] overflow-hidden rounded-lg border border-border-default bg-bg-secondary shadow-xl">
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => switchLocale(item)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-bg-tertiary ${
                item === locale ? "text-accent-primary" : "text-text-secondary"
              }`}
            >
              {labels[item]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
