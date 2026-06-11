import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import type { Site } from "@/content/site";

export function Footer({
  locale,
  dict,
  site,
}: {
  locale: Locale;
  dict: Dictionary;
  site: Site;
}) {
  return (
    <footer className="border-t border-border-default bg-bg-primary pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Link href={localePath(locale)} className="text-xl font-bold text-accent-primary">
            {site.name}
          </Link>
          <p className="max-w-xs whitespace-pre-line text-sm text-text-secondary">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            {dict.footer.navigation}
          </h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href={localePath(locale)} className="hover:text-accent-primary">{dict.nav.home}</Link></li>
            <li><Link href={localePath(locale, "/about")} className="hover:text-accent-primary">{dict.nav.about}</Link></li>
            <li><Link href={localePath(locale, "/projects")} className="hover:text-accent-primary">{dict.nav.projects}</Link></li>
            <li><Link href={localePath(locale, "/contact")} className="hover:text-accent-primary">{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            {dict.footer.connect}
          </h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-primary">LinkedIn</a></li>
            <li><a href={site.links.behance} target="_blank" rel="noreferrer" className="hover:text-accent-primary">Behance</a></li>
            <li><a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-accent-primary">GitHub</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-accent-primary">{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-default py-6 text-center text-xs text-text-muted">
        {dict.footer.rights}
      </div>
    </footer>
  );
}
