import { test as setup } from "@playwright/test"
import path from "path"

const authFile = path.join(__dirname, "../playwright/.auth/user.json")

setup("authenticate", async ({ page }) => {
  const email = `pw-${Date.now()}@autojalan.test`
  const password = "password123"

  await page.goto("/register")
  await page.fill('input[placeholder="Nama lengkap"]', "Playwright E2E")
  await page.fill('input[placeholder="email@example.com"]', email)
  await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
  await page.fill('input[placeholder="Minimal 8 karakter"]', password)
  await page.fill('input[placeholder="Masukkan ulang password"]', password)
  await page.getByRole("button", { name: "Daftar" }).click()
  await page.waitForURL(/\/lobby/, { timeout: 20000 }).catch(() => {})

  if (!page.url().includes("/lobby")) {
    await page.goto("/login")
    await page.fill('input[placeholder="email@example.com"]', email)
    await page.fill('input[placeholder="Password Anda"]', password)
    await page.getByRole("button", { name: "Masuk" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 20000 })
  }

  await page.waitForLoadState("networkidle")
  await page.context().storageState({ path: authFile })
})
