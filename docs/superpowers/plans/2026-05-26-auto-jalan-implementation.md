# Auto Jalan Prototype — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a semi-functional full-stack prototype of Auto Jalan comprising ~30 screens, real Postgres DB via Drizzle + Neon, Auth.js authentication, and interactive UI components.

**Architecture:** Next.js 16 App Router with Server Components fetching via Drizzle ORM, Server Actions for mutations, Auth.js v5 for credentials-based auth, Zustand for ephemeral client state, Leaflet.js for maps.

**Tech Stack:** Next.js 16, React 19.2, TypeScript 5, Tailwind CSS v4, shadcn/ui, Zustand, Drizzle ORM, PostgreSQL (Neon), Auth.js v5, Leaflet.js, Framer Motion, bcryptjs, Lucide React, pnpm

---

This plan covers the full implementation across 30 files and ~15 phases. Each task is bite-sized (2-5 min). Tasks are ordered by dependency.

---

## Phase 1: Project Scaffold

### Task 1.1: Initialize Next.js 16 project with all dependencies

**Files:** Create: package.json, tsconfig.json, next.config.ts, postcss.config.mjs, .env.local, .gitignore, lib/utils.ts, components.json, app/globals.css
**Install:** drizzle-orm, @auth/drizzle-adapter, next-auth@beta, zustand, leaflet, react-leaflet, framer-motion, bcryptjs, lucide-react, @neondatabase/serverless, dotenv, uuid, clsx, tailwind-merge, tw-animate-css
**Install dev:** drizzle-kit, @tailwindcss/postcss, @types/leaflet, @types/bcryptjs, @types/uuid

Steps:
1. `cd /home/blawness/projects/auto-jalan && pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --empty`
2. `pnpm add drizzle-orm @auth/drizzle-adapter next-auth@beta zustand leaflet react-leaflet framer-motion bcryptjs lucide-react @neondatabase/serverless dotenv uuid clsx tailwind-merge tw-animate-css`
3. `pnpm add -D drizzle-kit @tailwindcss/postcss @types/leaflet @types/bcryptjs @types/uuid`
4. Verify: `pnpm dev` starts on localhost:3000
5. Commit: `git init && git add -A && git commit -m "chore: scaffold next.js 16 with dependencies"`

### Task 1.2: Configure Tailwind v4 + shadcn/ui + globals.css

**Files:** Modify: next.config.ts, postcss.config.mjs, app/globals.css
**Create:** lib/utils.ts, components.json, .env.local

Write files directly (see config details in design spec — blue-600 primary, oklch colors, shadcn default theme with `@import "tailwindcss"` and `@import "tw-animate-css"`).
6. Run: `npx shadcn@latest add button card input label select textarea badge dialog tooltip popover avatar tabs toast separator sonner`
7. Create .env.local with DATABASE_URL (Neon) and AUTH_SECRET
8. Verify: `pnpm dev` compiles clean
9. Commit: `git add -A && git commit -m "chore: configure tailwind v4, shadcn/ui, theme"`

---

## Phase 2: Data Layer — Drizzle Schema + Seed

### Task 2.1: Drizzle schema (all tables + relations)

**Files:** Create: drizzle.config.ts, lib/schema.ts, lib/db.ts

Write drizzle.config.ts (dialect: postgresql, schema: ./lib/schema.ts).  
Write lib/schema.ts — all tables with enums (role, order_status, keaslian, tipe_kendaraan), auth tables (users with role+password, sessions, accounts, verification_tokens), app tables (vehicles, spareparts, bengkels, mekaniks, services, orders, order_items, reviews, forum_threads, forum_answers), all with relations.  
Write lib/db.ts: drizzle(neon(DATABASE_URL)).
10. Run: `npx drizzle-kit push` — creates tables in Neon
11. Commit: `git add -A && git commit -m "feat: drizzle schema with all tables and relations"`

### Task 2.2: Seed data (all catalog tables)

**Files:** Create: lib/seed/vehicles.ts, lib/seed/spareparts.ts, lib/seed/mekaniks.ts, lib/seed/bengkels.ts, lib/seed/services.ts, lib/seed/index.ts

Insert 10 vehicles, 10 spareparts, 7 mekaniks, 5 bengkels, 8 services from pre-defined arrays (matching PRD data).
12. Add "db:seed": "npx tsx lib/seed/index.ts" to package.json scripts
13. Run: `pnpm db:seed`
14. Verify: Check Neon dashboard for data
15. Commit: `git add -A && git commit -m "feat: seed catalog data"`

---

## Phase 3: Authentication — Auth.js v5

### Task 3.1: Auth.js config, middleware, auth actions

**Files:** Create: lib/auth.ts, app/api/auth/[...nextauth]/route.ts, lib/actions/auth.ts, middleware.ts

Write lib/auth.ts: NextAuth with DrizzleAdapter, Credentials provider (bcrypt compare), JWT strategy, role in callbacks, signIn page to /login.  
Write route handler exporting { GET, POST } = handlers.  
Write lib/actions/auth.ts: registerUser (bcrypt hash, uuid, insert), loginUser (signIn wrapper).  
Write middleware.ts: auth() wrapper, public routes redirect to /lobby if logged in, protected routes redirect to /login if not.
16. Set AUTH_SECRET via `openssl rand -hex 32`
17. Verify: visit /login shows login page, middleware redirects /lobby to /login
18. Commit: `git add -A && git commit -m "feat: auth.js with drizzle adapter, credentials, middleware"`

---

## Phase 4: Core Layout Shell

### Task 4.1: Root layout, Providers, Zustand stores

**Files:** Modify: app/layout.tsx
**Create:** components/providers.tsx, stores/cartStore.ts, stores/uiStore.ts

Write root layout: Geist font, bg-gray-50, Providers wrapper with Toaster.  
Write cartStore: items[], addItem, removeItem, setQty, clear.  
Write uiStore: selectedServiceId, selectedMekanikId, sosState (userLat/Lng, mechLat/Lng, eta, mechName/Foto, status), initSOSTracking, updateSOSPosition, setSOSStatus, resetFlow.
19. Commit: `git add -A && git commit -m "feat: root layout, providers, zustand stores"`

### Task 4.2: Auth layout components + route directories

**Files:** Create: components/layout/BottomNavbar.tsx, components/layout/TopBar.tsx, components/layout/SOSFab.tsx, app/(auth)/layout.tsx, app/(public)/layout.tsx

Write BottomNavbar: 4 links (Home/Keranjang/Riwayat/Akun), active highlight, cart badge count, 64px height.  
Write TopBar: sticky, back button with router.back(), title prop.  
Write SOSFab: red circle, pulse animation, Siren icon, fixed position bottom-20 right-4.  
Write AuthLayout: auth() check → redirect, max-w-md mx-auto, pb-16, BottomNavbar, SOSFab.  
Write PublicLayout: max-w-md mx-auto, bg-white.
20. Create route directories: `mkdir -p app/\(auth\)/{lobby,sparepart/list/\[id\],montir/list/\[id\],bengkel/map/\[id\],sos/mencari/tracking,pemesanan/checkout/ongoing,ulasan,forum/ajukan/\[id\],keranjang,riwayat,akun,about} && mkdir -p app/\(public\)/login app/\(public\)/register app/api/auth/\[...nextauth\]`
21. Commit: `git add -A && git commit -m "feat: auth layout with navbar, topbar, SOS fab"`

---

## Phase 5: Auth Screens — Onboarding, Register, Login

### Task 5.1: Onboarding page (3 slides)

**File:** app/(public)/page.tsx

Implementation: Framer Motion AnimatePresence with slide carousel, 3 slides (Wrench/Montir, ShieldCheck/Sparepart, Zap/SOS), dot indicators, "Selanjutnya"/"Buat Akun"/"Masuk" buttons.
22. Commit: `git add -A && git commit -m "feat: onboarding page with 3 animated slides"`

### Task 5.2: Register page

**File:** app/(public)/register/page.tsx

Implementation: Client component form with Card. Fields: Nama, Email, No.HP, Password, Konfirmasi Password. On submit: call registerUser server action, then signIn("credentials"), redirect /lobby on success, toast error on failure.
23. Commit: `git add -A && git commit -m "feat: register page"`

### Task 5.3: Login page

**File:** app/(public)/login/page.tsx

Implementation: Client component, Email + Password fields, signIn("credentials", { redirect: false }), toast on error, router.push("/lobby") on success.
24. Commit: `git add -A && git commit -m "feat: login page"`

---

## Phase 6: Shared UI Components

### Task 6.1: Sparepart components

**Files:** Create: components/sparepart/KeaslianBadge.tsx, components/sparepart/StokBadge.tsx, components/sparepart/SparepartCard.tsx

KeaslianBadge: OEM=green, Aftermarket=blue, KW=yellow badge.  
StokBadge: 0=Kosong(red), 1-3=Sisa n(amber), >3=Tersedia(green).  
SparepartCard: Link to /sparepart/[id], photo with KeaslianBadge overlay, nama/price/StokBadge, opacity-60 when stok<=0.
25. Commit: `git add -A && git commit -m "feat: sparepart badge and card components"`

### Task 6.2: Mekanik components

**Files:** Create: components/mekanik/MekanikCard.tsx, components/mekanik/MekanikProfile.tsx

MekanikCard: Link to /montir/[id], photo avatar, name, bengkel, star rating, distance, up to 3 specialization tags.  
MekanikProfile: Full profile — large photo, name, bengkel, rating+review count, distance, plat kendaraan, certifications (green badges), specializations (blue badges).
26. Commit: `git add -A && git commit -m "feat: mekanik card and profile components"`

### Task 6.3: Pemesanan + Tracking components

**Files:** Create: components/pemesanan/HargaBreakdown.tsx, components/pemesanan/EscrowBanner.tsx, components/pemesanan/SliderButton.tsx, components/tracking/MekanikFloatingCard.tsx, components/tracking/TrackingMap.tsx

HargaBreakdown: 3 line items + Biaya Layanan(5%) + Total, Tooltip on "?" for Biaya Jasa Mekanik.  
EscrowBanner: ShieldCheck icon, "Dana Anda ditahan oleh Auto Jalan", green styling.  
SliderButton: Pointer drag (onPointerDown/Move/Up), spring animation to full width on >85%, calls onComplete.  
MekanikFloatingCard: Positioned absolute, photo, name, distance+ETA, Chat+Telepon buttons (toast: "Fitur segera hadir").  
TrackingMap: Leaflet map with custom markers (default blue, red for user, green for mechanic), popup support, dynamic marker updates via useEffect.
27. Commit: `git add -A && git commit -m "feat: pemesanan and tracking shared components"`

### Task 6.4: Rating components

**Files:** Create: components/rating/StarRating.tsx, components/rating/ChipButton.tsx
**Files:** Create: components/forum/ThreadCard.tsx

StarRating: 1-5 stars, interactive hover/tap, yellow-400 filled, click to set value.  
ChipButton: Toggle chip with text, blue when selected, outline when not.  
ThreadCard: Link to /forum/[id], title, category, answer count, author, relative time.
28. Commit: `git add -A && git commit -m "feat: rating and forum components"`

---

## Phase 7: Feature Pages — Lobby + Sparepart Flow

### Task 7.1: Lobby + About pages

**Files:** Create: app/(auth)/lobby/page.tsx, app/(auth)/about/page.tsx

Lobby: auth() for user name, blue banner, 3x2 menu grid (6 items with Lucide icons), SOS info card.  
About: TopBar, feature list, Vorca Studio info.
29. Commit: `git add -A && git commit -m "feat: lobby and about pages"`

### Task 7.2: Sparepart filter page

**Files:** Create: app/(auth)/sparepart/page.tsx (Server Component), app/(auth)/sparepart/SparepartFilter.tsx (Client Component)

Server page: Drizzle query vehicles, pass to filter.  
Filter: Motor/Mobil toggle, cascading Selects (Merek→Model→Tahun), "Cari Sparepart" button navigating to /sparepart/list?merek=&model=&tahun=.
30. Commit: `git add -A && git commit -m "feat: sparepart filter page"`

### Task 7.3: Sparepart list page

**File:** app/(auth)/sparepart/list/page.tsx

Server Component: Read searchParams (merek/model/tahun), query matching vehicles, filter spareparts by compatibleVehicleIds, 2-column grid of SparepartCards, empty state message.
31. Commit: `git add -A && git commit -m "feat: sparepart list page"`

### Task 7.4: Sparepart detail page

**Files:** Create: app/(auth)/sparepart/[id]/page.tsx, app/(auth)/sparepart/[id]/AddToCartButton.tsx

Server page: param.id, one sparepart query, photo, name, price, KeaslianBadge, StokBadge, spec table.  
AddToCartButton: Client component, cartStore.addItem, toast, "Beli Sekarang" variant (add+goto cart).
32. Commit: `git add -A && git commit -m "feat: sparepart detail page with add to cart"`

---

## Phase 8: Feature Pages — Montir Flow

### Task 8.1: Service list + Mechanic list pages

**Files:** Create: app/(auth)/montir/page.tsx, app/(auth)/montir/ServiceCard.tsx, app/(auth)/montir/list/page.tsx

Service page: Drizzle query services, render ServiceCards.  
ServiceCard: Link to /montir/list?serviceId=X, icon from Lucide, name, description, price, estimated time.  
Mechanic list: requires searchParams.serviceId, query all mekaniks and bengkels, render MekanikCards with bengkel names.
33. Commit: `git add -A && git commit -m "feat: montir service list and mechanic list pages"`

### Task 8.2: Mechanic profile page

**Files:** Create: app/(auth)/montir/[id]/page.tsx, app/(auth)/montir/[id]/PilihMontirButton.tsx

Server page: param.id, mekanik+bengkel query, MekanikProfile, PilihMontirButton.  
PilihMontirButton: uiStore.setSelectedMekanik, router.push /pemesanan/checkout.
34. Commit: `git add -A && git commit -m "feat: montir profile page with select button"`

---

## Phase 9: Feature Pages — Bengkel Flow

### Task 9.1: Bengkel area filter + map pages

**Files:** Create: app/(auth)/bengkel/page.tsx, app/(auth)/bengkel/map/page.tsx, app/(auth)/bengkel/map/BengkelMapClient.tsx

Area filter: daerah Select dropdown, "Lihat Peta" button.  
Map page: Server Component query bengkels → BengkelMapClient.  
BengkelMapClient: dynamic import TrackingMap (ssr:false), center Jakarta, markers with popup "Lihat Detail" linking to /bengkel/[id].
35. Commit: `git add -A && git commit -m "feat: bengkel area filter and map pages"`

### Task 9.2: Bengkel profile page

**File:** app/(auth)/bengkel/[id]/page.tsx

Server page: param.id, bengkel query + related mekaniks, photo, name, rating (Star icon), address (MapPin), hours (Clock), specializations, mechanic list using MekanikCard.
36. Commit: `git add -A && git commit -m "feat: bengkel profile page"`

---

## Phase 10: Feature Pages — SOS Flow

### Task 10.1: SOS detail + mencari pages

**Files:** Create: app/(auth)/sos/page.tsx, app/(auth)/sos/SOSClient.tsx, app/(auth)/sos/mencari/page.tsx

SOSPage: TopBar + SOSClient.  
SOSClient: Red emergency card, location info card (detected address, ETA, emergency fee), "Panggil Montir Sekarang" red button navigating to /sos/mencari.  
Mencari page: Framer Motion spinning Search icon, "Sedang mencari montir terdekat...", 3 second setTimeout → initSOSTracking → router.push /sos/tracking.
37. Commit: `git add -A && git commit -m "feat: SOS detail and mencari pages"`

### Task 10.2: SOS tracking page + simulation hook

**Files:** Create: app/(auth)/sos/tracking/page.tsx, hooks/useSimulateTracking.ts

useSimulateTracking: Reads sosState from uiStore, setInterval(2000ms) moving mechanic toward user (-6.2088, 106.8456) by step 0.003, reduces ETA, sets "arrived" when distance < 0.001.  
Tracking page: dynamic TrackingMap, userMarker(red) + mechMarker(green), MekanikFloatingCard, calculateDistance helper, toast on "arrived", "Lihat Pesanan" button.
38. Commit: `git add -A && git commit -m "feat: SOS tracking with live simulation"`

---

## Phase 11: Feature Pages — Pemesanan Flow

### Task 11.1: Checkout page + hooks + server actions

**Files:** Create: app/(auth)/pemesanan/checkout/page.tsx, hooks/useScrolledToBottom.ts, lib/actions/orders.ts

useScrolledToBottom: IntersectionObserver on ref element, threshold 1, sets reachedBottom=true.  
orders.ts: createOrder (auth check, calculate total with 5%, insert order+order_items from cart, returns orderId), completeOrder (set status=selesai).  
Checkout: Client page, HargaBreakdown, Fixed Price banner, scroll target div, disabled "Pesan Sekarang" until reachedBottom, calls createOrder, clears cart, resets uiStore, navigates to /pemesanan/ongoing?orderId=.
39. Commit: `git add -A && git commit -m "feat: checkout page with cost transparency and scroll-to-confirm"`

### Task 11.2: Ongoing page + SliderButton integration

**File:** app/(auth)/pemesanan/ongoing/page.tsx

Client page: EscrowBanner, mechanic info card (photo, name, bengkel, rating, plat, certifications), order detail card (service name, status, total), SliderButton → Dialog confirm → router.push /ulasan, "Ajukan Komplain" button → Dialog info "Tim kami akan menghubungi 1x24 jam".
40. Commit: `git add -A && git commit -m "feat: ongoing page with slider confirm and escrow"`

---

## Phase 12: Feature Pages — Ulasan

### Task 12.1: Review page

**Files:** Create: app/(auth)/ulasan/page.tsx, lib/actions/reviews.ts

reviews.ts: submitReview server action (upsert with userId, mekanikId, orderId, ratings, tags, text).  
Ulasan page: Client page, StarRating for Mekanik (1-5), conditional StarRating for Sparepart, ChipButton tags [Montir Ramah, Datang Tepat Waktu, Pengerjaan Rapi, Harga Sesuai], textarea, "Kirim Ulasan" button → submitReview → redirect /lobby, small "Nanti Saja" link → redirect /lobby.
41. Commit: `git add -A && git commit -m "feat: review page with star ratings and chips"`

---

## Phase 13: Feature Pages — Forum

### Task 13.1: Forum pages (list, detail, ajukan)

**Files:** Create: app/(auth)/forum/page.tsx, app/(auth)/forum/[id]/page.tsx, app/(auth)/forum/ajukan/page.tsx, lib/actions/forum.ts

forum.ts: createThread, createAnswer server actions.  
Forum list: Server Component, Drizzle query forum_threads with answer count, render ThreadCards.  
Thread detail: param.id, query thread+answers with user names, form for answer (createAnswer action), toast on submit.  
Ajukan: Client form (title, category dropdown, description), createThread action, redirect /forum.
42. Commit: `git add -A && git commit -m "feat: forum pages — list, detail, create"`

---

## Phase 14: Feature Pages — Keranjang, Riwayat, Akun

### Task 14.1: Keranjang page

**File:** app/(auth)/keranjang/page.tsx

Client page: Read cartStore items, query spareparts by IDs via Server Component wrapper or inline fetch, list items with image/name/price/qty stepper(+/-)/delete button, total calculation, empty state with "Cari Sparepart" CTA, "Checkout" button → /pemesanan/checkout.
43. Commit: `git add -A && git commit -m "feat: keranjang page with cart management"`

### Task 14.2: Riwayat page

**File:** app/(auth)/riwayat/page.tsx

Server Component: Drizzle query orders for current user with tabs (Ongoing/Selesai), Tabs component, ongoing orders link to /pemesanan/ongoing, completed orders show summary card.
44. Commit: `git add -A && git commit -m "feat: riwayat page with tabs"`

### Task 14.3: Akun page + Logout

**File:** app/(auth)/akun/page.tsx

Server Component: auth() session, user info card (avatar, name, email, noHP), "Keluar" button → signOut() → redirect /login. Session clear on click.
45. Commit: `git add -A && git commit -m "feat: akun page with logout"`

---

## Phase 15: Polish + Build

### Task 15.1: Verify build + route walkthrough

1. Run `pnpm build` — verify 0 TypeScript errors, successful build
2. Run `pnpm dev` — manually walk through every route:
   - / → onboarding → register → lobby
   - Lobby → each menu item
   - Sparepart: filter → list → detail → add to cart
   - Montir: services → select mechanic → profile → checkout → scroll → confirm → ongoing → slider → review → submit → lobby
   - SOS: detail → mencari → tracking (watch animation) → arrived
   - Bengkel: filter → map → profile
   - Forum: list → detail → create
   - Keranjang → Riwayat → Akun → Logout
3. Fix any broken routes or layout issues
4. Commit fixes: `git add -A && git commit -m "fix: route verification and polish"`

---

**End of plan.** Estimated: ~45 tasks, 3-5 hours total implementation time.
