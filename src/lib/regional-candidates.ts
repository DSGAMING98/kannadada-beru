import { z } from "zod";
import { normalizeSearch } from "@/lib/expressions";
import { regions } from "@/lib/regions";

const candidateSourceSchema = z.object({
  title: z.string().min(1),
  publisher: z.string().min(1),
  author: z.string().min(1),
  publishedAt: z.string().min(1),
  url: z.url(),
  rightsNote: z.string().min(1),
});

export const regionalCandidateSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  displayForm: z.string().min(1),
  scriptKind: z.enum(["kannada", "source_romanized"]),
  romanization: z.string().min(1),
  englishMeaning: z.string().min(1),
  standardKannadaEquivalent: z.string().nullable(),
  recordType: z.enum(["word", "greeting", "phrase"]),
  regionSlug: z.string().min(1),
  locality: z.string().min(1),
  culturalContext: z.string().min(1),
  evidenceNote: z.string().min(1),
  source: candidateSourceSchema,
  reviewStatus: z.literal("native_review_pending"),
  audioStatus: z.literal("none"),
});

export type RegionalCandidate = z.infer<typeof regionalCandidateSchema>;

const northKarnatakaSource = {
  title: "ಧಾರವಾಡ ಕನ್ನಡದಾಗ ಏನಿಲ್ಲ?",
  publisher: "Kannada Oneindia",
  author: "Mahesh Gajabar, Chikkodi",
  publishedAt: "15 June 2010",
  url: "https://kannada.oneindia.com/literature/articles/2010/0612-north-karnataka-kannada-dialect.html",
  rightsNote: "The linked article remains with its publisher. This card preserves only a short attributed lexical research lead; broader reuse rights are not asserted.",
};

const kundapuraSource = {
  title: "What do the movies Bilindar, Girmit, Ammachi Yemba Nenapu and Kadal have in common?",
  publisher: "The New Indian Express",
  author: "New Indian Express staff report quoting dictionary chief editor Panju Ganguli",
  publishedAt: "5 November 2023",
  url: "https://www.newindianexpress.com/good-news/2023/Nov/05/karnataka-what-do-the-movies-bilindar-girmit-ammachi-yemba-nenapu-and-kadal-have-in-common-2630188.html",
  rightsNote: "The linked report remains copyright of its publisher. This card cites a brief form reported in the article and does not reproduce the article or dictionary.",
};

const northContext = "The source presents this form in a public word list associated with North Karnataka and Dharwad speech. Usage may differ across communities and localities.";
const coastalContext = "The source reports this form while describing Kundapura Kannada in Kundapura, Brahmavar, Byndoor, and parts of Hebri taluk in Udupi district.";

export const regionalCandidates = z.array(regionalCandidateSchema).parse([
  {
    id: "north-agadee", displayForm: "ಅಗದೀ", scriptKind: "kannada", romanization: "agadee", englishMeaning: "very; very much", standardKannadaEquivalent: "ತುಂಬ", recordType: "word", regionSlug: "uttara-karnataka", locality: "North Karnataka; source author identified with Chikkodi, Belagavi", culturalContext: northContext, evidenceNote: "Source-documented spelling and meaning. Exact distribution and contemporary usage still need independent native-speaker review.", source: northKarnatakaSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "north-ullagaddi", displayForm: "ಉಳ್ಳಾಗಡ್ಡಿ", scriptKind: "kannada", romanization: "ullagaddi", englishMeaning: "onion", standardKannadaEquivalent: "ಈರುಳ್ಳಿ", recordType: "word", regionSlug: "uttara-karnataka", locality: "North Karnataka; source author identified with Chikkodi, Belagavi", culturalContext: northContext, evidenceNote: "Source-documented lexical alternative. It is not claimed to be exclusive to one district or used by every northern speaker.", source: northKarnatakaSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "north-usuku", displayForm: "ಉಸುಕು", scriptKind: "kannada", romanization: "usuku", englishMeaning: "sand", standardKannadaEquivalent: "ಮರಳು", recordType: "word", regionSlug: "uttara-karnataka", locality: "North Karnataka; source author identified with Chikkodi, Belagavi", culturalContext: northContext, evidenceNote: "Source-documented spelling and meaning. Pronunciation and locality range remain unverified by the project.", source: northKarnatakaSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "north-undi", displayForm: "ಉಂಡಿ", scriptKind: "kannada", romanization: "undi", englishMeaning: "laddu; a round sweet", standardKannadaEquivalent: "ಲಾಡು", recordType: "word", regionSlug: "uttara-karnataka", locality: "North Karnataka; source author identified with Chikkodi, Belagavi", culturalContext: northContext, evidenceNote: "The source supplies the lexical meaning. Food terminology can travel widely, so regional exclusivity is not asserted.", source: northKarnatakaSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "north-oni", displayForm: "ಓಣಿ", scriptKind: "kannada", romanization: "oni", englishMeaning: "lane; neighbourhood street", standardKannadaEquivalent: "ಗಲ್ಲಿ / ಬಡಾವಣೆಯ ರಸ್ತೆ", recordType: "word", regionSlug: "uttara-karnataka", locality: "North Karnataka; source author identified with Chikkodi, Belagavi", culturalContext: northContext, evidenceNote: "The source links this form with a lane or neighbourhood road. Broader geographic use still needs review.", source: northKarnatakaSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "coastal-hwai-hengidri", displayForm: "Hwai hengidri", scriptKind: "source_romanized", romanization: "Hwai hengidri", englishMeaning: "Hello, how are you?", standardKannadaEquivalent: null, recordType: "greeting", regionSlug: "karaavali", locality: "Kundapura and surrounding Udupi-district taluks", culturalContext: coastalContext, evidenceNote: "The publisher supplies only a Latin-script rendering. The project does not invent a Kannada-script spelling or regional pronunciation.", source: kundapuraSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "coastal-na-alli-hothe", displayForm: "Na alli hothe", scriptKind: "source_romanized", romanization: "Na alli hothe", englishMeaning: "I am going there", standardKannadaEquivalent: "Nanu allige hoguthene (source rendering)", recordType: "phrase", regionSlug: "karaavali", locality: "Kundapura and surrounding Udupi-district taluks", culturalContext: coastalContext, evidenceNote: "Reported by the chief editor of a Kundapura Kannada dictionary. Exact Kannada spelling and pronunciation await native review.", source: kundapuraSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
  {
    id: "coastal-barka", displayForm: "Barka, barka", scriptKind: "source_romanized", romanization: "Barka, barka", englishMeaning: "Should I write and bring?", standardKannadaEquivalent: "Baredukondu barbeka (source rendering)", recordType: "phrase", regionSlug: "karaavali", locality: "Kundapura and surrounding Udupi-district taluks", culturalContext: coastalContext, evidenceNote: "The report uses this example to illustrate economy of words. It remains a source quotation awaiting project-specific native review.", source: kundapuraSource, reviewStatus: "native_review_pending", audioStatus: "none",
  },
]);

export function searchRegionalCandidates(query: string, regionSlug = "all", records: readonly RegionalCandidate[] = regionalCandidates): RegionalCandidate[] {
  const needle = normalizeSearch(query);
  return records.filter((record) => {
    if (regionSlug !== "all" && record.regionSlug !== regionSlug) return false;
    if (!needle) return true;
    const region = regions.find(({ slug }) => slug === record.regionSlug);
    const fields = [record.displayForm, record.romanization, record.englishMeaning, record.standardKannadaEquivalent ?? "", record.locality, record.recordType, region?.nameKannada ?? "", region?.nameEnglish ?? "", region?.romanizedName ?? ""];
    return fields.some((field) => normalizeSearch(field).includes(needle));
  });
}

export function getRegionalCandidatesForRegion(regionSlug: string): RegionalCandidate[] {
  return regionalCandidates.filter((record) => record.regionSlug === regionSlug);
}

export const regionalCandidateCounts = {
  total: regionalCandidates.length,
  withAudio: regionalCandidates.filter(({ audioStatus }) => audioStatus !== "none").length,
};

const regionSlugs = new Set(regions.map(({ slug }) => slug));
for (const record of regionalCandidates) {
  if (!regionSlugs.has(record.regionSlug)) throw new Error(`Unknown region on research candidate ${record.id}`);
}
