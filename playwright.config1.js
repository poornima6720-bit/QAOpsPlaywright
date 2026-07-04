// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        //permissions: ['geolocations'],
        video: 'retain-on-failure',
        trace: 'on',
        //viewport: {width:720, height:720}
      },

    }
  ]


});

