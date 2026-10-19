import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Compass, ExternalLink, Map, MapPin, Sparkles } from "lucide-react";
import { districts, getDistrictBySlug } from "@/lib/districts";
import { getRegionsForDistrict } from "@/lib/regions";
import { StarterVocabulary } from "@/components/starter-vocabulary";

export function generateStaticParams() { return districts.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const district = getDistrictBySlug((await params).slug); return { title: district ? `${district.nameEnglish} district` : "District not found" }; }

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const district = getDistrictBySlug((await params).slug);
  if (!district) notFound();
  const linkedRegions = getRegionsForDistrict(district.slug);

  return <>
    <section className="region-hero district-hero"><div className="shell">
      <Link className="back-link" href="/explore"><ArrowLeft size={17} /> Back to district directory</Link>
      <p className="eyebrow">ಜಿಲ್ಲೆಯನ್ನು ಅರಿಯೋಣ · Learn the district</p>
      <h1 lang="kn">{district.nameKannada}</h1>
      <p className="romanized">{district.nameEnglish}{district.formerNames.length ? ` · formerly ${district.formerNames.join(", ")}` : ""}</p>
      <div className="status-pill"><Sparkles size={15} /> History · culture · places · language</div>
    </div></section>

    <section className="shell profile-grid">
      <article className="profile-main">
        <div className="district-story-heading"><BookOpen /><div><p className="eyebrow">ಇತಿಹಾಸ · History</p><h2>ಈ ನೆಲದ ಕಥೆ · Story of this land</h2></div></div>
        <div className="bilingual-story"><div lang="kn"><span>ಕನ್ನಡ</span><p>{district.learning.history.kn}</p></div><div lang="en"><span>English</span><p>{district.learning.history.en}</p></div></div>
        <div className="district-character"><MapPin /><div><h3>ಏನು ವಿಶೇಷ? · What gives it character?</h3><p lang="kn">{district.learning.character.kn}</p><p lang="en">{district.learning.character.en}</p></div></div>
        <div className="district-story-heading"><Compass /><div><p className="eyebrow">ನೋಡಿ · Discover</p><h2>ಇಲ್ಲಿ ಏನು ಅನ್ವೇಷಿಸಬಹುದು?</h2><p>What can you explore here?</p></div></div>
        <div className="district-highlights">{district.learning.highlights.map((highlight, index) => <article key={highlight.name.en}><span>{String(index + 1).padStart(2, "0")}</span><h3 lang="kn">{highlight.name.kn}</h3><strong>{highlight.name.en}</strong><p lang="kn">{highlight.description.kn}</p><p lang="en">{highlight.description.en}</p></article>)}</div>
        <h2>Explore the language landscape</h2><p>Follow the regional links to discover words, voices and cultural context connected with the wider landscape around this district.</p>
        <Link className="button button-secondary district-voices-cta" href={`/voices?region=${linkedRegions[0]?.slug ?? "all"}`}>Discover regional words and voices</Link>
        {linkedRegions.length ? <div className="profile-districts">{linkedRegions.map((region) => <Link href={`/regions/${region.slug}`} key={region.id}><span lang="kn">{region.nameKannada}</span><small>{region.nameEnglish}</small></Link>)}</div> : <div className="empty-state"><h3>Discover Kannada words</h3><p>Browse the language collection while more local stories are gathered.</p><Link className="text-link" href="/language">Open the language explorer</Link></div>}
        <StarterVocabulary />
      </article>
      <aside className="profile-aside">
        <h2>District at a glance</h2><p><strong>Headquarters</strong><br />{district.headquarters ?? "Not recorded"}</p><p>{district.currentStatusNote}</p><a className="text-link" href={district.officialDirectoryUrl} target="_blank" rel="noreferrer">Official district source <ExternalLink size={14} /></a>
        <h2>Continue exploring</h2><p>Search Kannada words, listen to pronunciation, and travel through Karnataka’s language regions.</p><Link className="text-link" href="/language">Open the language explorer</Link>
        <div className="context-card district-map-note"><Map /><div><h3>Map note</h3><p>{district.geometry.availability === "historical-2011" ? `The map uses the Census-2011 feature “${district.geometry.historicalFeatureName}”; it is not a current legal boundary.` : "This district has no standalone feature in the bundled Census-2011 map."}</p></div></div>
        <p className="source-note"><strong>A note for curious travellers</strong>This bilingual introduction draws on government district and Karnataka Tourism material. Follow the official source above for current visitor and administrative information.</p>
      </aside>
    </section>
  </>;
}
