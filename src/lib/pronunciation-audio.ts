export type PronunciationRegionId = "mysuru" | "dharwad" | "kalaburagi";

export type PronunciationRegion = {
  id: PronunciationRegionId;
  nameKannada: string;
  nameEnglish: string;
  localityNote: string;
};

export type KannadaReferenceRecording = {
  audioPath: string;
  sourceFilePage: string;
  sourceDataset: "Wikimedia Commons / Spell4Wiki";
  speaker: string;
  sourceDate: string;
  licence: "CC0 1.0";
  licenceUrl: string;
  language: "Kannada";
  recordingType: "isolated_word";
  transcriptReviewed: false;
  verificationStatus: "source_identified";
  regionClaim: "none";
};

export type RegionalPronunciationSlot = {
  regionId: PronunciationRegionId;
  status: "recording_needed";
  recording: null;
};

export type PronunciationComparisonWord = {
  id: string;
  kannadaWord: string;
  romanization: string;
  meaningEnglish: string;
  meaningKannada: string;
  reference: KannadaReferenceRecording;
  regionalSlots: Record<PronunciationRegionId, RegionalPronunciationSlot>;
};

export const pronunciationRegions: readonly PronunciationRegion[] = [
  { id: "mysuru", nameKannada: "ಮೈಸೂರು ಕನ್ನಡ", nameEnglish: "Mysuru Kannada", localityNote: "Mysuru-region speaker provenance required" },
  { id: "dharwad", nameKannada: "ಧಾರವಾಡ / ಉತ್ತರ ಕರ್ನಾಟಕ", nameEnglish: "Dharwad / North Karnataka", localityNote: "Dharwad or documented North Karnataka speaker provenance required" },
  { id: "kalaburagi", nameKannada: "ಕಲಬುರಗಿ / ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ", nameEnglish: "Kalaburagi / Kalyana Karnataka", localityNote: "Kalaburagi or documented Kalyana Karnataka speaker provenance required" },
] as const;

const sourcePages: Record<string, string> = {
  akka: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%85%E0%B2%95%E0%B3%8D%E0%B2%95.ogg",
  kannada: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%95%E0%B2%A8%E0%B3%8D%E0%B2%A8%E0%B2%A1.ogg",
  gaali: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%97%E0%B2%BE%E0%B2%B3%E0%B2%BF.ogg",
  taayi: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%A4%E0%B2%BE%E0%B2%AF%E0%B2%BF.ogg",
  tande: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%A4%E0%B2%82%E0%B2%A6%E0%B3%86.ogg",
  neeru: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%A8%E0%B3%80%E0%B2%B0%E0%B3%81.ogg",
  pustaka: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%AA%E0%B3%81%E0%B2%B8%E0%B3%8D%E0%B2%A4%E0%B2%95.ogg",
  preeti: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%AA%E0%B3%8D%E0%B2%B0%E0%B3%80%E0%B2%A4%E0%B2%BF.ogg",
  magu: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%AE%E0%B2%97%E0%B3%81.ogg",
  male: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%AE%E0%B2%B3%E0%B3%86.ogg",
  shaale: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%B6%E0%B2%BE%E0%B2%B2%E0%B3%86.ogg",
  haalu: "https://commons.wikimedia.org/wiki/File:Kn-%E0%B2%B9%E0%B2%BE%E0%B2%B2%E0%B3%81.ogg",
};

const sourceDates: Record<string, string> = {
  akka: "6 March 2025", kannada: "8 March 2025", gaali: "8 March 2025", taayi: "16 June 2020",
  tande: "8 March 2025", neeru: "9 March 2025", pustaka: "9 March 2025", preeti: "9 March 2025",
  magu: "9 March 2025", male: "9 March 2025", shaale: "9 March 2025", haalu: "14 March 2025",
};

function slots(): Record<PronunciationRegionId, RegionalPronunciationSlot> {
  return {
    mysuru: { regionId: "mysuru", status: "recording_needed", recording: null },
    dharwad: { regionId: "dharwad", status: "recording_needed", recording: null },
    kalaburagi: { regionId: "kalaburagi", status: "recording_needed", recording: null },
  };
}

function word(
  id: string,
  kannadaWord: string,
  romanization: string,
  meaningEnglish: string,
  meaningKannada: string,
  speaker = "Srf123",
): PronunciationComparisonWord {
  return {
    id,
    kannadaWord,
    romanization,
    meaningEnglish,
    meaningKannada,
    reference: {
      audioPath: `/audio/kannada/${id}.ogg`,
      sourceFilePage: sourcePages[id],
      sourceDataset: "Wikimedia Commons / Spell4Wiki",
      speaker,
      sourceDate: sourceDates[id],
      licence: "CC0 1.0",
      licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      language: "Kannada",
      recordingType: "isolated_word",
      transcriptReviewed: false,
      verificationStatus: "source_identified",
      regionClaim: "none",
    },
    regionalSlots: slots(),
  };
}

export const pronunciationComparisonWords: readonly PronunciationComparisonWord[] = [
  word("akka", "ಅಕ್ಕ", "akka", "elder sister", "ಹಿರಿಯ ಸಹೋದರಿ"),
  word("kannada", "ಕನ್ನಡ", "kannaḍa", "Kannada language", "ಕನ್ನಡ ಭಾಷೆ"),
  word("gaali", "ಗಾಳಿ", "gāḷi", "air; wind", "ಗಾಳಿ; ವಾಯು"),
  word("taayi", "ತಾಯಿ", "tāyi", "mother", "ಅಮ್ಮ; ತಾಯಿ", "Manilpt"),
  word("tande", "ತಂದೆ", "tande", "father", "ಅಪ್ಪ; ತಂದೆ"),
  word("neeru", "ನೀರು", "nīru", "water", "ಜಲ; ನೀರು"),
  word("pustaka", "ಪುಸ್ತಕ", "pustaka", "book", "ಓದುವ ಪುಸ್ತಕ"),
  word("preeti", "ಪ್ರೀತಿ", "prīti", "love; affection", "ಪ್ರೀತಿ; ಮಮತೆ"),
  word("magu", "ಮಗು", "magu", "child", "ಮಗು"),
  word("male", "ಮಳೆ", "maḷe", "rain", "ಮಳೆ"),
  word("shaale", "ಶಾಲೆ", "śāle", "school", "ಶಾಲೆ"),
  word("haalu", "ಹಾಲು", "hālu", "milk", "ಹಾಲು"),
] as const;

export function searchPronunciationWords(query: string) {
  const fold = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("kn");
  const needle = fold(query.trim());
  if (!needle) return [...pronunciationComparisonWords];
  return pronunciationComparisonWords.filter((item) =>
    [item.id, item.kannadaWord, item.romanization, item.meaningEnglish, item.meaningKannada]
      .some((value) => fold(value).includes(needle)),
  );
}
