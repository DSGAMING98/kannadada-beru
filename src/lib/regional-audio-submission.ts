import { z } from "zod";
import { regionalPrompts } from "@/lib/regional-pronunciation-pilot";

const promptIds = regionalPrompts.map(({ id }) => id);

export const regionalAudioSubmissionSchema = z.object({
  schemaVersion: z.literal(1),
  submissionId: z.string().uuid(),
  promptId: z.string().refine((value) => promptIds.includes(value), "Unknown prompt."),
  regionId: z.enum(["mysuru", "dharwad", "kalaburagi"]),
  transcriptKannada: z.string().trim().min(2).max(500).regex(/[\u0C80-\u0CFF]/u, "Transcript must contain Kannada script."),
  romanization: z.string().trim().max(500),
  districtGrewUp: z.string().trim().min(2).max(120),
  yearsLivedThere: z.number().int().min(1).max(100),
  recordedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  attributionPreference: z.enum(["anonymous", "display_name", "full_name"]),
  speakerCredit: z.string().trim().min(2).max(120),
  contactEmail: z.union([z.literal(""), z.string().trim().email().max(200)]),
  permission: z.enum(["project-only", "CC-BY-4.0", "CC0-1.0"]),
  adultConfirmed: z.literal(true),
  consentToReviewAndPublish: z.literal(true),
  consentName: z.string().trim().min(2).max(120),
  website: z.literal(""),
});

export type RegionalAudioSubmission = z.infer<typeof regionalAudioSubmissionSchema>;
