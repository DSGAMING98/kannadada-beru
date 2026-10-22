import { expect, test } from "@playwright/test";

test("homepage renders Kannada identity and navigation works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ಕನ್ನಡದ ಬೇರು");
  await expect(page.getByText("ಪ್ರತಿಯೊಂದು ಕಥೆಗೂ ನೆಲವಿದೆ.")).toBeVisible();
  await page.getByRole("link", { name: /ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ/ }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await expect(page.getByRole("heading", { name: /ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ|Explore Karnataka/ })).toBeVisible();
});

test("known region works and unknown region has a useful 404", async ({ page }) => {
  await page.goto("/regions/karaavali");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ಕರಾವಳಿ");
  await expect(page.getByRole("heading", { name: "ತುಳು", exact: true })).toBeVisible();
  await expect(page.getByText(/distinct Dravidian language—not a Kannada dialect/i)).toBeVisible();
  await page.goto("/regions/not-real");
  await expect(page.getByText("ಈ ಪುಟ ಇನ್ನೂ ನಮ್ಮ ಭೂಪಟದಲ್ಲಿಲ್ಲ.")).toBeVisible();
});

test("district map loads without a MapLibre error", async ({ page }) => {
  const browserErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") browserErrors.push(message.text()); });
  await page.goto("/explore");
  await expect(page.getByRole("application", { name: /Karnataka district map/i })).toHaveAttribute("data-map-status", "loaded");
  await expect(page.locator(".maplibregl-canvas")).toBeVisible();
  await page.waitForTimeout(1200);
  const canvas = page.locator(".maplibregl-canvas");
  const box = await canvas.boundingBox();
  expect(box).not.toBeNull();
  await canvas.click({ position: { x: box!.width / 2, y: box!.height / 2 } });
  await expect(page.locator(".map-caption")).not.toContainText("Select a 2011 district shape");
  await expect(page.getByTestId("district-selection")).toBeVisible();
  expect(browserErrors.filter((message) => message.includes("Worker failed") || message.includes("GeoJSON"))).toEqual([]);
});

test("current district directory searches Kannada and former names", async ({ page }) => {
  await page.goto("/explore");
  const search = page.getByLabel(/Search districts|ಜಿಲ್ಲೆ ಹುಡುಕಿ/);
  await search.fill("ಮೈಸೂರು");
  await expect(page.getByRole("button", { name: /ಮೈಸೂರು/ })).toBeVisible();
  await search.fill("Ramanagara");
  await expect(page.getByRole("button", { name: /ಬೆಂಗಳೂರು ದಕ್ಷಿಣ/ })).toBeVisible();
});

test("district profile preserves provenance and unknown routes fail safely", async ({ page }) => {
  await page.goto("/districts/vijayanagara");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ವಿಜಯನಗರ");
  await expect(page.getByText(/no standalone feature/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /ಈ ನೆಲದ ಕಥೆ/ })).toBeVisible();
  await expect(page.locator(".district-highlights article")).toHaveCount(3);
  await expect(page.getByText(/imperial heartland of the Vijayanagara empire/i)).toBeVisible();
  await page.goto("/districts/not-real");
  await expect(page.getByText("ಈ ಪುಟ ಇನ್ನೂ ನಮ್ಮ ಭೂಪಟದಲ್ಲಿಲ್ಲ.")).toBeVisible();
});

test("atlas does not overflow a narrow mobile viewport", async ({ page }) => {
  await page.goto("/explore");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test("language search finds Kannada and Romanized vocabulary", async ({ page }) => {
  await page.goto("/language");
  await expect(page.locator(".language-stats")).toContainText(/40\s*(ಆಯ್ದ ಕನ್ನಡ ಪದಗಳು|curated Kannada words)/);
  await expect(page.locator(".language-stats")).toContainText(/8\s*(ಪ್ರಕಟಿತ ಮೂಲಗಳ ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು|regional usages from published sources)/);
  await expect(page.locator(".language-stats")).toContainText(/1\s*(ನೈಜ ಮಾನವ ಧ್ವನಿಗಳು|real human voice recordings)/);
  const input = page.getByPlaceholder(/ಮನೆ/);
  await input.fill("ನೀರು");
  await expect(page.getByText(/ನಮೂದು: ಕನ್ನಡ ಲಿಪಿ|Input: Kannada script/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();
  await input.fill("neeru");
  await expect(page.getByRole("heading", { name: "ನೀರು" })).toBeVisible();
  await input.fill("rain");
  await expect(page.getByRole("heading", { name: "ಮಳೆ" })).toBeVisible();
  await expect(page.getByText(/ಪ್ರಾದೇಶಿಕ ಹೇಳಿಕೆ ಇಲ್ಲ|No regional claim/).first()).toBeVisible();
});

test("full dictionary loads the licensed Alar corpus by Kannada initial", async ({ page }) => {
  await page.goto("/dictionary");
  await expect(page.getByText(/1,?56,?650/).first()).toBeVisible();
  await expect(page.getByText(/1,?39,?991/).first()).toBeVisible();
  const input = page.getByPlaceholder(/ಕನ್ನಡ, ಮನೆ, ನೀರು/);
  await input.fill("ಕನ್ನಡ");
  await expect(page.locator(".dictionary-result-bar")).toContainText("ಕ");
  await expect(page.locator(".dictionary-entry h3").filter({ hasText: /^ಕನ್ನಡ$/ }).first()).toBeVisible();
  await expect(page.getByText(/ODC-ODbL 1.0/).first()).toBeVisible();
  await expect(page.getByTitle(/ಸಾಧನದ ಕನ್ನಡ ಧ್ವನಿ|Device Kannada voice/).first()).toBeVisible();
});

test("Pada Beru mini-game gives immediate feedback and advances", async ({ page }) => {
  await page.goto("/play");
  await expect(page.getByText(/1\/10/)).toBeVisible();
  await page.locator(".game-option").first().click();
  await expect(page.locator(".game-feedback")).toBeVisible();
  await expect(page.locator(".game-option-correct")).toHaveCount(1);
  await page.getByRole("button", { name: /ಮುಂದಿನ ಪದ|Next word/ }).click();
  await expect(page.getByText(/2\/10/)).toBeVisible();
});

test("About page carries the project message in Kannada and English", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "ಕನ್ನಡದ ಪ್ರತಿಯೊಂದು ಧ್ವನಿಯೂ ಒಂದು ನೆನಪು" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Every Kannada voice carries a memory" })).toBeVisible();
  await expect(page.getByText("ನಮ್ಮ ನುಡಿ, ನಮ್ಮ ಬೇರು, ನಮ್ಮ ಹೆಮ್ಮೆ.")).toBeVisible();
});

test("regional comparison shows cited usages with cultural context", async ({ page }) => {
  await page.goto("/compare");
  await expect(page.getByLabel("First region")).toBeVisible();
  await expect(page.getByLabel("Second region")).toBeVisible();
  await expect(page.getByText("ಉಳ್ಳಾಗಡ್ಡಿ")).toBeVisible();
  await expect(page.getByText("Na alli hothe")).toBeVisible();
  await expect(page.getByRole("heading", { name: /ವ್ಯತ್ಯಾಸವನ್ನು ಕೇಳಿ|Notice the difference/i })).toBeVisible();
  await page.getByLabel("First region").selectOption("karaavali");
  await expect(page.getByText(/ಎರಡು ಬೇರೆ ಪ್ರದೇಶಗಳನ್ನು ಆರಿಸಿ|Choose two different regions/)).toBeVisible();
});

test("regional voices showcase keeps evidence and language identity together", async ({ page }) => {
  await page.goto("/voices");
  await expect(page.getByRole("heading", { name: /ನುಡಿ, ನೆಲ ಮತ್ತು ದನಿಯ ನಡುವೆ|Where words meet place and voice/i })).toBeVisible();
  await expect(page.locator(".voices-ledger")).toContainText(/8\s*(ಮೂಲದಲ್ಲಿ ದಾಖಲಾಗಿರುವ ನುಡಿಗಳು|source-documented usages)/i);
  await expect(page.locator(".voices-ledger")).toContainText(/0\s*(ಪ್ರಕಟಿತ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಧ್ವನಿಗಳು|published regional Kannada voices)/i);
  await expect(page.locator(".pronunciation-stats")).toContainText(/12\s*(ಸಾಮಾನ್ಯ ಕನ್ನಡ ಧ್ವನಿಗಳು|general Kannada voices)/i);
  await expect(page.getByRole("button", { name: /recording needed/i })).toHaveCount(15);
  await expect(page.getByRole("button", { name: /recording needed/i }).first()).toBeDisabled();
  const pronunciationSearch = page.getByPlaceholder(/neeru, water/);
  await pronunciationSearch.fill("water");
  await expect(page.locator(".pronunciation-card")).toHaveCount(1);
  await expect(page.locator(".pronunciation-card h3")).toHaveText("ನೀರು");
  const audioResponse = await page.request.get("/audio/kannada/neeru.ogg");
  expect(audioResponse.status()).toBe(200);
  expect(audioResponse.headers()["content-type"]).toMatch(/audio|ogg|octet-stream/);
  await page.getByLabel("Voice region").selectOption("uttara-karnataka");
  await expect(page.locator(".voice-story")).toHaveCount(5);
  await page.getByLabel("Search regional voices").fill("onion");
  await expect(page.locator(".voice-story")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "ಉಳ್ಳಾಗಡ್ಡಿ" })).toBeVisible();
  await expect(page.getByText(/ಈ ಧ್ವನಿ ತುಳು ಭಾಷೆಯದ್ದು|This recording is Tulu and is not counted as regional Kannada/i)).toBeVisible();
});

test("regional voice intake exports a canonically named reviewed package", async ({ page }) => {
  await page.goto("/voices/intake");
  await expect(page.getByRole("heading", { name: /ನೈಜ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿ ಸಂಗ್ರಹ|Authentic regional voice intake/i })).toBeVisible();
  await page.getByLabel("Speaker’s self-reported region").selectOption("mysuru");
  await page.getByLabel("Record or choose audio").setInputFiles("public/audio/kannada/neeru.ogg");
  await page.getByLabel("Exact spoken Kannada transcript").fill("ಹೇಗಿದ್ದೀರಿ?");
  await page.getByLabel("District where speaker grew up").fill("Mysuru");
  await page.getByLabel("Approximate years lived there").fill("20");
  await page.getByLabel("Recording date").fill("2026-10-22");
  await page.getByLabel("Consent reference").fill("private-consent-001");
  await page.getByLabel("Human reviewer name or ID").fill("reviewer-1");
  await page.getByLabel("Review date").fill("2026-10-22");
  for (const checkbox of await page.locator('.audio-intake-form input[type="checkbox"]').all()) await checkbox.check();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /ಧ್ವನಿ \+ ಮಾಹಿತಿ ರಫ್ತು ಮಾಡಿ|Export audio \+ metadata/i }).click();
  expect((await downloadPromise).suggestedFilename()).toBe("warm-greeting-mysuru.ogg");
  await expect(page.getByText(/ಧ್ವನಿ ಮತ್ತು ಅದರ ಪರಿಶೀಲಿತ ಮಾಹಿತಿ ಕಡತಗಳನ್ನು ರಫ್ತು ಮಾಡಲಾಗಿದೆ|Audio and its reviewed metadata sidecar were exported/i)).toBeVisible();
});

test("regional audio contribution is private, consent-led and mobile ready", async ({ page }) => {
  await page.goto("/contribute/audio");
  await expect(page.getByRole("heading", { name: /ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಧ್ವನಿ ಕೊಡುಗೆ ನೀಡಿ|Contribute a regional Kannada voice/i })).toBeVisible();
  await expect(page.locator(".audio-prompt-list article")).toHaveCount(5);
  await page.getByLabel("Self-identified region").selectOption("mysuru");
  await page.getByLabel("Contribution audio").setInputFiles("public/audio/kannada/neeru.ogg");
  await page.getByLabel("Exact Kannada words spoken").fill("hegiddiri");
  await page.getByLabel("Contributor district").fill("Mysuru");
  await page.getByLabel("Contributor years lived there").fill("20");
  await page.getByLabel("Contribution recording date").fill("2026-10-22");
  await page.getByLabel("Contributor access code").fill("invalid-test-code");
  await page.getByLabel("Consent name or signature").fill("Consenting speaker");
  await page.locator('input[name="adultConfirmed"]').check();
  await page.locator('input[name="consentToReviewAndPublish"]').check();
  await page.getByRole("button", { name: /ಪರಿಶೀಲನೆಗೆ ಸಲ್ಲಿಸಿ|Submit for review/i }).click();
  await expect(page.locator(".form-message")).toContainText(/ಕಡ್ಡಾಯ ಮಾಹಿತಿ ಮತ್ತು ಸಮ್ಮತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ|Transcript must contain Kannada script/i);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test("Karavali offers a credited human Tulu recording and district journeys", async ({ page }) => {
  await page.goto("/regions/karaavali");
  await expect(page.getByText("Na alli hothe")).toBeVisible();
  await expect(page.getByRole("heading", { name: "ಕುಡ್ಲ" })).toBeVisible();
  await expect(page.getByText(/Deepakpadukone20/)).toBeVisible();
  await expect(page.getByRole("link", { name: /CC0 1.0/ })).toBeVisible();
  await page.getByRole("button", { name: "Play ಕುಡ್ಲ" }).click();
  await expect(page.getByRole("button", { name: "Pause ಕುಡ್ಲ" })).toBeVisible();
  await expect(page.getByRole("link", { name: /ಉಡುಪಿ.*Udupi/ })).toBeVisible();
  await page.goto("/districts/udupi");
  await expect(page.getByRole("link", { name: "Open the language explorer" })).toBeVisible();
});

test("all public release routes are available", async ({ page }) => {
  for (const route of ["/", "/explore", "/voices", "/voices/intake", "/contribute/audio", "/language", "/dictionary", "/play", "/compare", "/contribute", "/about", "/districts/mysuru", "/regions/karaavali"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main")).toBeVisible();
  }
});

test("production-oriented response headers are present", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(response.headers()["permissions-policy"]).toContain("microphone=()");
});

test("PWA release resources and offline shell are available", async ({ request }) => {
  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.status()).toBe(200);
  expect((await manifest.json()).display).toBe("standalone");
  expect((await request.get("/icon-192.png")).status()).toBe(200);
  expect((await request.get("/icon-512.png")).status()).toBe(200);
  const worker = await request.get("/sw.js");
  expect(worker.status()).toBe(200);
  expect(worker.headers()["cache-control"]).toContain("no-store");
  expect((await request.get("/offline")).status()).toBe(200);
  expect((await request.get("/audio/kannada/neeru.ogg")).status()).toBe(200);
});

test("contribution page saves an explicit local draft without claiming submission", async ({ page }) => {
  await page.goto("/contribute");
  await expect(page.getByText(/ಖಾಸಗಿ ಸಾಧನ ಸಂಗ್ರಹ|Private on-device collection/)).toBeVisible();
  await expect(page.getByRole("heading", { name: /ಒಂದೇ ಪದದ ಧ್ವನಿ ಸಂಗ್ರಹ ಕಿಟ್|Same-word recording kit/ })).toBeVisible();
  const consentTemplate = await page.request.get("/templates/regional-recording-intake.md");
  expect(consentTemplate.status()).toBe(200);
  expect(await consentTemplate.text()).toContain("Speaker replayed and approved");
  await page.getByLabel(/Kannada word or phrase/).fill("ಪರೀಕ್ಷೆ");
  await page.getByLabel("Romanized Kannada").fill("pareekshe");
  await page.getByLabel("Contextual English meaning").fill("test");
  await page.getByLabel(/Real Kannada usage example/).fill("ಇದು ಒಂದು ಪರೀಕ್ಷೆ.");
  await page.getByLabel(/Locality as described/).fill("Mysuru");
  await page.getByLabel("Language region").selectOption("hale-mysuru");
  await page.getByLabel("Evidence and source note").fill("Speaker-provided example requiring independent review.");
  await page.getByLabel(/I have permission/).check();
  await page.getByRole("button", { name: /ಸ್ಥಳೀಯ ಕರಡು ಉಳಿಸಿ|Save privately/ }).click();
  await expect(page.getByText(/ಕರಡು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ|Draft saved on this device/)).toBeVisible();
  await expect(page.getByText(/1 (ಉಳಿಸಲಾಗಿದೆ|saved)/)).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("kannadada-beru-contribution-drafts-v1") ?? "[]").length)).toBe(1);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /ಕೊಡುಗೆ ಕಡತ ರಫ್ತು ಮಾಡಿ|Export contributions/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("kannadada-beru-contribution-drafts.json");
});

test("robots policy excludes future private surfaces", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Disallow: /admin/");
  expect(body).toContain("Disallow: /moderation/");
  expect(body).toContain("Disallow: /api/");
});
