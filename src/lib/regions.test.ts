import { describe, expect, it } from "vitest";
import { getRegionBySlug, getRegionsForDistrict, regionSchema, regions } from "@/lib/regions";

describe("region data", () => {
  it("validates every seeded region and unique route id", () => {
    const slugs = regions.map((region) => regionSchema.parse(region).slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("preserves Kannada strings", () => { expect(regions.every((region) => /[\u0C80-\u0CFF]/u.test(region.nameKannada))).toBe(true); });
  it("handles known and unknown identifiers", () => { expect(getRegionBySlug("karaavali")?.nameKannada).toBe("ಕರಾವಳಿ"); expect(getRegionBySlug("not-real")).toBeUndefined(); });
  it("keeps research labels explicitly provisional", () => { expect(regions.every((region) => region.verificationStatus === "research_candidate")).toBe(true); });
  it("supports district-to-region discovery without equating the two", () => { expect(getRegionsForDistrict("udupi").map(({ slug }) => slug)).toContain("karaavali"); expect(getRegionsForDistrict("chitradurga")).toEqual([]); });
  it("represents Tulu as a distinct coastal language with official provenance", () => {
    const tulu = getRegionBySlug("karaavali")?.languageProfiles.find(({ nameEnglish }) => nameEnglish === "Tulu");
    expect(tulu?.nameKannada).toBe("ತುಳು");
    expect(tulu?.relationship).toContain("Distinct Dravidian language");
    expect(tulu?.sourceUrl).toMatch(/^https:\/\/(dk\.nic\.in|censusindia\.gov\.in)/);
  });
});
