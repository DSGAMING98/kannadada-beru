"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GitCompareArrows, MapPin, Volume2 } from "lucide-react";
import { getRegionalAudioSamples } from "@/lib/regional-audio";
import { getRegionalCandidatesForRegion } from "@/lib/regional-candidates";
import { getDistrictBySlug } from "@/lib/districts";
import { getRegionBySlug, regions } from "@/lib/regions";
import { useInterfaceLanguage } from "@/components/interface-language";

function RegionColumn({ slug, language }: { slug: string; language: "kn" | "en" }) {
  const region = getRegionBySlug(slug)!;
  const candidates = getRegionalCandidatesForRegion(slug);
  const audioSamples = getRegionalAudioSamples(slug);
  return <article className="compare-column">
    <p className="eyebrow">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಪರಿಚಯ" : "Regional portrait"}</p>
    <h2 lang="kn">{region.nameKannada}</h2>
    <p className="romanized">{region.romanizedName} · {region.nameEnglish}</p>
    <p>{region.languageVarietySummary}</p>
    <section className="comparison-context"><h3>{language === "kn" ? "ಭೌಗೋಳಿಕ ಹಿನ್ನೆಲೆ" : "Geographic context"}</h3><p>{region.geographicDescription}</p><h3>{language === "kn" ? "ಸಾಂಸ್ಕೃತಿಕ ಸಂದರ್ಭ" : "Cultural context"}</h3><p>{region.culturalContext}</p></section>
    <dl className="comparison-facts">
      <div><dt><MapPin size={16} /> {language === "kn" ? "ಜಿಲ್ಲಾ ಕೊಂಡಿಗಳು" : "Discovery links"}</dt><dd>{region.associatedDistrictSlugs.length} {language === "kn" ? "ಜಿಲ್ಲೆಗಳು" : "districts"}</dd></div>
      <div><dt><BookOpen size={16} /> {language === "kn" ? "ಮುಂದಿನ ಓದು" : "Further reading"}</dt><dd>{region.researchSources.length} {language === "kn" ? "ಕೊಂಡಿಗಳು" : "links"}</dd></div>
      <div><dt><Volume2 size={16} /> {language === "kn" ? "ಮಾನವ ಧ್ವನಿಗಳು" : "Human voices"}</dt><dd>{audioSamples.length}</dd></div>
    </dl>
    <div className="district-chip-list">{region.associatedDistrictSlugs.slice(0, 6).map((districtSlug) => { const district = getDistrictBySlug(districtSlug); return district ? <Link href={`/districts/${district.slug}`} key={district.slug}>{district.nameEnglish}</Link> : null; })}{region.associatedDistrictSlugs.length > 6 && <span>+{region.associatedDistrictSlugs.length - 6} more</span>}</div>
    {candidates.length > 0 ? <><div className="comparison-count"><strong>{candidates.length}</strong> {language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲಗಳಲ್ಲಿ ಕಂಡ ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು" : "regional usages found in published sources"}</div><div className="candidate-comparison-list" aria-label={language === "kn" ? "ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳು" : "Regional usages"}>{candidates.slice(0, 5).map((record) => <article key={record.id}><strong lang={record.scriptKind === "kannada" ? "kn" : "en"}>{record.displayForm}</strong><span>{record.englishMeaning}</span><small>{record.locality}</small></article>)}</div></> : <div className="comparison-empty"><GitCompareArrows /><strong>{language === "kn" ? "ಸ್ಥಳ, ಕಥೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಮೂಲಕ ಅನ್ವೇಷಿಸಿ" : "Explore through place, story and culture"}</strong><p>{language === "kn" ? "ಈ ಪರಿಚಯವು ಪ್ರದೇಶದ ಭೌಗೋಳಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಚಿತ್ರಣವನ್ನು ನೀಡುತ್ತದೆ." : "This portrait brings together the region’s geography, cultural setting and further reading."}</p></div>}
    <div className="source-stack">{region.researchSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.title}</a>)}</div>
    <Link className="text-link" href={`/regions/${slug}`}>{language === "kn" ? "ಪೂರ್ಣ ವಿವರ ನೋಡಿ" : "Open full profile"} <ArrowRight size={15} /></Link>
  </article>;
}

export function RegionComparison() {
  const language = useInterfaceLanguage();
  const [left, setLeft] = useState(regions[0].slug);
  const [right, setRight] = useState(regions[1].slug);
  const options = useMemo(() => regions, []);
  return <section className="shell comparison-workspace">
    <div className="comparison-controls"><label><span>ಮೊದಲ ಪ್ರದೇಶ · First region</span><select value={left} onChange={(event) => setLeft(event.target.value)}>{options.map((region) => <option value={region.slug} key={region.id}>{region.nameKannada} · {region.nameEnglish}</option>)}</select></label><span aria-hidden="true">↔</span><label><span>ಎರಡನೇ ಪ್ರದೇಶ · Second region</span><select value={right} onChange={(event) => setRight(event.target.value)}>{options.map((region) => <option value={region.slug} key={region.id} disabled={region.slug === left}>{region.nameKannada} · {region.nameEnglish}</option>)}</select></label></div>
    {left === right ? <div className="notice"><p>{language === "kn" ? "ಹೋಲಿಸಲು ಎರಡು ಬೇರೆ ಪ್ರದೇಶಗಳನ್ನು ಆರಿಸಿ." : "Choose two different regions to compare."}</p></div> : <div className="comparison-grid"><RegionColumn slug={left} language={language} /><RegionColumn slug={right} language={language} /></div>}
    <section className="alignment-panel"><div><p className="eyebrow">{language === "kn" ? "ನುಡಿಯ ಹಿಂದೆ ಇರುವ ನೆಲ" : "The place behind the words"}</p><h2>{language === "kn" ? "ವ್ಯತ್ಯಾಸವನ್ನು ಕೇಳಿ, ಸಂದರ್ಭವನ್ನು ಅರಿಯಿರಿ" : "Notice the difference. Understand the context."}</h2></div><p>{language === "kn" ? "ಒಂದು ಪದದ ರೂಪ, ಅರ್ಥ ಮತ್ತು ಉಚ್ಚಾರಣೆ ಸ್ಥಳ ಹಾಗೂ ಸಮುದಾಯದೊಂದಿಗೆ ಬದಲಾಗಬಹುದು. ಈ ಹೋಲಿಕೆ ಆ ವೈವಿಧ್ಯವನ್ನು ಕಥೆ ಮತ್ತು ಮೂಲಗಳೊಂದಿಗೆ ತೋರಿಸುತ್ತದೆ." : "A word’s form, meaning and pronunciation can shift across place and community. This view keeps those differences connected to their cultural context and published sources."}</p><Link className="button button-secondary" href="/contribute">{language === "kn" ? "ನಿಮ್ಮ ಊರಿನ ನುಡಿ ಹಂಚಿಕೊಳ್ಳಿ" : "Share a word from your place"}</Link></section>
    <p className="comparison-policy">{language === "kn" ? "ಓದಿದ ಮಾತು, ಸಹಜ ಮಾತು, ಪದಗಳ ವ್ಯತ್ಯಾಸ ಮತ್ತು ಉಚ್ಚಾರಣೆಯ ವ್ಯತ್ಯಾಸ ಒಂದೇ ಅಲ್ಲ; ಪ್ರತಿಯೊಂದನ್ನೂ ಅದರ ಸರಿಯಾದ ಸಂದರ್ಭದಲ್ಲಿ ಅನ್ವೇಷಿಸಿ." : "Read speech, everyday conversation, vocabulary differences and pronunciation differences each tell a different story."}</p>
  </section>;
}
