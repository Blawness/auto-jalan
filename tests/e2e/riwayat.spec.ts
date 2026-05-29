import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Riwayat page loads with Ongoing and Selesai tabs", async ({ page }) => {
  await page.goto(`/riwayat`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("tab", { name: "Ongoing" })).toBeVisible()
  await expect(page.getByRole("tab", { name: "Selesai" })).toBeVisible()
})
