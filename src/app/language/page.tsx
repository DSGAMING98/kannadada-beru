import { Suspense } from "react";
import { LanguageExplorer } from "@/components/language-explorer";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Kannada expression search" };
export default function LanguagePage() { return <><PageHero eyebrow={{ kn: "ನುಡಿ ಹುಡುಕಾಟ", en: "Language search" }} title={{ kn: "ಅರ್ಥ, ಧ್ವನಿ ಮತ್ತು ಸ್ಥಳದೊಂದಿಗೆ ಪದಗಳು", en: "Words with meaning, voice, and place" }} lead={{ kn: "ಸಾಮಾನ್ಯ ಕನ್ನಡ ಪದಗಳಿಂದ ಪ್ರಕಟಿತ ಪ್ರಾದೇಶಿಕ ನುಡಿಗಳವರೆಗೆ — ಲಿಪಿ, ರೋಮನೀಕರಣ ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಅರ್ಥದಿಂದ ಹುಡುಕಿ.", en: "From everyday Kannada to words found in regional publications—search by script, Romanization, or English meaning." }} /><Suspense fallback={<section className="shell language-workspace"><div className="map-loading">Loading language search…</div></section>}><LanguageExplorer /></Suspense></>; }
