"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Home, Mail, Menu, User, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { key: "home", href: "", icon: Home },
  { key: "about", href: "/about", icon: User },
  { key: "projects", href: "/projects", icon: FolderKanban },
  { key: "contact", href: "/contact", icon: Mail },
] as const;

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-bg-primary/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
        <Link href={localePath(locale)} className="group text-text-primary">
          <div className="glitch-stack-hover glitch-stack h-10 w-10">
            <div className="glitch-stack-layer">
              <Logo />
            </div>
            <div className="glitch-stack-layer" aria-hidden>
              <Logo />
            </div>
            <div className="glitch-stack-layer" aria-hidden>
              <Logo />
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ key, href, icon: Icon }) => {
            const link = localePath(locale, href);
            const active = pathname === link || (href !== "" && pathname.startsWith(link));

            return (
              <Link
                key={key}
                href={link}
                className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-accent-primary" : "text-text-tertiary group-hover:text-accent-primary"}`} />
                <span>{dict.nav[key]}</span>
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent-primary transition-all ${
                    active ? "w-4/5" : "w-0 group-hover:w-4/5"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-bg-tertiary md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border-default bg-bg-secondary px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                href={localePath(locale, href)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {dict.nav[key]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
