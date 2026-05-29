# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server (Turbopack enabled)
pnpm build        # production build
pnpm lint         # ESLint
pnpm db:seed      # seed database (requires DATABASE_URL)

# Database migrations (drizzle-kit)
npx drizzle-kit generate   # generate migration from schema changes
npx drizzle-kit migrate    # apply pending migrations

# E2E tests (requires dev server running on :3000)
npx playwright test
npx playwright test --headed          # with browser UI
npx playwright test tests/full-app.spec.ts  # run specific file
```

## Environment

`DATABASE_URL` and `AUTH_SECRET` are required. Auth.js v5 also expects `NEXTAUTH_URL` in production.

## Architecture

**Auto Jalan** is a mobile-first (max-w-md) vehicle repair marketplace in Indonesian. Users can book mechanics, buy spareparts, find workshops, track SOS emergencies, and post forum questions.

### Route Groups

- `app/(public)/` — onboarding carousel, login, register. No bottom nav. Redirects authenticated users to `/lobby`.
- `app/(auth)/` — all main app pages. Wraps content in `max-w-md` container with `<BottomNavbar />`.

### Middleware (`proxy.ts`, not `middleware.ts`)

Auth.js v5 `auth()` middleware handles route protection. Three tiers:
- **Public routes** (`/`, `/login`, `/register`): redirect authenticated users to `/lobby`
- **Browse routes** (`/lobby`, `/sparepart`, `/montir`, `/bengkel`, `/forum` and sub-paths except `/forum/ajukan`): accessible without login (guest mode)
- **Everything else**: redirect unauthenticated users to `/login?callbackUrl=...`

### Auth (`lib/auth.ts`, `lib/auth.config.ts`)

Auth.js v5 beta (`next-auth@5.0.0-beta.31`) with:
- Credentials provider + bcrypt password hashing
- JWT session strategy (`session.strategy: "jwt"`)
- `DrizzleAdapter` for session persistence
- JWT/session callbacks inject `id` and `role` onto the session user

### Database (`lib/db.ts`, `lib/schema.ts`)

Drizzle ORM on Neon PostgreSQL. Schema enums: `role` (user/mekanik/admin), `order_status` (ongoing/selesai/dibatalkan), `keaslian` (OEM/Aftermarket/KW), `tipe_kendaraan` (motor/mobil).

Core entity groups:
- **Auth.js tables**: `users`, `sessions`, `accounts`, `verificationTokens`
- **Catalog**: `vehicles`, `spareparts`, `bengkels` (workshops), `mekaniks`, `services`
- **Transactional**: `orders`, `orderItems`, `reviews`, `forumThreads`, `forumAnswers`

Seed data lives in `lib/seed/` and is run via `pnpm db:seed`.

### State Management (`stores/`)

Two Zustand stores (in-memory, not persisted):
- `cartStore.ts` — sparepart cart items with qty management
- `uiStore.ts` — multi-step booking flow state (`selectedServiceId`, `selectedMekanikId`) and SOS state machine (`idle → mencari → tracking → arrived`)

### Server Actions (`lib/actions/`)

All server mutations use `"use server"` actions: `auth.ts` (register/login), `forum.ts`, `orders.ts`, `reviews.ts`.

### UI Components

- `components/ui/` — shadcn/ui primitives (configured via `components.json`)
- `components/layout/` — `TopBar`, `BottomNavbar`, `SOSFab`
- Domain components are co-located: either under `components/<domain>/` or next to the page file for page-specific components (e.g. `app/(auth)/forum/[id]/AnswerForm.tsx`)
- Maps use `react-leaflet` v5; the map client component must be `"use client"` and is typically a separate file (see `app/(auth)/bengkel/map/BengkelMapClient.tsx`)
