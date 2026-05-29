import { test, expect, type Page } from "@playwright/test"

test("Bottom navbar navigates between main pages", async ({ page }) => {
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
  await page.goto(`/lobby`)
  await page.waitForLoadState("networkidle")
  await page.locator('a[href="/sos"].rounded-full').click()
  await expect(page).toHaveURL(/\/sos/)
})

test.describe("guest", () => {
  test.use({ storageState: undefined })

  test("Guest bottom navbar redirects to login for protected routes", async ({ page }) => {
    await page.goto(`/lobby`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1000)
    const href = await page.locator('nav a').filter({ hasText: "Keranjang" }).getAttribute("href")
    expect(href).toContain("/login")
  })
})
