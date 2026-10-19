"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";

export function PronounceButton({ text }: { text: string }) {
  const language = useInterfaceLanguage();
  const supported = useSyncExternalStore(
    () => () => undefined,
    () => "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    () => false,
  );
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  function pronounce() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith("kn")) ?? null;
    utterance.lang = utterance.voice?.lang ?? "kn-IN";
    utterance.rate = 0.78;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      className="pronounce-button"
      onClick={pronounce}
      disabled={!supported}
      aria-label={supported ? language === "kn" ? `${text} ಪದದ ಸಾಧನದ ಉಚ್ಚಾರಣೆ ಕೇಳಿ` : `Hear device pronunciation for ${text}` : language === "kn" ? "ಸಾಧನದ ಉಚ್ಚಾರಣೆ ಲಭ್ಯವಿಲ್ಲ" : "Device pronunciation is unavailable"}
      title={supported ? language === "kn" ? "ಸಾಧನದ ಕನ್ನಡ ಧ್ವನಿ — ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಮುದ್ರಣವಲ್ಲ" : "Device Kannada voice—not a regional recording" : language === "kn" ? "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆ ಲಭ್ಯವಿಲ್ಲ" : "Speech synthesis is unavailable in this browser"}
    >
      {supported ? <Volume2 aria-hidden="true" size={17} /> : <VolumeX aria-hidden="true" size={17} />}
      <span>{speaking ? language === "kn" ? "ಪ್ಲೇ ಆಗುತ್ತಿದೆ…" : "Playing…" : supported ? language === "kn" ? "ಕೇಳಿ" : "Hear" : language === "kn" ? "ಲಭ್ಯವಿಲ್ಲ" : "Unavailable"}</span>
    </button>
  );
}
