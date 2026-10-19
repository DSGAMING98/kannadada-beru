import { describe, expect, it } from "vitest";
import { vocabularyRecords } from "@/lib/vocabulary";
import { createWordGame } from "@/lib/word-game";

describe("Kannada word game", () => {
  it("creates ten deterministic, answerable bilingual rounds", () => {
    const rounds = createWordGame(vocabularyRecords, 20261017, 10);
    expect(rounds).toHaveLength(10);
    expect(rounds).toEqual(createWordGame(vocabularyRecords, 20261017, 10));
    for (const round of rounds) {
      expect(round.options).toHaveLength(4);
      expect(new Set(round.options).size).toBe(4);
      expect(round.options).toContain(round.answer);
    }
  });
});
