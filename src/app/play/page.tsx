import { KannadaWordGame } from "@/components/kannada-word-game";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Kannada word game",
  description: "A short bilingual Kannada vocabulary challenge with meanings and device pronunciation.",
};

export default function PlayPage() {
  return (
    <>
      <PageHero
        eyebrow={{ kn: "ಆಡಿ · ಕೇಳಿ · ಕಲಿಯಿರಿ", en: "Play · listen · learn" }}
        title={{ kn: "ಪದ ಬೇರು — ಕನ್ನಡದ ಪುಟ್ಟ ಆಟ", en: "Pada Beru — a Kannada word game" }}
        lead={{ kn: "ಹತ್ತು ಪ್ರಶ್ನೆಗಳು, ಅರ್ಥದ ಆಯ್ಕೆಗಳು, ಧ್ವನಿ ಸಹಾಯ ಮತ್ತು ಸರಣಿ ಅಂಕಗಳೊಂದಿಗೆ ಕನ್ನಡ ಪದಗಳನ್ನು ನೆನಪಿನಲ್ಲಿ ಬೇರೂರಿಸಿ.", en: "Grow your Kannada vocabulary through ten quick questions, meaning choices, optional device speech, and streak points." }}
      />
      <KannadaWordGame />
    </>
  );
}
