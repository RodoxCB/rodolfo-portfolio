# Rodolfo Behr — Portfolio

Personal portfolio inspired by a dark, code-aesthetic UX — built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Deploy on [Vercel](https://vercel.com) and connect this repository.

Suggested domains:
- `rodolfobehr.vercel.app`
- custom domain later

## Structure

- `src/app/[locale]` — localized routes (`/en`, `/pt`)
- `src/content/projects.ts` — project data
- `src/i18n/dictionaries` — translations

## Admin panel

Manage site content at **`/admin`**

Default password (change in `.env.local`):

```
ADMIN_PASSWORD=rodolfo2026
ADMIN_SECRET=rodolfo-portfolio-dev-secret
```

**Workflow**
1. Edit content in the admin (geral, projetos, menus & textos EN/PT)
2. Click **Salvar rascunho** — changes are **not** live yet
3. Click **Abrir preview** to review the draft on the real site layout
4. Click **Publicar alterações** to push the draft to the public site

**Sections:**
- **Geral** — name, email, phone, social links
- **Projetos** — CRUD projects (EN/PT content, tags, featured)
- **Menus & textos EN/PT** — structured editors for nav, hero, background statement, about, contact, footer

Published data lives in `/data` as JSON. Drafts are stored under `/data/drafts` (or Blob `cms/drafts/` in production).

## Next steps

- Replace placeholder SVG thumbnails with real case images from Behance
- Add blog section (optional)
- Connect contact form (Resend / Formspree)
- Add custom logo and 3D hero if desired
