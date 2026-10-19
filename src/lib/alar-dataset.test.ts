import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { findShardForQuery, searchAlarEntries, type AlarEntry, type AlarManifest } from "@/lib/alar-dataset";

const dataDirectory = resolve(process.cwd(), "public/data/alar");
const manifest = JSON.parse(readFileSync(resolve(dataDirectory, "manifest.json"), "utf8")) as AlarManifest;

describe("Alar dictionary dataset", () => {
  it("publishes the complete attributed corpus as bounded shards", () => {
    expect(manifest.license).toBe("ODC-ODbL 1.0");
    expect(manifest.entryCount).toBe(156650);
    expect(manifest.distinctHeadwordCount).toBe(139991);
    expect(manifest.definitionCount).toBe(247674);
    expect(manifest.shards).toHaveLength(50);
    expect(manifest.shards.reduce((total, shard) => total + shard.count, 0)).toBe(manifest.entryCount);
    for (const shard of manifest.shards) expect(statSync(resolve(dataDirectory, shard.file)).size).toBeGreaterThan(0);
  });

  it("selects a Kannada initial and ranks exact matches first", () => {
    const shard = findShardForQuery("ಕನ್ನಡ", manifest.shards);
    expect(shard?.head).toBe("ಕ");
    const entries: AlarEntry[] = [
      { id: 1, word: "ಕನ್ನಡಿಗ", pronunciation: "kannaḍiga", origin: "", note: "", definitions: [{ meaning: "a Kannada person", type: "noun" }] },
      { id: 2, word: "ಕನ್ನಡ", pronunciation: "kannaḍa", origin: "", note: "", definitions: [{ meaning: "Kannada language", type: "noun" }] },
    ];
    expect(searchAlarEntries("ಕನ್ನಡ", entries).map(({ id }) => id)).toEqual([2, 1]);
    expect(searchAlarEntries("language", entries)[0]?.word).toBe("ಕನ್ನಡ");
  });
});
