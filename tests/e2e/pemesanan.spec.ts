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
