export type AlarDefinition = {
  meaning: string;
  type: string;
};

export type AlarEntry = {
  id: number;
  word: string;
  pronunciation: string;
  origin: string;
  note: string;
  definitions: AlarDefinition[];
};

export type AlarShard = {
  head: string;
  file: string;
  count: number;
};

export type AlarManifest = {
  schemaVersion: 1;
  title: string;
  publisher: string;
  sourceUrl: string;
  sourceRevision: string;
  license: "ODC-ODbL 1.0";
  entryCount: number;
  distinctHeadwordCount: number;
  definitionCount: number;
  shards: AlarShard[];
};

export function normalizeDictionarySearch(value: string) {
  return value.normalize("NFC").trim().toLocaleLowerCase("kn");
}

export function findShardForQuery(query: string, shards: readonly AlarShard[]) {
  const normalized = normalizeDictionarySearch(query);
  return shards.find(({ head }) => head !== "ಇತರೆ" && normalized.startsWith(head)) ?? null;
}

export function searchAlarEntries(query: string, entries: readonly AlarEntry[]) {
  const needle = normalizeDictionarySearch(query);
  if (!needle) return [...entries];

  return entries
    .map((entry) => {
      const word = normalizeDictionarySearch(entry.word);
      const searchable = [
        entry.word,
        entry.pronunciation,
        entry.origin,
        entry.note,
        ...entry.definitions.flatMap(({ meaning, type }) => [meaning, type]),
      ].map(normalizeDictionarySearch);
      const rank = word === needle ? 0 : word.startsWith(needle) ? 1 : searchable.some((value) => value.includes(needle)) ? 2 : 3;
      return { entry, rank };
    })
    .filter(({ rank }) => rank < 3)
    .sort((left, right) => left.rank - right.rank || left.entry.word.localeCompare(right.entry.word, "kn"))
    .map(({ entry }) => entry);
}

export function alarEntryUrl(word: string) {
  return `https://alar.ink/dictionary/kannada/english/${encodeURIComponent(word)}`;
}
