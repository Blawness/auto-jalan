import path from "path"
import { test, expect, type Page } from "@playwright/test"

const authFile = path.join(__dirname, "../../playwright/.auth/user.json")
test.use({ storageState: authFile })

test("Sparepart page shows search bar and brand chips", async ({ page }) => {
  await page.goto("/lobby")
  await page.getByRole("link", { name: "Cari Sparepart" }).click()
  await expect(page).toHaveURL(/\/sparepart/)
  await expect(page.getByPlaceholder("Cari nama sparepart atau model...")).toBeVisible()
  await expect(page.getByText("Pilih Brand")).toBeVisible()
  await expect(page.getByRole("button", { name: "Honda" })).toBeVisible()
})

test("Sparepart brand chip navigates to list", async ({ page }) => {
  await page.goto(`/sparepart`)
  await page.waitForLoadState("networkidle")
  await page.getByRole("button", { name: "Honda" }).click()
  await page.waitForURL(/\/sparepart\/list/)
  await expect(page).toHaveURL(/merek=Honda/)
  await expect(page.getByText("Tidak ada").or(page.locator("a[href^='/sparepart/']").first())).toBeVisible({ timeout: 5000 })
})

test("Sparepart text search returns results", async ({ page }) => {
  await page.goto(`/sparepart`)
  await page.fill('input[placeholder="Cari nama sparepart atau model..."]', "Rem")
  await page.getByRole("button", { name: "Cari" }).click()
  await page.waitForURL(/\/sparepart\/list/)
  await expect(page).toHaveURL(/q=Rem/)
})

test("Sparepart detail shows description and reviews", async ({ page }) => {
  await page.goto(`/sparepart/sp1`)
  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Spesifikasi")).toBeVisible()
  await expect(page.getByText("Deskripsi Produk")).toBeVisible()
  await expect(page.getByText("Ulasan Pembeli")).toBeVisible()
  await expect(page.getByRole("button", { name: "Tambah ke Keranjang" })).toBeVisible()
})

test("Add sparepart to cart", async ({ page }) => {
  await page.goto(`/sparepart/sp1`)
  await page.waitForLoadState("networkidle")
  const addBtn = page.getByRole("button", { name: "Tambah ke Keranjang" })
  await addBtn.click()
  await expect(page.getByText("Ditambahkan ke keranjang")).toBeVisible({ timeout: 5000 })
})

test("Sparepart search shows empty state for gibberish", async ({ page }) => {
  await page.goto(`/sparepart`)
  await page.fill('input[placeholder="Cari nama sparepart atau model..."]', "XYZZZZZZ")
  await page.getByRole("button", { name: "Cari" }).click()
  await page.waitForURL(/\/sparepart\/list/)
  await expect(page.getByText("Tidak ada").or(page.getByText("ditemukan"))).toBeVisible()
})
