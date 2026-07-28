import { Quote } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Extras } from "@/lib/cms/extras";

export function QuoteBanner({ locale, extras }: { locale: Locale; extras: Extras }) {
  const text = extras.quote.text[locale];
  if (!text) return null;

  return (
    <section className="bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <Quote className="h-9 w-9 text-accent-primary" />
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-text-primary sm:text-3xl md:text-4xl">
              {text}
            </p>
          </div>

          <div className="flex items-center gap-6 self-end sm:self-auto">
            <span
              className="hidden h-16 w-px rotate-[30deg] bg-gradient-to-b from-accent-secondary to-accent-primary sm:block"
              aria-hidden
            />
            <p className="whitespace-nowrap font-mono text-sm text-text-tertiary">{extras.quote.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
