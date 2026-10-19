import Link from "next/link";
import { vocabularyRecords } from "@/lib/vocabulary";

const featuredIds = new Set(["alar-mane", "alar-neeru", "alar-ooru", "alar-male", "alar-habba", "alar-kathe"]);

export function StarterVocabulary() {
  const records = vocabularyRecords.filter(({ id }) => featuredIds.has(id));
  return <section className="starter-vocabulary"><div className="result-heading"><div><p className="eyebrow">ಪ್ರಾರಂಭಿಕ ಪದಗಳು · Starter vocabulary</p><h2>Useful Kannada words</h2></div><p>Begin with a few everyday words, then open the language explorer for a much larger collection.</p></div><div className="vocabulary-strip">{records.map((record) => <Link href={`/language?q=${encodeURIComponent(record.wordKannada)}`} key={record.id}><strong lang="kn">{record.wordKannada}</strong><span>{record.romanization}</span><small>{record.meaningEnglish}</small></Link>)}</div></section>;
}
