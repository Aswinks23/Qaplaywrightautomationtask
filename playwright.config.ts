import { defineConfig, devices} from '@playwright/test';
import path from 'path';

export default defineConfig({
  globalSetup: path.resolve(__dirname, 'global-setup.ts'),

/**
 * Read environment variables from file.
 * [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See [https://playwright.dev/docs/test-configuration](https://playwright.dev/docs/test-configuration).
 */
  snapshotDir: './.artifacts/snapshots',
  testDir: 'testAssets/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See [https://playwright.dev/docs/test-reporters](https://playwright.dev/docs/test-reporters) */
   reporter: [
 ['html', { open: 'always' }],
    ['list'],
    ['allure-playwright', {
      outputFolder: './.artifacts/allure-results', 
      detail: false,
      suiteTitle: false,
      useCucumberStepReporter: false,
      useStepsForHooks: false
    }]
  ],
  /* Shared settings for all the projects below. See [https://playwright.dev/docs/api/class-testoptions](https://playwright.dev/docs/api/class-testoptions). */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test. See [https://playwright.dev/docs/trace-viewer](https://playwright.dev/docs/trace-viewer) */
    trace: 'on-first-retry',
    screenshot: 'on', // Attach screenshots automatically
    video: 'on',
    headless: true
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'example.spec.ts (chromium)',
      testMatch: 'example.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'example.spec.ts (firefox)',
      testMatch: 'example.spec.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'example.spec.ts (webkit)',
      testMatch: 'example.spec.ts',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'example.spec.ts (edge)',
      testMatch: 'example.spec.ts',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },

    {
      name: 'playgrounddoc.spec.ts (chromium)',
      testMatch: 'playgrounddoc.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'playgrounddoc.spec.ts (firefox)',
      testMatch: 'playgrounddoc.spec.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'playgrounddoc.spec.ts (webkit)',
      testMatch: 'playgrounddoc.spec.ts',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'playgrounddoc.spec.ts (edge)',
      testMatch: 'playgrounddoc.spec.ts',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },
    {
      name: 'playgroundDynamic.spec.ts (chromium)',
      testMatch: 'playgroundDynamic.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'playgroundDynamic.spec.ts (firefox)',
      testMatch: 'playgroundDynamic.spec.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'playgroundDynamic.spec.ts (webkit)',
      testMatch: 'playgroundDynamic.spec.ts',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'playgroundDynamic.spec.ts (edge)',
      testMatch: 'playgroundDynamic.spec.ts',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },
    {
      name: 'screener.spec.ts (chromium)',
      testMatch: 'screener.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'screener.spec.ts (firefox)',
      testMatch: 'screener.spec.ts',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'screener.spec.ts (webkit)',
      testMatch: 'screener.spec.ts',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'screener.spec.ts (edge)',
      testMatch: 'screener.spec.ts',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    //  {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //  },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },


});



