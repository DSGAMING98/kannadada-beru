import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AtlasExplorer } from "@/components/atlas-explorer";
import { PageHero } from "@/components/page-hero";
import { InterfaceText } from "@/components/interface-language";
import { regions } from "@/lib/regions";

export const metadata = { title: "Explore Karnataka" };

export default function ExplorePage() {
  return <>
    <PageHero eyebrow={{ kn: "ಭಾಷೆಯ ಭೂಪಟ", en: "Language atlas" }} title={{ kn: "ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ", en: "Explore Karnataka" }} lead={{ kn: "ಆಡಳಿತಾತ್ಮಕ ಭೂಗೋಳದಿಂದ ಆರಂಭಿಸಿ; ಮೂಲಗಳನ್ನು ಹೊಂದಿರುವ ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಮಾಹಿತಿಯನ್ನು ನೋಡಿ.", en: "Start with administrative geography, then follow carefully sourced paths into language and culture." }} />
    <AtlasExplorer />
    <section className="shell explore-regions"><p className="eyebrow"><InterfaceText kn="ನಕ್ಷೆಗೆ ಸುಲಭ ಪರ್ಯಾಯ" en="Accessible map alternative" /></p><h2><InterfaceText kn="ಪ್ರಾದೇಶಿಕ ಪ್ರವೇಶ ದಾರಿಗಳನ್ನು ನೋಡಿ" en="Explore regional entry points" /></h2><div className="region-list">{regions.map((region) => <Link href={`/regions/${region.slug}`} key={region.id}><span lang="kn">{region.nameKannada}</span><small>{region.nameEnglish}</small><ArrowRight aria-hidden="true" /></Link>)}</div></section>
  </>;
}
