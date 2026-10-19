"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { featureCards } from "@/lib/navigation";
import { regions } from "@/lib/regions";
import { useInterfaceLanguage } from "@/components/interface-language";

export default function HomePage() {
  const language = useInterfaceLanguage();
  const featureBodyKn = [
    "ಜಿಲ್ಲೆಯ ಗಡಿಯನ್ನು ಭಾಷೆಯ ಗಡಿಯೆಂದು ಭಾವಿಸದೆ ಆಡಳಿತಾತ್ಮಕ ಭೂಗೋಳದ ಮೂಲಕ ಅನ್ವೇಷಿಸಿ.",
    "ಕನ್ನಡ ಲಿಪಿ, ರೋಮನೀಕೃತ ರೂಪ, ಇಂಗ್ಲಿಷ್ ಅರ್ಥ ಅಥವಾ ಸ್ಥಳದಿಂದ ಸಾಮಾನ್ಯ ಪದಗಳು ಮತ್ತು ಮೂಲದಲ್ಲಿ ದಾಖಲಾಗಿರುವ ಪ್ರಾದೇಶಿಕ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ಹುಡುಕಿ.",
    "ಪರಿಶೀಲನೆಯ ಸ್ಥಿತಿ ಮತ್ತು ಅನಿಶ್ಚಿತತೆಯನ್ನು ಉಳಿಸಿಕೊಂಡೇ ಎರಡು ಪ್ರದೇಶಗಳ ಮೂಲವುಳ್ಳ ಪದರೂಪ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಸಂದರ್ಭವನ್ನು ಹೋಲಿಸಿ.",
    "ಹತ್ತು ಸುತ್ತಿನ ಅರ್ಥದ ಆಟ, ಸರಣಿ ಅಂಕಗಳು ಮತ್ತು ಸಾಧನದ ಧ್ವನಿಯೊಂದಿಗೆ ಕನ್ನಡ ಪದಗಳನ್ನು ನೆನಪಿನಲ್ಲಿ ಬೇರೂರಿಸಿ.",
  ];
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> {language === "kn" ? "ಕನ್ನಡದ ಜೀವಂತ ಭೂಪಟ" : "A living atlas of Kannada"}</p>
          <h1><span lang="kn">ಕನ್ನಡದ ಬೇರು</span><small>{language === "kn" ? <>ಪ್ರತಿಯೊಂದು ನುಡಿಗೂ ಕಥೆಯಿದೆ.<br />ಪ್ರತಿಯೊಂದು ಕಥೆಗೂ ನೆಲವಿದೆ.</> : <>Every dialect has a story.<br />Every story has a home.</>}</small></h1>
          <p className="hero-lead">{language === "kn" ? "ಪದ, ಧ್ವನಿ, ಅರ್ಥ ಮತ್ತು ನೆನಪಿನ ಮೂಲಕ ಕರ್ನಾಟಕದ ವಿವಿಧ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕನ್ನಡ ಹೇಗೆ ಬದುಕಿದೆ ಎಂಬುದನ್ನು ಅನ್ವೇಷಿಸುವ ತಾಣ." : "A careful, community-minded place to explore how Kannada lives across regions—through words, voices, meanings, and memory."}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/voices"><Headphones size={18} aria-hidden="true" />{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳನ್ನು ಕೇಳಿ" : "Discover regional voices"}</Link>
            <Link className="text-link" href="/explore">{language === "kn" ? "ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ" : "Explore Karnataka"} <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className="text-link" href="/language">{language === "kn" ? "ಪದಗಳನ್ನು ಹುಡುಕಿ" : "Search expressions"}</Link>
            <Link className="text-link" href="/dictionary">{language === "kn" ? "೧.೫ ಲಕ್ಷ ಪದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ" : "Explore 150,000+ entries"}</Link>
            <Link className="text-link" href="/about">{language === "kn" ? "ಈ ಸಂಗ್ರಹ ಏಕೆ ಮುಖ್ಯ?" : "Why this work matters"}</Link>
          </div>
          <p className="trust-note"><ShieldCheck size={17} aria-hidden="true" /> {language === "kn" ? "ಪದಗಳು, ಪ್ರದೇಶಗಳು ಮತ್ತು ಪ್ರಕಟಿತ ಮೂಲಗಳು ಒಂದೇ ಜಾಗದಲ್ಲಿ — ಕನ್ನಡದ ವೈವಿಧ್ಯವನ್ನು ಗೌರವದಿಂದ ಅನ್ವೇಷಿಸಿ." : "Words, places and published sources in one thoughtful atlas—made for discovering Kannada’s living diversity."}</p>
        </div>
        <div className="hero-art hero-logo-art">
          <Image src="/brand/kannadada-beru-logo.webp" alt="Golden Kannada glyph with Karnataka, heritage monuments, leaves, and roots" fill sizes="(max-width: 800px) 92vw, 44vw" priority />
          <div className="art-label"><span><b lang="kn">ಅಧಿಕೃತ ಚಿಹ್ನೆ · ಕನ್ನಡದ ಬೇರು</b><small>Language · land · memory</small></span></div>
        </div>
      </section>

      <section className="voices-home shell">
        <div><p className="eyebrow">{language === "kn" ? "ಒಂದೇ ಕನ್ನಡ · ಹಲವು ಬದುಕಿನ ನುಡಿಗಳು" : "One Kannada · many living voices"}</p><h2>{language === "kn" ? "ಪದವು ಬದಲಾಗಬಹುದು. ಅದರ ನೆಲದ ಕಥೆ ಉಳಿಯುತ್ತದೆ." : "A word may change. Its connection to place remains."}</h2></div>
        <div><p>{language === "kn" ? "ಉತ್ತರ ಕರ್ನಾಟಕ ಮತ್ತು ಕುಂದಾಪುರದ ಪ್ರಕಟಿತ ಮೂಲಗಳಲ್ಲಿ ದಾಖಲಾಗಿರುವ ನುಡಿಗಳನ್ನು ಅರ್ಥ, ಸ್ಥಳ, ಸಂದರ್ಭ ಮತ್ತು ಮೂಲದೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ. ಅನುಮತಿ ಪಡೆದ ನೈಜ ಧ್ವನಿ ಲಭ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ಅದನ್ನು ಕೇಳಿಸುತ್ತೇವೆ." : "Explore usages documented in published sources from North Karnataka and Kundapura, with meaning, locality, context and citation kept together. Audio appears only when a real recording has clear permission and matching evidence."}</p><Link className="button button-secondary" href="/voices">{language === "kn" ? "ನುಡಿ ಅನುಭವ ತೆರೆಯಿರಿ" : "Open the voice experience"} <ArrowRight size={17} /></Link></div>
      </section>

      <section className="intro shell section-grid">
        <div><p className="eyebrow">{language === "kn" ? "ಅನುವಾದಕ್ಕಿಂತ ಹೆಚ್ಚಿನದು" : "More than translation"}</p><h2 lang="kn">ಒಂದೇ ಭಾಷೆ.<br />ಅನೇಕ ಬದುಕಿನ ದನಿಗಳು.</h2></div>
        <div><p>{language === "kn" ? "ಸ್ಥಳ, ಸಮುದಾಯ, ಕೆಲಸ ಮತ್ತು ತಲೆಮಾರುಗಳೊಂದಿಗೆ ಕನ್ನಡವು ಬದಲಾಗುತ್ತದೆ. ಆ ವೈವಿಧ್ಯವನ್ನು ಸರಳ ಪಟ್ಟಿಯಾಗಿ ಕುಗ್ಗಿಸದೆ ಉಳಿಸುವುದೇ ಕನ್ನಡದ ಬೇರು ಯೋಜನೆಯ ಉದ್ದೇಶ." : "Kannada changes gently across place, community, work, and generations. Kannadada Beru is designed to preserve that richness without flattening it into a list of curiosities."}</p><p>{language === "kn" ? "ಭೂಗೋಳವು ಅನ್ವೇಷಣೆಗೆ ಒಂದು ಪ್ರವೇಶ ದಾರಿ. ಪ್ರತಿಯೊಂದು ನುಡಿಯ ಹಿಂದೆ ಇರುವ ಜನ, ನೆಲ ಮತ್ತು ಸಂದರ್ಭವನ್ನು ಗೌರವಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶ." : "Geography is simply the doorway. The real story is the relationship between language, people, place and memory."}</p></div>
      </section>

      <section className="feature-section"><div className="shell">
        <p className="eyebrow">{language === "kn" ? "ಜವಾಬ್ದಾರಿಯುತ ಅನ್ವೇಷಣೆಗಾಗಿ" : "Built for careful discovery"}</p><div className="feature-grid">{featureCards.map(({ icon: Icon, kannada, title, body }, index) => <article className="feature-card" key={title}><Icon aria-hidden="true" /><p lang="kn">{kannada}</p><h3>{language === "kn" ? kannada : title}</h3><p>{language === "kn" ? featureBodyKn[index] : body}</p></article>)}</div>
      </div></section>

      <section className="regions-section shell">
        <div className="section-heading"><div><p className="eyebrow">{language === "kn" ? "ಒಂದು ಸ್ಥಳದಿಂದ ಆರಂಭಿಸಿ" : "Begin with a place"}</p><h2>{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಪ್ರವೇಶ ದಾರಿಗಳು" : "Regional entry points"}</h2></div><Link className="text-link" href="/explore">{language === "kn" ? "ಭೂಪಟ ತೆರೆಯಿರಿ" : "Open the atlas"} <ArrowRight size={17} /></Link></div>
        <div className="region-grid">{regions.map((region, index) => <Link className={`region-card region-${index + 1}`} href={`/regions/${region.slug}`} key={region.id}><span className="region-number">0{index + 1}</span><div><h3 lang="kn">{region.nameKannada}</h3><p>{region.nameEnglish}</p></div><ArrowRight aria-hidden="true" /></Link>)}</div>
        <p className="source-label">{language === "kn" ? "ಪ್ರದೇಶವನ್ನು ಆರಿಸಿ; ಅದರ ನುಡಿ, ಇತಿಹಾಸ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ನೋಡಬೇಕಾದ ಸ್ಥಳಗಳನ್ನು ಅನ್ವೇಷಿಸಿ." : "Choose a region to discover its speech, history, culture and places worth exploring."}</p>
      </section>

      <section className="mission-band"><div className="shell"><p lang="kn">“ಮಾತು ಕೇವಲ ಪದವಲ್ಲ — ಅದು ಒಂದು ಊರಿನ ನೆನಪು.”</p><div><h2>{language === "kn" ? "ಉಳಿಸುವಿಕೆ ಕೇಳುವುದರಿಂದ ಆರಂಭವಾಗುತ್ತದೆ." : "Preservation begins with listening."}</h2><p>{language === "kn" ? "ಪ್ರತಿಯೊಂದು ನುಡಿಗೂ ಅದರ ಮೂಲ, ಸಂದರ್ಭ ಮತ್ತು ಅದನ್ನು ಜೀವಂತವಾಗಿಟ್ಟ ಸಮುದಾಯದ ಗೌರವವನ್ನು ಜೊತೆಯಾಗಿ ಉಳಿಸೋಣ." : "Every word belongs to a context, a place and the community that keeps it alive."}</p></div></div></section>
    </>
  );
}
