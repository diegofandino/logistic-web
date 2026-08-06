# Logistics — Website

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) — see `AGENTS.md` for breaking changes vs. older Next.js versions before making edits.
- **UI:** React 19, Tailwind CSS 4, [shadcn](https://ui.shadcn.com/) components (`components/ui`), `class-variance-authority`, `lucide-react` icons.
- **Content:** Bilingual (ES/EN) copy sourced from [lib/content.ts](lib/content.ts); language toggle in [components/language-toggle.tsx](components/language-toggle.tsx).
- **Validation:** [Zod](https://zod.dev/).
- **Package manager:** [pnpm](https://pnpm.io/) — this project requires pnpm, do not use npm or yarn.

## Getting started

Install dependencies:

```bash
pnpm install
```

Copy the environment template and fill in the values (see below):

```bash
cp .example.env .env
```

Run the dev server:

```bash
pnpm dev
```

## Environment variables

The contact/quote form uses [Resend](https://resend.com) to deliver emails. Copy `.env.example` to `.env` and set:

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | API key from your [Resend dashboard](https://resend.com/api-keys). Required for the contact form to send email. |
| `CONTACT_FROM_EMAIL` | Verified sender address, e.g. `"Volt Logistics <onboarding@resend.dev>"`. Must be a domain/sender verified in Resend. |
| `CONTACT_TO_EMAIL` | Inbox that receives quote requests submitted through the site. |

If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` are missing, the form action fails gracefully and logs an error server-side instead of throwing.

## Notes for developers

- **Next.js 16 breaking changes:** before writing code, read the relevant guide under `node_modules/next/dist/docs/` as instructed in `AGENTS.md` — APIs and conventions may differ from what you expect from older Next.js versions.
- **Styling:** use Tailwind; this project uses Tailwind CSS 4's CSS-based config — design tokens (colors, fonts, spacing) live in `@theme` blocks in [app/globals.css](app/globals.css), not a `tailwind.config.ts`. Check `lib/content.ts` for copy before hardcoding either.
- **Images:** optimize images before adding them to `public/` or referencing them in components.
- **Do not use npm/yarn** — this repo is pinned to pnpm (`packageManager` field in `package.json`).
