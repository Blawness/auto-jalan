import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")

test.describe("guest", () => {
  test.use({ storageState: undefined })

  test("Register new user successfully", async ({ page }) => {
    const ts = Date.now()
    await page.goto(`/register`)
    await page.fill('input[placeholder="Nama lengkap"]', `User ${ts}`)
    await page.fill('input[placeholder="email@example.com"]', `user${ts}@test.com`)
    await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
    await page.fill('input[placeholder="Minimal 8 karakter"]', "password123")
    await page.fill('input[placeholder="Masukkan ulang password"]', "password123")
    await page.getByRole("button", { name: "Daftar" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 20000 })
    await expect(page.getByText("Selamat datang")).toBeVisible()
  })

  test("Login with test user", async ({ page }) => {
    const ts = Date.now()
    const email = `login${ts}@test.com`
    await page.goto(`/register`)
    await page.fill('input[placeholder="Nama lengkap"]', `Login User ${ts}`)
    await page.fill('input[placeholder="email@example.com"]', email)
    await page.fill('input[placeholder="0812xxxxxxxx"]', "081234567890")
    await page.fill('input[placeholder="Minimal 8 karakter"]', "password123")
    await page.fill('input[placeholder="Masukkan ulang password"]', "password123")
    await page.getByRole("button", { name: "Daftar" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 20000 })
    await page.goto(`/akun`)
    await page.waitForLoadState("networkidle")
    await page.getByRole("button", { name: "Keluar" }).click()
    await page.waitForURL(/\/login/, { timeout: 15000 })
    await page.fill('input[placeholder="email@example.com"]', email)
    await page.fill('input[placeholder="Password Anda"]', "password123")
    await page.getByRole("button", { name: "Masuk" }).click()
    await page.waitForURL(/\/lobby/, { timeout: 20000 })
    await expect(page.getByText("Selamat datang")).toBeVisible()
  })

  test("Unauthenticated access to /pemesanan/checkout redirects to login", async ({ page }) => {
    await page.goto(`/pemesanan/checkout`)
    await page.waitForURL(/\/login/, { timeout: 10000 })
    await expect(page).toHaveURL(/callbackUrl/)
  })

  test("Unauthenticated access to /akun redirects to login", async ({ page }) => {
    await page.goto(`/akun`)
    await page.waitForURL(/\/login/, { timeout: 10000 })
  })

  test("Unauthenticated access to /lobby is allowed (guest browse)", async ({ page }) => {
    await page.goto(`/lobby`)
    await expect(page).toHaveURL(/\/lobby/)
    await expect(page.getByText("Jelajahi layanan Auto Jalan")).toBeVisible()
  })
})

test.describe("authenticated", () => {
  test.use({ storageState: authFile })
  test("Logout redirects to login", async ({ page }) => {
    await page.goto(`/akun`)
    await page.waitForLoadState("networkidle")
    await page.getByRole("button", { name: "Keluar" }).click()
    await page.waitForURL(/\/login/, { timeout: 15000 })
    await expect(page.getByText("Masuk ke akun")).toBeVisible()
  })

  test("Akun page shows user email and logout button", async ({ page }) => {
    await page.goto(`/akun`)
    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Email")).toBeVisible()
    await expect(page.getByRole("button", { name: "Keluar" })).toBeVisible()
  })
})
