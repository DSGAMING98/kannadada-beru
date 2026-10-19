import { BookOpenText, ExternalLink, MapPin } from "lucide-react";
import type { RegionalCandidate } from "@/lib/regional-candidates";
import { getRegionBySlug } from "@/lib/regions";

export function RegionalCandidateCard({ record, language = "en", compact = false }: { record: RegionalCandidate; language?: "kn" | "en"; compact?: boolean }) {
  const region = getRegionBySlug(record.regionSlug);
  return <article className={`expression-card candidate-card${compact ? " candidate-card-compact" : ""}`}>
    <div className="expression-topline"><span className="candidate-badge"><BookOpenText size={14} /> {language === "kn" ? "ಪ್ರಕಟಿತ ಮೂಲದಲ್ಲಿರುವ ಪ್ರಾದೇಶಿಕ ನುಡಿ" : "Documented regional usage"}</span><span>{record.recordType}</span></div>
    <h3 lang={record.scriptKind === "kannada" ? "kn" : "en"}>{record.displayForm}</h3>
    {record.scriptKind === "kannada" ? <p className="romanized-expression">{record.romanization}</p> : <p className="romanized-expression">{language === "kn" ? "ಮೂಲದಲ್ಲಿ ಲ್ಯಾಟಿನ್ ಲಿಪಿಯಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ" : "Published in Latin script by the source"}</p>}
    <p className="meaning">{record.englishMeaning}</p>
    {record.standardKannadaEquivalent ? <p className="candidate-equivalent"><strong>{language === "kn" ? "ಮೂಲದಲ್ಲಿನ ಸಾಮಾನ್ಯ ರೂಪ" : "Standard/source comparison"}:</strong> {record.standardKannadaEquivalent}</p> : null}
    {!compact ? <p>{record.culturalContext}</p> : null}
    <p className="source-label">{record.locality} · {region?.nameEnglish}</p>
    <div className="candidate-review-note"><MapPin aria-hidden="true" size={16} /><span>{language === "kn" ? "ಸ್ಥಳ ಮತ್ತು ಸಮುದಾಯದಂತೆ ಉಚ್ಚಾರಣೆ ಹಾಗೂ ಬಳಕೆ ಬದಲಾಗಬಹುದು." : "Pronunciation and usage may vary naturally across places and communities."}</span></div>
    {!compact ? <p className="scope-note">{record.evidenceNote} {record.source.rightsNote}</p> : null}
    <a className="text-link" href={record.source.url} target="_blank" rel="noreferrer">{record.source.publisher} · {record.source.author} · {record.source.publishedAt} <ExternalLink size={14} /></a>
  </article>;
}
