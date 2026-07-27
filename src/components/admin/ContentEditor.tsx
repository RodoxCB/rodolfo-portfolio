"use client";

import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionary";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";
const sectionClass = "space-y-4 rounded-xl border border-border-default bg-bg-primary/40 p-4";

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      {hint ? <span className="mt-0.5 block text-xs text-text-muted">{hint}</span> : null}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </label>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">{children}</h3>;
}

export function ContentEditor({
  value,
  onChange,
  localeLabel,
}: {
  value: Dictionary;
  onChange: (next: Dictionary) => void;
  localeLabel: string;
}) {
  function update<K extends keyof Dictionary>(key: K, next: Dictionary[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Conteúdo — {localeLabel}</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Edite menus, hero, textos de fundo e demais seções. Salve como rascunho e use o preview antes de publicar.
        </p>
      </div>

      <section className={sectionClass}>
        <SectionTitle>SEO / Meta</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Título da página"
            value={value.meta.title}
            onChange={(title) => update("meta", { ...value.meta, title })}
          />
          <Field
            label="Descrição"
            value={value.meta.description}
            onChange={(description) => update("meta", { ...value.meta, description })}
            textarea
            rows={2}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <SectionTitle>Menus (navegação)</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Início / Home" value={value.nav.home} onChange={(home) => update("nav", { ...value.nav, home })} />
          <Field label="Sobre / About" value={value.nav.about} onChange={(about) => update("nav", { ...value.nav, about })} />
          <Field label="Projetos / Projects" value={value.nav.projects} onChange={(projects) => update("nav", { ...value.nav, projects })} />
          <Field label="Contato / Contact" value={value.nav.contact} onChange={(contact) => update("nav", { ...value.nav, contact })} />
        </div>
      </section>

      <section className={sectionClass}>
        <SectionTitle>Hero</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Saudação" value={value.hero.greeting} onChange={(greeting) => update("hero", { ...value.hero, greeting })} />
          <Field label="Const (prefixo)" value={value.hero.const} onChange={(c) => update("hero", { ...value.hero, const: c })} />
          <Field label="Nome" value={value.hero.name} onChange={(name) => update("hero", { ...value.hero, name })} />
          <Field label="Linha de papel / role" value={value.hero.roleLine} onChange={(roleLine) => update("hero", { ...value.hero, roleLine })} />
          <Field label="CTA — Ver projetos" value={value.hero.viewProjects} onChange={(viewProjects) => update("hero", { ...value.hero, viewProjects })} />
          <Field label="CTA — Contato" value={value.hero.getInTouch} onChange={(getInTouch) => update("hero", { ...value.hero, getInTouch })} />
        </div>
        <Field
          label="Texto de fundo (statement)"
          value={value.hero.statement}
          onChange={(statement) => update("hero", { ...value.hero, statement })}
          textarea
          rows={3}
          hint="Use Enter para quebrar linha. Aparece em destaque no hero."
        />
      </section>

      <section className={sectionClass}>
        <SectionTitle>Seção de projetos</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" value={value.projects.title} onChange={(title) => update("projects", { ...value.projects, title })} />
          <Field label="Ver todos" value={value.projects.seeAll} onChange={(seeAll) => update("projects", { ...value.projects, seeAll })} />
          <Field label="Ver projeto" value={value.projects.viewProject} onChange={(viewProject) => update("projects", { ...value.projects, viewProject })} />
          <Field label="Site ao vivo" value={value.projects.viewLive} onChange={(viewLive) => update("projects", { ...value.projects, viewLive })} />
          <Field label="Destaque" value={value.projects.featured} onChange={(featured) => update("projects", { ...value.projects, featured })} />
        </div>
      </section>

      <section className={sectionClass}>
        <SectionTitle>Sobre</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" value={value.about.title} onChange={(title) => update("about", { ...value.about, title })} />
          <Field label="Subtítulo" value={value.about.subtitle} onChange={(subtitle) => update("about", { ...value.about, subtitle })} />
          <Field label="Título das skills" value={value.about.skillsTitle} onChange={(skillsTitle) => update("about", { ...value.about, skillsTitle })} />
        </div>
        <Field
          label="Parágrafos"
          value={value.about.paragraphs.join("\n\n")}
          onChange={(raw) =>
            update("about", {
              ...value.about,
              paragraphs: raw
                .split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean),
            })
          }
          textarea
          rows={8}
          hint="Separe parágrafos com uma linha em branco."
        />
        <Field
          label="Skills"
          value={value.about.skills.join("\n")}
          onChange={(raw) =>
            update("about", {
              ...value.about,
              skills: raw
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          textarea
          rows={6}
          hint="Uma skill por linha."
        />
      </section>

      <section className={sectionClass}>
        <SectionTitle>Contato</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título (CTA home)" value={value.contact.title} onChange={(title) => update("contact", { ...value.contact, title })} />
          <Field label="Subtítulo (CTA home)" value={value.contact.subtitle} onChange={(subtitle) => update("contact", { ...value.contact, subtitle })} />
          <Field label="Botão CTA" value={value.contact.cta} onChange={(cta) => update("contact", { ...value.contact, cta })} />
          <Field label="Título da página" value={value.contact.pageTitle} onChange={(pageTitle) => update("contact", { ...value.contact, pageTitle })} />
          <Field label="Subtítulo da página" value={value.contact.pageSubtitle} onChange={(pageSubtitle) => update("contact", { ...value.contact, pageSubtitle })} textarea rows={2} />
          <Field label="Label e-mail" value={value.contact.email} onChange={(email) => update("contact", { ...value.contact, email })} />
          <Field label="Label LinkedIn" value={value.contact.linkedin} onChange={(linkedin) => update("contact", { ...value.contact, linkedin })} />
          <Field label="Label Behance" value={value.contact.behance} onChange={(behance) => update("contact", { ...value.contact, behance })} />
          <Field label="Label GitHub" value={value.contact.github} onChange={(github) => update("contact", { ...value.contact, github })} />
          <Field label="Localização (texto)" value={value.contact.location} onChange={(location) => update("contact", { ...value.contact, location })} />
        </div>
      </section>

      <section className={sectionClass}>
        <SectionTitle>Rodapé</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Tagline"
            value={value.footer.tagline}
            onChange={(tagline) => update("footer", { ...value.footer, tagline })}
            textarea
            rows={3}
            hint="Use Enter para quebrar linha."
          />
          <Field label="Título navegação" value={value.footer.navigation} onChange={(navigation) => update("footer", { ...value.footer, navigation })} />
          <Field label="Título conectar" value={value.footer.connect} onChange={(connect) => update("footer", { ...value.footer, connect })} />
          <Field label="Direitos autorais" value={value.footer.rights} onChange={(rights) => update("footer", { ...value.footer, rights })} />
        </div>
      </section>
    </div>
  );
}
