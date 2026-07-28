import { Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ProjectTestimonial } from "@/lib/cms/projects";

export function CaseTestimonial({
  testimonial,
  dict,
}: {
  testimonial?: ProjectTestimonial;
  dict: Dictionary;
}) {
  if (!testimonial?.quote) return null;

  return (
    <div className="mt-14">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent-primary">{dict.case.testimonial}</h2>
      <div className="flex flex-col gap-4 border-l-2 border-accent-primary py-2 pl-4 sm:pl-6">
        <Quote className="h-6 w-6 shrink-0 text-accent-primary sm:h-7 sm:w-7" />
        <p className="text-base leading-relaxed text-text-primary sm:text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
        <div>
          <p className="font-semibold text-text-primary">{testimonial.author}</p>
          {testimonial.role && <p className="text-sm text-text-tertiary">{testimonial.role}</p>}
        </div>
      </div>
    </div>
  );
}
