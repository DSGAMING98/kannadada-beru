import { z } from "zod";
import { districts } from "@/lib/districts";
import { regions } from "@/lib/regions";

export const publicationStateSchema = z.enum(["draft", "pending_review", "approved", "rejected", "needs_evidence"]);
const rightsSchema = z.enum(["cleared", "restricted", "unknown"]);
const sourceSchema = z.object({ id: z.string().min(1), title: z.string().min(1), citation: z.string().min(1), url: z.url().nullable(), license: z.string().nullable(), publicationRights: rightsSchema });
const reviewSchema = z.object({ reviewerId: z.string().min(1), reviewerDisplayName: z.string().min(1), reviewerRole: z.literal("authorized_human"), reviewedAt: z.iso.datetime(), decisionNote: z.string().min(1) });
export const privateAudioSchema = z.object({ id: z.string().min(1), storagePath: z.string().min(1), attribution: z.string().nullable(), consentStatus: z.enum(["granted", "withdrawn"]), publicationRights: rightsSchema, verificationStatus: publicationStateSchema, durationMs: z.number().int().positive().nullable() });

export const expressionSchema = z.object({
  id: z.uuid(), expressionKannada: z.string().min(1), normalizedKannada: z.string().min(1), romanization: z.string().min(1), romanizedAliases: z.array(z.string()), approvedAlternativeSpellings: z.array(z.string()), englishMeaning: z.string().min(1), standardKannadaEquivalent: z.string().nullable(), usageExampleKannada: z.string().min(1), usageExampleEnglish: z.string().nullable(), register: z.enum(["informal", "neutral", "formal", "honorific", "other"]), formalityNote: z.string().nullable(), culturalNotes: z.string().nullable(), linguisticNotes: z.string().nullable(), localityText: z.string().min(1), districtSlugs: z.array(z.string()), linguisticRegionSlugs: z.array(z.string()).min(1), sources: z.array(sourceSchema).min(1), contributorAttribution: z.string().nullable(), evidenceNote: z.string().min(1), verificationStatus: publicationStateSchema, review: reviewSchema.nullable(), audio: z.array(privateAudioSchema), conceptId: z.string().regex(/^[a-z0-9-]+$/).nullable(), createdAt: z.iso.datetime(), updatedAt: z.iso.datetime(),
}).superRefine((record, context) => {
  if (record.normalizedKannada !== normalizeKannada(record.expressionKannada)) context.addIssue({ code: "custom", path: ["normalizedKannada"], message: "normalizedKannada must be the NFC-normalized expression text." });
  if (record.verificationStatus === "approved") {
    if (!record.review) context.addIssue({ code: "custom", path: ["review"], message: "Approved records require an authorized human review record." });
    if (record.sources.some(({ publicationRights }) => publicationRights !== "cleared")) context.addIssue({ code: "custom", path: ["sources"], message: "Every source on an approved public record must have cleared publication rights." });
  }
});

export type ExpressionRecord = z.infer<typeof expressionSchema>;
export type PublicAudio = Omit<z.infer<typeof privateAudioSchema>, "storagePath" | "consentStatus" | "publicationRights" | "verificationStatus">;
export type PublicExpression = Omit<ExpressionRecord, "audio"> & { audio: PublicAudio[] };
export type QueryScript = "empty" | "kannada" | "latin" | "mixed";

// Deliberately empty until evidence, rights, and an authorized human review are supplied.
export const expressions: ExpressionRecord[] = [];

export function normalizeKannada(value: string): string { return value.normalize("NFC").replace(/[\u200B-\u200D\uFEFF]/gu, "").trim().replace(/\s+/gu, " "); }
export function normalizeSearch(value: string): string { return normalizeKannada(value).toLocaleLowerCase("kn"); }
export function detectQueryScript(value: string): QueryScript { const normalized = normalizeSearch(value); if (!normalized) return "empty"; const hasKannada = /[\u0C80-\u0CFF]/u.test(normalized); const hasLatin = /[a-z]/u.test(normalized); return hasKannada && hasLatin ? "mixed" : hasKannada ? "kannada" : "latin"; }

function isApprovedRecord(record: ExpressionRecord): boolean { return record.verificationStatus === "approved" && record.review?.reviewerRole === "authorized_human" && record.sources.every(({ publicationRights }) => publicationRights === "cleared"); }
function isPublicAudio(audio: z.infer<typeof privateAudioSchema>): boolean { return audio.verificationStatus === "approved" && audio.consentStatus === "granted" && audio.publicationRights === "cleared"; }
function isPrivateAudio(audio: z.infer<typeof privateAudioSchema> | PublicAudio): audio is z.infer<typeof privateAudioSchema> { return "storagePath" in audio && "consentStatus" in audio && "publicationRights" in audio && "verificationStatus" in audio; }
export function toPublicExpression(record: ExpressionRecord): PublicExpression { return { ...record, audio: record.audio.filter(isPublicAudio).map(({ id, attribution, durationMs }) => ({ id, attribution, durationMs })) }; }
export function approvedExpressions(records: readonly ExpressionRecord[] = expressions): PublicExpression[] { return records.filter(isApprovedRecord).map(toPublicExpression); }

export function searchApprovedExpressions(query: string, regionSlug = "all", records: readonly ExpressionRecord[] = expressions): PublicExpression[] {
  const needle = normalizeSearch(query);
  return approvedExpressions(records).filter((record) => {
    if (regionSlug !== "all" && !record.linguisticRegionSlugs.includes(regionSlug)) return false;
    if (!needle) return true;
    const regionNames = regions.filter(({ slug }) => record.linguisticRegionSlugs.includes(slug)).flatMap((region) => [region.nameKannada, region.nameEnglish, region.romanizedName, ...region.alternativeNames]);
    const fields = [record.expressionKannada, record.normalizedKannada, record.romanization, record.englishMeaning, record.standardKannadaEquivalent ?? "", record.localityText, ...record.romanizedAliases, ...record.approvedAlternativeSpellings, ...regionNames];
    return fields.some((field) => normalizeSearch(field).includes(needle));
  });
}

export function getExpressionsForRegion(slug: string): PublicExpression[] { return approvedExpressions().filter((record) => record.linguisticRegionSlugs.includes(slug)); }
export function getExpressionsForDistrict(slug: string): PublicExpression[] { return approvedExpressions().filter((record) => record.districtSlugs.includes(slug)); }
export function getApprovedAudioCount(records: readonly (ExpressionRecord | PublicExpression)[] = expressions): number {
  return records.reduce((count, record) => {
    if (!isApprovedRecord(record as ExpressionRecord)) return count;
    return count + record.audio.filter((audio) => !isPrivateAudio(audio) || isPublicAudio(audio)).length;
  }, 0);
}

export const expressionCounts = { approved: approvedExpressions().length, pending: expressions.filter(({ verificationStatus }) => verificationStatus === "pending_review").length, approvedAudio: getApprovedAudioCount() };

const districtSlugs = new Set(districts.map(({ slug }) => slug));
const regionSlugs = new Set(regions.map(({ slug }) => slug));
for (const record of expressions) {
  expressionSchema.parse(record);
  if (record.districtSlugs.some((slug) => !districtSlugs.has(slug))) throw new Error(`Unknown district on expression ${record.id}`);
  if (record.linguisticRegionSlugs.some((slug) => !regionSlugs.has(slug))) throw new Error(`Unknown region on expression ${record.id}`);
}
