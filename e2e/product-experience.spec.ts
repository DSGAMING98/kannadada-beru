import { expect, test } from "@playwright/test";

test("Explore gives immediate visible feedback for a directory selection", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("link", { name: /ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ|Explore Karnataka/ }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await expect(page.getByRole("application", { name: /Karnataka district map/i })).toHaveAttribute("data-map-status", "loaded");

  const mysuru = page.getByRole("button", { name: /ಮೈಸೂರು.*Mysuru/i });
  await mysuru.scrollIntoViewIfNeeded();
  await mysuru.click();
  await page.screenshot({ path: testInfo.outputPath("directory-selection.png"), fullPage: false });

  const selection = page.getByTestId("district-selection");
  await expect(selection).toBeVisible();
  await expect(selection).toContainText("Mysuru");
  await expect(selection.getByRole("link", { name: /ಜಿಲ್ಲೆಯ ವಿವರ ನೋಡಿ|Explore district|Open district profile/i })).toBeVisible();
  const box = await selection.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + Math.min(box!.height, 80)).toBeLessThanOrEqual(viewport!.height);
});

test("Explore assets load and selection survives direct navigation", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? "failed"}`));

  const [worker, geojson] = await Promise.all([
    page.request.get("/maplibre-gl-worker.mjs"),
    page.request.get("/data/karnataka-districts-2011.geojson"),
  ]);
  expect(worker.status()).toBe(200);
  expect(geojson.status()).toBe(200);
  expect(worker.headers()["content-type"]).toMatch(/javascript|ecmascript|text\/plain/);
  expect((await geojson.json()).type).toBe("FeatureCollection");

  await page.goto("/explore");
  await expect(page.getByRole("application", { name: /Karnataka district map/i })).toHaveAttribute("data-map-status", "loaded");
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test("language search recovers clearly from an empty regional collection", async ({ page }) => {
  await page.goto("/language");
  const input = page.getByLabel(/Word or meaning/i);
  await input.fill("neeru");
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();
  await input.fill("ನೀರು");
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();
  await input.fill("water");
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();

  await page.getByLabel(/Region|ಪ್ರದೇಶ/i).selectOption("hale-mysuru");
  await expect(page.getByText(/ಈ ಪ್ರದೇಶದ ಸಂಗ್ರಹ|In this regional collection/i)).toBeVisible();
  await page.getByRole("button", { name: /ಸಾಮಾನ್ಯ ಕನ್ನಡದಲ್ಲಿ ಹುಡುಕಿ|Search general Kannada/i }).click();
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();
  await expect(page.getByText(/ಪ್ರಾದೇಶಿಕ ಹೇಳಿಕೆ ಇಲ್ಲ|No regional claim/).first()).toBeVisible();
});

test("published regional usages remain searchable with locality context", async ({ page }) => {
  await page.goto("/language");
  const input = page.getByLabel(/Word or meaning/i);
  await input.fill("ಉಳ್ಳಾಗಡ್ಡಿ");
  await expect(page.getByRole("heading", { name: "ಉಳ್ಳಾಗಡ್ಡಿ" })).toBeVisible();
  await expect(page.getByText(/ಸ್ಥಳ ಮತ್ತು ಸಮುದಾಯದಂತೆ|Pronunciation and usage may vary/i).first()).toBeVisible();
  await input.fill("hothe");
  await expect(page.getByRole("heading", { name: "Na alli hothe" })).toBeVisible();
  await expect(page.getByText(/Kundapura and surrounding Udupi-district taluks/i).first()).toBeVisible();
});

test("core navigation switches between Kannada and English", async ({ page }) => {
  await page.goto("/explore");
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Explore Karnataka");
  await expect(page.getByRole("heading", { name: /districts/i })).toBeVisible();
  await page.getByRole("button", { name: "ಕನ್ನಡ", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ಕರ್ನಾಟಕ");
});

test("an installed PWA session can reopen the public Explore shell offline", async ({ page, context }) => {
  await page.goto("/explore");
  const controlled = await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return false;
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return false;
    await navigator.serviceWorker.ready;
    if (navigator.serviceWorker.controller) return true;
    return new Promise<boolean>((resolve) => {
      const timer = window.setTimeout(() => resolve(false), 5000);
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.clearTimeout(timer);
        resolve(true);
      }, { once: true });
    });
  });
  test.skip(!controlled, "Service workers are disabled in the development server.");
  // A claimed worker only sees requests after its first install. Reopen once
  // online to model an already-installed PWA and populate versioned JS/CSS.
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("application", { name: /Karnataka district map/i })).toHaveAttribute("data-map-status", "loaded");
  await context.setOffline(true);
  try {
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ|Explore Karnataka/ })).toBeVisible();
    await expect(page.getByRole("application", { name: /Karnataka district map/i })).toHaveAttribute("data-map-status", "loaded");
  } finally {
    await context.setOffline(false);
  }
});
