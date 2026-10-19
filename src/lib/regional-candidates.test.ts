import { describe, expect, it } from "vitest";
import { getRegionalCandidatesForRegion, regionalCandidateCounts, regionalCandidates, searchRegionalCandidates } from "@/lib/regional-candidates";

describe("regional research candidates", () => {
  it("publishes a small cited candidate layer without claiming approval or audio", () => {
    expect(regionalCandidates).toHaveLength(8);
    expect(regionalCandidateCounts).toEqual({ total: 8, withAudio: 0 });
    expect(regionalCandidates.every(({ reviewStatus }) => reviewStatus === "native_review_pending")).toBe(true);
    expect(regionalCandidates.every(({ source }) => source.url.startsWith("https://"))).toBe(true);
  });

  it("searches Kannada, source Romanization, English meaning, and region", () => {
    expect(searchRegionalCandidates("ಉಳ್ಳಾಗಡ್ಡಿ").map(({ id }) => id)).toEqual(["north-ullagaddi"]);
    expect(searchRegionalCandidates("hothe").map(({ id }) => id)).toEqual(["coastal-na-alli-hothe"]);
    expect(searchRegionalCandidates("sand").map(({ id }) => id)).toEqual(["north-usuku"]);
    expect(searchRegionalCandidates("Coastal Karnataka")).toHaveLength(3);
  });

  it("keeps region filtering explicit", () => {
    expect(getRegionalCandidatesForRegion("uttara-karnataka")).toHaveLength(5);
    expect(getRegionalCandidatesForRegion("karaavali")).toHaveLength(3);
    expect(searchRegionalCandidates("", "hale-mysuru")).toEqual([]);
  });
});
