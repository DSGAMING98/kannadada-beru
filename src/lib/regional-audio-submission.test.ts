import { describe, expect, it } from "vitest";
import { regionalAudioSubmissionSchema } from "@/lib/regional-audio-submission";

const validSubmission = {
  schemaVersion: 1 as const,
  submissionId: "0a7fcb1d-7f2a-46dc-b0a8-b18bde69194e",
  promptId: "warm-greeting",
  regionId: "mysuru",
  transcriptKannada: "ಹೇಗಿದ್ದೀರಿ?",
  romanization: "hegiddiri?",
  districtGrewUp: "Mysuru",
  yearsLivedThere: 20,
  recordedAt: "2026-10-22",
  attributionPreference: "anonymous",
  speakerCredit: "Anonymous consenting speaker",
  contactEmail: "",
  permission: "project-only",
  adultConfirmed: true as const,
  consentToReviewAndPublish: true as const,
  consentName: "Consenting speaker",
  website: "" as const,
};

describe("regional audio contribution metadata", () => {
  it("accepts a complete consent-led submission", () => {
    expect(regionalAudioSubmissionSchema.parse(validSubmission)).toEqual(validSubmission);
  });

  it("rejects a transcript without Kannada script", () => {
    expect(regionalAudioSubmissionSchema.safeParse({ ...validSubmission, transcriptKannada: "hegiddiri" }).success).toBe(false);
  });

  it("rejects missing publication consent", () => {
    expect(regionalAudioSubmissionSchema.safeParse({ ...validSubmission, consentToReviewAndPublish: false }).success).toBe(false);
  });

  it("rejects unknown prompt and region values", () => {
    expect(regionalAudioSubmissionSchema.safeParse({ ...validSubmission, promptId: "invented", regionId: "invented" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(regionalAudioSubmissionSchema.safeParse({ ...validSubmission, website: "spam.example" }).success).toBe(false);
  });
});
