// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 40*1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: "chromium",
    headless: true,
    screenshot: 'on',
    trace: 'on'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});

