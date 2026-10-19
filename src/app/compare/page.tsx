import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { RegionComparison } from "@/components/region-comparison";

export const metadata = { title: "Compare expressions" };
export default function ComparePage() { return <><PageHero eyebrow={{ kn: "ಹೋಲಿಕೆ", en: "Compare" }} title={{ kn: "ವೈವಿಧ್ಯವನ್ನು ಅಳಿಸದೆ ಹೋಲಿಸಿ", en: "Compare without flattening" }} lead={{ kn: "ಎರಡು ಪ್ರದೇಶಗಳ ನುಡಿ, ನೆಲ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಮೂಲಗಳನ್ನು ಪಕ್ಕಪಕ್ಕದಲ್ಲಿ ಅನ್ವೇಷಿಸಿ.", en: "Explore the language, landscape, culture and stories of two regions side by side." }} /><div className="shell compare-voices-link"><div><strong lang="kn">ಒಂದೇ ಕನ್ನಡ · ಹಲವು ಬದುಕಿನ ನುಡಿಗಳು</strong><span>Open the focused regional-language showcase</span></div><Link className="button button-secondary" href="/voices">Explore voices <ArrowRight size={16} /></Link></div><RegionComparison /></>; }
