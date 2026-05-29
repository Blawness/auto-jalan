import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import path from "path"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")

test.describe("Accessibility", () => {
  async function checkNoViolations(page: any) {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  }

  test("onboarding page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await checkNoViolations(page)
  })

  test("login page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")
    await checkNoViolations(page)
  })

  test("register page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/register")
    await page.waitForLoadState("networkidle")
    await checkNoViolations(page)
  })
})

test.describe("Accessibility (authenticated)", () => {
  test.use({ storageState: authFile })

  test("lobby page has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/lobby")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test("sparepart detail has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/sparepart/sp1")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })
})
