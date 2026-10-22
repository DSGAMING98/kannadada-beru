import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("service worker release policy", () => {
  const source = fs.readFileSync(path.resolve(process.cwd(), "public/sw.js"), "utf8");

  it("pre-caches the public demo shell and maintains an offline fallback", () => {
    for (const route of ["/explore", "/language", "/dictionary", "/voices", "/play", "/compare", "/about", "/offline"]) {
      expect(source).toContain(`"${route}"`);
    }
    expect(source).toContain("caches.match(\"/offline\")");
    expect(source).toContain('"/maplibre-gl-worker.mjs"');
    expect(source).toContain('"/data/karnataka-districts-2011.geojson"');
    expect(source).toContain('"/data/alar/manifest.json"');
    expect(source).toContain('url.pathname.startsWith("/data/alar/")');
    expect(source).toContain('url.pathname.startsWith("/audio/")');
    expect(source).toContain("APPROVED_AUDIO");
  });

  it("does not cache private, contribution, authentication, moderation, or API routes", () => {
    for (const route of ["/api/", "/admin", "/moderation", "/auth", "/contribute"]) {
      expect(source).toContain(`"${route}"`);
    }
    expect(source).toContain("isPublicNavigation");
  });
});
