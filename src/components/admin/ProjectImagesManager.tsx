"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { isManagedUpload } from "@/lib/cms/upload-url";
import { MAX_PROJECT_IMAGES } from "@/lib/cms/project-images";
import { shouldOptimizeImage } from "@/lib/image";

type ProjectImagesManagerProps = {
  slug: string;
  images: string[];
  thumbnail: string;
  onChange: (patch: { images: string[]; thumbnail: string }) => void;
};

export function ProjectImagesManager({ slug, images, thumbnail, onChange }: ProjectImagesManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    if (!slug.trim()) {
      setError("Defina o slug do projeto antes de enviar imagens.");
      return;
    }

    if (images.length >= MAX_PROJECT_IMAGES) {
      setError(`Máximo de ${MAX_PROJECT_IMAGES} imagens por projeto.`);
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("currentCount", String(images.length));

    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = (await response.json()) as { url?: string; error?: string };

    setUploading(false);

    if (!response.ok || !data.url) {
      setError(data.error || "Erro ao enviar imagem.");
      return;
    }

    const nextImages = [...images, data.url];
    onChange({
      images: nextImages,
      thumbnail: thumbnail || data.url,
    });
  }

  async function removeImage(url: string) {
    if (isManagedUpload(url)) {
      await fetch(`/api/admin/upload?path=${encodeURIComponent(url)}`, { method: "DELETE" });
    }

    const nextImages = images.filter((image) => image !== url);
    const nextThumbnail = thumbnail === url ? nextImages[0] || "" : thumbnail;

    onChange({ images: nextImages, thumbnail: nextThumbnail });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-text-primary">Imagens do projeto</p>
        <p className="font-mono text-xs text-text-secondary">
          {images.length}/{MAX_PROJECT_IMAGES}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {images.map((url) => {
          const isCover = thumbnail === url;

          return (
            <div
              key={url}
              className={`relative overflow-hidden rounded-lg border bg-bg-primary ${
                isCover ? "border-accent-primary ring-1 ring-accent-primary" : "border-border-default"
              }`}
            >
              <div className="relative aspect-video">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized={!shouldOptimizeImage(url)}
                />
              </div>

              <div className="flex gap-1 p-2">
                {!isCover && (
                  <button
                    type="button"
                    onClick={() => onChange({ images, thumbnail: url })}
                    className="flex-1 rounded bg-bg-tertiary px-2 py-1 text-[10px] text-text-secondary hover:text-accent-primary"
                  >
                    Capa
                  </button>
                )}
                {isCover && (
                  <span className="flex-1 rounded bg-accent-muted px-2 py-1 text-center text-[10px] text-accent-primary">
                    Capa
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="rounded px-2 py-1 text-[10px] text-red-400 hover:bg-red-400/10"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}

        {images.length < MAX_PROJECT_IMAGES && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-primary text-xs text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary disabled:opacity-50"
          >
            {uploading ? "Enviando..." : "+ Imagem"}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleUpload(file);
          event.target.value = "";
        }}
      />

      <p className="text-xs text-text-secondary">
        JPG, PNG, WebP, GIF ou SVG · até 5MB cada · máximo {MAX_PROJECT_IMAGES} imagens. A imagem marcada como
        &quot;Capa&quot; aparece nos cards e no topo da página do projeto.
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
