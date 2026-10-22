import promptData from "../../data/regional-audio-prompts.json";
import type { PronunciationRegionId } from "@/lib/pronunciation-audio";

export type RegionalPrompt = {
  id: string;
  number: number;
  meaningEnglish: string;
  meaningKannada: string;
  speakerDirection: string;
};

export type PublishedRegionalRecording = {
  id: string;
  promptId: string;
  regionId: PronunciationRegionId;
  transcriptKannada: string;
  romanization: string;
  audioPath: string;
  speakerCredit: string;
  attributionPreference: "anonymous" | "display_name" | "full_name";
  districtGrewUp: string;
  yearsLivedThere: number;
  recordedAt: string;
  permission: "project-only" | "CC0-1.0" | "CC-BY-4.0";
  reviewedAt: string;
  reviewerCredit: string;
  verificationStatus: "human-reviewed";
};

export type RegionalAudioManifest = {
  schemaVersion: 1;
  generatedAt: string | null;
  recordings: PublishedRegionalRecording[];
};

export const regionalPrompts = promptData satisfies RegionalPrompt[];
export const regionalAudioManifestPath = "/audio/regional/manifest.json";

const regionIds = new Set<PronunciationRegionId>(["mysuru", "dharwad", "kalaburagi"]);
const promptIds = new Set(regionalPrompts.map(({ id }) => id));

export function parseRegionalAudioManifest(value: unknown): RegionalAudioManifest {
  if (!value || typeof value !== "object") throw new Error("Regional audio manifest is not an object.");
  const manifest = value as Partial<RegionalAudioManifest>;
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.recordings)) throw new Error("Regional audio manifest has an unsupported schema.");
  const seen = new Set<string>();
  for (const recording of manifest.recordings) {
    if (!recording || typeof recording !== "object") throw new Error("Regional audio entry is invalid.");
    if (!promptIds.has(recording.promptId) || !regionIds.has(recording.regionId)) throw new Error("Regional audio entry has an unknown prompt or region.");
    if (recording.verificationStatus !== "human-reviewed") throw new Error("Only human-reviewed regional audio may be published.");
    if (!recording.audioPath.startsWith("/audio/regional/")) throw new Error("Regional audio must use the approved public path.");
    for (const field of ["id", "transcriptKannada", "speakerCredit", "districtGrewUp", "recordedAt", "reviewedAt", "reviewerCredit"] as const) {
      if (typeof recording[field] !== "string" || !recording[field].trim()) throw new Error(`Regional audio entry is missing ${field}.`);
    }
    const slot = `${recording.promptId}:${recording.regionId}`;
    if (seen.has(slot)) throw new Error(`Duplicate regional audio slot: ${slot}.`);
    seen.add(slot);
  }
  return manifest as RegionalAudioManifest;
}

export function getCompletePromptIds(recordings: readonly PublishedRegionalRecording[]) {
  const regionsByPrompt = new Map<string, Set<PronunciationRegionId>>();
  for (const recording of recordings) {
    const regions = regionsByPrompt.get(recording.promptId) ?? new Set<PronunciationRegionId>();
    regions.add(recording.regionId);
    regionsByPrompt.set(recording.promptId, regions);
  }
  return new Set([...regionsByPrompt].filter(([, regions]) => regions.size === 3).map(([promptId]) => promptId));
}
