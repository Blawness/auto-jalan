# Unit Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit tests for all main components and stores using Vitest + React Testing Library + jsdom.

**Architecture:** Tests live under `tests/unit/` mirroring the source structure. Pure components are tested directly; components with external deps (next/link, next-auth/react, next/navigation) use `vi.mock`. Zustand store is reset between tests via `setState`.

**Tech Stack:** Vitest, @testing-library/react, @testing-library/user-event v14, @testing-library/jest-dom, jsdom, @vitejs/plugin-react

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Create | `vitest.config.ts` | Vitest config: jsdom env, path alias, setup file |
| Create | `tests/unit/setup.ts` | Import jest-dom matchers globally |
| Modify | `package.json` | Add test scripts and devDependencies |
| Create | `tests/unit/lib/utils.test.ts` | Tests for formatRupiah and cn |
| Create | `tests/unit/components/sparepart/KeaslianBadge.test.tsx` | Badge color/text per keaslian value |
| Create | `tests/unit/components/sparepart/StokBadge.test.tsx` | Badge text/color per stok thresholds |
| Create | `tests/unit/components/sparepart/SparepartCard.test.tsx` | Card render, link, disabled state |
| Create | `tests/unit/components/mekanik/MekanikCard.test.tsx` | Card render, link, max 3 chips |
| Create | `tests/unit/components/forum/ThreadCard.test.tsx` | Card render, link, answer count |
| Create | `tests/unit/components/rating/StarRating.test.tsx` | Star count, click, hover |
| Create | `tests/unit/stores/cartStore.test.ts` | Add, remove, setQty, clear |
| Create | `tests/unit/components/layout/BottomNavbar.test.tsx` | Active state, guest redirect, cart badge |

---

## Task 1: Install packages and configure Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/unit/setup.ts`

- [ ] **Step 1: Install devDependencies**

```bash
cd /home/blawness/projects/auto-jalan
pnpm add -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom
```

Expected: packages installed, `pnpm-lock.yaml` updated.

- [ ] **Step 2: Add test scripts to package.json**

In `package.json`, add to the `"scripts"` section:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 4: Create tests/unit/setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verify setup runs**

```bash
pnpm test
```

Expected: "No test files found" or 0 tests — not a crash. If it crashes, check that `vitest.config.ts` resolves correctly.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts tests/unit/setup.ts package.json pnpm-lock.yaml
git commit -m "chore: add Vitest + RTL unit test infrastructure"
```

---

## Task 2: lib/utils tests

**Files:**
- Create: `tests/unit/lib/utils.test.ts`

- [ ] **Step 1: Write the tests**

```ts
import { describe, it, expect } from 'vitest'
import { formatRupiah, cn } from '@/lib/utils'

describe('formatRupiah', () => {
  it('formats 150000 as Indonesian Rupiah', () => {
    const result = formatRupiah(150000)
    expect(result).toContain('150')
    expect(result).toMatch(/Rp|IDR/)
  })

  it('formats 0', () => {
    const result = formatRupiah(0)
    expect(result).toMatch(/Rp|IDR/)
    expect(result).toContain('0')
  })

  it('formats 1000000 with thousand separators', () => {
    const result = formatRupiah(1_000_000)
    // Indonesian locale uses dots as thousands separator
    expect(result).toMatch(/1[.,]000[.,]000|1\.000\.000/)
  })

  it('formats 2500 correctly', () => {
    const result = formatRupiah(2500)
    expect(result).toContain('2')
    expect(result).toContain('500')
  })
})

describe('cn', () => {
  it('merges two class strings', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('deduplicates conflicting tailwind classes (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles undefined and empty values', () => {
    expect(cn('a', undefined, '', 'b')).toBe('a b')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'conditional')).toBe('base')
    expect(cn('base', true && 'conditional')).toBe('base conditional')
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/lib/utils.test.ts
```

Expected: 8 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/utils.test.ts
git commit -m "test: add utils unit tests (formatRupiah, cn)"
```

---

## Task 3: KeaslianBadge tests

**Files:**
- Create: `tests/unit/components/sparepart/KeaslianBadge.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KeaslianBadge } from '@/components/sparepart/KeaslianBadge'

describe('KeaslianBadge', () => {
  it('renders OEM with green classes', () => {
    render(<KeaslianBadge keaslian="OEM" />)
    const badge = screen.getByText('OEM')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders Aftermarket with blue classes', () => {
    render(<KeaslianBadge keaslian="Aftermarket" />)
    const badge = screen.getByText('Aftermarket')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('renders KW with yellow classes', () => {
    render(<KeaslianBadge keaslian="KW" />)
    const badge = screen.getByText('KW')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/sparepart/KeaslianBadge.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/sparepart/KeaslianBadge.test.tsx
git commit -m "test: add KeaslianBadge unit tests"
```

---

## Task 4: StokBadge tests

**Files:**
- Create: `tests/unit/components/sparepart/StokBadge.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StokBadge } from '@/components/sparepart/StokBadge'

describe('StokBadge', () => {
  it('shows "Kosong" with red styling when stok is 0', () => {
    render(<StokBadge stok={0} />)
    const badge = screen.getByText('Kosong')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-red-600')
  })

  it('shows "Sisa 1" with amber styling when stok is 1', () => {
    render(<StokBadge stok={1} />)
    const badge = screen.getByText('Sisa 1')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-amber-600')
  })

  it('shows "Sisa 3" with amber styling when stok is 3', () => {
    render(<StokBadge stok={3} />)
    const badge = screen.getByText('Sisa 3')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-amber-600')
  })

  it('shows "Tersedia" with green styling when stok is 4', () => {
    render(<StokBadge stok={4} />)
    const badge = screen.getByText('Tersedia')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-green-600')
  })

  it('shows "Tersedia" when stok is 100', () => {
    render(<StokBadge stok={100} />)
    expect(screen.getByText('Tersedia')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/sparepart/StokBadge.test.tsx
```

Expected: 5 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/sparepart/StokBadge.test.tsx
git commit -m "test: add StokBadge unit tests"
```

---

## Task 5: SparepartCard tests

**Files:**
- Create: `tests/unit/components/sparepart/SparepartCard.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SparepartCard } from '@/components/sparepart/SparepartCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'sp-1',
  nama: 'Kampas Rem Belakang',
  harga: 85000,
  foto: 'https://example.com/foto.jpg',
  keaslian: 'OEM' as const,
  stok: 10,
}

describe('SparepartCard', () => {
  it('renders product name', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('Kampas Rem Belakang')).toBeInTheDocument()
  })

  it('renders formatted price containing the amount', () => {
    render(<SparepartCard {...defaultProps} />)
    const priceEl = screen.getByText(/85/)
    expect(priceEl).toBeInTheDocument()
  })

  it('links to the correct sparepart detail page', () => {
    render(<SparepartCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/sparepart/sp-1')
  })

  it('renders keaslian badge', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('OEM')).toBeInTheDocument()
  })

  it('renders stok badge "Tersedia" when stok is high', () => {
    render(<SparepartCard {...defaultProps} />)
    expect(screen.getByText('Tersedia')).toBeInTheDocument()
  })

  it('has opacity-60 and pointer-events-none when stok is 0', () => {
    render(<SparepartCard {...defaultProps} stok={0} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('opacity-60', 'pointer-events-none')
  })

  it('does not have disabled classes when stok is positive', () => {
    render(<SparepartCard {...defaultProps} stok={5} />)
    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('opacity-60')
    expect(link).not.toHaveClass('pointer-events-none')
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/sparepart/SparepartCard.test.tsx
```

Expected: 7 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/sparepart/SparepartCard.test.tsx
git commit -m "test: add SparepartCard unit tests"
```

---

## Task 6: MekanikCard tests

**Files:**
- Create: `tests/unit/components/mekanik/MekanikCard.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MekanikCard } from '@/components/mekanik/MekanikCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'mek-1',
  nama: 'Budi Santoso',
  foto: 'https://example.com/foto.jpg',
  bengkel: 'Bengkel Maju',
  rating: 4.8,
  jarak: 2.3,
  spesialisasi: ['Rem', 'Mesin', 'Kelistrikan'],
}

describe('MekanikCard', () => {
  it('renders mechanic name', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Budi Santoso')).toBeInTheDocument()
  })

  it('renders workshop name', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Bengkel Maju')).toBeInTheDocument()
  })

  it('renders rating', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('4.8')).toBeInTheDocument()
  })

  it('renders distance', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText(/2\.3 km/)).toBeInTheDocument()
  })

  it('links to the correct montir detail page', () => {
    render(<MekanikCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/montir/mek-1')
  })

  it('renders all 3 specialization chips when given exactly 3', () => {
    render(<MekanikCard {...defaultProps} />)
    expect(screen.getByText('Rem')).toBeInTheDocument()
    expect(screen.getByText('Mesin')).toBeInTheDocument()
    expect(screen.getByText('Kelistrikan')).toBeInTheDocument()
  })

  it('renders only 3 chips when given 4+ specializations', () => {
    render(
      <MekanikCard
        {...defaultProps}
        spesialisasi={['Rem', 'Mesin', 'Kelistrikan', 'Transmisi']}
      />
    )
    expect(screen.getByText('Rem')).toBeInTheDocument()
    expect(screen.getByText('Mesin')).toBeInTheDocument()
    expect(screen.getByText('Kelistrikan')).toBeInTheDocument()
    expect(screen.queryByText('Transmisi')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/mekanik/MekanikCard.test.tsx
```

Expected: 7 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/mekanik/MekanikCard.test.tsx
git commit -m "test: add MekanikCard unit tests"
```

---

## Task 7: ThreadCard tests

**Files:**
- Create: `tests/unit/components/forum/ThreadCard.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThreadCard } from '@/components/forum/ThreadCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

const defaultProps = {
  id: 'thread-1',
  judul: 'Kenapa mesin motor sering mati?',
  kategori: 'Mesin',
  penulis: 'Andi',
  jumlahJawaban: 5,
  waktu: '2 jam lalu',
}

describe('ThreadCard', () => {
  it('renders thread title', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Kenapa mesin motor sering mati?')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Mesin')).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('Andi')).toBeInTheDocument()
  })

  it('renders answer count', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders relative time', () => {
    render(<ThreadCard {...defaultProps} />)
    expect(screen.getByText('2 jam lalu')).toBeInTheDocument()
  })

  it('links to the correct forum thread page', () => {
    render(<ThreadCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/forum/thread-1')
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/forum/ThreadCard.test.tsx
```

Expected: 6 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/forum/ThreadCard.test.tsx
git commit -m "test: add ThreadCard unit tests"
```

---

## Task 8: StarRating tests

**Files:**
- Create: `tests/unit/components/rating/StarRating.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarRating } from '@/components/rating/StarRating'

describe('StarRating', () => {
  it('renders 5 star buttons by default', () => {
    render(<StarRating value={0} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('renders custom number of stars via max prop', () => {
    render(<StarRating value={0} onChange={vi.fn()} max={3} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('calls onChange with correct value when 3rd star is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<StarRating value={0} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[2]) // index 2 = 3rd star
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange with correct value when 5th star is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<StarRating value={0} onChange={onChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[4]) // index 4 = 5th star
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('stars up to value have filled class, stars above do not', () => {
    render(<StarRating value={3} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    // Stars 1, 2, 3 should have filled star icon
    const star1 = buttons[0].querySelector('svg')
    const star4 = buttons[3].querySelector('svg')
    expect(star1).toHaveClass('fill-yellow-400')
    expect(star4).not.toHaveClass('fill-yellow-400')
  })

  it('hovering 4th star fills stars 1-4 temporarily', async () => {
    const user = userEvent.setup()
    render(<StarRating value={1} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')

    await user.hover(buttons[3]) // hover over 4th star
    // After hover, stars 1-4 should appear filled
    const star4 = buttons[3].querySelector('svg')
    expect(star4).toHaveClass('fill-yellow-400')
    // Star 5 should not be filled
    const star5 = buttons[4].querySelector('svg')
    expect(star5).not.toHaveClass('fill-yellow-400')
  })

  it('mouseLeave resets hover state so only value stars remain filled', async () => {
    const user = userEvent.setup()
    render(<StarRating value={1} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')

    await user.hover(buttons[3])
    await user.unhover(buttons[3])
    // After unhover, only star 1 (value=1) should be filled
    const star2 = buttons[1].querySelector('svg')
    expect(star2).not.toHaveClass('fill-yellow-400')
    const star1 = buttons[0].querySelector('svg')
    expect(star1).toHaveClass('fill-yellow-400')
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/rating/StarRating.test.tsx
```

Expected: 7 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/components/rating/StarRating.test.tsx
git commit -m "test: add StarRating unit tests"
```

---

## Task 9: cartStore tests

**Files:**
- Create: `tests/unit/stores/cartStore.test.ts`

- [ ] **Step 1: Write the tests**

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/stores/cartStore'

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('addItem adds a new item with qty 1', () => {
    useCartStore.getState().addItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ sparepartId: 'sp1', qty: 1 })
  })

  it('addItem increments qty instead of duplicating when item exists', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].qty).toBe(2)
  })

  it('addItem for two different items creates two entries', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(2)
  })

  it('removeItem removes the correct item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    useCartStore.getState().removeItem('sp1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].sparepartId).toBe('sp2')
  })

  it('setQty changes qty to specified value', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', 5)
    const { items } = useCartStore.getState()
    expect(items[0].qty).toBe(5)
  })

  it('setQty with 0 removes the item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', 0)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('setQty with negative value removes the item', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().setQty('sp1', -1)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('clear empties the cart', () => {
    useCartStore.getState().addItem('sp1')
    useCartStore.getState().addItem('sp2')
    useCartStore.getState().clear()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/stores/cartStore.test.ts
```

Expected: 8 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/stores/cartStore.test.ts
git commit -m "test: add cartStore unit tests"
```

---

## Task 10: BottomNavbar tests

**Files:**
- Create: `tests/unit/components/layout/BottomNavbar.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNavbar } from '@/components/layout/BottomNavbar'
import { useCartStore } from '@/stores/cartStore'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}))

const mockUsePathname = vi.mocked(usePathname)
const mockUseSession = vi.mocked(useSession)

describe('BottomNavbar', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    mockUseSession.mockReturnValue({ status: 'authenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
  })

  it('renders SOS button linking to /sos', () => {
    render(<BottomNavbar />)
    // SOS button has no text (icon only), find by href
    const links = screen.getAllByRole('link')
    const sosAnchor = links.find(l => l.getAttribute('href') === '/sos')
    expect(sosAnchor).toBeInTheDocument()
  })

  it('Home link has active class when pathname is /lobby', () => {
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('Keranjang link has active class when pathname is /keranjang', () => {
    mockUsePathname.mockReturnValue('/keranjang')
    render(<BottomNavbar />)
    const keranjangLink = screen.getByRole('link', { name: /keranjang/i })
    expect(keranjangLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('Home link does not have active class when pathname is /keranjang', () => {
    mockUsePathname.mockReturnValue('/keranjang')
    render(<BottomNavbar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).not.toHaveClass('bg-blue-50')
  })

  it('unauthenticated user: Keranjang link redirects to /login with callbackUrl', () => {
    mockUseSession.mockReturnValue({ status: 'unauthenticated' } as any)
    mockUsePathname.mockReturnValue('/lobby')
    render(<BottomNavbar />)
    const keranjangLink = screen.getByRole('link', { name: /keranjang/i })
    expect(keranjangLink).toHaveAttribute('href', '/login?callbackUrl=%2Fkeranjang')
  })

  it('cart badge is hidden when cart is empty', () => {
    render(<BottomNavbar />)
    // Badge span with item count should not exist
    const badges = document.querySelectorAll('.bg-red-500')
    expect(badges).toHaveLength(0)
  })

  it('cart badge shows item count when cart has items', () => {
    useCartStore.setState({ items: [{ sparepartId: 'sp1', qty: 3 }] })
    render(<BottomNavbar />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('cart badge shows total qty across multiple items', () => {
    useCartStore.setState({
      items: [
        { sparepartId: 'sp1', qty: 2 },
        { sparepartId: 'sp2', qty: 4 },
      ],
    })
    render(<BottomNavbar />)
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and verify all pass**

```bash
pnpm test tests/unit/components/layout/BottomNavbar.test.tsx
```

Expected: 8 tests pass.

- [ ] **Step 3: Run full suite**

```bash
pnpm test
```

Expected: all tests across all 9 test files pass.

- [ ] **Step 4: Commit**

```bash
git add tests/unit/components/layout/BottomNavbar.test.tsx
git commit -m "test: add BottomNavbar unit tests"
```

---

## Final: Verify complete suite

- [ ] **Run all tests**

```bash
pnpm test
```

Expected output example:
```
 ✓ tests/unit/lib/utils.test.ts (8)
 ✓ tests/unit/components/sparepart/KeaslianBadge.test.tsx (3)
 ✓ tests/unit/components/sparepart/StokBadge.test.tsx (5)
 ✓ tests/unit/components/sparepart/SparepartCard.test.tsx (7)
 ✓ tests/unit/components/mekanik/MekanikCard.test.tsx (7)
 ✓ tests/unit/components/forum/ThreadCard.test.tsx (6)
 ✓ tests/unit/components/rating/StarRating.test.tsx (7)
 ✓ tests/unit/stores/cartStore.test.ts (8)
 ✓ tests/unit/components/layout/BottomNavbar.test.tsx (8)

 Test Files  9 passed (9)
 Tests       59 passed (59)
```
