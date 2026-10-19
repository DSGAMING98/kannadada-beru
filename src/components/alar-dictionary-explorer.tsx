"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { BookOpenText, ExternalLink, LoaderCircle, Search, ShieldCheck } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { PronounceButton } from "@/components/pronounce-button";
import {
  alarEntryUrl,
  findShardForQuery,
  searchAlarEntries,
  type AlarEntry,
  type AlarManifest,
  type AlarShard,
} from "@/lib/alar-dataset";

const PAGE_SIZE = 24;

export function AlarDictionaryExplorer() {
  const language = useInterfaceLanguage();
  const [manifest, setManifest] = useState<AlarManifest | null>(null);
  const [selectedShard, setSelectedShard] = useState<AlarShard | null>(null);
  const [entries, setEntries] = useState<AlarEntry[]>([]);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/alar/manifest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Dictionary manifest unavailable");
        return response.json() as Promise<AlarManifest>;
      })
      .then((nextManifest) => {
        setManifest(nextManifest);
        setStatus("loading");
        setSelectedShard(nextManifest.shards.find(({ head }) => head === "ಕ") ?? nextManifest.shards[0]);
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedShard) return;
    const controller = new AbortController();
    fetch(`/data/alar/${selectedShard.file}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Dictionary shard unavailable");
        return response.json() as Promise<AlarEntry[]>;
      })
      .then((nextEntries) => {
        setEntries(nextEntries);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [selectedShard]);

  const results = useMemo(() => searchAlarEntries(deferredQuery, entries), [deferredQuery, entries]);
  const visibleResults = results.slice(0, visibleCount);

  return (
    <section className="shell dictionary-workspace" aria-labelledby="dictionary-title">
      <div className="dictionary-summary">
        <div>
          <p className="eyebrow">{language === "kn" ? "ಮುಕ್ತ ಕನ್ನಡ ನಿಘಂಟು" : "Open Kannada dictionary"}</p>
          <h2 id="dictionary-title">{language === "kn" ? "ಅಲರ್ ಪದಸಾಗರ" : "The Alar word ocean"}</h2>
          <p>{language === "kn" ? "ಕನ್ನಡ ಪದವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಅಕ್ಷರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ಅಗತ್ಯವಿರುವ ಅಕ್ಷರದ ಭಾಗವನ್ನು ಮಾತ್ರ ತಾಣವು ತರಿಸುತ್ತದೆ." : "Enter a Kannada word or choose an initial. The app fetches only that letter's shard, keeping the experience fast."}</p>
        </div>
        <dl>
          <div><dt>{language === "kn" ? "ದಾಖಲೆಗಳು" : "Entries"}</dt><dd>{manifest?.entryCount.toLocaleString("en-IN") ?? "156,650"}</dd></div>
          <div><dt>{language === "kn" ? "ವಿಶಿಷ್ಟ ಪದರೂಪಗಳು" : "Distinct headwords"}</dt><dd>{manifest?.distinctHeadwordCount.toLocaleString("en-IN") ?? "139,991"}</dd></div>
          <div><dt>{language === "kn" ? "ಅರ್ಥಗಳು" : "Definitions"}</dt><dd>{manifest?.definitionCount.toLocaleString("en-IN") ?? "247,674"}</dd></div>
        </dl>
      </div>

      <div className="dictionary-integrity">
        <ShieldCheck aria-hidden="true" />
        <p>{language === "kn" ? "ಇದು V. Krishna ಅವರ Alar Kannada–English Dictionaryಯ ODC-ODbL 1.0 ಪದಸಂಗ್ರಹ. ಇದು ಸಮಗ್ರತೆಯ ಭರವಸೆ ನೀಡುವುದಿಲ್ಲ, ಪ್ರಾದೇಶಿಕ ಬಳಕೆಯ ಪುರಾವೆಯಲ್ಲ, ಮತ್ತು ‘ಕೇಳಿ’ ಧ್ವನಿ ಸಾಧನದಿಂದ ಸೃಷ್ಟಿಯಾಗುತ್ತದೆ—ಮಾನವ ಧ್ವನಿಮುದ್ರಣವಲ್ಲ." : "This is V. Krishna's Alar Kannada–English corpus under ODC-ODbL 1.0. No dictionary can guarantee every living word; these entries are not regional-use evidence, and Hear uses device speech—not human audio."}</p>
      </div>

      <div className="dictionary-controls">
        <label className="dictionary-search">
          <span>{language === "kn" ? "ಕನ್ನಡ ಪದ ಅಥವಾ ಆಯ್ದ ಅಕ್ಷರದಲ್ಲಿನ ಅರ್ಥ" : "Kannada word or meaning within the selected initial"}</span>
          <span><Search aria-hidden="true" /><input value={query} onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            setVisibleCount(PAGE_SIZE);
            const matchingShard = manifest ? findShardForQuery(value, manifest.shards) : null;
            if (matchingShard && matchingShard.file !== selectedShard?.file) {
              setStatus("loading");
              setEntries([]);
              setSelectedShard(matchingShard);
            }
          }} placeholder={language === "kn" ? "ಉದಾ: ಕನ್ನಡ, ಮನೆ, ನೀರು" : "For example: ಕನ್ನಡ, ಮನೆ, ನೀರು"} /></span>
        </label>
        <p>{language === "kn" ? "ಇಂಗ್ಲಿಷ್ ಅರ್ಥ ಹುಡುಕಾಟವು ಆಯ್ದ ಅಕ್ಷರದೊಳಗೆ ನಡೆಯುತ್ತದೆ. ಕನ್ನಡ ಪದ ನಮೂದಿಸಿದರೆ ಸರಿಯಾದ ಅಕ್ಷರ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಆಯ್ಕೆಯಾಗುತ್ತದೆ." : "English meaning search stays within the selected initial. Typing a Kannada word automatically chooses its initial."}</p>
      </div>

      <div className="dictionary-alphabet" role="group" aria-label={language === "kn" ? "ಆರಂಭದ ಅಕ್ಷರ" : "Dictionary initial"}>
        {manifest?.shards.filter(({ head }) => head !== "ಇತರೆ").map((shard) => (
          <button key={shard.file} type="button" aria-pressed={selectedShard?.file === shard.file} onClick={() => { setStatus("loading"); setEntries([]); setSelectedShard(shard); setVisibleCount(PAGE_SIZE); }}>
            <span lang="kn">{shard.head}</span><small>{shard.count.toLocaleString("en-IN")}</small>
          </button>
        ))}
      </div>

      <div className="dictionary-result-bar" aria-live="polite">
        <span>{selectedShard ? <><strong lang="kn">{selectedShard.head}</strong> · {selectedShard.count.toLocaleString("en-IN")} {language === "kn" ? "ದಾಖಲೆಗಳು" : "entries"}</> : null}</span>
        <span>{status === "ready" ? `${results.length.toLocaleString("en-IN")} ${language === "kn" ? "ಫಲಿತಾಂಶಗಳು" : "matches"}` : ""}</span>
      </div>

      {status === "loading" && <div className="dictionary-state"><LoaderCircle className="spin" aria-hidden="true" /><p>{language === "kn" ? "ಪದಸಂಗ್ರಹವನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ…" : "Opening this dictionary shard…"}</p></div>}
      {status === "error" && <div className="dictionary-state"><BookOpenText aria-hidden="true" /><h3>{language === "kn" ? "ಈಗ ಪದಸಂಗ್ರಹ ತೆರೆಯಲಾಗಲಿಲ್ಲ" : "The dictionary could not be opened"}</h3><p>{language === "kn" ? "ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಪುಟವನ್ನು ಮರುತೆರೆಯಿರಿ." : "Check the connection and reload the page."}</p></div>}
      {status === "ready" && results.length === 0 && <div className="dictionary-state"><BookOpenText aria-hidden="true" /><h3>{language === "kn" ? "ಈ ಅಕ್ಷರದಲ್ಲಿ ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ" : "No match in this initial"}</h3><p>{language === "kn" ? "ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಮತ್ತೊಂದು ರೂಪ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಬೇರೆ ಅಕ್ಷರ ಆಯ್ಕೆ ಮಾಡಿ." : "Try another Kannada spelling or choose a different initial."}</p></div>}

      {status === "ready" && visibleResults.length > 0 && <div className="dictionary-grid">
        {visibleResults.map((entry) => <article className="dictionary-entry" key={entry.id}>
          <div className="word-row"><div><h3 lang="kn">{entry.word}</h3>{entry.pronunciation && <p className="dictionary-phone">{entry.pronunciation}</p>}</div><PronounceButton text={entry.word} /></div>
          <ol>{entry.definitions.slice(0, 4).map((definition, index) => <li key={`${entry.id}-${index}`}><span>{definition.meaning}</span>{definition.type && <small>{definition.type}</small>}</li>)}</ol>
          {entry.definitions.length > 4 && <p className="dictionary-more">+{entry.definitions.length - 4} {language === "kn" ? "ಹೆಚ್ಚಿನ ಅರ್ಥಗಳು ಮೂಲದಲ್ಲಿ" : "more definitions at source"}</p>}
          {(entry.origin || entry.note) && <p className="dictionary-note">{[entry.origin, entry.note].filter(Boolean).join(" · ")}</p>}
          <a className="text-link" href={alarEntryUrl(entry.word)} target="_blank" rel="noreferrer">Alar source <ExternalLink size={13} /></a>
        </article>)}
      </div>}

      {status === "ready" && visibleCount < results.length && <div className="dictionary-load-more"><button className="button button-secondary" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>{language === "kn" ? "ಇನ್ನಷ್ಟು ಪದಗಳನ್ನು ತೋರಿಸಿ" : "Show more words"}</button></div>}

      <p className="source-label dictionary-attribution">Database: © V. Krishna, Alar Kannada–English Dictionary · ODC-ODbL 1.0 · <a href="https://github.com/alar-dict/data" target="_blank" rel="noreferrer">source and licence</a> · <Link href="/language">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಪುರಾವೆ ಹುಡುಕಿ" : "Search regional evidence"}</Link></p>
    </section>
  );
}
