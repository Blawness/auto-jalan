# Playwright Comprehensive Testing Suite

## Scope

Achieve 99% confidence across all testing aspects for auto-jalan: multi-browser + mobile, full E2E coverage, CI pipeline, auth isolation, visual regression, and accessibility.

## Design

### 1. Multi-Browser + Mobile Viewports

**Projects** in `playwright.config.ts`:
- `chromium` — Desktop Chrome viewport (1280x720)
- `firefox` — Desktop Firefox
- `webkit` — Desktop Safari
- `Mobile Chrome` — Pixel 5 viewport
- `Mobile Safari` — iPhone 13 viewport

Only `chromium` and `Mobile Chrome` run on CI for speed; full matrix on demand.

### 2. E2E Coverage Lengkap

**Split** monolithic `full-app.spec.ts` into feature files under `tests/e2e/`:

| File | Tests |
|------|-------|
| `auth.spec.ts` | Register, login, logout, auth protection middleware |
| `onboarding.spec.ts` | 3 slides, navigate to register/login, guest skip |
| `lobby.spec.ts` | Sections, banner, about page |
| `sparepart.spec.ts` | Search, brand filter, detail, cart add |
| `montir.spec.ts` | Service list, profile, jasa selection, checkout flow |
| `bengkel.spec.ts` | Map render, search filter, profile |
| `sos.spec.ts` | Form, pilih-montir, mencari, tracking |
| `pemesanan.spec.ts` | Checkout, ongoing page |
| `forum.spec.ts` | List, create thread, auth guard |
| `ulasan.spec.ts` | Star ratings, chips, submit |
| `keranjang.spec.ts` | Empty state, items, qty controls |
| `riwayat.spec.ts` | Ongoing/Selesai tabs |
| `navbar.spec.ts` | Bottom nav, SOS FAB, guest redirects |

**New test coverage** (~40 tests):
- **Checkout full flow**: add montir jasa → checkout → createOrder → ongoing
- **Form validation**: register mismatch password, empty fields, duplicate email
- **Login errors**: wrong credentials, empty fields
- **Empty states**: sparepart no results, forum no threads, keranjang kosong
- **Edge cases**: stok=0, invalid IDs (404s), expired session redirect
- **Navigation guards**: unauthenticated redirects for all protected routes

### 3. CI Pipeline (GitHub Actions)

File: `.github/workflows/playwright.yml`

- Trigger: push/PR to master
- Matrix: 4 shards for parallel execution
- Steps: checkout, setup-node, pnpm install, playwright install, run tests, upload blob reports
- Merge job: combines blob reports into HTML report
- Artifacts: report retained 30 days

### 4. Auth Isolation

**Global setup** (`tests/auth.setup.ts`):
- Register unique user per worker
- Login, save `storageState` to `playwright/.auth/`

**Per-project storageState** via `dependencies: ['setup']`.

Worker-scoped fixture for unique user credentials (email + password).

Guest tests run without storageState.

### 5. Visual Regression

Key pages with `toHaveScreenshot()`:
- `/lobby` — full dashboard
- `/sparepart/sp1` — product detail
- `/montir/m1` — mechanic profile
- `/login` — login form

Snapshots stored in `tests/e2e/snapshots/`. Run on Chromium only.

### 6. Accessibility

`@axe-core/playwright` scans on critical pages:
- `/` — onboarding
- `/login` — login form
- `/register` — register form
- `/lobby` — dashboard
- `/sparepart/sp1` — product detail

Tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`. Attach JSON results for debugging.

## Files Changed/Created

| File | Action |
|------|--------|
| `playwright.config.ts` | Update projects, add globalSetup, screenshot config |
| `.github/workflows/playwright.yml` | Create |
| `tests/auth.setup.ts` | Create |
| `tests/e2e/*.spec.ts` (13 files) | Create from split |
| `tests/full-app.spec.ts` | Delete |
| `package.json` | Add `test:e2e` script |
