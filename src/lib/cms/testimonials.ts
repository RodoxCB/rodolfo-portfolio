import { getContentSource } from "./content-source";
import { readBySource, readDraftOrLive, writeDraft } from "./storage";

export type TestimonialLocaleContent = {
  role: string;
  quote: string;
};

export type Testimonial = {
  id: string;
  name: string;
  company?: string;
  avatar?: string;
  content: {
    en: TestimonialLocaleContent;
    pt: TestimonialLocaleContent;
  };
};

const FILE = "testimonials.json";

async function load(source: "live" | "draft") {
  return readBySource<Testimonial[]>(FILE, source);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const source = await getContentSource();
  return load(source);
}

export async function getTestimonialsDraft(): Promise<Testimonial[]> {
  return readDraftOrLive<Testimonial[]>(FILE);
}

export async function saveTestimonials(entries: Testimonial[]) {
  await writeDraft(FILE, entries);
}
