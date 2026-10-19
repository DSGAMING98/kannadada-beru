import type { Region } from "@/lib/regions";
import { getRegionBySlug, regions } from "@/lib/regions";
import type { PublicExpression } from "@/lib/expressions";
import { approvedExpressions, expressions } from "@/lib/expressions";
import type { ContributionDraft } from "@/lib/contribution-contract";

export type DataMode = "local-readonly" | "supabase";

export interface RegionRepository {
  readonly mode: DataMode;
  listRegions(): Promise<Region[]>;
  findRegion(slug: string): Promise<Region | undefined>;
  submitContribution(): Promise<never>;
}

export interface ExpressionRepository {
  readonly mode: DataMode;
  listApprovedExpressions(): Promise<PublicExpression[]>;
  importReviewedExpressions(): Promise<never>;
}

export interface ContributionReceipt {
  id: string;
  status: "pending_review";
  submittedAt: string;
}

export interface ContributionRepository {
  readonly mode: "supabase";
  submitContribution(draft: ContributionDraft, userAccessToken: string): Promise<ContributionReceipt>;
}

export interface SupabasePublicConfig {
  url: string;
  anonKey: string;
}

class LocalRegionRepository implements RegionRepository {
  readonly mode = "local-readonly" as const;
  async listRegions() { return structuredClone(regions); }
  async findRegion(slug: string) { return structuredClone(getRegionBySlug(slug)); }
  async submitContribution(): Promise<never> {
    throw new Error("Contributions are disabled in local read-only mode.");
  }
}

class LocalExpressionRepository implements ExpressionRepository {
  readonly mode = "local-readonly" as const;
  async listApprovedExpressions() { return structuredClone(approvedExpressions(expressions)); }
  async importReviewedExpressions(): Promise<never> { throw new Error("Expression imports require the offline review workflow and are disabled in the public application."); }
}

export function createRegionRepository(): RegionRepository {
  // Supabase integration is intentionally deferred until credentials and server-side policies are configured.
  return new LocalRegionRepository();
}

export function createExpressionRepository(): ExpressionRepository { return new LocalExpressionRepository(); }

export function createSupabaseContributionRepository(
  config: SupabasePublicConfig,
  fetcher: typeof fetch = fetch,
): ContributionRepository {
  const baseUrl = config.url.replace(/\/$/u, "");
  const request = async (path: string, accessToken: string, init?: RequestInit) => {
    if (!accessToken) throw new Error("An authenticated Supabase access token is required.");
    const response = await fetcher(`${baseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    if (!response.ok) throw new Error(`Supabase request failed with status ${response.status}.`);
    return response;
  };

  return {
    mode: "supabase",
    async submitContribution(draft, userAccessToken) {
      const contributorResponse = await request("contributors?select=id&limit=1", userAccessToken);
      const contributors = await contributorResponse.json() as Array<{ id: string }>;
      if (!contributors[0]) throw new Error("The authenticated user does not have a contributor profile.");

      const regionResponse = await request(
        `linguistic_regions?select=id&slug=eq.${encodeURIComponent(draft.linguisticRegionSlug)}&limit=1`,
        userAccessToken,
      );
      const regionRows = await regionResponse.json() as Array<{ id: string }>;
      if (!regionRows[0]) throw new Error("The selected research region is not available in the configured project.");

      const response = await request("contribution_submissions?select=id,verification_status,submitted_at", userAccessToken, {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          contributor_id: contributors[0].id,
          expression_text: draft.expressionKannada,
          proposed_meaning: draft.englishMeaning,
          proposed_region_id: regionRows[0].id,
          evidence_note: `${draft.evidenceNote}\nRomanization: ${draft.romanization}\nUsage: ${draft.usageExampleKannada}\nLocality: ${draft.localityText}`,
          verification_status: "pending_review",
        }),
      });
      const rows = await response.json() as Array<{ id: string; verification_status: "pending_review"; submitted_at: string }>;
      if (!rows[0]) throw new Error("Supabase did not return a contribution receipt.");
      return { id: rows[0].id, status: rows[0].verification_status, submittedAt: rows[0].submitted_at };
    },
  };
}
