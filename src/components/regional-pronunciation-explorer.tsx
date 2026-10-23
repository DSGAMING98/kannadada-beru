"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Headphones, MapPin, Search, ShieldCheck, Volume2 } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { pronunciationComparisonWords, pronunciationRegions, searchPronunciationWords } from "@/lib/pronunciation-audio";
import { getCompletePromptIds, parseRegionalAudioManifest, regionalAudioManifestPath, regionalPrompts, type PublishedRegionalRecording } from "@/lib/regional-pronunciation-pilot";

function GeneralKannadaAudio({ item }: { item: (typeof pronunciationComparisonWords)[number] }) {
  const language = useInterfaceLanguage();
  const [failed, setFailed] = useState(false);
  return <div className="general-pronunciation">
    <div className="general-pronunciation-heading"><Volume2 aria-hidden="true" /><div><strong>{language === "kn" ? "ಸಾಮಾನ್ಯ ಕನ್ನಡದ ಮಾನವ ಧ್ವನಿ" : "General Kannada human reference"}</strong><span>{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಗುರುತು ನೀಡಿಲ್ಲ" : "No regional identity claimed"}</span></div></div>
    {failed ? <p className="audio-error" role="alert">{language === "kn" ? "ಧ್ವನಿ ಈಗ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ಮೂಲದ ಕೊಂಡಿಯನ್ನು ಬಳಸಿ." : "This recording could not be opened. Use the source link instead."}</p> : <audio controls preload="metadata" onError={() => setFailed(true)} aria-label={`${item.kannadaWord} Kannada pronunciation`}><source src={item.reference.audioPath} type="audio/ogg" /></audio>}
    <p className="general-pronunciation-meta">{item.reference.speaker} · {item.reference.sourceDate} · <a href={item.reference.sourceFilePage} target="_blank" rel="noreferrer">Wikimedia Commons <ExternalLink size={12} /></a> · <a href={item.reference.licenceUrl} target="_blank" rel="noreferrer">{item.reference.licence}</a></p>
  </div>;
}

export function RegionalPronunciationExplorer() {
  const language = useInterfaceLanguage();
  const [query, setQuery] = useState("");
  const [regionalRecordings, setRegionalRecordings] = useState<PublishedRegionalRecording[]>([]);
  const [manifestFailed, setManifestFailed] = useState(false);
  const results = useMemo(() => searchPronunciationWords(query), [query]);
  const completePromptIds = useMemo(() => getCompletePromptIds(regionalRecordings), [regionalRecordings]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(regionalAudioManifestPath, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Regional audio manifest unavailable.");
        return response.json();
      })
      .then((value) => setRegionalRecordings(parseRegionalAudioManifest(value).recordings))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setManifestFailed(true);
      });
    return () => controller.abort();
  }, []);

  return <section className="pronunciation-lab" aria-labelledby="pronunciation-lab-title">
    <div className="pronunciation-lab-heading">
      <div><p className="eyebrow">{language === "kn" ? "ಮೂರು ಪ್ರದೇಶಗಳು · ಒಂದೇ ಅರ್ಥ" : "Three regions · one meaning"}</p><h2 id="pronunciation-lab-title">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಹೋಲಿಕೆ" : "Regional Kannada comparison"}</h2><p>{language === "kn" ? "ಮೈಸೂರು, ಧಾರವಾಡ ಮತ್ತು ಕಲಬುರಗಿಯ ವಕ್ತಾರರು ಐದು ಒಂದೇ-ಅರ್ಥದ ಪ್ರಾಂಪ್ಟ್‌ಗಳನ್ನು ತಮ್ಮ ಸಹಜ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡದಲ್ಲಿ ದಾಖಲಿಸಬಹುದು. ಹೊಂದಾಣಿಕೆಯ ಮೂರು ಧ್ವನಿಗಳು ಆಯ್ಕೆಯಾದಾಗ ಅವು ಒಂದೇ ಸಾಲಿನಲ್ಲಿ ಕೇಳಿಸುತ್ತವೆ." : "Speakers from Mysuru, Dharwad and Kalaburagi can record five shared meanings in their natural regional Kannada. Selected matching voices appear together for direct listening."}</p></div>
      <div className="pronunciation-stats"><span><strong>{pronunciationComparisonWords.length}</strong>{language === "kn" ? "ಸಾಮಾನ್ಯ ಕನ್ನಡ ಧ್ವನಿಗಳು" : "general Kannada voices"}</span><span><strong>{pronunciationRegions.length}</strong>{language === "kn" ? "ಕೇಂದ್ರೀಕೃತ ಪ್ರದೇಶಗಳು" : "featured regions"}</span><span><strong>{regionalPrompts.length}</strong>{language === "kn" ? "ಸಮುದಾಯ ಧ್ವನಿ ಪ್ರಾಂಪ್ಟ್‌ಗಳು" : "community voice prompts"}</span></div>
    </div>

    <div className="pronunciation-trust"><ShieldCheck aria-hidden="true" /><p>{language === "kn" ? "ಪ್ರತಿ ಪ್ರಕಟಿತ ಧ್ವನಿಯೊಂದಿಗೆ ವಕ್ತಾರರು ತಿಳಿಸಿದ ಪ್ರದೇಶ, ನಿಖರ ಪಠ್ಯ, ಹೆಸರು ಅಥವಾ ಅನಾಮಧೇಯ ಆಯ್ಕೆ ಮತ್ತು ಬಳಕೆಯ ಅನುಮತಿ ಉಳಿಯುತ್ತದೆ." : "Every published voice keeps its self-reported region, exact transcript, chosen credit and publication permission together."}</p></div>

    {manifestFailed ? <p className="audio-error" role="alert">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಧ್ವನಿ ಸಂಗ್ರಹವನ್ನು ಈಗ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." : "The regional voice collection could not be opened. Please try again."}</p> : null}

    <div className="meaning-comparison-list">
      {regionalPrompts.map((prompt) => {
        const complete = completePromptIds.has(prompt.id);
        return <article className="meaning-comparison-card" key={prompt.id}>
          <header><span>{prompt.number}</span><div><h3 lang="kn">{prompt.meaningKannada}</h3><p>{prompt.meaningEnglish}</p></div>{complete ? <strong className="complete-badge"><ShieldCheck size={14} />{language === "kn" ? "ಪರಿಶೀಲಿಸಲಾಗಿದೆ" : "Verified set"}</strong> : null}</header>
          <div className="regional-slot-grid">
            {pronunciationRegions.map((region) => {
              const recording = complete ? regionalRecordings.find((item) => item.promptId === prompt.id && item.regionId === region.id) : undefined;
              return <div className={`regional-slot ${recording ? "is-ready" : "is-missing"}`} key={region.id}><div><MapPin size={15} aria-hidden="true" /><span><strong lang="kn">{region.nameKannada}</strong><small>{region.nameEnglish}</small></span></div>{recording ? <><p className="regional-transcript" lang="kn">{recording.transcriptKannada}</p>{recording.romanization ? <p>{recording.romanization}</p> : null}<audio controls preload="metadata" aria-label={`${region.nameEnglish}: ${recording.transcriptKannada}`}><source src={recording.audioPath} /></audio><p>{recording.speakerCredit} · {recording.districtGrewUp} · {recording.permission}</p></> : <><Link className="regional-contribute-link" aria-label={`${region.nameEnglish}: contribute a voice`} href="/contribute/audio"><Volume2 size={16} aria-hidden="true" />{language === "kn" ? "ನಿಮ್ಮ ದನಿ ನೀಡಿ" : "Share your voice"}</Link><p>{language === "kn" ? "ಈ ಅರ್ಥವನ್ನು ನಿಮ್ಮ ಊರಿನ ಸಹಜ ಕನ್ನಡದಲ್ಲಿ ದಾಖಲಿಸಿ." : "Record this meaning in the Kannada natural to your region."}</p></>}</div>;
            })}
          </div>
        </article>;
      })}
    </div>

    <div className="audio-intake-cta"><Headphones aria-hidden="true" /><div><strong>{language === "kn" ? "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡದ ದನಿ ನೀಡಿ" : "Contribute your regional Kannada voice"}</strong><p>{language === "kn" ? "ಒಂದು ಅರ್ಥವನ್ನು ಆರಿಸಿ, ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಸಹಜವಾಗಿ ಹೇಳುವ ರೀತಿಯನ್ನು ಅನುಮತಿಯೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಕಳುಹಿಸಿ." : "Choose a shared meaning and securely send how your region naturally expresses it, with clear permission."}</p></div><Link className="button button-secondary" href="/contribute/audio">{language === "kn" ? "ಧ್ವನಿ ಕೊಡುಗೆ ನೀಡಿ" : "Contribute a voice"}<ArrowRight size={16} /></Link></div>

    <div className="general-reference-heading"><p className="eyebrow">{language === "kn" ? "ಪ್ರದೇಶದ ಗುರುತು ಇಲ್ಲದ ಉಲ್ಲೇಖ" : "Non-regional reference library"}</p><h2>{language === "kn" ? "12 ಸಾಮಾನ್ಯ ಕನ್ನಡ ಮಾನವ ಧ್ವನಿಗಳು" : "12 General Kannada human recordings"}</h2><p>{language === "kn" ? "ಈ CC0 ಧ್ವನಿಗಳಿಗೆ ವಕ್ತಾರರ ಪ್ರದೇಶದ ಮಾಹಿತಿ ಇಲ್ಲ; ಆದ್ದರಿಂದ ಇವುಗಳನ್ನು ಪ್ರಾದೇಶಿಕ ಹೋಲಿಕೆಯಲ್ಲಿ ಬಳಸಿಲ್ಲ." : "These CC0 recordings do not include speaker-region metadata, so they remain separate from the regional comparison."}</p></div>

    <label className="pronunciation-search"><span>{language === "kn" ? "ಕನ್ನಡ ಪದ, Romanized Kannada ಅಥವಾ English meaning ಹುಡುಕಿ" : "Search Kannada, Romanized Kannada or English meaning"}</span><span><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "kn" ? "ನೀರು, neeru, water…" : "ನೀರು, neeru, water…"} /></span></label>

    <div className="pronunciation-results" aria-live="polite">
      {results.map((item) => <article className="pronunciation-card" key={item.id}>
        <header><div><h3 lang="kn">{item.kannadaWord}</h3><p>{item.romanization}</p></div><div><strong>{item.meaningEnglish}</strong><span lang="kn">{item.meaningKannada}</span></div></header>
        <GeneralKannadaAudio item={item} />
      </article>)}
      {results.length === 0 && <div className="pronunciation-empty"><Headphones aria-hidden="true" /><h3>{language === "kn" ? "ಈ ಪೈಲಟ್‌ನಲ್ಲಿ ಪದ ಕಂಡುಬಂದಿಲ್ಲ" : "No word in this pilot matches"}</h3><p>{language === "kn" ? "ಮತ್ತೊಂದು ಕನ್ನಡ ಪದ, Romanized ರೂಪ ಅಥವಾ English meaning ಪ್ರಯತ್ನಿಸಿ." : "Try another Kannada word, Romanized form or English meaning."}</p></div>}
    </div>
  </section>;
}
