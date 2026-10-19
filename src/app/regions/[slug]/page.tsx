import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, Languages, MapPin, Sparkles } from "lucide-react";
import { RegionalAudioPlayer } from "@/components/regional-audio-player";
import { RegionalCandidateCard } from "@/components/regional-candidate-card";
import { StarterVocabulary } from "@/components/starter-vocabulary";
import { getDistrictBySlug } from "@/lib/districts";
import { getExpressionsForRegion } from "@/lib/expressions";
import { getRegionalAudioSamples } from "@/lib/regional-audio";
import { getRegionalCandidatesForRegion } from "@/lib/regional-candidates";
import { getRegionBySlug, regions } from "@/lib/regions";

export function generateStaticParams() { return regions.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const region = getRegionBySlug((await params).slug); return { title: region?.nameEnglish ?? "Region not found" }; }

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const region = getRegionBySlug((await params).slug);
  if (!region) notFound();
  const expressions = getExpressionsForRegion(region.slug);
  const candidates = getRegionalCandidatesForRegion(region.slug);
  const audioSamples = getRegionalAudioSamples(region.slug);

  return <>
    <section className="region-hero"><div className="shell">
      <Link className="back-link" href="/explore"><ArrowLeft size={17} /> Back to Karnataka</Link>
      <p className="eyebrow">ಪ್ರಾದೇಶಿಕ ನುಡಿ ಮತ್ತು ಸಂಸ್ಕೃತಿ · Regional language &amp; culture</p>
      <h1 lang="kn">{region.nameKannada}</h1>
      <p className="romanized">{region.romanizedName} · {region.nameEnglish}</p>
      <div className="status-pill"><Sparkles size={15} /> Explore the stories, speech and places of this region</div>
    </div></section>

    <section className="shell profile-grid">
      <article className="profile-main">
        <h2>About this region</h2>
        <p>{region.geographicDescription}</p>
        <p>{region.languageVarietySummary}</p>
        <div className="context-card"><MapPin /><div><h3>Culture, language and everyday life</h3><p>{region.culturalContext}</p></div></div>

        {region.languageProfiles.length ? <section className="regional-languages">
          <div className="district-story-heading"><Languages /><div><p className="eyebrow">ಕರಾವಳಿಯ ಭಾಷೆಗಳು · Languages of the coast</p><h2>ತುಳು ಕೂಡ ಈ ನೆಲದ ಬೇರು</h2></div></div>
          {region.languageProfiles.map((language) => <article key={language.nameEnglish}><div><h3 lang="kn">{language.nameKannada}</h3><strong>{language.nameEnglish}</strong><small>{language.relationship}</small></div><div><p lang="kn">{language.contextKannada}</p><p lang="en">{language.contextEnglish}</p><a className="text-link" href={language.sourceUrl} target="_blank" rel="noreferrer">Learn more about this language</a></div></article>)}
        </section> : null}

        {audioSamples.length ? <section className="regional-audio-section">
          <div className="district-story-heading"><Languages /><div><p className="eyebrow">ಕೇಳಿ ಕಲಿಯಿರಿ · Listen and learn</p><h2>Hear a word from the coast</h2></div></div>
          <p className="section-intro">A real human voice, an exact transcript, and clear attribution—so the sound remains connected to the person and language it came from.</p>
          {audioSamples.map((sample) => <RegionalAudioPlayer key={sample.id} sample={sample} />)}
        </section> : null}

        <h2>Explore the districts</h2>
        <p className="source-label">Open a district to discover its history, landmarks, food, arts and local character.</p>
        <div className="profile-districts">{region.associatedDistrictSlugs.map((slug) => { const district = getDistrictBySlug(slug); return district ? <Link href={`/districts/${slug}`} key={slug}><span lang="kn">{district.nameKannada}</span><small>{district.nameEnglish}</small></Link> : null; })}</div>

        {candidates.length ? <section className="regional-words-section">
          <h2>Words found in regional sources</h2>
          <p className="source-label">Published forms are shown as their sources record them. Spelling and everyday usage can naturally vary from one community to another.</p>
          <div className="expression-grid">{candidates.map((record) => <RegionalCandidateCard key={record.id} record={record} compact />)}</div>
        </section> : null}
        <Link className="button button-secondary" href={`/voices?region=${region.slug}`}>Open the regional voice experience</Link>

        {expressions.length ? <section>
          <h2>Community expressions</h2>
          <div className="expression-grid">{expressions.map((record) => <article className="expression-card" key={record.id}><h3 lang="kn">{record.expressionKannada}</h3><p>{record.englishMeaning}</p></article>)}</div>
        </section> : null}

        <StarterVocabulary />
      </article>

      <aside className="profile-aside">
        <h2>Sources &amp; further reading</h2>
        <ul>{region.researchSources.map((source) => <li key={source.url}><BookOpen /><span><a className="text-link" href={source.url} target="_blank" rel="noreferrer">{source.title}</a><small>{source.note}</small></span></li>)}</ul>
        <h2>How to read this page</h2>
        <ul>
          <li><CheckCircle2 /> Regional culture is richer than district borders</li>
          <li><CheckCircle2 /> Tulu is presented as a distinct language</li>
          <li><CheckCircle2 /> Audio keeps its transcript and speaker credit</li>
          <li><CheckCircle2 /> Every public source is linked for deeper reading</li>
        </ul>
        <p className="source-note"><strong>About this profile</strong>{region.sourceNote}</p>
      </aside>
    </section>
  </>;
}
