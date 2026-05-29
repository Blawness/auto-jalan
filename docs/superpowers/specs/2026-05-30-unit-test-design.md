# Unit Test Design — Auto Jalan

Date: 2026-05-30

## Overview

Add unit tests for the main components and stores using Vitest + React Testing Library + jsdom. No unit tests exist today; only Playwright E2E.

## Setup

**Packages to install (devDependencies):**
- `vitest` — test runner
- `@vitejs/plugin-react` — React JSX transform for Vitest
- `jsdom` — DOM environment simulation
- `@testing-library/react` — component rendering and querying
- `@testing-library/user-event` — simulates real user interactions (click, hover, type)
- `@testing-library/jest-dom` — extended matchers (`toBeInTheDocument`, `toHaveClass`, etc.)
- `@types/testing-library__jest-dom` — TypeScript types for jest-dom matchers

**Config files:**
- `vitest.config.ts` — sets environment to `jsdom`, points to setup file, resolves `@/` alias
- `tests/unit/setup.ts` — imports `@testing-library/jest-dom` for global matchers

**package.json scripts:**
```json
"test": "vitest run",
"test:watch": "vitest"
```

## Test Files

All unit tests live under `tests/unit/` mirroring source structure.

### `tests/unit/lib/utils.test.ts`
Pure function tests, no mocks needed.
- `formatRupiah(150000)` → `"Rp 150.000"`
- `formatRupiah(0)` → `"Rp 0"`
- `formatRupiah(1000000)` → `"Rp 1.000.000"`
- `cn("a", "b")` → `"a b"` (class merging)
- `cn("px-2", "px-4")` → `"px-4"` (tailwind-merge deduplication)

### `tests/unit/components/sparepart/KeaslianBadge.test.tsx`
- Renders "OEM" with green classes
- Renders "Aftermarket" with blue classes
- Renders "KW" with yellow classes

### `tests/unit/components/sparepart/StokBadge.test.tsx`
- `stok=0` → renders "Kosong" with red styling
- `stok=1` → renders "Sisa 1" with amber styling
- `stok=3` → renders "Sisa 3" with amber styling
- `stok=4` → renders "Tersedia" with green styling
- `stok=100` → renders "Tersedia"

### `tests/unit/components/sparepart/SparepartCard.test.tsx`
Mocks: `next/link` → renders as `<a>`.
- Renders product name and formatted price
- Link href points to `/sparepart/{id}`
- When `stok=0`: card has `opacity-60` and `pointer-events-none` classes
- When `stok>0`: card does not have those classes
- Renders `KeaslianBadge` and `StokBadge`

### `tests/unit/components/mekanik/MekanikCard.test.tsx`
Mocks: `next/link` → renders as `<a>`.
- Renders mechanic name, workshop name, rating, distance
- Link href points to `/montir/{id}`
- Renders up to 3 specialization chips
- When 4+ specializations given, only 3 are shown

### `tests/unit/components/forum/ThreadCard.test.tsx`
Mocks: `next/link` → renders as `<a>`.
- Renders thread title, category, author, answer count
- Link href points to `/forum/{id}`

### `tests/unit/components/rating/StarRating.test.tsx`
- Renders correct number of star buttons (default 5, configurable via `max`)
- Clicking 3rd star calls `onChange(3)`
- Clicking 5th star calls `onChange(5)`
- Stars at or below selected value have filled class; above do not
- Hover over 4th star: stars 1–4 appear filled; mouseLeave resets to original value

### `tests/unit/stores/cartStore.test.ts`
Reset store state in `beforeEach`. No mocks needed.
- `addItem("sp1")` → items has 1 entry with qty 1
- `addItem("sp1")` twice → qty is 2 (increments, not duplicates)
- `addItem("sp1")` + `addItem("sp2")` → 2 distinct items
- `removeItem("sp1")` → item removed from list
- `setQty("sp1", 5)` → qty becomes 5
- `setQty("sp1", 0)` → item removed (qty ≤ 0 triggers removal)
- `clear()` → items is empty

### `tests/unit/components/layout/BottomNavbar.test.tsx`
Mocks: `next/navigation` (`usePathname`), `next-auth/react` (`useSession`), `next/link` → `<a>`.
- Authenticated user on `/lobby`: Home link has active (blue) class
- Authenticated user on `/keranjang`: Keranjang link has active class
- Unauthenticated user: Keranjang link href → `/login?callbackUrl=%2Fkeranjang`
- Cart badge shows count when cartStore has items
- Cart badge hidden when cart is empty
- SOS button always present and links to `/sos`

## Mock Strategy

| Dependency | Mock approach |
|---|---|
| `next/link` | `vi.mock('next/link', () => ({ default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a> }))` |
| `next/navigation` | `vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))` |
| `next-auth/react` | `vi.mock('next-auth/react', () => ({ useSession: vi.fn() }))` |
| `cartStore` | Reset via `useCartStore.setState({ items: [] })` in `beforeEach` |

## Out of Scope

- Server components (pages, layout) — require full Next.js runtime
- `BengkelMapClient` — Leaflet requires real browser canvas
- Server actions (`lib/actions/`) — integration-level, not unit
- `MekanikProfile`, `HargaBreakdown`, `EscrowBanner`, `SliderButton` — secondary priority, can be added later
