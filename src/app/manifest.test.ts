import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("PWA manifest", () => {
  it("contains installability fields", () => {
    const value = manifest();
    expect(value.name).toContain("Kannadada Beru");
    expect(value.id).toBe("/");
    expect(value.start_url).toBe("/");
    expect(value.scope).toBe("/");
    expect(value.display).toBe("standalone");
    expect(value.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ sizes: "192x192" }),
      expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
    ]));
  });
});
