"use client";

import { useSyncExternalStore } from "react";

export type InterfaceLanguage = "kn" | "en";

const LANGUAGE_KEY = "kannadada-beru-interface-language";
const LANGUAGE_EVENT = "kannadada-beru-language-changed";

function getLanguage(): InterfaceLanguage {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return saved === "en" ? "en" : "kn";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LANGUAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LANGUAGE_EVENT, onStoreChange);
  };
}

export function useInterfaceLanguage() {
  return useSyncExternalStore<InterfaceLanguage>(subscribe, getLanguage, () => "kn");
}

export function setInterfaceLanguage(language: InterfaceLanguage) {
  localStorage.setItem(LANGUAGE_KEY, language);
  document.documentElement.lang = language;
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

export function InterfaceText({ kn, en }: { kn: string; en: string }) {
  const language = useInterfaceLanguage();
  return <span lang={language}>{language === "kn" ? kn : en}</span>;
}
