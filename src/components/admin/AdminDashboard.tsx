"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig } from "@/lib/cms/site";
import type { Project } from "@/lib/cms/projects";
import { formatTagsInput, ProjectEditor, prepareProjectForSave } from "./ProjectEditor";
import { ContentEditor } from "./ContentEditor";
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
  const [publishing, setPublishing] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  const [site, setSite] = useState<SiteConfig | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tagsDraft, setTagsDraft] = useState<string[]>([]);
  const [dictEn, setDictEn] = useState<Dictionary | null>(null);
  const [dictPt, setDictPt] = useState<Dictionary | null>(null);

  async function refreshStatus() {
    const res = await fetch("/api/admin/status");
    if (!res.ok) return;
    const data = (await res.json()) as { hasUnpublishedChanges?: boolean };
    setHasUnpublishedChanges(Boolean(data.hasUnpublishedChanges));
  }

  useEffect(() => {
    async function load() {
      try {
        const [siteRes, projectsRes, enRes, ptRes, statusRes] = await Promise.all([
          fetch("/api/admin/site"),
          fetch("/api/admin/projects"),
          fetch("/api/admin/content/en"),
          fetch("/api/admin/content/pt"),
          fetch("/api/admin/status"),
        ]);

        if ([siteRes, projectsRes, enRes, ptRes].some((r) => r.status === 401)) {
          router.push("/admin/login");
          return;
        }

        const [siteData, projectsData, enData, ptData, statusData] = await Promise.all([
          siteRes.json(),
          projectsRes.json(),
          enRes.json(),
          ptRes.json(),
          statusRes.ok ? statusRes.json() : Promise.resolve({ hasUnpublishedChanges: false }),
        ]);

        setSite(siteData);
        setProjects(projectsData);
        setTagsDraft(projectsData.map((project: Project) => formatTagsInput(project.tags)));
        setDictEn(enData);
        setDictPt(ptData);
        setHasUnpublishedChanges(Boolean(statusData.hasUnpublishedChanges));
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
    if (res.ok) {
      setMessage("Rascunho do site salvo. Use o preview antes de publicar.");
      await refreshStatus();
    } else {
      setMessage("Erro ao salvar rascunho do site.");
    }
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
      setMessage("Rascunho dos projetos salvo. Use o preview antes de publicar.");
      await refreshStatus();
    } else {
      const error = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(error?.error || "Erro ao salvar rascunho dos projetos.");
    }
  }

  async function saveContent(locale: "en" | "pt") {
    const dict = locale === "en" ? dictEn : dictPt;
    if (!dict) return;

    setSaving(true);
    setMessage("");
    const res = await fetch(`/api/admin/content/${locale}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dict),
    });
    setSaving(false);
    if (res.ok) {
      setMessage(`Rascunho ${locale.toUpperCase()} salvo. Use o preview antes de publicar.`);
      await refreshStatus();
    } else {
      setMessage("Erro ao salvar rascunho de conteúdo.");
    }
  }

  async function openPreview(locale: "en" | "pt" = "pt") {
    setMessage("");
    const res = await fetch("/api/admin/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    });
    if (!res.ok) {
      setMessage("Não foi possível ativar o preview.");
      return;
    }
    window.open(`/${locale}`, "_blank", "noopener,noreferrer");
  }

  async function publishAll() {
    setPublishing(true);
    setMessage("");
    const res = await fetch("/api/admin/publish", { method: "POST" });
    setPublishing(false);
    if (res.ok) {
      setHasUnpublishedChanges(false);
      setMessage("Alterações publicadas no site ao vivo.");
      await refreshStatus();
    } else {
      const error = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(error?.error || "Erro ao publicar alterações.");
    }
  }

  async function logout() {
    await fetch("/api/admin/preview", { method: "DELETE" }).catch(() => undefined);
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
              ["en", "Menus & textos EN"],
              ["pt", "Menus & textos PT"],
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

        <div className="mt-8 space-y-3 border-t border-border-default pt-6">
          <div
            className={`rounded-lg border px-3 py-2 text-xs ${
              hasUnpublishedChanges
                ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                : "border-border-default bg-bg-secondary text-text-secondary"
            }`}
          >
            {hasUnpublishedChanges
              ? "Há alterações em rascunho aguardando publicação."
              : "Site ao vivo está sincronizado com o rascunho."}
          </div>

          <button
            type="button"
            onClick={() => openPreview("pt")}
            className="block w-full rounded-lg border border-border-default px-3 py-2 text-left text-sm text-text-secondary hover:bg-bg-secondary hover:text-accent-primary"
          >
            Abrir preview PT →
          </button>
          <button
            type="button"
            onClick={() => openPreview("en")}
            className="block w-full rounded-lg border border-border-default px-3 py-2 text-left text-sm text-text-secondary hover:bg-bg-secondary hover:text-accent-primary"
          >
            Abrir preview EN →
          </button>
          <button
            type="button"
            onClick={publishAll}
            disabled={publishing || !hasUnpublishedChanges}
            className="block w-full rounded-lg bg-accent-primary px-3 py-2 text-left text-sm font-semibold text-bg-primary disabled:opacity-50"
          >
            {publishing ? "Publicando..." : "Publicar alterações"}
          </button>
          <a href="/pt" target="_blank" className="block text-sm text-text-secondary hover:text-accent-primary">
            Ver site ao vivo →
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
            <p className="text-sm text-text-secondary">
              Salvar grava apenas o rascunho. Publique depois de conferir no preview.
            </p>
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
              Salvar rascunho
            </button>
          </section>
        )}

        {tab === "projects" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Projetos</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Alterações ficam em rascunho até a publicação.
                </p>
              </div>
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
              Salvar rascunho
            </button>
          </section>
        )}

        {tab === "en" && dictEn && (
          <section className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <ContentEditor value={dictEn} onChange={setDictEn} localeLabel="English" />
            <button type="button" onClick={() => saveContent("en")} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar rascunho EN
            </button>
          </section>
        )}

        {tab === "pt" && dictPt && (
          <section className="space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-6">
            <ContentEditor value={dictPt} onChange={setDictPt} localeLabel="Português" />
            <button type="button" onClick={() => saveContent("pt")} disabled={saving} className="rounded-lg bg-accent-primary px-5 py-2 text-sm font-semibold text-bg-primary disabled:opacity-50">
              Salvar rascunho PT
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
