import { Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Testimonial } from "@/lib/cms/testimonials";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: Locale;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-border-default bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.testimonials.title} />
        <p className="mt-3 text-center font-mono text-sm text-text-tertiary">{dict.testimonials.subtitle}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => {
            const content = testimonial.content[locale];
            return (
              <div key={testimonial.id} className="flex flex-col gap-4 rounded-2xl border border-border-default bg-bg-primary p-6">
                <Quote className="h-6 w-6 text-accent-primary" />
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">&ldquo;{content.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-xs text-text-tertiary">
                    {content.role}
                    {testimonial.company ? ` · ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
