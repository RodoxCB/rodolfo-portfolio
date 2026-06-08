"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig } from "@/lib/cms/site";
import type { Project } from "@/lib/cms/projects";
import { ProjectImagesManager } from "./ProjectImagesManager";
import type { Dictionary } from "@/i18n/get-dictionary";

type Tab = "site" | "projects" | "en" | "pt";

const inputClass =
  "mt-1 w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm outline-none focus:border-accent-primary";
const labelClass = "block text-sm text-text-secondary";

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
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

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("site");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [site, setSite] = useState<SiteConfig | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contentEn, setContentEn] = useState("");
  const [contentPt, setContentPt] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [siteRes, projectsRes, enRes, ptRes] = await Promise.all([
          fetch("/api/admin/site"),
          fetch("/api/admin/projects"),
          fetch("/api/admin/content/en"),
          fetch("/api/admin/content/pt"),
        ]);

        if ([siteRes, projectsRes, enRes, ptRes].some((r) => r.status === 401)) {
          router.push("/admin/login");
          return;
        }

        const [siteData, projectsData, enData, ptData] = await Promise.all([
          siteRes.json(),
          projectsRes.json(),
          enRes.json(),
          ptRes.json(),
        ]);

        setSite(siteData);
        setProjects(projectsData);
        setContentEn(JSON.stringify(enData, null, 2));
        setContentPt(JSON.stringify(ptData, null, 2));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  async function saveSite() {
    if (!site) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    setSaving(false);
    setMessage(res.ok ? "Site salvo com sucesso." : "Erro ao salvar site.");
  }

  async function saveProjects() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects),
    });
    setSaving(false);
    setMessage(res.ok ? "Projetos salvos com sucesso." : "Erro ao salvar projetos.");
  }

  async function saveContent(locale: "en" | "pt") {
    setSaving(true);
    setMessage("");
    try {
      const raw = locale === "en" ? contentEn : contentPt;
      const parsed = JSON.parse(raw) as Dictionary;
      const res = await fetch(`/api/admin/content/${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      setMessage(res.ok ? `Conteúdo ${locale.toUpperCase()} salvo.` : "Erro ao salvar conteúdo.");
    } catch {
      setMessage("JSON inválido. Verifique a formatação.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function updateProject(index: number, patch: Partial<Project>) {
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function addProject() {
    setProjects((prev) => [
      ...prev,
      {
        slug: `novo-projeto-${Date.now()}`,
        featured: false,
        tags: ["UX/UI"],
        thumbnail: "",
        images: [],
        content: {
          en: { title: "New Project", description: "", overview: [""] },
          pt: { title: "Novo Projeto", description: "", overview: [""] },
        },
      },
    ]);
  }

  function removeProject(index: number) {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-text-secondary">Carregando...</div>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-8 lg:px-8">
      <aside className="w-full shrink-0 lg:w-56">
        <p className="font-mono text-xs text-accent-primary">// RXCB admin</p>
        <h1 className="mt-1 text-xl font-bold">Painel</h1>

        <nav className="mt-8 space-y-2">
          {(
            [
              ["site", "Geral"],
              ["projects", "Projetos"],
              ["en", "Conteúdo EN"],
              ["pt", "Conteúdo PT"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                tab === id
                  ? "bg-accent-muted text-accent-primary"
                  : "text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-2 border-t border-border-default pt-6">
          <a href="/en" target="_blank" className="block text-sm text-text-secondary hover:text-accent-primary">
            Ver site →
          </a>
          <button type="button" onClick={logout} className="text-sm text-text-secondary hover:text-red-400">
            Sair
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        {message && (
          <div className="mb-4 rounded-lg border border-border-default bg-bg-secondary px-4 py-3 text-sm">
            {message}
          </div>
        )}

        {tab === "site" && site && (
          <section className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <h2 className="text-lg font-semibold">Configurações gerais</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome" value={site.name} onChange={(v) => setSite({ ...site, name: v })} />
              <Field label="E-mail" value={site.email} onChange={(v) => setSite({ ...site, email: v })} />
              <Field label="Telefone" value={site.phone} onChange={(v) => setSite({ ...site, phone: v })} />
              <Field label="Localização" value={site.location} onChange={(v) => setSite({ ...site, location: v })} />
              <Field label="LinkedIn" value={site.links.linkedin} onChange={(v) => setSite({ ...site, links: { ...site.links, linkedin: v } })} />
              <Field label="Behance" value={site.links.behance} onChange={(v) => setSite({ ...site, links: { ...site.links, behance: v } })} />
              <Field label="GitHub" value={site.links.github} onChange={(v) => setSite({ ...site, links: { ...site.links, github: v } })} />
            </div>
            <button type="button" onClick={saveSite} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar geral
            </button>
          </section>
        )}

        {tab === "projects" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Projetos</h2>
              <button type="button" onClick={addProject} className="rounded-lg border border-border-default px-4 py-2 text-sm hover:bg-bg-secondary">
                + Novo projeto
              </button>
            </div>

            {projects.map((project, index) => (
              <div key={`${project.slug}-${index}`} className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-medium">{project.content.en.title || project.slug}</h3>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => updateProject(index, { featured: e.target.checked })}
                      />
                      Destaque
                    </label>
                    <button type="button" onClick={() => removeProject(index)} className="text-sm text-red-400">
                      Remover
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Slug" value={project.slug} onChange={(v) => updateProject(index, { slug: v })} />
                  <Field label="Tags (vírgula)" value={project.tags.join(", ")} onChange={(v) => updateProject(index, { tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
                  <Field label="Behance URL" value={project.links?.behance || ""} onChange={(v) => updateProject(index, { links: { ...project.links, behance: v } })} />
                </div>

                <ProjectImagesManager
                  slug={project.slug}
                  images={project.images ?? (project.thumbnail ? [project.thumbnail] : [])}
                  thumbnail={project.thumbnail}
                  onChange={(patch) => updateProject(index, patch)}
                />

                <div className="grid gap-6 lg:grid-cols-2">
                  {(["en", "pt"] as const).map((lang) => (
                    <div key={lang} className="space-y-3 rounded-xl border border-border-default p-4">
                      <p className="font-mono text-xs uppercase text-accent-primary">{lang}</p>
                      <Field
                        label="Título"
                        value={project.content[lang].title}
                        onChange={(v) => {
                          const content = { ...project.content, [lang]: { ...project.content[lang], title: v } };
                          updateProject(index, { content });
                        }}
                      />
                      <Field
                        label="Descrição"
                        value={project.content[lang].description}
                        onChange={(v) => {
                          const content = { ...project.content, [lang]: { ...project.content[lang], description: v } };
                          updateProject(index, { content });
                        }}
                        textarea
                      />
                      <Field
                        label="Overview (1 item por linha)"
                        value={project.content[lang].overview.join("\n")}
                        onChange={(v) => {
                          const content = {
                            ...project.content,
                            [lang]: { ...project.content[lang], overview: v.split("\n").filter(Boolean) },
                          };
                          updateProject(index, { content });
                        }}
                        textarea
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button type="button" onClick={saveProjects} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar projetos
            </button>
          </section>
        )}

        {tab === "en" && (
          <section className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <h2 className="text-lg font-semibold">Conteúdo — English</h2>
            <p className="text-sm text-text-secondary">
              Edite textos do site em inglês (hero, about, contact, footer, etc.).
            </p>
            <textarea
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              rows={28}
              className="w-full rounded-lg border border-border-default bg-bg-primary p-4 font-mono text-xs outline-none focus:border-accent-primary"
            />
            <button type="button" onClick={() => saveContent("en")} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar conteúdo EN
            </button>
          </section>
        )}

        {tab === "pt" && (
          <section className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <h2 className="text-lg font-semibold">Conteúdo — Português</h2>
            <p className="text-sm text-text-secondary">
              Edite textos do site em português.
            </p>
            <textarea
              value={contentPt}
              onChange={(e) => setContentPt(e.target.value)}
              rows={28}
              className="w-full rounded-lg border border-border-default bg-bg-primary p-4 font-mono text-xs outline-none focus:border-accent-primary"
            />
            <button type="button" onClick={() => saveContent("pt")} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar conteúdo PT
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
