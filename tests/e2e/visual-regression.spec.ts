import { test, expect } from "@playwright/test"
import path from "path"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")

test.describe("Visual regression", () => {
  test.use({ storageState: authFile })

  test("lobby page matches screenshot", async ({ page }) => {
    await page.goto("/lobby")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("lobby.png", {
      mask: [page.locator("[data-loading]")],
    })
  })

  test("sparepart detail matches screenshot", async ({ page }) => {
    await page.goto("/sparepart/sp1")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("sparepart-detail.png", { maxDiffPixelRatio: 0.02 })
  })

  test("login form matches screenshot", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveScreenshot("login-form.png")
  })
})
