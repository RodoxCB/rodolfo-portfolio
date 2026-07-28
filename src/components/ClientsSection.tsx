import type { Dictionary } from "@/i18n/get-dictionary";
import type { Client } from "@/lib/cms/clients";
import { Eyebrow } from "./SectionHeading";

export function ClientsSection({ dict, clients }: { dict: Dictionary; clients: Client[] }) {
  if (clients.length === 0) return null;

  return (
    <section id="clients" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-bg-secondary p-8 sm:p-12 md:p-16">
          <Eyebrow label={dict.clients.subtitle} />
          <h2 className="mt-5 font-display text-3xl font-bold text-text-primary sm:text-4xl">{dict.clients.title}</h2>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {clients.map((client) => {
              const name = (
                <span className="text-lg font-medium text-text-tertiary transition-colors hover:text-accent-primary sm:text-xl">
                  {client.name}
                </span>
              );

              return client.url ? (
                <a key={client.id} href={client.url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              ) : (
                <span key={client.id}>{name}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
