import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

const baseURL = process.env.LIVE_BASE_URL;

if (!baseURL) {
  throw new Error("LIVE_BASE_URL is required for live deployment tests.");
}

export default defineConfig({
  ...baseConfig,
  use: { ...baseConfig.use, baseURL },
  webServer: undefined,
});
