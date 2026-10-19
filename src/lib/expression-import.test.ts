import { describe, expect, it } from "vitest";
import { validateReviewImport } from "@/lib/expression-import";

describe("review import validation", () => {
  it("rejects fake approval without rights, permission, reviewer, and timestamp", () => { const result = validateReviewImport([{ expression_id: "11111111-1111-4111-8111-111111111111", kannada_expression: "ಪರೀಕ್ಷಾ ದಾಖಲೆ", romanization: "pareekshaa daakhale", english_meaning: "test record", usage_example_kannada: "ಇದು ಪರೀಕ್ಷಾ ದಾಖಲೆ.", region_slugs: "hale-mysuru", district_slugs: "mysuru", locality: "Test locality", source_title: "Test", source_citation: "Test fixture", source_url: "", source_license: "", publication_rights: "unknown", contributor_attribution: "", contributor_permission: "unknown", reviewer_id: "", reviewer_display_name: "", review_status: "approved", reviewed_at: "", evidence_note: "Test-only row", variation_notes: "", register: "neutral", concept_id: "" }]); expect(result.records).toEqual([]); expect(result.errors[0]).toContain("approved records require"); });
  it("returns row-specific validation errors", () => { const result = validateReviewImport([{}]); expect(result.errors[0]).toContain("Row 2"); });
});
