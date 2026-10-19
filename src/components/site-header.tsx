"use client";

import Image from "next/image";
import Link from "next/link";
import { setInterfaceLanguage, useInterfaceLanguage } from "@/components/interface-language";
import { navigation } from "@/lib/navigation";

export function SiteHeader() {
  const language = useInterfaceLanguage();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Kannadada Beru home">
          <Image className="brand-logo" src="/brand/kannadada-beru-logo.webp" width={48} height={48} alt="" priority />
          <span><strong lang="kn">ಕನ್ನಡದ ಬೇರು</strong><small>Kannadada Beru</small></span>
        </Link>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{language === "kn" ? item.label : item.english}</Link>)}
          </nav>
          <div className="language-toggle" role="group" aria-label={language === "kn" ? "ತಾಣದ ಭಾಷೆ" : "Interface language"}>
            <button type="button" aria-label="ಕನ್ನಡ" aria-pressed={language === "kn"} onClick={() => setInterfaceLanguage("kn")}>ಕ</button>
            <button type="button" aria-label="English" aria-pressed={language === "en"} onClick={() => setInterfaceLanguage("en")}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}
