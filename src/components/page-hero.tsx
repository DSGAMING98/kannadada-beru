"use client";

import { useInterfaceLanguage } from "@/components/interface-language";

type Copy = { kn: string; en: string };

export function PageHero({ eyebrow, title, lead }: { eyebrow: string | Copy; title: string | Copy; lead: string | Copy }) {
  const language = useInterfaceLanguage();
  const value = (copy: string | Copy) => typeof copy === "string" ? copy : copy[language];
  return (
    <section className="page-hero shell">
      <p className="eyebrow" lang={language}>{value(eyebrow)}</p>
      <h1 lang={language}>{value(title)}</h1>
      <p className="page-lead" lang={language}>{value(lead)}</p>
    </section>
  );
}
