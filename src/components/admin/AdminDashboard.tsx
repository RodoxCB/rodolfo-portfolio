"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig } from "@/lib/cms/site";
import type { Project } from "@/lib/cms/projects";
import { formatTagsInput, ProjectEditor, prepareProjectForSave } from "./ProjectEditor";
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
  const [tagsDraft, setTagsDraft] = useState<string[]>([]);
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
        setTagsDraft(projectsData.map((project: Project) => formatTagsInput(project.tags)));
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
    const payload = projects.map((project, index) =>
      prepareProjectForSave(project, tagsDraft[index] ?? formatTagsInput(project.tags)),
    );
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setProjects(payload);
      setTagsDraft(payload.map((project) => formatTagsInput(project.tags)));
      setMessage("Projetos salvos com sucesso.");
    } else {
      const error = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(error?.error || "Erro ao salvar projetos.");
    }
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

  function updateProject(index: number, project: Project) {
    setProjects((prev) => prev.map((p, i) => (i === index ? project : p)));
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
    setTagsDraft((prev) => [...prev, "UX/UI"]);
  }

  function removeProject(index: number) {
    setProjects((prev) => prev.filter((_, i) => i !== index));
    setTagsDraft((prev) => prev.filter((_, i) => i !== index));
  }

  function updateTagsDraft(index: number, value: string) {
    setTagsDraft((prev) => prev.map((tags, i) => (i === index ? value : tags)));
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
              <ProjectEditor
                key={index}
                project={project}
                tagsText={tagsDraft[index] ?? formatTagsInput(project.tags)}
                onTagsTextChange={(value) => updateTagsDraft(index, value)}
                onChange={(updated) => updateProject(index, updated)}
                onRemove={() => removeProject(index)}
              />
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
