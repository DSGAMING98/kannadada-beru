import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const inbox = path.join(root, "regional-audio-intake", "inbox");
const output = path.join(root, "public", "audio", "regional");
const prompts = JSON.parse(await readFile(path.join(root, "data", "regional-audio-prompts.json"), "utf8"));
const promptIds = new Set(prompts.map(({ id }) => id));
const regionIds = new Set(["mysuru", "dharwad", "kalaburagi"]);
const extensions = new Set([".ogg", ".wav", ".mp3", ".webm", ".m4a", ".mp4"]);
const requiredChecks = ["transcriptMatchesAudio", "meaningMatchesPrompt", "regionSelfReported", "speakerApproved", "communityReviewed", "rightsChecked"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hasSupportedSignature(buffer, extension) {
  if (extension === ".ogg") return buffer.subarray(0, 4).toString("ascii") === "OggS";
  if (extension === ".wav") return buffer.subarray(0, 4).toString("ascii") === "RIFF";
  if (extension === ".webm") return buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  if (extension === ".m4a" || extension === ".mp4") return buffer.subarray(4, 8).toString("ascii") === "ftyp";
  if (extension === ".mp3") return buffer.subarray(0, 3).toString("ascii") === "ID3" || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0);
  return false;
}

const entries = await readdir(inbox, { withFileTypes: true });
const sidecars = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));
const verified = [];
const seen = new Set();

for (const sidecar of sidecars) {
  const metadata = JSON.parse(await readFile(path.join(inbox, sidecar.name), "utf8"));
  assert(metadata.schemaVersion === 1, `${sidecar.name}: unsupported schema.`);
  assert(promptIds.has(metadata.promptId), `${sidecar.name}: unknown promptId.`);
  assert(regionIds.has(metadata.regionId), `${sidecar.name}: unknown regionId.`);
  const slot = `${metadata.promptId}:${metadata.regionId}`;
  assert(!seen.has(slot), `${sidecar.name}: duplicate slot ${slot}.`);
  seen.add(slot);
  for (const field of ["transcriptKannada", "districtGrewUp", "recordedAt", "consentReference", "reviewerCredit", "reviewedAt", "speakerCredit"]) {
    assert(typeof metadata[field] === "string" && metadata[field].trim(), `${sidecar.name}: ${field} is required.`);
  }
  assert(/[\u0C80-\u0CFF]/u.test(metadata.transcriptKannada), `${sidecar.name}: transcriptKannada must contain Kannada script.`);
  assert(Number.isFinite(metadata.yearsLivedThere) && metadata.yearsLivedThere >= 1, `${sidecar.name}: yearsLivedThere must be at least 1.`);
  assert(metadata.adultConfirmed === true, `${sidecar.name}: adult confirmation is required.`);
  assert(metadata.permissionToPublish === true, `${sidecar.name}: publication permission is required.`);
  assert(["project-only", "CC0-1.0", "CC-BY-4.0"].includes(metadata.permission), `${sidecar.name}: unsupported permission.`);
  assert(["anonymous", "display_name", "full_name"].includes(metadata.attributionPreference), `${sidecar.name}: unsupported attribution preference.`);
  for (const check of requiredChecks) assert(metadata.review?.[check] === true, `${sidecar.name}: review.${check} must be true.`);

  const sourceName = path.basename(metadata.audioFileName ?? "");
  const extension = path.extname(sourceName).toLowerCase();
  assert(extensions.has(extension), `${sidecar.name}: unsupported audio extension.`);
  const sourcePath = path.join(inbox, sourceName);
  const audio = await readFile(sourcePath);
  assert(audio.byteLength >= 1024, `${sidecar.name}: audio file is too small.`);
  assert(hasSupportedSignature(audio, extension), `${sidecar.name}: audio signature does not match ${extension}.`);
  const publicName = `${metadata.promptId}-${metadata.regionId}${extension}`;
  verified.push({ metadata, sourcePath, publicName, bytes: audio.byteLength, sha256: createHash("sha256").update(audio).digest("hex") });
}

const completePromptIds = new Set(prompts.filter(({ id }) => ["mysuru", "dharwad", "kalaburagi"].every((regionId) => verified.some(({ metadata }) => metadata.promptId === id && metadata.regionId === regionId))).map(({ id }) => id));
const publishable = verified.filter(({ metadata }) => completePromptIds.has(metadata.promptId));

await mkdir(output, { recursive: true });
for (const entry of await readdir(output, { withFileTypes: true })) {
  if (entry.isFile() && entry.name !== "manifest.json") await rm(path.join(output, entry.name));
}
for (const item of publishable) await copyFile(item.sourcePath, path.join(output, item.publicName));

const recordings = publishable.map(({ metadata, publicName, bytes, sha256 }) => ({
  id: `${metadata.promptId}-${metadata.regionId}`,
  promptId: metadata.promptId,
  regionId: metadata.regionId,
  transcriptKannada: metadata.transcriptKannada.trim(),
  romanization: (metadata.romanization ?? "").trim(),
  audioPath: `/audio/regional/${publicName}`,
  speakerCredit: metadata.attributionPreference === "anonymous" ? "Anonymous consenting speaker" : metadata.speakerCredit.trim(),
  attributionPreference: metadata.attributionPreference,
  districtGrewUp: metadata.districtGrewUp.trim(),
  yearsLivedThere: metadata.yearsLivedThere,
  recordedAt: metadata.recordedAt,
  permission: metadata.permission,
  reviewedAt: metadata.reviewedAt,
  reviewerCredit: metadata.reviewerCredit.trim(),
  verificationStatus: "human-reviewed",
  bytes,
  sha256,
})).sort((a, b) => a.promptId.localeCompare(b.promptId) || a.regionId.localeCompare(b.regionId));

await writeFile(path.join(output, "manifest.json"), `${JSON.stringify({ schemaVersion: 1, generatedAt: recordings.length ? new Date().toISOString() : null, recordings }, null, 2)}\n`);
console.log(`Validated ${verified.length} recording(s); published ${recordings.length} recording(s) across ${completePromptIds.size} complete prompt set(s).`);
if (verified.length !== 15) console.log(`${15 - verified.length} of 15 requested recordings are still missing.`);
