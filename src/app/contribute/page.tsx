import { ContributionDraftForm } from "@/components/contribution-draft-form";
import { PageHero } from "@/components/page-hero";

export const metadata = { title: "Contribute" };
export default function ContributePage() { return <><PageHero eyebrow={{ kn: "ಸಮುದಾಯ", en: "Community" }} title={{ kn: "ಪದ ಹಂಚಿ, ನೆನಪು ಉಳಿಸಿ", en: "Share a word, preserve a memory" }} lead={{ kn: "ನಿಮ್ಮ ಊರಿನ ಪದ, ಅದರ ಅರ್ಥ, ಸಂದರ್ಭ ಮತ್ತು ಕಥೆಯನ್ನು ಖಾಸಗಿಯಾಗಿ ದಾಖಲಿಸಿ. ನೀವು ಹಂಚಿಕೊಳ್ಳುವವರೆಗೆ ಅದು ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಇರುತ್ತದೆ.", en: "Capture a word from your place with its meaning, context and story. It stays private on your device until you choose to share it." }} /><ContributionDraftForm /></>; }
