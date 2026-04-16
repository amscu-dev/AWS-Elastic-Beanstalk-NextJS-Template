import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Configure projects for major browsers */
  projects: [
    {
      use: { ...devices["Desktop Chrome"] },
      name: "chromium",
    },

    {
      use: { ...devices["Desktop Firefox"] },
      name: "firefox",
    },

    {
      use: { ...devices["Desktop Safari"] },
      name: "webkit",
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  /* Run your local dev server before starting the tests */
  webServer: process.env.BASE_URL
    ? undefined
    : {
        reuseExistingServer: !process.env.CI,
        url: "http://localhost:3000",
        command: "npm run start",
      },
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Run tests in files in parallel */
  fullyParallel: true,

  testDir: "./e2e",

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
});
