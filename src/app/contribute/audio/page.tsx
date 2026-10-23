import { PageHero } from "@/components/page-hero";
import { RegionalAudioSubmissionForm } from "@/components/regional-audio-submission-form";

export const metadata = { title: "Contribute regional Kannada audio" };

export default function RegionalAudioContributionPage() {
  return <><PageHero eyebrow={{ kn: "ಸಮುದಾಯದ ದನಿ", en: "Voices from the community" }} title={{ kn: "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡವನ್ನು ಕೇಳಿಸಿ", en: "Share your regional Kannada" }} lead={{ kn: "ಒಂದೇ ಅರ್ಥವನ್ನು ನಿಮ್ಮ ಊರಿನಲ್ಲಿ ಸಹಜವಾಗಿ ಹೇಗೆ ಹೇಳುತ್ತೀರಿ? ಸಮ್ಮತಿಯೊಂದಿಗೆ ಧ್ವನಿ ನೀಡಿ; ಆಯ್ದ ಕೊಡುಗೆಗಳು ಕನ್ನಡದ ಪ್ರಾದೇಶಿಕ ದನಿಗಳ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರುತ್ತವೆ.", en: "How does your region naturally express the same meaning? Share it with permission and help grow a living collection of regional Kannada voices." }} /><RegionalAudioSubmissionForm /></>;
}
