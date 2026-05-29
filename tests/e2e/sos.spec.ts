import { test, expect, type Page } from "@playwright/test"

test("SOS page loads with edit button", async ({ page }) => {
  await page.goto(`/sos`)
  await expect(page.getByText("Darurat!")).toBeVisible()
  await expect(page.getByText("Jl. Sudirman, Jakarta Pusat")).toBeVisible()
  await expect(page.getByRole("button", { name: /Panggil Montir Sekarang/ })).toBeVisible()
  await expect(page.getByRole("button", { name: "Edit" })).toBeVisible()
})

test("SOS edit form expands with fields", async ({ page }) => {
  await page.goto(`/sos`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Edit" }).click()
  await expect(page.getByPlaceholder("Masukkan alamat lengkap")).toBeVisible()
  await expect(page.getByRole("button", { name: "Motor" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Mobil" })).toBeVisible()
  await expect(page.getByPlaceholder("Ceritakan masalah kendaraan Anda...")).toBeVisible()
})

test("SOS Panggil Montir navigates to pilih-montir page", async ({ page }) => {
  await page.goto(`/sos`)
  await page.getByRole("button", { name: /Panggil Montir Sekarang/ }).click()
  await expect(page).toHaveURL(/\/sos\/pilih-montir/)
  await expect(page.getByRole("heading", { name: "Pilih Montir" })).toBeVisible()
})

test("SOS pilih-montir shows mechanics with tariffs", async ({ page }) => {
  await page.goto(`/sos/pilih-montir`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  await expect(page.getByText(/Rp/).first()).toBeVisible()
  await expect(page.getByRole("button", { name: "Pilih Montir Ini" }).first()).toBeVisible()
})

test("SOS pilih-montir → select → mencari → tracking", async ({ page }) => {
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
