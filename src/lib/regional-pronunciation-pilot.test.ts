import { describe, expect, it } from "vitest";
import { getCompletePromptIds, parseRegionalAudioManifest, regionalPrompts, type PublishedRegionalRecording } from "@/lib/regional-pronunciation-pilot";

function recording(promptId: string, regionId: PublishedRegionalRecording["regionId"]): PublishedRegionalRecording {
  return {
    id: `${promptId}-${regionId}`,
    promptId,
    regionId,
    transcriptKannada: "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಿ?",
    romanization: "namaskara, hegiddiri?",
    audioPath: `/audio/regional/${promptId}-${regionId}.ogg`,
    speakerCredit: "Anonymous consenting speaker",
    attributionPreference: "anonymous",
    districtGrewUp: regionId,
    yearsLivedThere: 20,
    recordedAt: "2026-10-22",
    permission: "project-only",
    reviewedAt: "2026-10-22",
    reviewerCredit: "reviewer-1",
    verificationStatus: "human-reviewed",
  };
}

describe("regional pronunciation pilot", () => {
  it("defines five identical-meaning prompts for fifteen regional slots", () => {
    expect(regionalPrompts).toHaveLength(5);
    expect(new Set(regionalPrompts.map(({ id }) => id)).size).toBe(5);
    expect(regionalPrompts.every(({ meaningEnglish, meaningKannada }) => meaningEnglish && meaningKannada)).toBe(true);
  });

  it("enables a prompt only after all three regions are human reviewed", () => {
    const promptId = regionalPrompts[0].id;
    expect(getCompletePromptIds([recording(promptId, "mysuru"), recording(promptId, "dharwad")])).not.toContain(promptId);
    expect(getCompletePromptIds([recording(promptId, "mysuru"), recording(promptId, "dharwad"), recording(promptId, "kalaburagi")])).toContain(promptId);
  });

  it("rejects unreviewed or duplicate public manifest entries", () => {
    const first = recording(regionalPrompts[0].id, "mysuru");
    expect(() => parseRegionalAudioManifest({ schemaVersion: 1, generatedAt: null, recordings: [{ ...first, verificationStatus: "pending" }] })).toThrow(/human-reviewed/);
    expect(() => parseRegionalAudioManifest({ schemaVersion: 1, generatedAt: null, recordings: [first, first] })).toThrow(/Duplicate/);
  });
});
