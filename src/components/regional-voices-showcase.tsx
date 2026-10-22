"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpenText, Headphones, MapPin, Search, ShieldCheck, Volume2 } from "lucide-react";
import { RegionalAudioPlayer } from "@/components/regional-audio-player";
import { RegionalPronunciationExplorer } from "@/components/regional-pronunciation-explorer";
import { useInterfaceLanguage } from "@/components/interface-language";
import { regionalAudioSamples } from "@/lib/regional-audio";
import { regionalCandidates } from "@/lib/regional-candidates";
import { getRegionBySlug, regions } from "@/lib/regions";

export function RegionalVoicesShowcase() {
  const language = useInterfaceLanguage();
  const searchParams = useSearchParams();
  const requestedRegion = searchParams.get("region") ?? "all";
  const [region, setRegion] = useState(regions.some((item) => item.slug === requestedRegion) ? requestedRegion : "all");
  const [query, setQuery] = useState("");
  const records = useMemo(() => regionalCandidates.filter((record) => {
    if (region !== "all" && record.regionSlug !== region) return false;
    const needle = query.trim().toLocaleLowerCase("kn");
    if (!needle) return true;
    return [record.displayForm, record.romanization, record.englishMeaning, record.standardKannadaEquivalent ?? "", record.locality]
      .some((value) => value.toLocaleLowerCase("kn").includes(needle));
  }), [query, region]);

  return <section className="shell voices-workspace">
    <RegionalPronunciationExplorer />

    <div className="voices-section-heading"><p className="eyebrow">{language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲದಲ್ಲಿರುವ ಸ್ಥಳೀಯ ಬಳಕೆ" : "Regional usage in published sources"}</p><h2>{language === "kn" ? "ಪದದ ರೂಪ, ಅರ್ಥ ಮತ್ತು ನೆಲದ ಸಂದರ್ಭ" : "Word form, meaning and local context"}</h2></div>
    <div className="voices-promise"><Headphones aria-hidden="true" /><div><strong>{language === "kn" ? "ಕೇಳುವುದಕ್ಕೂ ಮೊದಲು ಅರ್ಥ ಮತ್ತು ಮೂಲವನ್ನು ನೋಡಿ" : "Meaning and source come before sound"}</strong><p>{language === "kn" ? "ಪ್ರಕಟಿತ ನುಡಿ, ಸಾಮಾನ್ಯ ಕನ್ನಡದ ಸಮೀಪದ ರೂಪ ಮತ್ತು ಸ್ಥಳೀಯ ಸಂದರ್ಭವನ್ನು ಒಂದೇ ಜಾಗದಲ್ಲಿ ನೋಡಬಹುದು. ನೈಜ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಧ್ವನಿ ಇನ್ನೂ ಅನುಮತಿ ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಶೀಲನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ." : "Each record keeps the published form, its closest standard comparison and local context together. Regional Kannada audio remains unpublished until permission and local review are complete."}</p></div></div>

    <div className="voices-controls">
      <label><span>{language === "kn" ? "ಪದ ಅಥವಾ ಅರ್ಥ" : "Word or meaning"}</span><div className="search-box"><Search aria-hidden="true" /><input aria-label="Search regional voices" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ಅಗದೀ, onion, greeting…" /></div></label>
      <label><span>{language === "kn" ? "ಪ್ರದೇಶ" : "Region"}</span><select aria-label="Voice region" value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">{language === "kn" ? "ಎಲ್ಲ ದಾಖಲೆಗಳು" : "All documented usages"}</option>{regions.filter((item) => regionalCandidates.some((record) => record.regionSlug === item.slug)).map((item) => <option key={item.slug} value={item.slug}>{item.nameKannada} · {item.nameEnglish}</option>)}</select></label>
    </div>

    <div className="voices-ledger" aria-live="polite"><span><strong>{records.length}</strong>{language === "kn" ? "ಮೂಲದಲ್ಲಿ ದಾಖಲಾಗಿರುವ ನುಡಿಗಳು" : "source-documented usages"}</span><span><strong>0</strong>{language === "kn" ? "ಪ್ರಕಟಿತ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಧ್ವನಿಗಳು" : "published regional Kannada voices"}</span><span><strong>{regionalAudioSamples.length}</strong>{language === "kn" ? "ಪ್ರತ್ಯೇಕ ಕರಾವಳಿ ಭಾಷೆಯ ಧ್ವನಿ" : "separate coastal-language voice"}</span></div>

    <div className="voice-story-grid">
      {records.map((record) => {
        const itemRegion = getRegionBySlug(record.regionSlug)!;
        return <article className="voice-story" key={record.id}>
          <div className="voice-story-head"><span><MapPin size={14} />{record.locality}</span><small>{record.recordType}</small></div>
          <h2 lang={record.scriptKind === "kannada" ? "kn" : "en"}>{record.displayForm}</h2>
          <p className="voice-romanized">{record.romanization}</p>
          <p className="voice-meaning">{record.englishMeaning}</p>
          {record.standardKannadaEquivalent && <p className="voice-standard"><strong>{language === "kn" ? "ಸಾಮಾನ್ಯ / ಮೂಲದಲ್ಲಿನ ಹೋಲಿಕೆ" : "Standard / source comparison"}</strong>{record.standardKannadaEquivalent}</p>}
          <p>{record.culturalContext}</p>
          <div className="voice-evidence"><ShieldCheck size={17} /><span><strong>{language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲದಲ್ಲಿ ದಾಖಲಾಗಿದೆ" : "Documented in a published source"}</strong>{language === "kn" ? "ಸ್ಥಳೀಯ ಸಮುದಾಯದ ಸ್ವತಂತ್ರ ಪರಿಶೀಲನೆ ಮತ್ತು ಹೊಂದಾಣಿಕೆಯ ಧ್ವನಿಮುದ್ರಣ ಇನ್ನೂ ಬಾಕಿ." : "Independent community review and a matching permission-cleared recording are still pending."}</span></div>
          <footer><span>{itemRegion.nameKannada} · {itemRegion.nameEnglish}</span><a href={record.source.url} target="_blank" rel="noreferrer"><BookOpenText size={14} />{record.source.publisher}</a></footer>
        </article>;
      })}
    </div>

    <section className="voice-audio-boundary"><div><p className="eyebrow">{language === "kn" ? "ಭಾಷೆಯ ಗುರುತು ಸ್ಪಷ್ಟವಾಗಿರಲಿ" : "Keep the language identity clear"}</p><h2>{language === "kn" ? "ಕರಾವಳಿಯ ತುಳು ಧ್ವನಿ" : "A Tulu voice from the coast"}</h2><p>{language === "kn" ? "ಈ ಧ್ವನಿ ತುಳು ಭಾಷೆಯದ್ದು; ಇದನ್ನು ಪ್ರಾದೇಶಿಕ ಕನ್ನಡವೆಂದು ಎಣಿಸಲಾಗಿಲ್ಲ. ಕರಾವಳಿಯ ಬಹುಭಾಷಾ ಬದುಕಿನ ಸ್ವತಂತ್ರ ಭಾಗವಾಗಿ ನೀಡಲಾಗಿದೆ." : "This recording is Tulu and is not counted as regional Kannada. It appears as its own part of the coast's multilingual life."}</p></div>{regionalAudioSamples.map((sample) => <RegionalAudioPlayer key={sample.id} sample={sample} />)}</section>

    <div className="voices-next"><Volume2 /><div><strong>{language === "kn" ? "ಮೂರು ಪ್ರದೇಶಗಳ ನೈಜ ಧ್ವನಿ ಸೇರಿಸಿ" : "Add authentic voices from three regions"}</strong><p>{language === "kn" ? "ಐದು ಒಂದೇ-ಅರ್ಥದ ಪ್ರಾಂಪ್ಟ್‌ಗಳಿಗೆ ಧ್ವನಿ, ನಿಖರ ಪಠ್ಯ, ಸಮ್ಮತಿ ಮತ್ತು ಮಾನವ ಪರಿಶೀಲನೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ." : "Prepare audio, exact transcripts, consent and human review for five shared-meaning prompts."}</p></div><Link className="button button-secondary" href="/voices/intake">{language === "kn" ? "ಧ್ವನಿ ಸಂಗ್ರಹ ಆರಂಭಿಸಿ" : "Open audio intake"}<ArrowRight size={16} /></Link></div>
  </section>;
}
