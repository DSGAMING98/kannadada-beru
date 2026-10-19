"use client";

import Link from "next/link";
import { useInterfaceLanguage } from "@/components/interface-language";
import { navigation } from "@/lib/navigation";

export function BottomNav() {
  const language = useInterfaceLanguage();
  const mobileNavigation = navigation.filter(({ href }) => ["/", "/explore", "/voices", "/play", "/contribute"].includes(href));
  return (
    <nav className="bottom-nav" aria-label={language === "kn" ? "ಮೊಬೈಲ್ ಸಂಚರಣೆ" : "Mobile navigation"}>
      {mobileNavigation.map(({ href, label, english, icon: Icon }) => (
        <Link href={href} key={href}><Icon aria-hidden="true" size={21} /><span lang={language}>{language === "kn" ? label : english}</span></Link>
      ))}
    </nav>
  );
}
