import { defineConfig } from "@playwright/test";

const executablePath = process.env["PLAYWRIGHT_EXECUTABLE_PATH"];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: process.env["PLAYWRIGHT_REUSE_SERVER"] === "1",
    timeout: 30_000,
  },
});
