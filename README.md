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

**Sections:**
- **Geral** — name, email, phone, social links
- **Projetos** — CRUD projects (EN/PT content, tags, featured)
- **Conteúdo EN/PT** — full dictionary JSON (hero, about, contact, footer)

Data is stored in `/data` as JSON files.

## Next steps

- Replace placeholder SVG thumbnails with real case images from Behance
- Add blog section (optional)
- Connect contact form (Resend / Formspree)
- Add custom logo and 3D hero if desired
