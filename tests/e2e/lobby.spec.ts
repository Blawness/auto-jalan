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

test("Lobby banner slider is visible", async ({ page }) => {
  await page.goto(`/lobby`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("link").filter({ hasText: /Sekarang/ }).first()).toBeVisible({ timeout: 5000 })
})

test("About page loads", async ({ page }) => {
  await page.goto(`/about`)
  await expect(page.getByText("Fitur Utama")).toBeVisible()
})
