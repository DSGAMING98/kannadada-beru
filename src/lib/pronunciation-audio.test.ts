import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { pronunciationComparisonWords, pronunciationRegions, searchPronunciationWords } from "@/lib/pronunciation-audio";

describe("Kannada pronunciation pilot", () => {
  it("publishes twelve source-identified generic Kannada references", () => {
    expect(pronunciationComparisonWords).toHaveLength(12);
    for (const item of pronunciationComparisonWords) {
      expect(item.reference).toMatchObject({
        language: "Kannada",
        licence: "CC0 1.0",
        verificationStatus: "source_identified",
        regionClaim: "none",
        transcriptReviewed: false,
      });
      expect(item.reference.sourceFilePage).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      const file = path.resolve(process.cwd(), "public", item.reference.audioPath.replace(/^\//, ""));
      expect(fs.existsSync(file), file).toBe(true);
      expect(fs.readFileSync(file).subarray(0, 4).toString("ascii")).toBe("OggS");
    }
  });

  it("keeps a checksum-backed provenance record for every bundled clip", () => {
    const manifestPath = path.resolve(process.cwd(), "public/audio/kannada/manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as { items: Array<{ slug: string; bytes: number; sha256: string; speakerRegion: null }> };
    expect(manifest.items).toHaveLength(12);
    for (const item of manifest.items) {
      const file = path.resolve(process.cwd(), `public/audio/kannada/${item.slug}.ogg`);
      const audio = fs.readFileSync(file);
      expect(audio.byteLength).toBe(item.bytes);
      expect(createHash("sha256").update(audio).digest("hex")).toBe(item.sha256);
      expect(item.speakerRegion).toBeNull();
    }
  });

  it("keeps all three regional slots disabled until provenance exists", () => {
    expect(pronunciationRegions.map(({ id }) => id)).toEqual(["mysuru", "dharwad", "kalaburagi"]);
    for (const item of pronunciationComparisonWords) {
      expect(Object.keys(item.regionalSlots)).toEqual(["mysuru", "dharwad", "kalaburagi"]);
      for (const slot of Object.values(item.regionalSlots)) {
        expect(slot).toMatchObject({ status: "recording_needed", recording: null });
      }
    }
  });

  it("searches Kannada, Romanized Kannada, and English meaning", () => {
    expect(searchPronunciationWords("ನೀರು").map(({ id }) => id)).toEqual(["neeru"]);
    expect(searchPronunciationWords("neeru").map(({ id }) => id)).toEqual(["neeru"]);
    expect(searchPronunciationWords("water").map(({ id }) => id)).toEqual(["neeru"]);
  });
});
