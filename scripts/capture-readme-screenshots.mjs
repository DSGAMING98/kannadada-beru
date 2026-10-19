import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseURL = process.env.CAPTURE_BASE_URL ?? "http://localhost:3000";
const outputDirectory = "public/showcase";

const captures = [
  { route: "/", file: "home.png", language: "kn", fullPage: false },
  { route: "/voices", file: "voices.png", language: "en", fullPage: false },
  { route: "/compare", file: "compare.png", language: "en", fullPage: true },
  { route: "/dictionary", file: "dictionary.png", language: "kn", fullPage: false },
  { route: "/play", file: "play.png", language: "kn", fullPage: false },
  { route: "/regions/karaavali", file: "karavali-audio.png", language: "en", selector: ".regional-audio-card" },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

try {
  for (const capture of captures) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await context.addInitScript((language) => {
      localStorage.setItem("kannadada-beru-interface-language", language);
    }, capture.language);
    const page = await context.newPage();
    await page.goto(new URL(capture.route, baseURL).toString(), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const path = `${outputDirectory}/${capture.file}`;
    if (capture.selector) {
      await page.locator(capture.selector).screenshot({ path });
    } else {
      await page.screenshot({ path, fullPage: capture.fullPage });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
