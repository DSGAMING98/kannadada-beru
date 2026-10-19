import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  webServer: { command: "pnpm start", url: "http://localhost:3000", reuseExistingServer: false, timeout: 120_000 },
});
