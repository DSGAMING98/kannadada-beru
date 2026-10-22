"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Headphones, MapPin, Search, ShieldCheck, Volume2, VolumeX } from "lucide-react";
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
  const totalSlots = regionalPrompts.length * pronunciationRegions.length;

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
      <div><p className="eyebrow">{language === "kn" ? "ಮೂರು ಪ್ರದೇಶಗಳು · ಒಂದೇ ಅರ್ಥ" : "Three regions · one meaning"}</p><h2 id="pronunciation-lab-title">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಹೋಲಿಕೆ" : "Regional Kannada comparison"}</h2><p>{language === "kn" ? "ಮೈಸೂರು, ಧಾರವಾಡ ಮತ್ತು ಕಲಬುರಗಿಯ ವಕ್ತಾರರು ಒಂದೇ ಐದು ಅರ್ಥಗಳನ್ನು ತಮ್ಮ ಸಹಜ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡದಲ್ಲಿ ಹೇಳಬಹುದು. ಮೂರು ಪರಿಶೀಲಿತ ಧ್ವನಿಗಳು ಸಿಕ್ಕ ಪ್ರಾಂಪ್ಟ್‌ಗೆ ಮಾತ್ರ ಪ್ಲೇ ಬಟನ್ ತೆರೆಯುತ್ತದೆ." : "Speakers from Mysuru, Dharwad and Kalaburagi may express the same five meanings in their natural regional Kannada. Playback opens only when a prompt has three consented, human-reviewed recordings."}</p></div>
      <div className="pronunciation-stats"><span><strong>{pronunciationComparisonWords.length}</strong>{language === "kn" ? "ಸಾಮಾನ್ಯ ಕನ್ನಡ ಧ್ವನಿಗಳು" : "general Kannada voices"}</span><span><strong>{completePromptIds.size}</strong>{language === "kn" ? "ಮೂರು-ಪ್ರದೇಶದ ಸಂಪೂರ್ಣ ಹೋಲಿಕೆಗಳು" : "complete three-region sets"}</span><span><strong>{Math.max(0, totalSlots - regionalRecordings.length)}</strong>{language === "kn" ? "ಪರಿಶೀಲಿತ ಧ್ವನಿ ಬೇಕಿರುವ ಸ್ಥಳಗಳು" : "regional slots awaiting evidence"}</span></div>
    </div>

    <div className="pronunciation-trust"><ShieldCheck aria-hidden="true" /><p>{language === "kn" ? "ಪ್ರದೇಶವು ವಕ್ತಾರರು ಸ್ವತಃ ತಿಳಿಸಿದ ಮಾಹಿತಿ; ಉಚ್ಚಾರಣೆಯಿಂದ ಊಹಿಸಿದುದಲ್ಲ. ಪಠ್ಯ, ಸಮ್ಮತಿ, ಪ್ರಕಟಣೆಯ ಅನುಮತಿ, ವಕ್ತಾರರ ಮರುಶ್ರವಣ ಮತ್ತು ಎರಡನೇ ಸ್ಥಳೀಯ ಪರಿಶೀಲನೆ ಪೂರ್ಣವಾದ ಧ್ವನಿ ಮಾತ್ರ ಇಲ್ಲಿ ಬರುತ್ತದೆ." : "Region is self-reported by the speaker, never inferred from accent. A clip appears here only after transcript matching, consent, publication permission, speaker replay and a second local review are complete."}</p></div>

    {manifestFailed ? <p className="audio-error" role="alert">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಧ್ವನಿ ಪಟ್ಟಿಯನ್ನು ತೆರೆಯಲಾಗಲಿಲ್ಲ; ಯಾವುದೇ ಪರಿಶೀಲಿಸದ ಧ್ವನಿಯನ್ನು ತೋರಿಸಲಾಗಿಲ್ಲ." : "The regional audio manifest could not be loaded; no unverified audio has been shown."}</p> : null}

    <div className="meaning-comparison-list">
      {regionalPrompts.map((prompt) => {
        const complete = completePromptIds.has(prompt.id);
        return <article className="meaning-comparison-card" key={prompt.id}>
          <header><span>{prompt.number}</span><div><h3 lang="kn">{prompt.meaningKannada}</h3><p>{prompt.meaningEnglish}</p></div>{complete ? <strong className="complete-badge"><ShieldCheck size={14} />{language === "kn" ? "ಪರಿಶೀಲಿಸಲಾಗಿದೆ" : "Verified set"}</strong> : null}</header>
          <div className="regional-slot-grid">
            {pronunciationRegions.map((region) => {
              const recording = complete ? regionalRecordings.find((item) => item.promptId === prompt.id && item.regionId === region.id) : undefined;
              return <div className={`regional-slot ${recording ? "is-ready" : "is-missing"}`} key={region.id}><div><MapPin size={15} aria-hidden="true" /><span><strong lang="kn">{region.nameKannada}</strong><small>{region.nameEnglish}</small></span></div>{recording ? <><p className="regional-transcript" lang="kn">{recording.transcriptKannada}</p>{recording.romanization ? <p>{recording.romanization}</p> : null}<audio controls preload="metadata" aria-label={`${region.nameEnglish}: ${recording.transcriptKannada}`}><source src={recording.audioPath} /></audio><p>{recording.speakerCredit} · {recording.districtGrewUp} · {recording.permission}</p></> : <><button type="button" disabled aria-label={`${region.nameEnglish}: recording needed`}><VolumeX size={16} aria-hidden="true" />{language === "kn" ? "ಧ್ವನಿ ಬೇಕಿದೆ" : "Recording needed"}</button><p>{language === "kn" ? "ಸಮ್ಮತಿ ಪಡೆದ, ಪಠ್ಯಕ್ಕೆ ಹೊಂದಿದ ಮತ್ತು ಮಾನವ ಪರಿಶೀಲಿತ ಧ್ವನಿ ಬೇಕಿದೆ." : region.localityNote}</p></>}</div>;
            })}
          </div>
        </article>;
      })}
    </div>

    <div className="audio-intake-cta"><Headphones aria-hidden="true" /><div><strong>{language === "kn" ? "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡದ ದನಿ ನೀಡಿ" : "Contribute your regional Kannada voice"}</strong><p>{language === "kn" ? "ಒಂದು ಅರ್ಥವನ್ನು ಆರಿಸಿ, ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಸಹಜವಾಗಿ ಹೇಳುವ ರೀತಿಯನ್ನು ಸಮ್ಮತಿಯೊಂದಿಗೆ ಖಾಸಗಿ ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಿ." : "Choose a shared meaning and privately submit how your region naturally expresses it, with clear consent."}</p></div><Link className="button button-secondary" href="/contribute/audio">{language === "kn" ? "ಧ್ವನಿ ಕೊಡುಗೆ ನೀಡಿ" : "Contribute a voice"}<ArrowRight size={16} /></Link></div>

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
