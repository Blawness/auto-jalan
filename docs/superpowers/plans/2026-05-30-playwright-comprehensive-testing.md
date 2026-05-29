# Playwright Comprehensive Testing Suite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Achieve 99% confidence with multi-browser + mobile E2E, full coverage, CI, auth isolation, visual regression, accessibility.

**Architecture:** Monolithic `full-app.spec.ts` → 13 feature files in `tests/e2e/`. Global auth setup with `storageState`. GitHub Actions with sharding. Axe + screenshot assertions on key pages.

**Tech Stack:** Playwright, @axe-core/playwright, GitHub Actions

---

### Task 1: Update Playwright Config (A + D)

**Files:**
- Modify: `playwright.config.ts`

- [ ] **Step 1: Rewrite config with projects, globalSetup, mobile viewports, visual regression config**

```ts
import { defineConfig, devices } from "@playwright/test"
import path from "path"

const authFile = path.join(__dirname, "playwright/.auth/user.json")

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? "blob"
    : [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
        storageState: authFile,
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: authFile,
      },
      dependencies: ["setup"],
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        storageState: authFile,
      },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "npx next dev -p 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 2: Create `playwright/.auth/` directory**

```bash
mkdir -p playwright/.auth
```

- [ ] **Step 3: Commit**

```bash
git add playwright.config.ts playwright/.auth/
git commit -m "test: add multi-browser projects, mobile viewport, global setup project"
```

---

### Task 2: Auth Global Setup (D)

**Files:**
- Create: `tests/auth.setup.ts`

- [ ] **Step 1: Create auth setup file**

```ts
import { test as setup, expect } from "@playwright/test"
import path from "path"

const authFile = path.join(__dirname, "../playwright/.auth/user.json")

setup("authenticate", async ({ page }) => {
  const email = `pw-${Date.now()}@autojalan.test`
  const password = "password123"

  // Register
  await page.goto("/register")
  await page.fill('input[placeholder="Nama lengkap"]', "Playwright E2E")
  await page.fill('input[placeholder="email@example.com"]', email)
  await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
  await page.fill('input[placeholder="Minimal 8 karakter"]', password)
  await page.fill('input[placeholder="Masukkan ulang password"]', password)
  await page.getByRole("button", { name: "Daftar" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 15000 }).catch(() => {})

  // If already on login (existing user), login instead
  if (page.url().includes("/login")) {
    await page.fill('input[placeholder="email@example.com"]', email)
    await page.fill('input[placeholder="Password Anda"]', password)
    await page.getByRole("button", { name: "Masuk" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 15000 })
  }

  await page.context().storageState({ path: authFile })
})
```

- [ ] **Step 2: Commit**

```bash
git add tests/auth.setup.ts
git commit -m "test: add auth global setup with storageState"
```

---

### Task 3: Split full-app.spec.ts into Feature Files (B)

**Files:**
- Create: `tests/e2e/auth.spec.ts`
- Create: `tests/e2e/onboarding.spec.ts`
- Create: `tests/e2e/lobby.spec.ts`
- Create: `tests/e2e/sparepart.spec.ts`
- Create: `tests/e2e/montir.spec.ts`
- Create: `tests/e2e/bengkel.spec.ts`
- Create: `tests/e2e/sos.spec.ts`
- Create: `tests/e2e/pemesanan.spec.ts`
- Create: `tests/e2e/forum.spec.ts`
- Create: `tests/e2e/ulasan.spec.ts`
- Create: `tests/e2e/keranjang.spec.ts`
- Create: `tests/e2e/riwayat.spec.ts`
- Create: `tests/e2e/navbar.spec.ts`
- Delete: `tests/full-app.spec.ts`

Each file gets the relevant tests from the existing spec, adjusted for auth isolation (using `storageState` instead of `loginHelper`). Guest tests use `test.use({ storageState: undefined })`.

- [ ] **Step 1: Create `tests/e2e/` directory**

- [ ] **Step 2-14: Create each file** (content extracted from existing spec, organized by feature)

- [ ] **Step 15: Delete `tests/full-app.spec.ts`**

- [ ] **Step 16: Run tests**

```bash
npx playwright test --project=chromium
Expected: all existing tests pass
```

- [ ] **Step 17: Commit**

---

### Task 4: New E2E Coverage — Checkout Flow (B)

**Files:**
- Modify: `tests/e2e/pemesanan.spec.ts`

Tests to add:
- Select montir jasa → navigate to checkout
- Verify price breakdown is visible
- Scroll to bottom → submit order
- Verify redirect to ongoing page

- [ ] **Step 1: Write tests and commit**

---

### Task 5: New E2E Coverage — Validation & Edge Cases (B)

**Files:**
- Modify: `tests/e2e/auth.spec.ts`
- Modify: `tests/e2e/forum.spec.ts`
- Modify: `tests/e2e/keranjang.spec.ts`

Tests to add:
- Register: password mismatch shows error
- Login: wrong credentials shows error toast
- Forum: empty title shows validation
- Keranjang: add item then adjust qty
- Sparepart: search no results
- Auth: access protected route without auth → redirect

- [ ] **Step 1: Write tests and commit**

---

### Task 6: GitHub Actions CI (C)

**Files:**
- Create: `.github/workflows/playwright.yml`

- [ ] **Step 1: Create CI workflow**

```yaml
name: Playwright Tests
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
          cache: "pnpm"
      - run: pnpm install
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test --project=chromium --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1
  merge-reports:
    if: ${{ !cancelled() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v5
        with:
          node-version: lts/*
          cache: "pnpm"
      - run: pnpm install
      - uses: actions/download-artifact@v5
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 30
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/playwright.yml
git commit -m "ci: add Playwright test workflow with sharding"
```

---

### Task 7: Visual Regression Tests (E)

**Files:**
- Create: `tests/e2e/visual-regression.spec.ts`

- [ ] **Step 1: Write visual regression tests**

```ts
import { test, expect } from "@playwright/test"

test.describe("Visual regression", () => {
  test("lobby page", async ({ page }) => {
    await page.goto("/lobby")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("lobby.png", {
      mask: [page.locator("[data-loading]")],
    })
  })

  test("sparepart detail", async ({ page }) => {
    await page.goto("/sparepart/sp1")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("sparepart-detail.png")
  })

  test("login form", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveScreenshot("login-form.png")
  })
})
```

- [ ] **Step 2: Run tests to generate snapshots**

```bash
npx playwright test tests/e2e/visual-regression.spec.ts --project=chromium --update-snapshots
```

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/visual-regression.spec.ts
git commit -m "test: add visual regression tests"
```

---

### Task 8: Accessibility Tests (F)

**Files:**
- Create: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: Install @axe-core/playwright**

```bash
pnpm add -D @axe-core/playwright
```

- [ ] **Step 2: Write accessibility tests**

```ts
import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test.describe("Accessibility", () => {
  test("onboarding page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test("login page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test("lobby page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/lobby")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })
})
```

- [ ] **Step 3: Run tests**

```bash
npx playwright test tests/e2e/accessibility.spec.ts --project=chromium
```

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/accessibility.spec.ts package.json pnpm-lock.yaml
git commit -m "test: add accessibility tests with @axe-core/playwright"
```

---

### Task 9: Final Verification (A+B+C+D+E+F)

- [ ] **Step 1: Run full test suite across all projects**

```bash
npx playwright test
```

Expected: all tests pass across chromium, firefox, Mobile Chrome.

- [ ] **Step 2: Commit any remaining changes**

```bash
git add -A
git commit -m "test: finalize comprehensive testing suite"
```
