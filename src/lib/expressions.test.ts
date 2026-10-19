import { describe, expect, it } from "vitest";
import { approvedExpressions, detectQueryScript, expressionCounts, expressionSchema, expressions, getApprovedAudioCount, normalizeKannada, searchApprovedExpressions, type ExpressionRecord } from "@/lib/expressions";

function reviewedFixture(overrides: Partial<ExpressionRecord> = {}): ExpressionRecord {
  return expressionSchema.parse({ id: "11111111-1111-4111-8111-111111111111", expressionKannada: "ಪರೀಕ್ಷಾ ದಾಖಲೆ", normalizedKannada: "ಪರೀಕ್ಷಾ ದಾಖಲೆ", romanization: "pareekshaa daakhale", romanizedAliases: ["pariksha dakhale"], approvedAlternativeSpellings: ["ಪರೀಕ್ಷೆ ದಾಖಲೆ"], englishMeaning: "test record", standardKannadaEquivalent: null, usageExampleKannada: "ಇದು ಪರೀಕ್ಷಾ ದಾಖಲೆ.", usageExampleEnglish: "This is a test record.", register: "neutral", formalityNote: null, culturalNotes: null, linguisticNotes: "Synthetic validation fixture; not public content.", localityText: "Test locality", districtSlugs: ["mysuru"], linguisticRegionSlugs: ["hale-mysuru"], sources: [{ id: "test-source", title: "Test fixture", citation: "Internal automated test fixture", url: "https://example.test/source", license: "Test only", publicationRights: "cleared" }], contributorAttribution: null, evidenceNote: "Used only to test filtering and Unicode matching.", verificationStatus: "approved", review: { reviewerId: "test-reviewer", reviewerDisplayName: "Automated fixture", reviewerRole: "authorized_human", reviewedAt: "2026-10-15T00:00:00.000Z", decisionNote: "Test data only." }, audio: [], conceptId: "test-record", createdAt: "2026-10-15T00:00:00.000Z", updatedAt: "2026-10-15T00:00:00.000Z", ...overrides });
}

describe("expression engine", () => {
  it("keeps the public dataset and derived counts honestly empty", () => { expect(expressions).toEqual([]); expect(expressionCounts).toEqual({ approved: 0, pending: 0, approvedAudio: 0 }); });
  it("requires human review and cleared rights for approval", () => { expect(expressionSchema.safeParse({ ...reviewedFixture(), review: null }).success).toBe(false); expect(expressionSchema.safeParse({ ...reviewedFixture(), sources: [{ ...reviewedFixture().sources[0], publicationRights: "unknown" }] }).success).toBe(false); });
  it("never publishes pending or rejected records", () => { const approved = reviewedFixture(); const pending = { ...approved, id: "22222222-2222-4222-8222-222222222222", verificationStatus: "pending_review" as const, review: null }; expect(approvedExpressions([approved, pending])).toEqual([approved]); });
  it("redacts private paths and excludes audio without every publication gate", () => {
    const fixture = reviewedFixture({
      audio: [
        { id: "public", storagePath: "private/public.wav", attribution: "Speaker-approved attribution", consentStatus: "granted", publicationRights: "cleared", verificationStatus: "approved", durationMs: 1200 },
        { id: "withdrawn", storagePath: "private/withdrawn.wav", attribution: null, consentStatus: "withdrawn", publicationRights: "cleared", verificationStatus: "approved", durationMs: 900 },
        { id: "pending", storagePath: "private/pending.wav", attribution: null, consentStatus: "granted", publicationRights: "cleared", verificationStatus: "pending_review", durationMs: 800 },
        { id: "restricted", storagePath: "private/restricted.wav", attribution: null, consentStatus: "granted", publicationRights: "restricted", verificationStatus: "approved", durationMs: 700 },
      ],
    });
    const [publicRecord] = approvedExpressions([fixture]);
    expect(publicRecord.audio).toEqual([{ id: "public", attribution: "Speaker-approved attribution", durationMs: 1200 }]);
    expect(JSON.stringify(publicRecord)).not.toContain("storagePath");
    expect(JSON.stringify(publicRecord)).not.toContain("private/");
    expect(getApprovedAudioCount([fixture])).toBe(1);
  });
  it("searches Kannada, Romanized aliases, English meaning, and region names", () => { const fixture = reviewedFixture(); expect(searchApprovedExpressions("ಪರೀಕ್ಷಾ", "all", [fixture])).toHaveLength(1); expect(searchApprovedExpressions("pariksha", "all", [fixture])).toHaveLength(1); expect(searchApprovedExpressions("test record", "all", [fixture])).toHaveLength(1); expect(searchApprovedExpressions("Old Mysuru", "all", [fixture])).toHaveLength(1); expect(searchApprovedExpressions("test", "karaavali", [fixture])).toHaveLength(0); });
  it("normalizes safely and reports input script", () => { expect(normalizeKannada(" ಪರೀಕ್ಷಾ\u200B  ದಾಖಲೆ ")).toBe("ಪರೀಕ್ಷಾ ದಾಖಲೆ"); expect(detectQueryScript("ಕನ್ನಡ")).toBe("kannada"); expect(detectQueryScript("kannada")).toBe("latin"); expect(detectQueryScript("ಕನ್ನಡ meaning")).toBe("mixed"); });
});
