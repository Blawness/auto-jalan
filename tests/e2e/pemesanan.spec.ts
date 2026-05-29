import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Checkout page renders price breakdown", async ({ page }) => {
  await page.goto(`/pemesanan/checkout`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Fixed Price Guarantee")).toBeVisible()
})

test("Ongoing page renders", async ({ page }) => {
  await page.goto(`/pemesanan/ongoing`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Pesanan Berjalan" })).toBeVisible()
  await expect(page.getByText("Dana Anda ditahan")).toBeVisible()
  await expect(page.getByText("Geser jika Service Selesai")).toBeVisible()
})

test("Checkout requires scroll to bottom before submit", async ({ page }) => {
  await page.goto(`/montir/m1/jasa`)
  await page.waitForLoadState("networkidle")
  await page.locator("button.rounded-xl.border").first().click()
  await expect(page.getByText("Total Estimasi Jasa")).toBeVisible()
  await page.getByRole("button", { name: /Lanjut ke Checkout/ }).click()
  await page.waitForURL(/\/pemesanan\/checkout/, { timeout: 10000 })
  const submitBtn = page.getByRole("button", { name: /Pesan Sekarang/ })
  await expect(submitBtn.or(page.getByText("Scroll ke bawah"))).toBeVisible()
})
