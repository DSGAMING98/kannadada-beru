"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Database, MapPinned, Search, X } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { districts, getDistrictBySlug } from "@/lib/districts";
import { getRegionsForDistrict, regions } from "@/lib/regions";

const MapExplorer = dynamic(() => import("@/components/map-explorer").then((module) => module.MapExplorer), { ssr: false, loading: () => <div className="map-loading" aria-live="polite">Loading the local map…</div> });

export function AtlasExplorer() {
  const language = useInterfaceLanguage();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectionRef = useRef<HTMLElement>(null);
  const onSelect = useCallback((slug: string) => setSelectedSlug(slug), []);
  const filtered = useMemo(() => { const needle = query.trim().toLocaleLowerCase("kn"); return districts.filter((district) => { const matchesText = !needle || [district.nameKannada, district.nameEnglish, district.headquarters ?? "", ...district.formerNames].some((value) => value.toLocaleLowerCase("kn").includes(needle)); const matchesRegion = region === "all" || getRegionsForDistrict(district.slug).some(({ slug }) => slug === region); return matchesText && matchesRegion; }); }, [query, region]);
  const selected = selectedSlug ? getDistrictBySlug(selectedSlug) : null;
  const selectedRegions = selected ? getRegionsForDistrict(selected.slug) : [];

  useEffect(() => {
    if (selected) selectionRef.current?.focus({ preventScroll: true });
  }, [selected]);

  const copy = language === "kn" ? {
    layers: "ಎರಡು ಭೌಗೋಳಿಕ ಪದರಗಳು:", layerBody: "ಪಟ್ಟಿಯಲ್ಲಿ ಈಗಿನ 31 ಜಿಲ್ಲೆಗಳಿವೆ. ನಕ್ಷೆಯ ಆಕಾರಗಳು 2011ರ ಜನಗಣತಿಯ 30 ಜಿಲ್ಲೆಗಳ ಪ್ರತ್ಯೇಕ ಉಲ್ಲೇಖ; ಅದರಲ್ಲಿ ವಿಜಯನಗರಕ್ಕೆ ಸ್ವತಂತ್ರ ಆಕಾರವಿಲ್ಲ. ಇವು ಭಾಷಾ ಗಡಿಗಳಲ್ಲ.",
    selected: "ಆಯ್ದ ಜಿಲ್ಲೆ", regions: "ಸಂಬಂಧಿತ ಭಾಷಾ ಪ್ರದೇಶಗಳು", noRegion: "ಜಿಲ್ಲೆಯ ಕಥೆ ಮತ್ತು ಪದಸಂಗ್ರಹವನ್ನು ನೇರವಾಗಿ ಅನ್ವೇಷಿಸಿ.", open: "ಜಿಲ್ಲೆಯ ವಿವರ ನೋಡಿ", close: "ಆಯ್ಕೆಯನ್ನು ಮುಚ್ಚಿ",
    directory: "ಈಗಿನ ಆಡಳಿತಾತ್ಮಕ ಪಟ್ಟಿ", title: "ಹುಡುಕಬಹುದಾದ 31 ಜಿಲ್ಲೆಗಳು", help: "ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿನ ಹೆಸರು ಮತ್ತು ಜಿಲ್ಲಾ ಕೇಂದ್ರದಿಂದ ಹುಡುಕಿ.", shown: "ತೋರಿಸಲಾಗಿದೆ", search: "ಜಿಲ್ಲೆ ಹುಡುಕಿ", filter: "ಭಾಷಾ ಪ್ರದೇಶದಿಂದ ಆರಿಸಿ", all: "ಎಲ್ಲ ಭಾಷಾ ಪ್ರದೇಶಗಳು", empty: "ಹೊಂದುವ ಜಿಲ್ಲೆ ಇಲ್ಲ", emptyHelp: "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್ ಹೆಸರನ್ನು ಪ್ರಯತ್ನಿಸಿ, ಇಲ್ಲವೇ ಪ್ರದೇಶದ ಆಯ್ಕೆಯನ್ನು ತೆರವುಗೊಳಿಸಿ.", geometry: "ನಕ್ಷೆಯ ಆಕಾರ",
  } : {
    layers: "Two geographic layers:", layerBody: "The directory reflects the current 31 districts. The map shapes are a separate 30-district Census-2011 reference with no standalone Vijayanagara feature. Neither layer is a linguistic boundary.",
    selected: "Selected district", regions: "Related language regions", noRegion: "Continue directly to the district story and language explorer.", open: "Explore district", close: "Close selection",
    directory: "Current administrative directory", title: "31 districts, searchable", help: "Search by Kannada, English, former name, or headquarters.", shown: "shown", search: "Search districts", filter: "Filter by language region", all: "All language regions", empty: "No matching district", emptyHelp: "Try a Kannada or English name, or clear the region filter.", geometry: "Map geometry",
  };

  return <>
    <section className="shell map-section"><div className="notice"><Database aria-hidden="true" /><p><strong>{copy.layers}</strong> {copy.layerBody}</p></div><MapExplorer selectedSlug={selectedSlug} onSelect={onSelect} language={language} />
      {selected && <aside ref={selectionRef} tabIndex={-1} className="district-selection district-selection-drawer" data-testid="district-selection" aria-live="polite" aria-label={`${copy.selected}: ${selected.nameEnglish}`}><button className="selection-close" type="button" onClick={() => setSelectedSlug(null)} aria-label={copy.close}><X size={20} /></button><div><p className="eyebrow">{copy.selected}</p><h2><span lang="kn">{selected.nameKannada}</span> <small>{selected.nameEnglish}</small></h2><p>{selected.currentStatusNote}</p><p className="source-label">{copy.geometry}: {selected.geometry.availability === "historical-2011" ? `2011 — ${selected.geometry.historicalFeatureName}` : language === "kn" ? "2011ರ ಕಡತದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ" : "not available in the bundled 2011 file"}.</p></div><div><p><strong>{copy.regions}</strong></p>{selectedRegions.length ? <ul>{selectedRegions.map((item) => <li key={item.id}><Link href={`/regions/${item.slug}`}>{language === "kn" ? item.nameKannada : item.nameEnglish}</Link></li>)}</ul> : <p>{copy.noRegion}</p>}<Link className="button button-primary" href={`/districts/${selected.slug}`}>{copy.open} <ArrowRight size={17} /></Link></div></aside>}
    </section>
    <section className="shell district-directory" aria-labelledby="district-directory-title"><p className="eyebrow">{copy.directory}</p><div className="directory-heading"><div><h2 id="district-directory-title">{copy.title}</h2><p>{copy.help}</p></div><strong aria-live="polite">{filtered.length} {copy.shown}</strong></div><div className="directory-tools"><label><Search aria-hidden="true" size={18} /><span className="sr-only">{copy.search}</span><input aria-label={copy.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Mysuru, ಮೈಸೂರು, Mysore…" /></label><label><span className="sr-only">{copy.filter}</span><select aria-label={copy.filter} value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">{copy.all}</option>{regions.map((item) => <option key={item.id} value={item.slug}>{language === "kn" ? item.nameKannada : item.nameEnglish}</option>)}</select></label></div>{filtered.length ? <div className="district-grid">{filtered.map((district) => <button type="button" aria-pressed={district.slug === selectedSlug} aria-controls="district-selection" className={district.slug === selectedSlug ? "district-card selected" : "district-card"} key={district.id} onClick={() => onSelect(district.slug)}><MapPinned aria-hidden="true" /><span><strong lang="kn">{district.nameKannada}</strong><small>{district.nameEnglish}</small></span><ArrowRight aria-hidden="true" /></button>)}</div> : <div className="empty-state"><h3>{copy.empty}</h3><p>{copy.emptyHelp}</p></div>}</section>
  </>;
}
