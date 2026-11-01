import { defineConfig, devices } from '@playwright/test';

// Not 4321, so e2e runs do not collide with a running `astro dev`.
const port = 4322;

// Serves the existing dist/ build; run `npm run build` first.
export default defineConfig({
  testDir: 'tests/e2e',
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${port}`,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // --ignore-lock keeps astro preview in the foreground; Astro 7 otherwise
    // detaches when it detects an agent shell, and Playwright reads that as a crash.
    command: `npm run preview -- --port ${port} --ignore-lock`,
    url: `http://localhost:${port}`,
  },
});
