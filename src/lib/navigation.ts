import { BookOpenText, Gamepad2, GitCompareArrows, Headphones, House, Info, Map, MessageSquarePlus, Search } from "lucide-react";

export const navigation = [
  { href: "/", label: "ಮುಖಪುಟ", english: "Home", icon: House },
  { href: "/explore", label: "ಅನ್ವೇಷಿಸಿ", english: "Explore", icon: Map },
  { href: "/voices", label: "ನುಡಿಗಳು", english: "Voices", icon: Headphones },
  { href: "/language", label: "ಹುಡುಕಿ", english: "Language", icon: Search },
  { href: "/dictionary", label: "ಪದಕೋಶ", english: "Dictionary", icon: BookOpenText },
  { href: "/play", label: "ಆಡಿ", english: "Play", icon: Gamepad2 },
  { href: "/compare", label: "ಹೋಲಿಸಿ", english: "Compare", icon: GitCompareArrows },
  { href: "/contribute", label: "ಸೇರಿಸಿ", english: "Contribute", icon: MessageSquarePlus },
  { href: "/about", label: "ಬಗ್ಗೆ", english: "About", icon: Info },
] as const;

export const featureCards = [
  { icon: Map, kannada: "ನೆಲದೊಂದಿಗೆ ನುಡಿ", title: "Explore by place", body: "Move through administrative geography without mistaking a district line for a dialect boundary." },
  { icon: BookOpenText, kannada: "ಅರ್ಥ ಮತ್ತು ಸಂದರ್ಭ", title: "Find words in context", body: "Search Kannada by script, Romanization, English meaning, or place—and follow each regional word back to its story." },
  { icon: GitCompareArrows, kannada: "ಹೋಲಿಕೆ, ತೀರ್ಪಲ್ಲ", title: "Compare regions", body: "Place two regions side by side to notice how geography, culture and local expression shape language." },
  { icon: Gamepad2, kannada: "ಆಟದಲ್ಲಿ ಪದ ಕಲಿಕೆ", title: "Learn through play", body: "Build Kannada vocabulary with a ten-round meaning game, streak points, and optional device pronunciation." },
] as const;
