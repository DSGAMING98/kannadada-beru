import { describe, expect, it } from "vitest";
import { canTransitionContribution, contributionAudioSchema, contributionDraftSchema } from "@/lib/contribution-contract";

describe("community contribution contract", () => {
  it("accepts a bounded, consented draft", () => {
    expect(contributionDraftSchema.safeParse({
      expressionKannada: "ಪರೀಕ್ಷೆ", romanization: "pareekshe", englishMeaning: "test", usageExampleKannada: "ಇದು ಪರೀಕ್ಷೆಗಾಗಿ ಮಾತ್ರ.", localityText: "Human review pending", linguisticRegionSlug: "hale-mysuru", evidenceNote: "Source evidence must be checked by an authorized human reviewer.", audio: null,
      consent: { granted: true, termsVersion: "pilot-v1", grantedAt: "2026-10-15T00:00:00.000Z", attributionPreference: "anonymous" },
    }).success).toBe(true);
  });

  it("rejects unsupported, oversized, and overlong audio metadata", () => {
    const base = { fileName: "sample.webm", mimeType: "audio/webm", sizeBytes: 1_000, durationMs: 1_000, sha256: "a".repeat(64) };
    expect(contributionAudioSchema.safeParse(base).success).toBe(true);
    expect(contributionAudioSchema.safeParse({ ...base, mimeType: "audio/mpeg" }).success).toBe(false);
    expect(contributionAudioSchema.safeParse({ ...base, sizeBytes: 10 * 1024 * 1024 + 1 }).success).toBe(false);
    expect(contributionAudioSchema.safeParse({ ...base, durationMs: 120_001 }).success).toBe(false);
  });

  it("prevents privilege escalation and self-approval", () => {
    expect(canTransitionContribution({ from: "submitted", to: "under_review", actorRole: "contributor", actorId: "author", contributorId: "author" })).toBe(false);
    expect(canTransitionContribution({ from: "under_review", to: "approved", actorRole: "reviewer", actorId: "author", contributorId: "author" })).toBe(false);
    expect(canTransitionContribution({ from: "under_review", to: "approved", actorRole: "reviewer", actorId: "reviewer", contributorId: "author" })).toBe(true);
  });

  it("allows contributors to submit corrections and withdraw their own records", () => {
    expect(canTransitionContribution({ from: "needs_correction", to: "submitted", actorRole: "contributor", actorId: "author", contributorId: "author" })).toBe(true);
    expect(canTransitionContribution({ from: "submitted", to: "withdrawn", actorRole: "contributor", actorId: "author", contributorId: "author" })).toBe(true);
    expect(canTransitionContribution({ from: "submitted", to: "withdrawn", actorRole: "contributor", actorId: "other", contributorId: "author" })).toBe(false);
  });
});
