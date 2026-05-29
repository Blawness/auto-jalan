import { test, expect, type Page } from "@playwright/test"

test("Montir service list shows name and description but no price", async ({ page }) => {
  await page.getByRole("link", { name: "Panggil Montir" }).click()
  await expect(page).toHaveURL(/\/montir/)
  await page.waitForLoadState("networkidle")
  const services = page.locator("a[href^='/montir/list']")
  expect(await services.count()).toBeGreaterThan(0)
  const priceText = await page.locator("a[href^='/montir/list']").first().innerText()
  expect(priceText).not.toMatch(/Rp\s*\d+/)
})

test("Montir profile page loads and Pilih Montir goes to jasa page", async ({ page }) => {
  await page.goto(`/montir/m1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Profil Montir" })).toBeVisible()
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  await page.getByRole("button", { name: "Pilih Montir Ini" }).click()
  await page.waitForURL(/\/montir\/m1\/jasa/, { timeout: 10000 })
})

test("Montir jasa checklist page shows services with prices", async ({ page }) => {
  await page.goto(`/montir/m1/jasa`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Pilih Jasa")).toBeVisible()
  await expect(page.getByText("Budi Santoso")).toBeVisible()
  const checkboxes = page.locator("button.rounded-xl.border")
  expect(await checkboxes.count()).toBeGreaterThan(0)
  await expect(page.getByText(/Rp/).first()).toBeVisible()
})

test("Montir jasa checklist → select service → proceed to checkout", async ({ page }) => {
  await page.goto(`/montir`)
  await page.waitForLoadState("networkidle")
  await page.locator("a[href^='/montir/list']").first().click()
  await page.waitForURL(/\/montir\/list/)
  await page.locator("a[href^='/montir/m']").first().click()
  await page.waitForURL(/\/montir\/m\d/)
  await page.getByRole("button", { name: "Pilih Montir Ini" }).click()
  await page.waitForURL(/\/jasa/, { timeout: 10000 })
  await page.locator("button.rounded-xl.border").first().click()
  await expect(page.getByText("Total Estimasi Jasa")).toBeVisible()
  await page.getByRole("button", { name: /Lanjut ke Checkout/ }).click()
  await page.waitForURL(/\/pemesanan\/checkout/, { timeout: 10000 })
  await expect(page.getByText("Fixed Price Guarantee")).toBeVisible()
})
