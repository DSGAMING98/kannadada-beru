import { describe, expect, it } from "vitest";
import { getRegionalAudioSamples, regionalAudioSamples } from "@/lib/regional-audio";

describe("regional audio catalogue", () => {
  it("publishes the attributed CC0 Tulu pronunciation for Karavali", () => {
    const [sample] = getRegionalAudioSamples("karaavali");
    expect(sample).toMatchObject({
      transcript: "ಕುಡ್ಲ",
      languageEnglish: "Tulu",
      speaker: "Deepakpadukone20",
      licenseName: "CC0 1.0",
    });
    expect(sample.audioUrl).toMatch(/^https:\/\/upload\.wikimedia\.org\//);
    expect(sample.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
  });

  it("does not relabel the sample as another region", () => {
    expect(regionalAudioSamples).toHaveLength(1);
    expect(getRegionalAudioSamples("uttara-karnataka")).toEqual([]);
  });
});
