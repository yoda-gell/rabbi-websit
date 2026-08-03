# Project Core Rules (GStack & PIV Methodology)

## Role
You are a Senior Full-Stack Engineer. Do NOT write code blindly. Follow the PIV (Plan, Implement, Validate) loop.

## Project Structure
Monorepo with two directories:
* `/client`: Next.js 16 (App Router, React 19, Tailwind v4, TypeScript). **This is where the live site lives.** Dark "warm night" themed rabbi site for הרב יעקב זיסהולץ — RTL Hebrew throughout (`lang="he" dir="rtl"`), fonts Rubik (headings) + Assistant (body), design tokens in `client/app/globals.css`.
* `/server`: NestJS 11 + Prisma 7 backend. Has two real resources: `Question` (`src/questions/`) backing the Q&A/contact flow, and `Video` (`src/videos/`) backing the Shiurim video library. Both are called by `/client` via `NEST_API_URL`. `/server` also owns notification email delivery (`src/mail/`), tied only to `Question`. See Prisma/Server section below before touching it.

### Routes (`client/app`)
- `/` — home · `/shiurim` — video library (DB-backed, see Videos section) · `/shaalot` — Q&A · `/tmicha` — donate + books · `/contact` — contact form (POSTs to NestJS `/questions`, see below)
- `/admin`, `/admin/login` — admin panel, password-gated (see Auth below); `/admin/questions` and `/admin/videos` are the two real CRUD subsections.
- Public pages live under the `(site)` route group (`client/app/(site)/...`) so they share `Header`/`Footer`/`FloatingContactButton`; `/admin/login` stays outside any shared admin shell (own dark centered card, no nav). `/admin`, `/admin/questions`, `/admin/videos` live under `client/app/admin/(dashboard)/`, a second route group with its own `layout.tsx` (light theme, top `<header>` nav bar with only the two real links — no sidebar, no placeholder nav items) — mirrors the `(site)` pattern: route groups don't change the URL, they just let `/admin/login` opt out of the shared chrome.

### Auth (`/admin`)
Single shared password, no database. `client/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) gates all `/admin/*` routes via a signed httpOnly cookie (`client/lib/auth.ts`, HMAC-SHA256 via Web Crypto). Requires `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `client/.env.local` (see `client/.env.local.example`). Never commit real secrets; never paste them into chat.

### Contact form → NestJS → email
`client/app/(site)/contact/actions.ts` (`createQuestion`) POSTs to
`${NEST_API_URL}/questions` (falls back to `http://localhost:3001`; set in
`client/.env.local`) — no email logic on the client side anymore. On the server,
`QuestionsService.create()` saves via Prisma **then** calls `MailService.sendQuestionNotification`
(`server/src/mail/`) — a failed email is logged but does not fail the request, since the DB
write already succeeded. Requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in `server/.env` (not `client/.env.local` — mail is
backend-only now).

### Videos (Shiurim) → NestJS → public site
`Video` (`type: REGULAR | SHORT`, `youtubeId`, `title`, `isPublished` — defaults to `true`,
no `description` field) is managed entirely through `/admin/videos`
(`client/app/admin/videos/actions.ts`: `createVideo`/`updateVideo`/`deleteVideo`, all
POST/PATCH/DELETE to `${NEST_API_URL}/admin/videos*` with `x-admin-secret`, real hard delete —
no soft-delete like `Question`). `actions.ts` accepts a raw YouTube URL and extracts the 11-char
ID itself (`extractYoutubeId`, handles bare ID / `youtu.be/` / `youtube.com/watch?v=` /
`youtube.com/shorts/`) — never ask the admin to paste the ID directly. The public site reads
only published videos via `client/lib/videos.ts` (`getPublishedVideos()`, `GET /videos`,
`next: { revalidate: 60 }`) and renders them on `/shiurim` (`ShiurimTabs.tsx` — שורטים tab in
`aspect-[9/16]` wrappers, ארכיון tab in `aspect-video` wrappers) and on the home page (latest
`SHORT`s in the "רגע של חיזוק" row, latest `REGULAR` as the archive teaser thumbnail). Both
consumers reuse `client/components/VideoCard.tsx` for both aspect ratios — it fills whatever
container it's given, so REGULAR (16:9) vs SHORT (9:16) is just a wrapper `className`, not a
separate component. `client/lib/content.ts` no longer has any video mock data (`shorts`,
`lectures` were deleted once both pages went live-DB); it still holds `heroVideo` for the
hand-picked home-page Hero embed, which is intentionally separate from the video library.

### Server: Prisma 7 gotchas (this project is on 7.8.0, not 5/6)
Prisma 7 has real breaking changes vs older training data / tutorials — verify against
current docs before assuming classic syntax:
- Generator must be `provider = "prisma-client"` (not the deprecated `prisma-client-js`), and
  `output` is **required** — this project generates to `server/src/generated/prisma` (must be
  under `src/` for NestJS's compiler to see it, never `node_modules`).
- Import `PrismaClient`/model types from the generated path (`../generated/prisma/client`),
  not from `@prisma/client`.
- `datasource { url = ... }` in `schema.prisma` is **removed**. Connection config for
  Migrate/db push lives in `server/prisma.config.ts` instead.
- `PrismaClient` requires a driver adapter now — `server/src/prisma/prisma.service.ts`
  constructs one via `@prisma/adapter-pg` (`PrismaPg`) using `DATABASE_URL`. Plain
  `new PrismaClient()` no longer connects.
- `prisma format` / `prisma generate` are static (no DB needed); `prisma migrate`/`db push`
  need a real reachable `DATABASE_URL` — don't run those without the user's go-ahead, per the
  same env-var rules as `/client` (`server/.env` is gitignored, `server/.env.example` is the
  tracked template, real values only in `.env`, never in chat).
- **`moduleFormat = "cjs"` is required in the generator block.** Without it, Prisma 7
  infers ESM and generates a client that crashes at runtime under plain `require()`
  (`ReferenceError: exports is not defined in ES module scope`) — this project's NestJS
  setup is CommonJS (no `"type": "module"`), so the generator's auto-inference gets it wrong.
  Full working block:
  ```prisma
  generator client {
    provider     = "prisma-client"
    output       = "../src/generated/prisma"
    moduleFormat = "cjs"
  }
  ```

### Server: `.env` is NOT auto-loaded at runtime
Unlike `prisma.config.ts` (which explicitly does `import 'dotenv/config'` for the Prisma CLI),
plain NestJS does **not** load `.env` files by itself. `server/src/main.ts` has
`import 'dotenv/config'` as its first line — this is required, not decorative. If env vars
mysteriously read as `undefined` at runtime (`DATABASE_URL`, `PORT`, `ADMIN_API_SECRET`,
`SMTP_*`) despite being set in `server/.env`, check this import wasn't removed before anything
else.

### Local dev database
`server/prisma/migrations/` has an applied `init` migration. Local dev DB is a Docker
container (`docker run --name rabbi-websit-postgres ... -p 5433:5432 postgres:16-alpine`) —
**port 5433, not 5432**, because this machine already has a native Windows PostgreSQL service
bound to 5432 (left untouched, unrelated to this project — don't try to "fix" that conflict by
stopping it). `server/.env`'s `DATABASE_URL` points at `localhost:5433`. `PORT=3001` is also
set there — NestJS defaults to 3000, which collides with the Next.js dev server, so this must
stay set for both to run together locally at `client:3000` + `server:3001`
(`NEST_API_URL=http://localhost:3001` in `client/.env.local` ties them together).

The full path (`/contact` form → NestJS `POST /questions` → Postgres → `GET /admin/questions`
with `x-admin-secret`) has been verified working end-to-end against this local setup — not
just build-checked.

### Admin route protection in `/server` (stub, not real auth yet)
`AdminGuard` (`server/src/common/guards/admin-secret.guard.ts`) checks an `x-admin-secret`
header against `ADMIN_API_SECRET` — a placeholder, **not** connected to the Next.js `/admin`
session cookie. Real cross-service auth (shared JWT, service-to-service secret from a Server
Action, etc.) is still an open decision — don't assume this guard is production-ready.

### Known environment quirk — Turbopack crash
This repo's path contains Hebrew characters (`שולחן העבודה`). Next 16's default Turbopack build/dev **panics** on non-ASCII path characters (Rust char-boundary bug, unrelated to app code). `client/package.json`'s `dev`/`build` scripts already pass `--webpack` to work around this — don't remove that flag, and don't "fix" a Turbopack crash by touching app code.

### Known repo quirk — nested `server/.git`
`server/` contains its own empty, zero-commit, no-remote `.git` directory (leftover from the
`nest new` scaffolder), which makes the root repo see `server/` as an uncommittable embedded
repo (`git add` silently skips its tracked-file state). This has never been cleaned up — the
user has not confirmed deleting it. Don't delete it unilaterally; ask first if committing
backend changes becomes blocked by this.

### `.gitignore` layering
Root `.gitignore` + `client/.gitignore` + `server/.gitignore` are independently maintained (no
inheritance) — when adding a new ignore rule, put it in the `.gitignore` that actually covers
that path, not just the root one. Root also ignores `.claude/skills/` (third-party skill
bundles, e.g. `ui-ux-pro-max`, installed via `npx <pkg>@latest init` — regenerate, don't commit).

## Validation Rules (Crucial for PIV)
When you finish implementing code, you MUST validate it:
* Frontend changes: `cd client && npm run build` (or `npm run lint`).
* Backend changes: `cd server && npm run build` (or `npm run lint`). If you touched `prisma/schema.prisma`, run `npx prisma format` first (and `npx prisma generate` if the generated client needs refreshing) — never `migrate`/`db push` without explicit user approval.
If the terminal returns an error, read it, fix the files, and run the validation command again until it passes.

## Rules of Engagement
1. **Plan:** Before modifying any file, analyze the current architecture. Propose a plan.
2. **Implement:** Write clean, modular code. Use strict TypeScript types.
3. **Validate:** Never assume code works. Ask the user to run tests, or provide you with the terminal output of `npm run build` or `npm run lint`.
4. **Formatting:** Return JSON strictly when requested. Avoid unnecessary comments in code unless explaining complex business logic.

## Stack
- Client: Next.js App Router, Server Actions/Functions for mutations (contact form POSTs to NestJS, admin login/logout stays local to Next.js).
- Server: NestJS + Prisma 7, standard REST API conventions. `/client`'s `/contact` form calls it live (`POST /questions`) — this is a working integration, not a future step.
- Strict UI/Logic separation.
