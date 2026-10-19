import { AlarDictionaryExplorer } from "@/components/alar-dictionary-explorer";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Kannada dictionary",
  description: "Explore 156,000+ source-attributed Kannada dictionary entries with meanings and device pronunciation.",
};

export default function DictionaryPage() {
  return (
    <>
      <PageHero
        eyebrow={{ kn: "೧.೫ ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ದಾಖಲೆಗಳು", en: "More than 150,000 entries" }}
        title={{ kn: "ಕನ್ನಡ ಪದಸಾಗರವನ್ನು ಅನ್ವೇಷಿಸಿ", en: "Explore a sea of Kannada words" }}
        lead={{ kn: "ಮುಕ್ತ ಪರವಾನಗಿಯ ಅಲರ್ ನಿಘಂಟಿನ ಪದ, ಉಚ್ಚಾರಣಾ ಲಿಪಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಅರ್ಥಗಳನ್ನು ಅಕ್ಷರದಂತೆ ವೇಗವಾಗಿ ಅನ್ವೇಷಿಸಿ.", en: "Browse the openly licensed Alar dictionary by initial, with source phonetics, English definitions, and optional device speech." }}
      />
      <AlarDictionaryExplorer />
    </>
  );
}
