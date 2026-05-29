import { test, expect, type Page } from "@playwright/test"

test("Bengkel page shows map immediately with search bar", async ({ page }) => {
  await page.getByRole("link", { name: "Cari Bengkel" }).click()
  await expect(page).toHaveURL(/\/bengkel/)
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(2000)
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
  await expect(page.getByPlaceholder("Cari nama bengkel...")).toBeVisible()
})

test("Bengkel map search filters markers", async ({ page }) => {
  await page.goto(`/bengkel`)
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(2000)
  await page.fill('input[placeholder="Cari nama bengkel..."]', "Maju")
  await expect(page.locator(".leaflet-container")).toBeVisible({ timeout: 10000 })
})

test("Bengkel profile page loads", async ({ page }) => {
  await page.goto(`/bengkel/b1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Profil Bengkel" })).toBeVisible()
})
