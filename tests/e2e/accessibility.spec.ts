import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import path from "path"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
const KNOWN_ISSUES = [
  "button-name",
  "color-contrast",
  "link-name",
  "link-in-text-block",
]

async function checkNoUnexpectedViolations(page: any) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .disableRules(KNOWN_ISSUES)
    .analyze()
  expect(results.violations).toEqual([])
}

test.describe("Accessibility", () => {
  test("onboarding page has no unexpected WCAG A/AA violations", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await checkNoUnexpectedViolations(page)
  })

  test("login page has no unexpected WCAG A/AA violations", async ({ page }) => {
    await page.goto("/login")
    await page.waitForLoadState("networkidle")
    await checkNoUnexpectedViolations(page)
  })

  test("register page has no unexpected WCAG A/AA violations", async ({ page }) => {
    await page.goto("/register")
    await page.waitForLoadState("networkidle")
    await checkNoUnexpectedViolations(page)
  })
})

test.describe("Accessibility (authenticated)", () => {
  test.use({ storageState: authFile })

  test("lobby page has no unexpected WCAG A/AA violations", async ({ page }) => {
    await page.goto("/lobby")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(KNOWN_ISSUES)
      .analyze()
    expect(results.violations).toEqual([])
  })

  test("sparepart detail has no unexpected WCAG A/AA violations", async ({ page }) => {
    await page.goto("/sparepart/sp1")
    await page.waitForLoadState("networkidle")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(KNOWN_ISSUES)
      .analyze()
    expect(results.violations).toEqual([])
  })
})
