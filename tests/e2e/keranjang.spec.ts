import { test, expect, type Page } from "@playwright/test"

test("Keranjang page shows empty state when no items", async ({ page }) => {
  await page.goto(`/keranjang`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Keranjang masih kosong")).toBeVisible()
})
