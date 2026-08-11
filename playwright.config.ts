import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  use: {
    baseURL: 'http://127.0.0.1:4273/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn build && yarn preview --host 127.0.0.1 --port 4273 --strictPort',
    reuseExistingServer: false,
    timeout: 120_000,
    url: 'http://127.0.0.1:4273/',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { height: 900, width: 1280 } },
    },
    {
      name: 'mobile-390',
      use: { ...devices['Pixel 5'], viewport: { height: 844, width: 390 } },
    },
  ],
});
