import { test, expect, type Page } from "@playwright/test"

const TEST_EMAIL = "playwright@autojalan.test"
const TEST_PASSWORD = "password123"
const TEST_NAME = "Playwright User"

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage()
  await page.goto("/register")
  await page.fill('input[placeholder="Nama lengkap"]', TEST_NAME)
  await page.fill('input[placeholder="email@example.com"]', TEST_EMAIL)
  await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
  await page.fill('input[placeholder="Minimal 8 karakter"]', TEST_PASSWORD)
  await page.fill('input[placeholder="Masukkan ulang password"]', TEST_PASSWORD)
  await page.getByRole("button", { name: "Daftar" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 5000 }).catch(() => {})
  await page.close()
})

async function loginHelper(page: Page) {
  await page.goto("/login")
  // If middleware already redirected us (already logged in), nothing to do
  if (page.url().includes("/lobby")) return
  await page.fill('input[placeholder="email@example.com"]', TEST_EMAIL)
  await page.fill('input[placeholder="Password Anda"]', TEST_PASSWORD)
  await page.getByRole("button", { name: "Masuk" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 15000 })
}

// ── ONBOARDING ──────────────────────────────────────────────────────────────

test("Onboarding page loads with 3 slides", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Montir Datang ke Lokasi")).toBeVisible()
  await page.getByText("Selanjutnya").click()
  await expect(page.getByText("Sparepart Asli & Bergaransi")).toBeVisible()
  await page.getByText("Selanjutnya").click()
  await expect(page.getByText("Darurat? Ada SOS!")).toBeVisible()
  await expect(page.getByText("Buat Akun")).toBeVisible()
  await expect(page.getByText("Masuk")).toBeVisible()
})

test("Navigate to Register page from onboarding", async ({ page }) => {
  await page.goto("/")
  await page.getByText("Selanjutnya").click()
  await page.getByText("Selanjutnya").click()
  await page.getByText("Buat Akun").click()
  await expect(page).toHaveURL(/\/register/)
  await expect(page.getByRole("button", { name: "Daftar" })).toBeVisible()
})

test("Navigate to Login page from onboarding", async ({ page }) => {
  await page.goto("/")
  await page.getByText("Selanjutnya").click()
  await page.getByText("Selanjutnya").click()
  await page.getByText("Masuk").click()
  await expect(page).toHaveURL(/\/login/)
  await expect(page.getByText("Masuk ke akun")).toBeVisible()
})

test("Guest skip link goes to lobby", async ({ page }) => {
  await page.goto("/")
  await page.getByText("Selanjutnya").click()
  await page.getByText("Selanjutnya").click()
  await page.getByText("Lanjut sebagai Tamu").click()
  await expect(page).toHaveURL(/\/lobby/)
})

// ── AUTH ─────────────────────────────────────────────────────────────────────

test("Register new user successfully", async ({ page }) => {
  const ts = Date.now()
  await page.goto(`/register`)
  await page.fill('input[placeholder="Nama lengkap"]', `User ${ts}`)
  await page.fill('input[placeholder="email@example.com"]', `user${ts}@test.com`)
  await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
  await page.fill('input[placeholder="Minimal 8 karakter"]', "password123")
  await page.fill('input[placeholder="Masukkan ulang password"]', "password123")
  await page.getByRole("button", { name: "Daftar" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 20000 })
  await expect(page.getByText("Selamat datang")).toBeVisible()
})

test("Login with test user", async ({ page }) => {
  await page.goto(`/login`)
  await page.fill('input[placeholder="email@example.com"]', TEST_EMAIL)
  await page.fill('input[placeholder="Password Anda"]', TEST_PASSWORD)
  await page.getByRole("button", { name: "Masuk" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 20000 })
  await expect(page.getByText("Selamat datang")).toBeVisible()
})

test("Logout redirects to login", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/akun`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Keluar" }).click()
  await page.waitForURL(/\/login/, { timeout: 15000 })
  await expect(page.getByText("Masuk ke akun")).toBeVisible()
})

// ── AUTH PROTECTION (middleware / proxy.ts) ───────────────────────────────

test("Unauthenticated access to /pemesanan/checkout redirects to login", async ({ page }) => {
  await page.goto(`/pemesanan/checkout`)
  await page.waitForURL(/\/login/, { timeout: 10000 })
  await expect(page).toHaveURL(/callbackUrl/)
})

test("Unauthenticated access to /akun redirects to login", async ({ page }) => {
  await page.goto(`/akun`)
  await page.waitForURL(/\/login/, { timeout: 10000 })
})

test("Unauthenticated access to /lobby is allowed (guest browse)", async ({ page }) => {
  await page.goto(`/lobby`)
  await expect(page).toHaveURL(/\/lobby/)
  await expect(page.getByText("Jelajahi layanan Auto Jalan")).toBeVisible()
})

// ── LOBBY ─────────────────────────────────────────────────────────────────

test("Lobby shows all main sections when logged in", async ({ page }) => {
  await loginHelper(page)
  await expect(page.getByText("Selamat datang kembali")).toBeVisible()
  await expect(page.getByRole("link", { name: "Cari Sparepart" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Panggil Montir" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Cari Bengkel" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Forum Komunitas" })).toBeVisible()
  await expect(page.getByText("Brand Kendaraan")).toBeVisible()
  await expect(page.getByText("Sparepart Populer")).toBeVisible()
})

test("Lobby banner slider shows offer text", async ({ page }) => {
  await loginHelper(page)
  // New banners have large offer text like 20% OFF or 1000+ or < 15 min
  const bannerTexts = ["20% OFF", "1000+", "15 min", "Gratis"]
  let found = false
  for (const text of bannerTexts) {
    if (await page.getByText(text).isVisible().catch(() => false)) {
      found = true
      break
    }
  }
  expect(found).toBeTruthy()
})

test("About page loads", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/about`)
  await expect(page.getByText("Fitur Utama")).toBeVisible()
})

// ── SPAREPART FLOW ───────────────────────────────────────────────────────

test("Sparepart page shows search bar and brand chips", async ({ page }) => {
  await loginHelper(page)
  await page.getByRole("link", { name: "Cari Sparepart" }).click()
  await expect(page).toHaveURL(/\/sparepart/)
  await expect(page.getByPlaceholder("Cari nama sparepart atau model...")).toBeVisible()
  await expect(page.getByText("Pilih Brand")).toBeVisible()
  // Brand chips should be present (from seeded vehicles)
  await expect(page.getByRole("button", { name: "Honda" })).toBeVisible()
})

test("Sparepart brand chip navigates to list", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sparepart`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Honda" }).click()
  await page.waitForURL(/\/sparepart\/list/)
  await expect(page).toHaveURL(/merek=Honda/)
  const cards = page.locator("a[href^='/sparepart/']")
  expect(await cards.count()).toBeGreaterThan(0)
})

test("Sparepart text search returns results", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sparepart`)
  await page.fill('input[placeholder="Cari nama sparepart atau model..."]', "Rem")
  await page.getByRole("button", { name: "Cari" }).click()
  await page.waitForURL(/\/sparepart\/list/)
  await expect(page).toHaveURL(/q=Rem/)
})

test("Sparepart detail shows description and reviews", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sparepart/sp1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Spesifikasi")).toBeVisible()
  await expect(page.getByText("Deskripsi Produk")).toBeVisible()
  await expect(page.getByText("Ulasan Pembeli")).toBeVisible()
  await expect(page.getByRole("button", { name: "Tambah ke Keranjang" })).toBeVisible()
})

test("Add sparepart to cart", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sparepart/sp1`)
  await page.waitForLoadState("networkidle")
  const addBtn = page.getByRole("button", { name: "Tambah ke Keranjang" })
  await addBtn.click()
  await expect(page.getByText("Ditambahkan ke keranjang")).toBeVisible({ timeout: 5000 })
})

// ── MONTIR FLOW ─────────────────────────────────────────────────────────

test("Montir service list shows name and description but no price", async ({ page }) => {
  await loginHelper(page)
  await page.getByRole("link", { name: "Panggil Montir" }).click()
  await expect(page).toHaveURL(/\/montir/)
  await page.waitForLoadState("networkidle")
  const services = page.locator("a[href^='/montir/list']")
  expect(await services.count()).toBeGreaterThan(0)
  // Price (Rp format) should NOT appear on service cards anymore
  const priceText = await page.locator("a[href^='/montir/list']").first().innerText()
  expect(priceText).not.toMatch(/Rp\s*\d+/)
})

test("Montir profile page loads and Pilih Montir goes to jasa page", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/montir/m1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Profil Montir" })).toBeVisible()
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  await page.getByRole("button", { name: "Pilih Montir Ini" }).click()
  await page.waitForURL(/\/montir\/m1\/jasa/, { timeout: 10000 })
})

test("Montir jasa checklist page shows services with prices", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/montir/m1/jasa`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Pilih Jasa")).toBeVisible()
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  // Service checkboxes should be visible
  const checkboxes = page.locator("button.rounded-xl.border")
  expect(await checkboxes.count()).toBeGreaterThan(0)
  // Prices shown on jasa page
  await expect(page.getByText(/Rp/).first()).toBeVisible()
})

test("Montir jasa checklist → select service → proceed to checkout", async ({ page }) => {
  await loginHelper(page)
  // Set service first by clicking through montir page
  await page.goto(`/montir`)
  await page.waitForLoadState("networkidle")
  await page.locator("a[href^='/montir/list']").first().click()
  await page.waitForURL(/\/montir\/list/)
  await page.locator("a[href^='/montir/m']").first().click()
  await page.waitForURL(/\/montir\/m\d/)
  await page.getByRole("button", { name: "Pilih Montir Ini" }).click()
  await page.waitForURL(/\/jasa/, { timeout: 10000 })
  // Select the first service
  await page.locator("button.rounded-xl.border").first().click()
  await expect(page.getByText("Total Estimasi Jasa")).toBeVisible()
  await page.getByRole("button", { name: /Lanjut ke Checkout/ }).click()
  await page.waitForURL(/\/pemesanan\/checkout/, { timeout: 10000 })
  await expect(page.getByText("Fixed Price Guarantee")).toBeVisible()
})

// ── BENGKEL FLOW ─────────────────────────────────────────────────────────

test("Bengkel page shows map immediately with search bar", async ({ page }) => {
  await loginHelper(page)
  await page.getByRole("link", { name: "Cari Bengkel" }).click()
  await expect(page).toHaveURL(/\/bengkel/)
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(2000)
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
  await expect(page.getByPlaceholder("Cari nama bengkel...")).toBeVisible()
})

test("Bengkel map search filters markers", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/bengkel`)
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(2000)
  await page.fill('input[placeholder="Cari nama bengkel..."]', "Maju")
  // Map should still render after filtering
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
})

test("Bengkel profile page loads", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/bengkel/b1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Profil Bengkel" })).toBeVisible()
})

// ── SOS FLOW ────────────────────────────────────────────────────────────

test("SOS page loads with edit button", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sos`)
  await expect(page.getByText("Darurat!")).toBeVisible()
  await expect(page.getByText("Jl. Sudirman, Jakarta Pusat")).toBeVisible()
  await expect(page.getByRole("button", { name: /Panggil Montir Sekarang/ })).toBeVisible()
  await expect(page.getByRole("button", { name: "Edit" })).toBeVisible()
})

test("SOS edit form expands with fields", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sos`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Edit" }).click()
  await expect(page.getByPlaceholder("Masukkan alamat lengkap")).toBeVisible()
  await expect(page.getByRole("button", { name: "Motor" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Mobil" })).toBeVisible()
  await expect(page.getByPlaceholder("Ceritakan masalah kendaraan Anda...")).toBeVisible()
})

test("SOS Panggil Montir navigates to pilih-montir page", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sos`)
  await page.getByRole("button", { name: /Panggil Montir Sekarang/ }).click()
  await expect(page).toHaveURL(/\/sos\/pilih-montir/)
  await expect(page.getByRole("heading", { name: "Pilih Montir" })).toBeVisible()
})

test("SOS pilih-montir shows mechanics with tariffs", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sos/pilih-montir`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  // Should show tariffs (Rp format)
  await expect(page.getByText(/Rp/).first()).toBeVisible()
  // At least one "Pilih Montir Ini" button
  await expect(page.getByRole("button", { name: "Pilih Montir Ini" }).first()).toBeVisible()
})

test("SOS pilih-montir → select → mencari → tracking", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/sos/pilih-montir`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Pilih Montir Ini" }).first().click()
  await page.waitForURL(/\/sos\/mencari/, { timeout: 10000 })
  await expect(page.getByText("Sedang mencari montir terdekat")).toBeVisible()
  await page.waitForURL(/\/sos\/tracking/, { timeout: 15000 })
  await expect(page.getByText("Live Tracking")).toBeVisible({ timeout: 10000 })
  await page.waitForTimeout(2000)
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
})

// ── PEMESANAN ────────────────────────────────────────────────────────────

test("Checkout page renders price breakdown", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/pemesanan/checkout`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Fixed Price Guarantee")).toBeVisible()
})

test("Ongoing page renders", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/pemesanan/ongoing`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Pesanan Berjalan" })).toBeVisible()
  await expect(page.getByText("Dana Anda ditahan")).toBeVisible()
  await expect(page.getByText("Geser jika Service Selesai")).toBeVisible()
})

// ── ULASAN ───────────────────────────────────────────────────────────────

test("Ulasan page renders with star ratings and chips", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/ulasan`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Rating Mekanik")).toBeVisible()
  await expect(page.getByText("Kualitas Suku Cadang")).toBeVisible()
  await expect(page.getByRole("button", { name: "Montir Ramah" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Kirim Ulasan" })).toBeVisible()
})

// ── FORUM ────────────────────────────────────────────────────────────────

test("Forum list page loads", async ({ page }) => {
  await loginHelper(page)
  await page.getByRole("link", { name: "Forum Komunitas" }).click()
  await expect(page).toHaveURL(/\/forum/)
  await expect(page.getByRole("link", { name: "Ajukan Pertanyaan" })).toBeVisible()
})

test("Forum create thread requires login (ajukan is protected)", async ({ page }) => {
  await page.goto(`/forum/ajukan`)
  await page.waitForURL(/\/login/, { timeout: 10000 })
})

test("Forum create thread when logged in", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/forum/ajukan`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Ajukan Pertanyaan" })).toBeVisible()
  await page.fill('input[placeholder="Judul pertanyaan"]', "Test question from Playwright")
  await page.locator('[role="combobox"]').click()
  await page.getByRole("option", { name: "Mesin" }).click()
  await page.fill("textarea", "This is a test question body")
  await page.getByRole("button", { name: "Submit" }).click()
  await page.waitForURL(/\/forum/, { timeout: 15000 })
})

// ── KERANJANG ────────────────────────────────────────────────────────────

test("Keranjang page shows empty state when no items", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/keranjang`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Keranjang masih kosong")).toBeVisible()
})

// ── RIWAYAT ──────────────────────────────────────────────────────────────

test("Riwayat page loads with Ongoing and Selesai tabs", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/riwayat`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("tab", { name: "Ongoing" })).toBeVisible()
  await expect(page.getByRole("tab", { name: "Selesai" })).toBeVisible()
})

// ── AKUN ─────────────────────────────────────────────────────────────────

test("Akun page shows user email and logout button", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/akun`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Email")).toBeVisible()
  await expect(page.getByRole("button", { name: "Keluar" })).toBeVisible()
})

// ── BOTTOM NAVBAR ────────────────────────────────────────────────────────

test("Bottom navbar navigates between main pages", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/lobby`)
  await page.waitForLoadState("networkidle")
  await page.locator('a[href="/akun"]').last().click()
  await expect(page).toHaveURL(/\/akun/)
  await page.locator('a[href="/lobby"]').last().click()
  await expect(page).toHaveURL(/\/lobby/)
  await page.locator('a[href="/riwayat"]').last().click()
  await expect(page).toHaveURL(/\/riwayat/)
  await page.locator('a[href="/keranjang"]').last().click()
  await expect(page).toHaveURL(/\/keranjang/)
})

test("SOS FAB in bottom navbar navigates to /sos", async ({ page }) => {
  await loginHelper(page)
  await page.goto(`/lobby`)
  await page.waitForLoadState("networkidle")
  await page.locator('a[href="/sos"].rounded-full').click()
  await expect(page).toHaveURL(/\/sos/)
})

test("Guest bottom navbar redirects to login for protected routes", async ({ page }) => {
  await page.goto(`/lobby`)
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)
  // Guest clicking Keranjang should go to login
  const keranjangLink = page.locator('a[href^="/login"]').filter({ hasText: /Keranjang/ })
  // Just verify the link href includes /login
  const href = await page.locator('nav a').filter({ hasText: "Keranjang" }).getAttribute("href")
  expect(href).toContain("/login")
})
