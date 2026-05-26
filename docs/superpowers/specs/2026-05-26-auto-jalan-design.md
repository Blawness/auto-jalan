# Design Spec: Auto Jalan Prototype

**Version:** 1.0  
**Date:** 2026-05-26  
**Author:** Yudha Hafiz (Vorca Studio)  
**Status:** Approved — Ready for implementation

---

## 1. Architecture Overview

**Stack:** Next.js 16 App Router + TypeScript 5 + Tailwind CSS v4 + shadcn/ui + Zustand + Drizzle ORM + PostgreSQL (Neon/Supabase) + Auth.js v5 + Leaflet.js

**Pattern:** Server Components by default. Data fetched via Drizzle in `page.tsx`. Mutations via Server Actions (`lib/actions/*.ts`). Client Components only for interactivity (forms, maps, sliders, dynamic elements).

**Auth:** Auth.js v5 with `@auth/drizzle-adapter`, Credentials provider (email + password), `role` column on `users` table.

**Hosting:** Vercel + Neon/Supabase free tier Postgres.

---

## 2. Database Schema

### Auth.js Auto-Generated Tables

- `users` — id, name, email, emailVerified, image, **role** (added via schema extension: `user` | `mekanik` | `admin`)
- `sessions` — sessionToken, userId, expires
- `accounts` — provider account linking
- `verification_tokens` — email verification (unused but available)

### Application Tables

```sql
-- Seed / catalog tables
vehicles (id, merek, model, tahun[], tipe)
spareparts (id, nama, harga, foto, keaslian, stok, spesifikasi jsonb, compatible_vehicle_ids[])
mekaniks (id, nama, foto, bengkel_id, plat_kendaraan, sertifikasi[], rating, jumlah_ulasan, jarak, spesialisasi[])
bengkels (id, nama, alamat, lat, lng, jam_buka, rating, spesialisasi[], foto)
services (id, nama, deskripsi, harga_jasa, estimasi_waktu, ikon)

-- Transactional tables
orders (id, user_id, mekanik_id, service_id, status, total_harga, created_at)
order_items (id, order_id, sparepart_id, qty, harga_satuan)
reviews (id, user_id, mekanik_id, order_id, rating_mekanik, rating_sparepart, tags[], teks, created_at)

-- Forum tables
forum_threads (id, user_id, judul, kategori, deskripsi, created_at)
forum_answers (id, user_id, thread_id, isi, created_at)
```

### Seed Strategy

`pnpm db:seed` script inserts catalog data from pre-defined arrays in `lib/seed/*.ts`. All vehicles, spareparts, mekaniks, bengkels, services are pre-defined constants matching the PRD's mock data structure.

---

## 3. State Management

### Zustand Stores (Client-side only)

| Store | Content | Purpose |
|-------|---------|---------|
| `cartStore` | `{ items: { sparepartId, qty }[] }` | Cart — ephemeral until checkout confirmed |
| `uiStore` | `{ selectedServiceId, selectedMekanikId, sosState }` | Multi-step flow state + SOS simulation |

### Server State (Drizzle + Auth.js session)

Everything else — user profile, orders, reviews, forum posts, catalog data — lives in Postgres and is fetched in Server Components or via Server Actions.

---

## 4. Route Layout

```
app/
├── (auth)/                          # Protected — requires session
│   ├── layout.tsx                   # BottomNavbar + TopBar + SOSFab
│   ├── lobby/page.tsx
│   ├── sparepart/page.tsx
│   ├── sparepart/list/page.tsx      # ?merek=&model=&tahun=
│   ├── sparepart/[id]/page.tsx
│   ├── montir/page.tsx
│   ├── montir/list/page.tsx         # ?serviceId=
│   ├── montir/[id]/page.tsx
│   ├── bengkel/page.tsx
│   ├── bengkel/map/page.tsx
│   ├── bengkel/[id]/page.tsx
│   ├── sos/page.tsx
│   ├── sos/mencari/page.tsx         # auto-redirect 3detik
│   ├── sos/tracking/page.tsx        # Leaflet + simulation
│   ├── pemesanan/checkout/page.tsx
│   ├── pemesanan/ongoing/page.tsx
│   ├── ulasan/page.tsx
│   ├── forum/page.tsx
│   ├── forum/ajukan/page.tsx
│   ├── forum/[id]/page.tsx
│   ├── keranjang/page.tsx
│   ├── riwayat/page.tsx
│   ├── akun/page.tsx
│   └── about/page.tsx
├── (public)/                        # Unauthenticated only
│   ├── layout.tsx                   # Clean wrapper, no navbar
│   ├── page.tsx                     # Onboarding (3 slides)
│   ├── login/page.tsx
│   └── register/page.tsx
└── api/auth/[...nextauth]/route.ts  # Auth.js handler
```

### Middleware Behavior

- `(auth)` group: No session → redirect `/login`
- `(public)` group: Has session → redirect `/lobby`
- `/api/auth/*`: Pass through always

---

## 5. Component Tree

```
components/
├── ui/                    # shadcn/ui primitives
├── layout/
│   ├── BottomNavbar.tsx   # Home, Keranjang, Riwayat, Akun — 64px height
│   ├── TopBar.tsx         # Back button + page title
│   └── SOSFab.tsx         # Floating red SOS button
├── sparepart/
│   ├── SparepartCard.tsx      # Product card + badges
│   ├── KeaslianBadge.tsx      # OEM=green, Aftermarket=blue, KW=gray/yellow
│   └── StokBadge.tsx          # Available=sisa/stok=active, Empty=disabled
├── mekanik/
│   ├── MekanikCard.tsx        # List card with rating + distance
│   └── MekanikProfile.tsx     # Full profile view
├── pemesanan/
│   ├── HargaBreakdown.tsx     # 3-line + platform fee + total
│   ├── SliderButton.tsx       # Mouse/touch drag only, no click
│   └── EscrowBanner.tsx       # "Dana ditahan" info
├── tracking/
│   ├── TrackingMap.tsx        # Leaflet dynamic import, ssr:false
│   └── MekanikFloatingCard.tsx
├── forum/
│   └── ThreadCard.tsx
└── rating/
    ├── StarRating.tsx         # Interactive 1-5 stars
    └── ChipButton.tsx         # Quick-select tags
```

### Component Classification

| Type | Pattern | Examples |
|------|---------|----------|
| Server Component (default) | async, Drizzle query, passes data to children | `page.tsx` files, `SparepartCard` display |
| Client Component | `"use client"`, handles interactivity | `StarRating`, `SliderButton`, `TrackingMap` |
| Dynamic Import | `dynamic(..., { ssr: false })` | `TrackingMap` (Leaflet) |

---

## 6. Key Data Flows

### Sparepart Browsing
Server Component → Drizzle query vehicles + spareparts → pass as props to `SparepartCard` (client for badge hover). Add to cart → `cartStore` (Zustand). Only hits DB on checkout confirm.

### Booking Flow (Panggil Montir)
1. `/montir` → Server Component queries `services` → user taps a service → sets `uiStore.selectedServiceId`
2. `/montir/list?serviceId=X` → Server Component queries `mekaniks` → user taps mechanic → sets `uiStore.selectedMekanikId`
3. `/pemesanan/checkout` → Server Component calculates breakdown from DB prices → `useScrolledToBottom` enables button → Server Action writes `orders` + `order_items` → clear cart + uiStore → redirect `/pemesanan/ongoing`

### SOS Emergency
Purely client-side. No DB writes. `uiStore.sosState` holds simulated mechanic coordinates. `useSimulateTracking` hook runs `setInterval` every 2s moving mechanic marker toward user. On "arrival" → toast → redirect to ongoing.

### Cost Transparency
`HargaBreakdown.tsx` renders: Biaya Suku Cadang | Biaya Jasa Mekanik | Biaya Kedatangan | Biaya Layanan (5%) | **Total**. Tooltip on "?" icon via shadcn Tooltip. IntersectionObserver on last element → "Pesan Sekarang" becomes enabled.

### Digital Trust (Ongoing)
`EscrowBanner` shows trust messaging. `SliderButton` pure drag interaction. Slide complete → modal confirm → Server Action `order.status = 'selesai'` → redirect `/ulasan`.

### Review Flow
Stars + chips + optional textarea. Submit → Server Action writes to `reviews`. "Nanti Saja" dismisses without write. Redirect to `/lobby`.

---

## 7. Packages

```json
{
  "dependencies": {
    "next": "^16",
    "react": "^19.2",
    "react-dom": "^19.2",
    "typescript": "^5",
    "tailwindcss": "^4",
    "drizzle-orm": "latest",
    "@auth/drizzle-adapter": "latest",
    "next-auth": "beta",
    "zustand": "latest",
    "leaflet": "latest",
    "react-leaflet": "latest",
    "framer-motion": "latest",
    "bcryptjs": "latest",
    "@types/leaflet": "latest",
    "@types/bcryptjs": "latest",
    "lucide-react": "latest",
    "postgres": "latest",
    "@neondatabase/serverless": "latest",
    "dotenv": "latest"
  },
  "devDependencies": {
    "drizzle-kit": "latest",
    "@tailwindcss/postcss": "latest"
  }
}
```

---

## 8. Project Structure

```
auto-jalan/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── lobby/page.tsx
│   │   ├── sparepart/
│   │   │   ├── page.tsx
│   │   │   ├── list/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── montir/
│   │   │   ├── page.tsx
│   │   │   ├── list/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── bengkel/
│   │   │   ├── page.tsx
│   │   │   ├── map/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── sos/
│   │   │   ├── page.tsx
│   │   │   ├── mencari/page.tsx
│   │   │   └── tracking/page.tsx
│   │   ├── pemesanan/
│   │   │   ├── checkout/page.tsx
│   │   │   └── ongoing/page.tsx
│   │   ├── ulasan/page.tsx
│   │   ├── forum/
│   │   │   ├── page.tsx
│   │   │   ├── ajukan/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── keranjang/page.tsx
│   │   ├── riwayat/page.tsx
│   │   ├── akun/page.tsx
│   │   └── about/page.tsx
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── layout.tsx                  # Root HTML + font + providers
│   ├── globals.css                 # Tailwind imports
│   └── api/auth/[...nextauth]/route.ts
├── components/
│   ├── ui/                         # shadcn auto-generated
│   ├── layout/
│   │   ├── BottomNavbar.tsx
│   │   ├── TopBar.tsx
│   │   └── SOSFab.tsx
│   ├── sparepart/
│   │   ├── SparepartCard.tsx
│   │   ├── KeaslianBadge.tsx
│   │   └── StokBadge.tsx
│   ├── mekanik/
│   │   ├── MekanikCard.tsx
│   │   └── MekanikProfile.tsx
│   ├── pemesanan/
│   │   ├── HargaBreakdown.tsx
│   │   ├── SliderButton.tsx
│   │   └── EscrowBanner.tsx
│   ├── tracking/
│   │   ├── TrackingMap.tsx
│   │   └── MekanikFloatingCard.tsx
│   ├── forum/
│   │   └── ThreadCard.tsx
│   └── rating/
│       ├── StarRating.tsx
│       └── ChipButton.tsx
├── lib/
│   ├── db.ts                       # Drizzle client + schema export
│   ├── schema.ts                   # All Drizzle table definitions
│   ├── auth.ts                     # Auth.js config (NextAuth)
│   ├── utils.ts                    # formatRupiah, etc.
│   ├── seed/                       # Seed scripts
│   │   ├── index.ts
│   │   ├── vehicles.ts
│   │   ├── spareparts.ts
│   │   ├── mekaniks.ts
│   │   ├── bengkels.ts
│   │   └── services.ts
│   └── actions/                    # Server Actions
│       ├── auth.ts                 # register, login are handled by Auth.js
│       ├── orders.ts               # createOrder, completeOrder
│       ├── reviews.ts              # submitReview
│       ├── forum.ts                # createThread, createAnswer
│       └── cart.ts                 # (cart stays Zustand, no server action needed)
├── stores/
│   ├── cartStore.ts
│   └── uiStore.ts
├── hooks/
│   ├── useScrolledToBottom.ts
│   └── useSimulateTracking.ts
├── types/
│   └── index.ts
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── components.json
├── .env.local
└── package.json
```

---

## 9. Design Conventions

| Element | Value |
|---------|-------|
| Primary color | `blue-600` |
| SOS/Darurat color | `red-500` / `orange-500` |
| Badge OEM | `bg-green-100 text-green-800` |
| Badge Aftermarket | `bg-blue-100 text-blue-800` |
| Badge KW | `bg-gray-100 text-gray-600` / `bg-yellow-100 text-yellow-800` |
| Star rating | `text-yellow-400` |
| Price format | `formatRupiah(number)` → `Rp 150.000` |
| Layout max-width | `max-w-md mx-auto` (mobile-first) |
| Bottom padding | `pb-16` on all authenticated pages |
| Navbar height | 64px |

---

## 10. Non-Goals

- No GPS device API (user location hardcoded to Jakarta -6.2088, 106.8456)
- No WebRTC in-app call/chat (buttons exist, show toast "Fitur segera hadir")
- No push notifications
- No real-time WebSocket tracking (simulated via setInterval)
- No add-on service approval flow
- No payment gateway (escrow is UI mock)
- No email verification, no OTP
