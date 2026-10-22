"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Headphones, MapPin, Search, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { pronunciationComparisonWords, pronunciationRegions, searchPronunciationWords } from "@/lib/pronunciation-audio";

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
  const results = useMemo(() => searchPronunciationWords(query), [query]);
  const totalSlots = pronunciationComparisonWords.length * pronunciationRegions.length;

  return <section className="pronunciation-lab" aria-labelledby="pronunciation-lab-title">
    <div className="pronunciation-lab-heading">
      <div><p className="eyebrow">{language === "kn" ? "ಮೂರು ಪ್ರದೇಶಗಳು · ಒಂದೇ ಪದ" : "Three regions · one word"}</p><h2 id="pronunciation-lab-title">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಉಚ್ಚಾರಣೆ ಹೋಲಿಕೆ" : "Regional pronunciation comparison"}</h2><p>{language === "kn" ? "ಒಂದೇ ಕನ್ನಡ ಪದಕ್ಕೆ ಮೈಸೂರು, ಧಾರವಾಡ ಮತ್ತು ಕಲಬುರಗಿ ಧ್ವನಿಗಳನ್ನು ಹೋಲಿಸುವ ವಿನ್ಯಾಸ ಸಿದ್ಧವಾಗಿದೆ. ಪ್ರದೇಶವನ್ನು ದೃಢಪಡಿಸುವ ಸಾಕ್ಷ್ಯವಿಲ್ಲದ ಧ್ವನಿಗೆ ಪ್ಲೇ ಬಟನ್ ನೀಡುವುದಿಲ್ಲ." : "The explorer is ready to compare the same Kannada word across Mysuru, Dharwad and Kalaburagi. A regional Play control appears only when speaker provenance and rights are genuinely documented."}</p></div>
      <div className="pronunciation-stats"><span><strong>{pronunciationComparisonWords.length}</strong>{language === "kn" ? "ಸಾಮಾನ್ಯ ಕನ್ನಡ ಧ್ವನಿಗಳು" : "general Kannada voices"}</span><span><strong>0</strong>{language === "kn" ? "ಮೂರು-ಪ್ರದೇಶದ ಸಂಪೂರ್ಣ ಹೋಲಿಕೆಗಳು" : "complete three-region sets"}</span><span><strong>{totalSlots}</strong>{language === "kn" ? "ಪರಿಶೀಲಿತ ಧ್ವನಿ ಬೇಕಿರುವ ಸ್ಥಳಗಳು" : "regional slots awaiting evidence"}</span></div>
    </div>

    <div className="pronunciation-trust"><ShieldCheck aria-hidden="true" /><p>{language === "kn" ? "ಈ 12 ಚಿಕ್ಕ ಧ್ವನಿಗಳು Spell4Wiki ಮೂಲಕ Wikimedia Commonsಗೆ ಸೇರಿಸಲಾದ CC0 ಮಾನವ ಕನ್ನಡ ಉಚ್ಚಾರಣೆಗಳು. ಮೂಲವು ಪದ ಮತ್ತು ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಗುರುತಿಸುತ್ತದೆ; ಆದರೆ ವಕ್ತಾರರ ಪ್ರದೇಶವನ್ನು ನೀಡುವುದಿಲ್ಲ. ಆದ್ದರಿಂದ ಅವು ಕೆಳಗೆ ಸಾಮಾನ್ಯ ಕನ್ನಡದ ಉಲ್ಲೇಖವಾಗಿ ಮಾತ್ರ ಕೇಳಿಸುತ್ತವೆ." : "These 12 short clips are CC0 human Kannada pronunciations uploaded through Spell4Wiki to Wikimedia Commons. The source identifies the word and language, but publishes no speaker-region metadata, so they are presented only as general Kannada references."}</p></div>

    <label className="pronunciation-search"><span>{language === "kn" ? "ಕನ್ನಡ ಪದ, Romanized Kannada ಅಥವಾ English meaning ಹುಡುಕಿ" : "Search Kannada, Romanized Kannada or English meaning"}</span><span><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "kn" ? "ನೀರು, neeru, water…" : "ನೀರು, neeru, water…"} /></span></label>

    <div className="pronunciation-results" aria-live="polite">
      {results.map((item) => <article className="pronunciation-card" key={item.id}>
        <header><div><h3 lang="kn">{item.kannadaWord}</h3><p>{item.romanization}</p></div><div><strong>{item.meaningEnglish}</strong><span lang="kn">{item.meaningKannada}</span></div></header>
        <GeneralKannadaAudio item={item} />
        <div className="regional-slot-grid">
          {pronunciationRegions.map((region) => <div className="regional-slot is-missing" key={region.id}><div><MapPin size={15} aria-hidden="true" /><span><strong lang="kn">{region.nameKannada}</strong><small>{region.nameEnglish}</small></span></div><button type="button" disabled aria-label={`${region.nameEnglish}: recording needed`}><VolumeX size={16} aria-hidden="true" />{language === "kn" ? "ಧ್ವನಿ ಬೇಕಿದೆ" : "Recording needed"}</button><p>{language === "kn" ? "ಸ್ಥಳೀಯ ವಕ್ತಾರ, ಅನುಮತಿ ಮತ್ತು ಪದದ ಹೊಂದಾಣಿಕೆ ದೃಢವಾದ ಬಳಿಕ ತೆರೆಯುತ್ತದೆ." : region.localityNote}</p></div>)}
        </div>
      </article>)}
      {results.length === 0 && <div className="pronunciation-empty"><Headphones aria-hidden="true" /><h3>{language === "kn" ? "ಈ ಪೈಲಟ್‌ನಲ್ಲಿ ಪದ ಕಂಡುಬಂದಿಲ್ಲ" : "No word in this pilot matches"}</h3><p>{language === "kn" ? "ಮತ್ತೊಂದು ಕನ್ನಡ ಪದ, Romanized ರೂಪ ಅಥವಾ English meaning ಪ್ರಯತ್ನಿಸಿ." : "Try another Kannada word, Romanized form or English meaning."}</p></div>}
    </div>
  </section>;
}
