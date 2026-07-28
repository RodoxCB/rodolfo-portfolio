import type { Locale } from "@/i18n/config";
import type { Extras } from "@/lib/cms/extras";

export function QuoteBanner({ locale, extras }: { locale: Locale; extras: Extras }) {
  const text = extras.quote.text[locale];
  if (!text) return null;

  return (
    <section className="border-t border-border-default bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-2xl font-medium leading-relaxed text-text-primary sm:text-3xl md:text-4xl">
          <span className="font-mono text-accent-primary">{"// "}</span>
          <span className="font-display italic">&ldquo;{text}&rdquo;</span>
        </p>
        <p className="mt-6 font-mono text-sm text-text-tertiary">— {extras.quote.author}</p>
      </div>
    </section>
  );
}
