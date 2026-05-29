import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Lobby shows all main sections when logged in", async ({ page }) => {
  await page.goto(`/lobby`)
  await expect(page.getByText("Selamat datang kembali")).toBeVisible()
  await expect(page.getByRole("link", { name: "Cari Sparepart" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Panggil Montir" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Cari Bengkel" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Forum Komunitas" })).toBeVisible()
  await expect(page.getByText("Brand Kendaraan")).toBeVisible()
  await expect(page.getByText("Sparepart Populer")).toBeVisible()
})

test("Lobby banner slider shows offer text", async ({ page }) => {
  await page.goto(`/lobby`)
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
  await page.goto(`/about`)
  await expect(page.getByText("Fitur Utama")).toBeVisible()
})
