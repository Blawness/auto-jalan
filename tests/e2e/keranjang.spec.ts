import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Keranjang page shows empty state when no items", async ({ page }) => {
  await page.goto(`/keranjang`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Keranjang masih kosong")).toBeVisible()
})

test("Add item to cart via UI and navigate to keranjang", async ({ page }) => {
  await page.goto(`/sparepart/sp1`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Tambah ke Keranjang" }).click()
  await expect(page.getByText("Ditambahkan ke keranjang")).toBeVisible({ timeout: 5000 })
  await page.getByRole("link", { name: /Keranjang/ }).first().click()
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Keranjang masih kosong")).not.toBeVisible()
})
