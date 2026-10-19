import { z } from "zod";
import { normalizeSearch } from "@/lib/expressions";

// The 40-record Alar-derived data block below is distributed under
// ODC-ODbL 1.0; see THIRD_PARTY_NOTICES.md. Application helper code remains MIT.

const vocabularyCategorySchema = z.enum([
  "people",
  "place",
  "nature",
  "food",
  "learning",
  "culture",
  "everyday",
]);

export const vocabularyRecordSchema = z.object({
  id: z.string().regex(/^alar-[a-z0-9-]+$/),
  wordKannada: z.string().min(1),
  romanization: z.string().min(1),
  romanizedAliases: z.array(z.string()).min(1),
  meaningEnglish: z.string().min(1),
  category: vocabularyCategorySchema,
  sourceUrl: z.url(),
  sourceName: z.literal("Alar Kannada–English Dictionary"),
  sourceLicense: z.literal("ODC-ODbL 1.0"),
  recordStatus: z.literal("source_backed_reference"),
  regionalClaim: z.literal(false),
  humanReviewedForKannadadaBeru: z.literal(false),
});

export type VocabularyRecord = z.infer<typeof vocabularyRecordSchema>;

const alarUrl = (word: string) => `https://alar.ink/dictionary/kannada/english/${encodeURIComponent(word)}`;
const record = (
  id: string,
  wordKannada: string,
  romanization: string,
  romanizedAliases: string[],
  meaningEnglish: string,
  category: z.infer<typeof vocabularyCategorySchema>,
) => ({
  id: `alar-${id}`,
  wordKannada,
  romanization,
  romanizedAliases,
  meaningEnglish,
  category,
  sourceUrl: alarUrl(wordKannada),
  sourceName: "Alar Kannada–English Dictionary" as const,
  sourceLicense: "ODC-ODbL 1.0" as const,
  recordStatus: "source_backed_reference" as const,
  regionalClaim: false as const,
  humanReviewedForKannadadaBeru: false as const,
});

/**
 * A deliberately small, attributed reference subset—not a mirror of Alar.
 * Meanings are compact editorial glosses of the linked dictionary senses.
 * These records are useful for lookup but make no regional or human-approval claim.
 */
export const vocabularyRecords: VocabularyRecord[] = z.array(vocabularyRecordSchema).parse([
  record("mane", "ಮನೆ", "mane", ["mane"], "house; home", "place"),
  record("neeru", "ನೀರು", "nīru", ["neeru", "niru"], "water", "nature"),
  record("ooru", "ಊರು", "ūru", ["ooru", "uru"], "village, town, or home place", "place"),
  record("maatu", "ಮಾತು", "mātu", ["maatu", "matu"], "speech; word; something said", "everyday"),
  record("mannu", "ಮಣ್ಣು", "maṇṇu", ["mannu"], "soil; earth", "nature"),
  record("beru", "ಬೇರು", "bēru", ["beru"], "root of a plant; origin", "nature"),
  record("hola", "ಹೊಲ", "hola", ["hola"], "agricultural field", "place"),
  record("male", "ಮಳೆ", "maḷe", ["male", "mazhe"], "rain", "nature"),
  record("bele", "ಬೆಳೆ", "beḷe", ["bele"], "crop; cultivated produce; to grow", "nature"),
  record("habba", "ಹಬ್ಬ", "habba", ["habba"], "festival; celebration", "culture"),
  record("nadi", "ನದಿ", "nadi", ["nadi"], "river", "nature"),
  record("betta", "ಬೆಟ್ಟ", "beṭṭa", ["betta"], "hill", "nature"),
  record("kaadu", "ಕಾಡು", "kāḍu", ["kaadu", "kadu"], "forest; wild land", "nature"),
  record("hoovu", "ಹೂವು", "hūvu", ["hoovu", "huvu"], "flower", "nature"),
  record("mara", "ಮರ", "mara", ["mara"], "tree; wood", "nature"),
  record("hannu", "ಹಣ್ಣು", "haṇṇu", ["hannu"], "fruit", "food"),
  record("haalu", "ಹಾಲು", "hālu", ["haalu", "halu"], "milk", "food"),
  record("anna", "ಅನ್ನ", "anna", ["anna"], "cooked rice; food", "food"),
  record("oota", "ಊಟ", "ūṭa", ["oota", "uta"], "meal; food", "food"),
  record("pustaka", "ಪುಸ್ತಕ", "pustaka", ["pustaka"], "book", "learning"),
  record("shaale", "ಶಾಲೆ", "śāle", ["shaale", "shale"], "school", "learning"),
  record("geleya", "ಗೆಳೆಯ", "geḷeya", ["geleya"], "male friend; companion", "people"),
  record("kutumba", "ಕುಟುಂಬ", "kuṭumba", ["kutumba"], "family; household", "people"),
  record("taayi", "ತಾಯಿ", "tāyi", ["taayi", "tayi"], "mother", "people"),
  record("tande", "ತಂದೆ", "tande", ["tande"], "father", "people"),
  record("magu", "ಮಗು", "magu", ["magu"], "child; baby", "people"),
  record("haadu", "ಹಾಡು", "hāḍu", ["haadu", "hadu"], "song; to sing", "culture"),
  record("kathe", "ಕಥೆ", "kathe", ["kathe"], "story; narrative", "culture"),
  record("daari", "ದಾರಿ", "dāri", ["daari", "dari"], "way; path; route", "place"),
  record("dina", "ದಿನ", "dina", ["dina"], "day", "everyday"),
  record("raatri", "ರಾತ್ರಿ", "rātri", ["raatri", "ratri"], "night", "everyday"),
  record("kelasa", "ಕೆಲಸ", "kelasa", ["kelasa"], "work; task", "everyday"),
  record("kai", "ಕೈ", "kai", ["kai"], "hand", "everyday"),
  record("kannu", "ಕಣ್ಣು", "kaṇṇu", ["kannu"], "eye", "everyday"),
  record("nagu", "ನಗು", "nagu", ["nagu"], "smile; laugh", "everyday"),
  record("preeti", "ಪ್ರೀತಿ", "prīti", ["preeti", "priti"], "love; affection", "everyday"),
  record("jeevana", "ಜೀವನ", "jīvana", ["jeevana", "jivana"], "life", "everyday"),
  record("samudra", "ಸಮುದ್ರ", "samudra", ["samudra"], "sea; ocean", "nature"),
  record("gaali", "ಗಾಳಿ", "gāḷi", ["gaali", "gali"], "wind; air", "nature"),
  record("benki", "ಬೆಂಕಿ", "beṅki", ["benki"], "fire", "nature"),
]);

export function searchVocabulary(query: string, records: readonly VocabularyRecord[] = vocabularyRecords): VocabularyRecord[] {
  const needle = normalizeSearch(query);
  if (!needle) return [...records];
  return records.filter((item) => [
    item.wordKannada,
    item.romanization,
    item.meaningEnglish,
    item.category,
    ...item.romanizedAliases,
  ].some((value) => normalizeSearch(value).includes(needle)));
}

export const vocabularyCounts = {
  sourceBacked: vocabularyRecords.length,
  humanReviewedRegional: 0,
  regionalAudio: 0,
};
