import { test, expect, type Page } from "@playwright/test"

test.use({ storageState: undefined })

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
