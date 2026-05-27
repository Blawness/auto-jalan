import { test, expect } from "@playwright/test"

const BASE = "http://localhost:3000"

// Pre-create a test user — register once and reuse
let testCredentials = { email: "", password: "password123", name: "" }

// ---- ONBOARDING (no auth needed) ----

test("Onboarding page loads with 3 slides", async ({ page }) => {
    await page.goto(BASE)
    await expect(page.getByText("Montir Datang ke Lokasi")).toBeVisible()
    await page.getByText("Selanjutnya").click()
    await expect(page.getByText("Sparepart Asli & Bergaransi")).toBeVisible()
    await page.getByText("Selanjutnya").click()
    await expect(page.getByText("Darurat? Ada SOS!")).toBeVisible()
    await expect(page.getByText("Buat Akun")).toBeVisible()
    await expect(page.getByText("Masuk")).toBeVisible()
  })

  test("Navigate to Register page", async ({ page }) => {
    await page.goto(BASE)
    await page.getByText("Selanjutnya").click()
    await page.getByText("Selanjutnya").click()
    await page.getByText("Buat Akun").click()
    await expect(page).toHaveURL(/\/register/)
    await expect(page.getByRole("button", { name: "Daftar" })).toBeVisible()
  })

  test("Navigate to Login page", async ({ page }) => {
    await page.goto(BASE)
    await page.getByText("Selanjutnya").click()
    await page.getByText("Selanjutnya").click()
    await page.getByText("Masuk").click()
    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByText("Masuk ke akun")).toBeVisible()
  })

  test("Register new user successfully", async ({ page }) => {
    const ts = Date.now()
    await page.goto(`${BASE}/register`)
    await page.fill('input[placeholder="Nama lengkap"]', `User ${ts}`)
    await page.fill('input[placeholder="email@example.com"]', `user${ts}@test.com`)
    await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
    await page.fill('input[placeholder="Minimal 8 karakter"]', "password123")
    await page.fill('input[placeholder="Masukkan ulang password"]', "password123")
    await page.getByRole("button", { name: "Daftar" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 15000 })
    await expect(page.getByText("Selamat datang")).toBeVisible()
  })

  test("Login with registered user", async ({ page }) => {
    await page.goto(`${BASE}/login`)
    await page.fill('input[placeholder="email@example.com"]', testCredentials.email)
    await page.fill('input[placeholder="Password Anda"]', testCredentials.password)
    await page.getByRole("button", { name: "Masuk" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 15000 })
    await expect(page.getByText("LAYANAN")).toBeVisible()
  })

  // ---- LOBBY + ABOUT ----

  test("Lobby menu grid visible", async ({ page }) => {
    await loginHelper(page)
    await expect(page.getByRole("link", { name: "Cari Sparepart" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Panggil Montir" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Cari Bengkel" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Forum Komunitas" })).toBeVisible()
    await expect(page.getByText("Brand Kendaraan")).toBeVisible()
    await expect(page.getByText("Sparepart Populer")).toBeVisible()
  })

  test("About page loads", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/about`)
    await expect(page.getByText("Fitur Utama")).toBeVisible()
    await expect(page.getByText("Vorca Studio")).toBeVisible()
  })

  // ---- SPAREPART FLOW ----

  test("Sparepart filter → list → detail", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "Cari Sparepart" }).click()
    await expect(page).toHaveURL(/\/sparepart/)
    await expect(page.getByRole("heading", { name: "Cari Sparepart" })).toBeVisible()

    await page.getByRole("button", { name: "Motor" }).click()
    await page.waitForTimeout(500)
    await page.locator('[role="combobox"]').first().click()
    await page.getByRole("option", { name: "Honda" }).click()

    await page.waitForTimeout(500)
    const combos = page.locator('[role="combobox"]')
    if ((await combos.count()) > 1) {
      await combos.last().click()
      await page.getByRole("option").first().click()
    }

    await page.getByRole("button", { name: "Cari Sparepart" }).click()
    await page.waitForURL(/\/sparepart\/list/)

    const cards = page.locator("a[href^='/sparepart/']")
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    if (count > 0) {
      await cards.first().click()
      await page.waitForURL(/\/sparepart\/sp\d+/)
      await expect(page.getByText("Spesifikasi")).toBeVisible()
      await expect(page.getByRole("button", { name: "Tambah ke Keranjang" })).toBeVisible()
    }
  })

  test("Add sparepart to cart", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/sparepart/sp1`)
    await page.waitForLoadState("networkidle")

    const addBtn = page.getByRole("button", { name: "Tambah ke Keranjang" })
    if (await addBtn.isVisible()) {
      await addBtn.click()
      await expect(page.getByText("Ditambahkan ke keranjang")).toBeVisible({ timeout: 5000 })
    }
  })

  // ---- MONTIR FLOW ----

  test("Montir service list loads", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "Panggil Montir" }).click()
    await expect(page).toHaveURL(/\/montir/)
    await page.waitForLoadState("networkidle")
    const services = page.locator("a[href^='/montir/list']")
    expect(await services.count()).toBeGreaterThan(0)
  })

  test("Montir profile page loads", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/montir/m1`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("heading", { name: "Profil Montir" })).toBeVisible()
    await expect(page.getByText("Budi Santoso")).toBeVisible()
    await expect(page.getByRole("button", { name: "Pilih Montir Ini" })).toBeVisible()
  })

  // ---- BENGKEL FLOW ----

  test("Bengkel filter page loads", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "Cari Bengkel" }).click()
    await expect(page).toHaveURL(/\/bengkel/)
    await expect(page.getByRole("button", { name: "Lihat Peta" })).toBeVisible()
  })

  test("Bengkel map shows markers", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/bengkel/map`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(3000)
    await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
  })

  test("Bengkel profile page loads", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/bengkel/b1`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("heading", { name: "Profil Bengkel" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Bengkel Maju Jaya Motor" })).toBeVisible()
  })

  // ---- SOS FLOW ----

  test("SOS detail page loads", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "SOS" }).click()
    await expect(page).toHaveURL(/\/sos/)
    await expect(page.getByText("Darurat!")).toBeVisible()
    await expect(page.getByRole("button", { name: "Panggil Montir Sekarang" })).toBeVisible()
  })

  test("SOS mencari page with animation", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/sos/mencari`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Sedang mencari montir terdekat")).toBeVisible()
    await page.waitForURL(/\/sos\/tracking/, { timeout: 15000 })
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Live Tracking")).toBeVisible({ timeout: 10000 })
  })

  test("SOS tracking page shows map and floating card", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/sos/tracking`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(3000)
    await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole("button", { name: "Chat" })).toBeVisible()
  })

  // ---- PEMESANAN FLOW ----

  test("Checkout page renders", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/montir/m1`)
    await page.waitForLoadState("networkidle")
    await page.getByRole("button", { name: "Pilih Montir Ini" }).click()
    await page.waitForURL(/\/pemesanan\/checkout/)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Rincian Biaya")).toBeVisible()
    await expect(page.getByText("Fixed Price Guarantee")).toBeVisible()
  })

  test("Ongoing page renders", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/pemesanan/ongoing`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("heading", { name: "Pesanan Berjalan" })).toBeVisible()
    await expect(page.getByText("Dana Anda ditahan")).toBeVisible()
    await expect(page.getByText("Budi Santoso")).toBeVisible()
    await expect(page.getByText("Geser jika Service Selesai")).toBeVisible()
  })

  // ---- ULASAN ----

  test("Ulasan page renders with star ratings", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/ulasan`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Rating Mekanik")).toBeVisible()
    await expect(page.getByText("Kualitas Suku Cadang")).toBeVisible()
    await expect(page.getByRole("button", { name: "Montir Ramah" })).toBeVisible()
  })

  // ---- FORUM ----

  test("Forum list page loads", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "Forum" }).click()
    await expect(page).toHaveURL(/\/forum/)
    await expect(page.getByRole("link", { name: "Ajukan Pertanyaan" })).toBeVisible()
  })

  test("Forum create thread", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/forum/ajukan`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("heading", { name: "Ajukan Pertanyaan" })).toBeVisible()
    await page.fill('input[placeholder="Judul pertanyaan"]', "Test question from Playwright")
    await page.locator('[role="combobox"]').click()
    await page.getByRole("option", { name: "Mesin" }).click()
    await page.fill("textarea", "This is a test question description")
    await page.getByRole("button", { name: "Submit" }).click()
    await page.waitForURL(/\/forum/, { timeout: 15000 })
  })

  // ---- KERANJANG ----

  test("Keranjang page shows empty state", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/keranjang`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Keranjang masih kosong")).toBeVisible()
  })

  // ---- RIWAYAT ----

  test("Riwayat page loads with tabs", async ({ page }) => {
    await loginHelper(page)
    await page.getByRole("link", { name: "Riwayat" }).click()
    await page.waitForURL(/\/riwayat/)
    await page.waitForLoadState("networkidle")
    await expect(page.getByRole("tab", { name: "Ongoing" })).toBeVisible()
    await expect(page.getByRole("tab", { name: "Selesai" })).toBeVisible()
  })

  // ---- AKUN ----

  test("Akun page shows user info", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/akun`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Email")).toBeVisible()
    await expect(page.getByRole("button", { name: "Keluar" })).toBeVisible()
  })

  // ---- BOTTOM NAVBAR ----

  test("Bottom navbar navigation works", async ({ page }) => {
    await loginHelper(page)
    // use navbar links directly
    await page.goto(`${BASE}/lobby`)
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

  // ---- SOS FAB ----

  test("SOS via bottom navbar works", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/lobby`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)
    const sosBtn = page.locator('a[href="/sos"].rounded-full')
    await sosBtn.click()
    await expect(page).toHaveURL(/\/sos/)
  })

  // ---- LOGOUT ----

  test("Logout redirects to login", async ({ page }) => {
    await loginHelper(page)
    await page.goto(`${BASE}/akun`)
    await page.waitForLoadState("networkidle")
    await page.getByRole("button", { name: "Keluar" }).click()
    await page.waitForURL(/\/login/, { timeout: 15000 })
    await expect(page.getByText("Masuk ke akun")).toBeVisible()
  })

async function loginHelper(page: any) {
  await page.goto(`${BASE}/login`)
  await page.fill('input[placeholder="email@example.com"]', testCredentials.email)
  await page.fill('input[placeholder="Password Anda"]', testCredentials.password)
  await page.getByRole("button", { name: "Masuk" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 15000 })
}
