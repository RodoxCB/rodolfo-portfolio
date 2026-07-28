"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Testimonial } from "@/lib/cms/testimonials";
import { shouldOptimizeImage } from "@/lib/image";
import { SectionHeading } from "./SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: Locale;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const count = testimonials.length;
  const current = useMemo(() => testimonials[active], [testimonials, active]);

  if (count === 0) return null;

  const goTo = (index: number) => setActive((index + count) % count);

  return (
    <section id="testimonials" className="bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={dict.testimonials.subtitle} title={dict.testimonials.title} />

            <div className="mt-10 flex items-center gap-3">
              {testimonials.map((testimonial, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={testimonial.name}
                    aria-pressed={isActive}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 transition-all ${
                      isActive ? "border-accent-primary" : "border-border-default opacity-60 hover:opacity-100"
                    }`}
                  >
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        unoptimized={!shouldOptimizeImage(testimonial.avatar)}
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-bg-tertiary font-mono text-xs text-text-secondary">
                        {initials(testimonial.name)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {count > 1 && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default text-text-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default text-text-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {current && (
            <div className="relative rounded-3xl bg-bg-primary p-8 sm:p-10">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-accent-primary/60">
                {current.avatar ? (
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                    unoptimized={!shouldOptimizeImage(current.avatar)}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-bg-tertiary font-mono text-lg text-text-secondary">
                    {initials(current.name)}
                  </span>
                )}
              </div>

              <p className="mt-6 font-semibold text-text-primary">{current.name}</p>
              <p className="text-sm text-text-tertiary">
                {current.content[locale].role}
                {current.company ? ` · ${current.company}` : ""}
              </p>

              <Quote className="mt-6 h-6 w-6 text-accent-primary/60" />
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                &ldquo;{current.content[locale].quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
