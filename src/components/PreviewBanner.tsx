"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PreviewBanner({ locale }: { locale: string }) {
  const pathname = usePathname();

  async function exitPreview() {
    await fetch("/api/admin/preview", { method: "DELETE" });
    window.location.href = pathname || `/${locale}`;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-[100] border-b border-amber-500/40 bg-amber-500 text-black">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <p className="font-medium">
          Modo preview — você está vendo o rascunho. O site público ainda não foi alterado.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="rounded-md bg-black/10 px-3 py-1.5 font-medium hover:bg-black/15"
          >
            Voltar ao admin
          </Link>
          <button
            type="button"
            onClick={exitPreview}
            className="rounded-md bg-black px-3 py-1.5 font-medium text-amber-400 hover:bg-black/90"
          >
            Sair do preview
          </button>
        </div>
      </div>
    </div>
  );
}
