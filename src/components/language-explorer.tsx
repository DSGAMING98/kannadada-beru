"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpenText, CheckCircle2, ExternalLink, Search, ShieldCheck } from "lucide-react";
import { PronounceButton } from "@/components/pronounce-button";
import { RegionalCandidateCard } from "@/components/regional-candidate-card";
import { useInterfaceLanguage } from "@/components/interface-language";
import { detectQueryScript, expressions, searchApprovedExpressions } from "@/lib/expressions";
import { getRegionalAudioSamples, regionalAudioSamples } from "@/lib/regional-audio";
import { regionalCandidateCounts, regionalCandidates, searchRegionalCandidates } from "@/lib/regional-candidates";
import { getRegionBySlug, regions } from "@/lib/regions";
import { searchVocabulary, vocabularyCounts, vocabularyRecords } from "@/lib/vocabulary";

type CollectionScope = "all" | "general" | "regional";

export function LanguageExplorer() {
  const language = useInterfaceLanguage();
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get("region") ?? "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [region, setRegion] = useState(regions.some(({ slug }) => slug === initialRegion) ? initialRegion : "all");
  const [scope, setScope] = useState<CollectionScope>(initialRegion === "all" ? "all" : "regional");
  const generalResults = useMemo(
    () => scope === "regional" || region !== "all" ? [] : searchVocabulary(query, vocabularyRecords),
    [query, region, scope],
  );
  const regionalResults = useMemo(
    () => scope === "general" ? [] : searchApprovedExpressions(query, region, expressions),
    [query, region, scope],
  );
  const candidateResults = useMemo(
    () => scope === "general" ? [] : searchRegionalCandidates(query, region, regionalCandidates),
    [query, region, scope],
  );
  const resultCount = generalResults.length + candidateResults.length + regionalResults.length;
  const script = detectQueryScript(query);
  const selectedRegion = region === "all" ? null : getRegionBySlug(region);
  const alarLookup = query.trim()
    ? `https://alar.ink/dictionary/kannada/english/${encodeURIComponent(query.trim())}`
    : "https://alar.ink";
  const copy = language === "kn" ? {
    generalInstead: "ಸಾಮಾನ್ಯ ಕನ್ನಡದಲ್ಲಿ ಹುಡುಕಿ", regionalStatus: "ಈ ಪ್ರದೇಶದ ಸಂಗ್ರಹ",
    sources: "ಆಯ್ದ ಕನ್ನಡ ಪದಗಳು", candidates: "ಪ್ರಕಟಿತ ಮೂಲಗಳ ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು", audio: "ನೈಜ ಮಾನವ ಧ್ವನಿಗಳು", regions: "ಅನ್ವೇಷಣಾ ಪ್ರದೇಶಗಳು", title: "ಕನ್ನಡ ಪದಗಳನ್ನು ಹುಡುಕಿ", help: "ಕನ್ನಡ ಲಿಪಿ, ರೋಮನೀಕೃತ ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಅರ್ಥದಿಂದ ಹುಡುಕಿ. ಸಾಮಾನ್ಯ ಪದಗಳು ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಬಳಕೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಅನ್ವೇಷಿಸಿ.",
  } : {
    generalInstead: "Search general Kannada", regionalStatus: "In this regional collection",
    sources: "curated Kannada words", candidates: "regional usages from published sources", audio: "real human voice recordings", regions: "regions to explore", title: "Search Kannada words", help: "Search Kannada script, Romanized Kannada, or English meanings. Move easily between general vocabulary and documented regional usage.",
  };
  const selectedCandidateCount = selectedRegion ? searchRegionalCandidates("", selectedRegion.slug).length : regionalCandidateCounts.total;
  const selectedAudioCount = selectedRegion ? getRegionalAudioSamples(selectedRegion.slug).length : regionalAudioSamples.length;

  return <section className="shell language-workspace" aria-labelledby="language-search-title">
    <div className="language-stats">
      <div><strong>{vocabularyCounts.sourceBacked}</strong><span>{copy.sources}</span></div>
      <div><strong>{regionalCandidateCounts.total}</strong><span>{copy.candidates}</span></div>
      <div><strong>{regionalAudioSamples.length}</strong><span>{copy.audio}</span></div>
      <div><strong>{regions.length}</strong><span>{copy.regions}</span></div>
    </div>

    <div className="dictionary-launch">
      <BookOpenText aria-hidden="true" />
      <div><strong>{language === "kn" ? "ಇನ್ನಷ್ಟು ಪದಗಳು ಬೇಕೆ? 1,56,650 ಅಲರ್ ದಾಖಲೆಗಳನ್ನು ತೆರೆಯಿರಿ." : "Need more words? Open all 156,650 Alar entries."}</strong><p>{language === "kn" ? "ಇದು ಪ್ರಾದೇಶಿಕ ಪುರಾವೆಯಿಂದ ಪ್ರತ್ಯೇಕವಾದ, ಮೂಲ ಮತ್ತು ಪರವಾನಗಿಯೊಂದಿಗೆ ಪ್ರಕಟಿಸಿದ ಸಾಮಾನ್ಯ ಕನ್ನಡ ನಿಘಂಟು." : "This broad general dictionary is source-attributed, licensed, and kept separate from regional evidence."}</p></div>
      <Link className="button button-secondary" href="/dictionary">{language === "kn" ? "ಪದಸಾಗರ ತೆರೆಯಿರಿ" : "Open dictionary"}</Link>
    </div>

    <div className="language-search-card">
      <div>
        <p className="eyebrow">{language === "kn" ? "ಮೂಲದೊಂದಿಗೆ ಹುಡುಕಿ" : "Search with sources"}</p>
        <h2 id="language-search-title">{copy.title}</h2>
        <p>{copy.help}</p>
      </div>
      <div className="language-controls language-controls-three">
        <label><span>ಪದ ಅಥವಾ ಅರ್ಥ · Word or meaning</span><div className="search-box"><Search aria-hidden="true" /><input aria-label="Word or meaning" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ಮನೆ, neeru, water…" /></div></label>
        <label><span>{language === "kn" ? "ಸಂಗ್ರಹ" : "Collection"}</span><select aria-label="Collection" value={scope} onChange={(event) => setScope(event.target.value as CollectionScope)}><option value="all">{language === "kn" ? "ಎಲ್ಲ ಪದಗಳು" : "All words"}</option><option value="general">{language === "kn" ? "ಸಾಮಾನ್ಯ ಪದಸಂಗ್ರಹ" : "General vocabulary"}</option><option value="regional">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು" : "Regional words"}</option></select></label>
        <label><span>{language === "kn" ? "ಪ್ರದೇಶ" : "Explore by region"}</span><select aria-label="Region" value={region} onChange={(event) => { setRegion(event.target.value); if (event.target.value !== "all") setScope("regional"); }}><option value="all">{language === "kn" ? "ಎಲ್ಲ ಪ್ರದೇಶಗಳು" : "All regions"}</option>{regions.map((item) => <option value={item.slug} key={item.id}>{item.nameKannada} · {item.nameEnglish}</option>)}</select></label>
      </div>
      <div className="search-examples"><span>{language === "kn" ? "ಉದಾಹರಣೆಗಳು" : "Try"}:</span>{["ನೀರು", "neeru", "water"].map((example) => <button type="button" key={example} onClick={() => setQuery(example)}>{example}</button>)}</div>
      <p className="input-indicator" aria-live="polite">{language === "kn" ? "ನಮೂದು" : "Input"}: {script === "empty" ? language === "kn" ? "ವೀಕ್ಷಣಾ ವಿಧಾನ" : "browse mode" : script === "kannada" ? language === "kn" ? "ಕನ್ನಡ ಲಿಪಿ" : "Kannada script" : script === "latin" ? language === "kn" ? "ಲ್ಯಾಟಿನ್ / ಇಂಗ್ಲಿಷ್ / ರೋಮನೀಕೃತ ಕನ್ನಡ" : "Latin / English / Romanized Kannada" : language === "kn" ? "ಮಿಶ್ರ ಲಿಪಿ" : "mixed script"} · {resultCount} {language === "kn" ? "ಫಲಿತಾಂಶಗಳು" : `result${resultCount === 1 ? "" : "s"}`}</p>
    </div>
    {selectedRegion && <div className="regional-status" role="status"><div><strong>{copy.regionalStatus}: {language === "kn" ? selectedRegion.nameKannada : selectedRegion.nameEnglish}</strong><p>{selectedCandidateCount} {language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲಗಳಲ್ಲಿರುವ ನುಡಿಗಳು" : "documented regional usages"}{selectedAudioCount ? ` · ${selectedAudioCount} ${language === "kn" ? "ಮಾನವ ಧ್ವನಿ" : "human voice recording"}` : ""}</p></div><button className="button button-secondary" type="button" onClick={() => { setRegion("all"); setScope("general"); }}>{copy.generalInstead}</button></div>}

    {generalResults.length > 0 && <section className="result-section" aria-labelledby="general-vocabulary-heading">
      <div className="result-heading"><div><p className="eyebrow">{language === "kn" ? "ಸಾಮಾನ್ಯ ಕನ್ನಡ" : "General Kannada"}</p><h2 id="general-vocabulary-heading">{language === "kn" ? "ದೈನಂದಿನ ಕನ್ನಡ ಪದಸಂಗ್ರಹ" : "Everyday Kannada vocabulary"}</h2></div><p>{language === "kn" ? "ವಿಶ್ವಾಸಾರ್ಹ ನಿಘಂಟಿನ ಅರ್ಥ, ರೋಮನೀಕರಣ ಮತ್ತು ಮೂಲ ಕೊಂಡಿಯೊಂದಿಗೆ ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ." : "Explore meanings, Romanization and dictionary links for useful Kannada words."}</p></div>
      <div className="expression-grid">{generalResults.map((record) => <article className="expression-card reference-card" key={record.id}>
        <div className="expression-topline"><span className="reference-badge"><BookOpenText size={14} /> {language === "kn" ? "ನಿಘಂಟಿನ ಪದ" : "Dictionary word"}</span><span>{record.category}</span></div>
        <div className="word-row"><div><h3 lang="kn">{record.wordKannada}</h3><p className="romanized-expression">{record.romanization}</p></div><PronounceButton text={record.wordKannada} /></div>
        <p className="meaning">{record.meaningEnglish}</p>
        <p className="scope-note">{language === "kn" ? "ಸಾಮಾನ್ಯ ಪದ · ಪ್ರಾದೇಶಿಕ ಹೇಳಿಕೆ ಇಲ್ಲ · ಸಾಧನದ ಧ್ವನಿ ನೈಜ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಮುದ್ರಣವಲ್ಲ." : "General vocabulary · No regional claim · Device speech is not an authentic regional recording."}</p>
        <a className="text-link" href={record.sourceUrl} target="_blank" rel="noreferrer">{language === "kn" ? "ಅಲರ್ ಮೂಲ" : "Alar source"} · ODbL <ExternalLink size={14} /></a>
      </article>)}</div>
    </section>}

    {candidateResults.length > 0 && <section className="result-section" aria-labelledby="regional-candidate-heading">
      <div className="result-heading"><div><p className="eyebrow">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು" : "Regional usage"}</p><h2 id="regional-candidate-heading">{language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲಗಳಲ್ಲಿ ಕಂಡ ಪದಗಳು ಮತ್ತು ಮಾತುಗಳು" : "Words and expressions found in published sources"}</h2></div><p>{language === "kn" ? "ಮೂಲದಲ್ಲಿ ಪ್ರಕಟಿಸಿದ ರೂಪ ಮತ್ತು ಅರ್ಥವನ್ನು ಹಾಗೆಯೇ ಉಳಿಸಲಾಗಿದೆ. ಸ್ಥಳ ಮತ್ತು ಸಮುದಾಯದಂತೆ ಬಳಕೆ ಬದಲಾಗಬಹುದು." : "Forms and meanings stay faithful to their cited publications; everyday usage may vary across places and communities."}</p></div>
      <div className="expression-grid">{candidateResults.map((record) => <RegionalCandidateCard key={record.id} record={record} language={language} />)}</div>
    </section>}

    {regionalResults.length > 0 && <section className="result-section" aria-labelledby="regional-expression-heading">
      <div className="result-heading"><div><p className="eyebrow">ಸಮುದಾಯದ ನುಡಿಗಳು</p><h2 id="regional-expression-heading">Expressions shared by the community</h2></div></div>
      <div className="expression-grid">{regionalResults.map((record) => { const recordRegions = record.linguisticRegionSlugs.map(getRegionBySlug).filter(Boolean); return <article className="expression-card" key={record.id}><div className="expression-topline"><span className="verified-badge"><CheckCircle2 size={14} /> Community record</span><span>{record.register}</span></div><h3 lang="kn">{record.expressionKannada}</h3><p className="romanized-expression">{record.romanization}</p><p className="meaning">{record.englishMeaning}</p><blockquote lang="kn">{record.usageExampleKannada}</blockquote><p className="source-label">{record.localityText} · {recordRegions.map((item) => item?.nameEnglish).join(", ")}</p><a className="text-link" href={record.sources[0].url ?? undefined}>{record.sources[0].title}</a></article>; })}</div>
    </section>}

    {resultCount === 0 && <div className="language-empty"><BookOpenText aria-hidden="true" /><p className="eyebrow">ಹುಡುಕಾಟ ಫಲಿತಾಂಶ · Search result</p><h2>{region !== "all" || scope === "regional" ? "No regional match in this collection" : "Try another spelling or meaning"}</h2><p>{region !== "all" || scope === "regional" ? "This regional collection does not contain that word yet. Try the general Kannada collection or explore the full dictionary." : "Search Kannada script, Romanized Kannada, or an English meaning. The full Alar dictionary offers a much broader word collection."}</p><div className="integrity-note"><ShieldCheck aria-hidden="true" /><span>General Kannada words are kept distinct from specifically documented regional usage.</span></div><a className="text-link" href={alarLookup} target="_blank" rel="noreferrer">Search Alar dictionary <ExternalLink size={14} /></a><Link className="text-link" href="/contribute">Share a word from your place</Link></div>}
  </section>;
}
