import type { Dictionary } from "@/i18n/get-dictionary";
import type { Client } from "@/lib/cms/clients";
import { SectionHeading } from "./SectionHeading";

export function ClientsSection({ dict, clients }: { dict: Dictionary; clients: Client[] }) {
  if (clients.length === 0) return null;

  return (
    <section id="clients" className="border-t border-border-default bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={dict.clients.title} />
        <p className="mt-3 text-center font-mono text-sm text-text-tertiary">{dict.clients.subtitle}</p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client) => {
            const tile = (
              <div className="flex h-24 items-center justify-center rounded-xl border border-border-default bg-bg-primary px-4 text-center text-sm font-medium text-text-tertiary grayscale transition-all hover:border-accent-primary/40 hover:text-accent-primary hover:grayscale-0">
                {client.name}
              </div>
            );

            return client.url ? (
              <a key={client.id} href={client.url} target="_blank" rel="noopener noreferrer">
                {tile}
              </a>
            ) : (
              <div key={client.id}>{tile}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
