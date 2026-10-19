import { PageHero } from "@/components/page-hero";
import { RegionalVoicesShowcase } from "@/components/regional-voices-showcase";

export const metadata = { title: "Regional Kannada voices" };

export default function VoicesPage() {
  return <><PageHero eyebrow={{ kn: "ಒಂದೇ ಕನ್ನಡ · ಹಲವು ಬದುಕಿನ ನುಡಿಗಳು", en: "One Kannada · many living voices" }} title={{ kn: "ನುಡಿ, ನೆಲ ಮತ್ತು ದನಿಯ ನಡುವೆ", en: "Where words meet place and voice" }} lead={{ kn: "ಉತ್ತರ ಕರ್ನಾಟಕ ಮತ್ತು ಕುಂದಾಪುರದ ಪ್ರಕಟಿತ ಮೂಲಗಳಲ್ಲಿ ಕಂಡ ನುಡಿಗಳನ್ನು ಅರ್ಥ, ಸಂದರ್ಭ ಮತ್ತು ಮೂಲದೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ. ಹೊಂದಾಣಿಕೆಯ ನೈಜ ಧ್ವನಿಗೆ ಪುರಾವೆ ದೊರೆತಾಗ ಮಾತ್ರ ಅದನ್ನು ಪ್ರಕಟಿಸುತ್ತೇವೆ.", en: "Explore usages found in published sources from North Karnataka and Kundapura. Meaning, context and citation stay visible; real audio appears only when the recording and evidence genuinely match." }} /><Suspense fallback={<section className="shell voices-workspace"><div className="map-loading">Loading regional voices…</div></section>}><RegionalVoicesShowcase /></Suspense></>;
}
import { Suspense } from "react";
