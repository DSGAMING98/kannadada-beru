import { z } from "zod";

export const communityRoleSchema = z.enum(["visitor", "contributor", "reviewer", "moderator", "administrator"]);
export const contributionStateSchema = z.enum(["draft", "submitted", "under_review", "approved", "rejected", "needs_correction", "needs_evidence", "withdrawn"]);

export const contributionAudioSchema = z.object({
  fileName: z.string().min(1).max(180),
  mimeType: z.enum(["audio/webm", "audio/ogg", "audio/wav", "audio/mp4"]),
  sizeBytes: z.number().int().positive().max(10 * 1024 * 1024),
  durationMs: z.number().int().min(500).max(120_000),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
});

export const publicationConsentSchema = z.object({
  granted: z.literal(true),
  termsVersion: z.string().min(1).max(40),
  grantedAt: z.iso.datetime(),
  attributionPreference: z.enum(["full_name", "display_name", "anonymous"]),
});

export const contributionDraftSchema = z.object({
  expressionKannada: z.string().trim().min(1).max(200),
  romanization: z.string().trim().min(1).max(240),
  englishMeaning: z.string().trim().min(1).max(500),
  usageExampleKannada: z.string().trim().min(1).max(800),
  localityText: z.string().trim().min(1).max(160),
  linguisticRegionSlug: z.string().regex(/^[a-z0-9-]+$/),
  evidenceNote: z.string().trim().min(10).max(2_000),
  audio: contributionAudioSchema.nullable(),
  consent: publicationConsentSchema,
});

export type CommunityRole = z.infer<typeof communityRoleSchema>;
export type ContributionState = z.infer<typeof contributionStateSchema>;
export type ContributionDraft = z.infer<typeof contributionDraftSchema>;

const reviewRoles = new Set<CommunityRole>(["reviewer", "moderator", "administrator"]);

export function canTransitionContribution(input: { from: ContributionState; to: ContributionState; actorRole: CommunityRole; actorId: string; contributorId: string }): boolean {
  const { from, to, actorRole, actorId, contributorId } = input;
  const ownsContribution = actorId === contributorId;
  if (to === "withdrawn") return actorRole === "administrator" || (actorRole === "contributor" && ownsContribution && from !== "withdrawn");
  if (actorRole === "contributor" && ownsContribution) return (from === "draft" || from === "needs_correction" || from === "needs_evidence") && to === "submitted";
  if (!reviewRoles.has(actorRole) || ownsContribution) return false;
  if (from === "submitted") return to === "under_review";
  if (from === "under_review") return ["approved", "rejected", "needs_correction", "needs_evidence"].includes(to);
  return false;
}
