const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],

  use: {
    baseURL: "https://www.shopware6-demo.development-s25.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "on-first-retry",
    actionTimeout: 10_000,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Uncomment to also run in Firefox / WebKit:
    // { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',   use: { ...devices['Desktop Safari']  } },
  ],
});
