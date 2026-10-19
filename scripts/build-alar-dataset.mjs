import { readFile, mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "yaml";

const inputPath = process.argv[2];

if (!inputPath) {
  throw new Error("Usage: node scripts/build-alar-dataset.mjs <path-to-alar.yml>");
}

const outputDirectory = resolve("public/data/alar");
const expectedOutput = resolve("public/data/alar");

if (outputDirectory !== expectedOutput) {
  throw new Error("Refusing to write outside public/data/alar");
}

const source = await readFile(resolve(inputPath), "utf8");
const records = parse(source);

if (!Array.isArray(records) || records.length < 100_000) {
  throw new Error("The supplied Alar corpus is missing or unexpectedly small.");
}

await mkdir(outputDirectory, { recursive: true });
for (const filename of await readdir(outputDirectory)) {
  if (/^(manifest|shard-\d+)\.json$/.test(filename)) {
    await unlink(resolve(outputDirectory, filename));
  }
}

const groups = new Map();
let definitionCount = 0;
const distinctHeadwords = new Set();

for (const sourceRecord of records) {
  const word = String(sourceRecord.entry ?? "").normalize("NFC").trim();
  const head = String(sourceRecord.head ?? word[0] ?? "ಇತರೆ").normalize("NFC").trim() || "ಇತರೆ";
  const definitions = Array.isArray(sourceRecord.defs)
    ? sourceRecord.defs
        .map((definition) => ({
          meaning: String(definition.entry ?? "").trim(),
          type: String(definition.type ?? "").trim(),
        }))
        .filter(({ meaning }) => meaning.length > 0)
    : [];

  if (!word || definitions.length === 0) continue;

  definitionCount += definitions.length;
  distinctHeadwords.add(word);
  const compactRecord = {
    id: Number(sourceRecord.id),
    word,
    pronunciation: String(sourceRecord.phone ?? "").trim(),
    origin: String(sourceRecord.origin ?? "").trim(),
    note: String(sourceRecord.info ?? "").trim(),
    definitions,
  };
  const group = groups.get(head) ?? [];
  group.push(compactRecord);
  groups.set(head, group);
}

const collator = new Intl.Collator("kn");
const sortedGroups = [...groups.entries()].sort(([left], [right]) => collator.compare(left, right));
const shards = [];

for (const [index, [head, entries]] of sortedGroups.entries()) {
  entries.sort((left, right) => collator.compare(left.word, right.word));
  const file = `shard-${String(index + 1).padStart(2, "0")}.json`;
  await writeFile(resolve(outputDirectory, file), JSON.stringify(entries));
  shards.push({ head, file, count: entries.length });
}

const manifest = {
  schemaVersion: 1,
  title: "Alar Kannada–English Dictionary",
  publisher: "V. Krishna / Alar",
  sourceUrl: "https://github.com/alar-dict/data",
  sourceRevision: "alar-dict/data master downloaded 2026-10-17",
  license: "ODC-ODbL 1.0",
  entryCount: shards.reduce((total, shard) => total + shard.count, 0),
  distinctHeadwordCount: distinctHeadwords.size,
  definitionCount,
  shards,
};

await writeFile(resolve(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));
