import { test, expect, type Page } from "@playwright/test"

test("Forum list page loads", async ({ page }) => {
  await page.getByRole("link", { name: "Forum Komunitas" }).click()
  await expect(page).toHaveURL(/\/forum/)
  await expect(page.getByRole("link", { name: "Ajukan Pertanyaan" })).toBeVisible()
})

test.describe("guest", () => {
  test.use({ storageState: undefined })

  test("Forum create thread requires login (ajukan is protected)", async ({ page }) => {
    await page.goto(`/forum/ajukan`)
    await page.waitForURL(/\/login/, { timeout: 10000 })
  })
})

test("Forum create thread when logged in", async ({ page }) => {
  await page.goto(`/forum/ajukan`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByRole("heading", { name: "Ajukan Pertanyaan" })).toBeVisible()
  await page.fill('input[placeholder="Judul pertanyaan"]', "Test question from Playwright")
  await page.locator('[role="combobox"]').click()
  await page.getByRole("option", { name: "Mesin" }).click()
  await page.fill("textarea", "This is a test question body")
  await page.getByRole("button", { name: "Submit" }).click()
  await page.waitForURL(/\/forum/, { timeout: 15000 })
})
