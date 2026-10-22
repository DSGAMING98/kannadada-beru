import { PageHero } from "@/components/page-hero";
import { RegionalAudioSubmissionForm } from "@/components/regional-audio-submission-form";

export const metadata = { title: "Contribute regional Kannada audio" };

export default function RegionalAudioContributionPage() {
  return <><PageHero eyebrow={{ kn: "ಸಮುದಾಯದ ದನಿ", en: "Voices from the community" }} title={{ kn: "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡವನ್ನು ಕೇಳಿಸಿ", en: "Share your regional Kannada" }} lead={{ kn: "ಒಂದೇ ಅರ್ಥವನ್ನು ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಸಹಜವಾಗಿ ಹೇಗೆ ಹೇಳುತ್ತೀರಿ? ಸಮ್ಮತಿಯೊಂದಿಗೆ ಧ್ವನಿ ನೀಡಿ; ಮಾನವ ಪರಿಶೀಲನೆಯ ನಂತರ ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆಯ ಕೊಡುಗೆ ಮಾತ್ರ ಪ್ರಕಟವಾಗುತ್ತದೆ.", en: "How does your region naturally express the same meaning? Contribute with consent; only the strongest suitable submission is published after human review." }} /><RegionalAudioSubmissionForm /></>;
}
