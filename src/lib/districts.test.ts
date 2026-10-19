import { describe, expect, it } from "vitest";
import { districtByHistoricalName, districtSchema, districts, getDistrictBySlug, searchDistricts } from "@/lib/districts";

describe("current Karnataka district directory", () => {
  it("contains 31 unique, validated district records", () => { expect(districts).toHaveLength(31); expect(new Set(districts.map((item) => districtSchema.parse(item).slug)).size).toBe(31); });
  it("uses Bengaluru South as the current name while retaining Ramanagara provenance", () => { const district = getDistrictBySlug("bengaluru-south"); expect(district?.formerNames).toContain("Ramanagara"); expect(districtByHistoricalName.get("Ramanagara")?.slug).toBe("bengaluru-south"); });
  it("does not invent a Vijayanagara feature in 2011 geometry", () => { expect(getDistrictBySlug("vijayanagara")?.geometry.availability).toBe("not-in-bundled-map"); });
  it("searches Kannada, current names, former names, and headquarters", () => { expect(searchDistricts("ಮೈಸೂರು")[0]?.slug).toBe("mysuru"); expect(searchDistricts("Gulbarga")[0]?.slug).toBe("kalaburagi"); expect(searchDistricts("Hosapete")[0]?.slug).toBe("vijayanagara"); });
  it("gives every district a bilingual history and at least three places to explore", () => {
    expect(districts.every(({ learning }) => learning.history.kn.length > 20 && learning.history.en.length > 20)).toBe(true);
    expect(districts.every(({ learning }) => learning.character.kn.length > 20 && learning.character.en.length > 20)).toBe(true);
    expect(districts.every(({ learning }) => learning.highlights.length >= 3 && learning.highlights.every(({ name, description }) => name.kn && name.en && description.kn && description.en))).toBe(true);
  });
});
