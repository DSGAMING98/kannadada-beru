import { describe, expect, it, vi } from "vitest";
import { contributionDraftSchema } from "@/lib/contribution-contract";
import { createExpressionRepository, createRegionRepository, createSupabaseContributionRepository } from "@/lib/repository";

describe("local repository fallback", () => {
  it("works without credentials and remains read-only", async () => {
    const repository = createRegionRepository();
    expect(repository.mode).toBe("local-readonly");
    expect((await repository.listRegions()).length).toBeGreaterThan(0);
    await expect(repository.submitContribution()).rejects.toThrow("read-only");
  });
  it("exposes only approved public expressions and blocks browser imports", async () => { const repository = createExpressionRepository(); expect(await repository.listApprovedExpressions()).toEqual([]); await expect(repository.importReviewedExpressions()).rejects.toThrow("disabled"); });
  it("submits through the authenticated Supabase REST boundary without a service-role key", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: "contributor-1" }]), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: "region-1" }]), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: "submission-1", verification_status: "pending_review", submitted_at: "2026-10-15T00:00:00.000Z" }]), { status: 201 }));
    const repository = createSupabaseContributionRepository({ url: "https://project.supabase.co", anonKey: "public-anon-key" }, fetcher);
    const draft = contributionDraftSchema.parse({ expressionKannada: "ಪದ", romanization: "pada", englishMeaning: "word", usageExampleKannada: "ಇದು ಒಂದು ಪದವಾಗಿದೆ.", localityText: "Test locality", linguisticRegionSlug: "hale-mysuru", evidenceNote: "Source details for independent review.", audio: null, consent: { granted: true, termsVersion: "test", grantedAt: "2026-10-15T00:00:00.000Z", attributionPreference: "anonymous" } });
    await expect(repository.submitContribution(draft, "user-token")).resolves.toEqual({ id: "submission-1", status: "pending_review", submittedAt: "2026-10-15T00:00:00.000Z" });
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher.mock.calls[2]?.[1]?.headers).toMatchObject({ apikey: "public-anon-key", Authorization: "Bearer user-token" });
    expect(JSON.parse(String(fetcher.mock.calls[2]?.[1]?.body))).toMatchObject({ contributor_id: "contributor-1", verification_status: "pending_review" });
  });
});
