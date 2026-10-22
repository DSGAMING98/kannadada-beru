import { PageHero } from "@/components/page-hero";
import { RegionalAudioIntakeForm } from "@/components/regional-audio-intake-form";

export const metadata = { title: "Regional voice intake" };

export default function RegionalVoiceIntakePage() {
  return <><PageHero eyebrow={{ kn: "ಮೈಸೂರು · ಧಾರವಾಡ · ಕಲಬುರಗಿ", en: "Mysuru · Dharwad · Kalaburagi" }} title={{ kn: "ಮೂರು ನೆಲ, ಐದು ಅರ್ಥ, ಹದಿನೈದು ದನಿಗಳು", en: "Three regions, five meanings, fifteen voices" }} lead={{ kn: "ಒಂದೇ ಅರ್ಥವನ್ನು ಮೂರು ಪ್ರದೇಶಗಳ ವಕ್ತಾರರು ತಮ್ಮ ಸಹಜ ಕನ್ನಡದಲ್ಲಿ ಹೇಳುವ, ಸಮ್ಮತಿ ಮತ್ತು ಮಾನವ ಪರಿಶೀಲನೆ ಆಧಾರಿತ ಸಂಗ್ರಹ ಕ್ರಮ.", en: "A consent-led, human-reviewed collection workflow where speakers from three regions express the same five meanings in their natural Kannada." }} /><RegionalAudioIntakeForm /></>;
}
