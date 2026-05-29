import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: { timeout: 10000 },
  retries: 0,
  use: {
    baseURL: "http://localhost:3001",
    headless: true,
  },
})
