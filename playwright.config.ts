import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.STORYBOOK_PORT ?? 6007);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 8_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    { name: "android-chromium", use: { ...devices["Pixel 7"] } },
    { name: "ios-webkit", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "pnpm storybook:serve",
    url: `${baseURL}/index.json`,
    env: { STORYBOOK_PORT: String(port) },
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
