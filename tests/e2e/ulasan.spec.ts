import { test, expect, type Page } from "@playwright/test"

test("Ulasan page renders with star ratings and chips", async ({ page }) => {
  await page.goto(`/ulasan`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Rating Mekanik")).toBeVisible()
  await expect(page.getByText("Kualitas Suku Cadang")).toBeVisible()
  await expect(page.getByRole("button", { name: "Montir Ramah" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Kirim Ulasan" })).toBeVisible()
})
