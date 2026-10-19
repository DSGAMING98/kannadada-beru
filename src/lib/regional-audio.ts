export type RegionalAudioSample = {
  id: string;
  regionSlug: string;
  languageEnglish: string;
  languageKannada: string;
  transcript: string;
  romanization: string;
  meaningEnglish: string;
  meaningKannada: string;
  audioUrl: string;
  sourceUrl: string;
  speaker: string;
  recordedAt: string;
  licenseName: string;
  licenseUrl: string;
  provenanceNote: string;
  locality: string;
  speakerMetadataConfidence: "limited" | "moderate" | "high";
  audioType: "isolated_word" | "read" | "spontaneous" | "conversational" | "other";
  rightsVerified: boolean;
  linguisticReviewStatus: "source_identified" | "community_reviewed";
  publicationApproved: boolean;
};

export const regionalAudioSamples: readonly RegionalAudioSample[] = [
  {
    id: "tulu-kudla-commons-2021",
    regionSlug: "karaavali",
    languageEnglish: "Tulu",
    languageKannada: "ತುಳು",
    transcript: "ಕುಡ್ಲ",
    romanization: "Kudla",
    meaningEnglish: "The Tulu name for Mangaluru",
    meaningKannada: "ಮಂಗಳೂರಿನ ತುಳು ಹೆಸರು",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Tcy-%E0%B2%95%E0%B3%81%E0%B2%A1%E0%B3%8D%E0%B2%B2.ogg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tcy-%E0%B2%95%E0%B3%81%E0%B2%A1%E0%B3%8D%E0%B2%B2.ogg",
    speaker: "Deepakpadukone20",
    recordedAt: "6 August 2021",
    licenseName: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    provenanceNote:
      "The source identifies this as a human Tulu pronunciation of ಕುಡ್ಲ. It does not publish speaker-locality metadata, so no narrower accent claim is made.",
    locality: "Mangaluru name; speaker locality not published",
    speakerMetadataConfidence: "limited",
    audioType: "isolated_word",
    rightsVerified: true,
    linguisticReviewStatus: "source_identified",
    publicationApproved: true,
  },
];

export function getRegionalAudioSamples(regionSlug: string) {
  return regionalAudioSamples.filter((sample) => sample.regionSlug === regionSlug);
}
