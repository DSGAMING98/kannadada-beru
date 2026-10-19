import { describe, expect, it } from "vitest";
import { searchVocabulary, vocabularyCounts, vocabularyRecords } from "@/lib/vocabulary";

describe("source-backed vocabulary", () => {
  it("publishes a useful attributed starter collection without regional claims", () => {
    expect(vocabularyRecords).toHaveLength(40);
    expect(vocabularyCounts).toEqual({ sourceBacked: 40, humanReviewedRegional: 0, regionalAudio: 0 });
    expect(vocabularyRecords.every((record) => record.sourceLicense === "ODC-ODbL 1.0")).toBe(true);
    expect(vocabularyRecords.every((record) => !record.regionalClaim && !record.humanReviewedForKannadadaBeru)).toBe(true);
  });

  it("searches Kannada, Romanized aliases, English meanings, and categories", () => {
    expect(searchVocabulary("ಮನೆ").map(({ wordKannada }) => wordKannada)).toContain("ಮನೆ");
    expect(searchVocabulary("neeru").map(({ wordKannada }) => wordKannada)).toContain("ನೀರು");
    expect(searchVocabulary("rain").map(({ wordKannada }) => wordKannada)).toContain("ಮಳೆ");
    expect(searchVocabulary("learning").map(({ wordKannada }) => wordKannada)).toEqual(expect.arrayContaining(["ಪುಸ್ತಕ", "ಶಾಲೆ"]));
  });
});
