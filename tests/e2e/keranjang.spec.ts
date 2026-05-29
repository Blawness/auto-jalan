import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Keranjang page shows empty state when no items", async ({ page }) => {
  await page.goto(`/keranjang`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Keranjang masih kosong")).toBeVisible()
})
