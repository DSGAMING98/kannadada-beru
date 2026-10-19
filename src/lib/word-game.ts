import type { VocabularyRecord } from "@/lib/vocabulary";

export type WordGameRound = {
  word: string;
  pronunciation: string;
  prompt: string;
  answer: string;
  options: string[];
  direction: "kannada_to_english" | "english_to_kannada";
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], random: () => number) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createWordGame(records: readonly VocabularyRecord[], seed: number, roundCount = 10): WordGameRound[] {
  if (records.length < 4) throw new Error("At least four vocabulary records are required.");
  const random = seededRandom(seed);
  return shuffle(records, random).slice(0, Math.min(roundCount, records.length)).map((record, index) => {
    const direction = index % 2 === 0 ? "kannada_to_english" : "english_to_kannada";
    const answer = direction === "kannada_to_english" ? record.meaningEnglish : record.wordKannada;
    const distractors = shuffle(records.filter(({ id }) => id !== record.id), random)
      .map((candidate) => direction === "kannada_to_english" ? candidate.meaningEnglish : candidate.wordKannada)
      .filter((value, candidateIndex, values) => value !== answer && values.indexOf(value) === candidateIndex)
      .slice(0, 3);
    return {
      word: record.wordKannada,
      pronunciation: record.romanization,
      prompt: direction === "kannada_to_english" ? record.wordKannada : record.meaningEnglish,
      answer,
      options: shuffle([answer, ...distractors], random),
      direction,
    };
  });
}
