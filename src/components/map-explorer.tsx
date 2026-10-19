"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, MapLayerMouseEvent } from "maplibre-gl";
import { AlertTriangle, LocateFixed, MapPin, RefreshCw } from "lucide-react";
import type { InterfaceLanguage } from "@/components/interface-language";
import { districtByHistoricalName, getDistrictBySlug } from "@/lib/districts";

const EMPTY_STYLE = { version: 8 as const, sources: {}, layers: [{ id: "background", type: "background" as const, paint: { "background-color": "#f4ead8" } }] };
const BOUNDS: [[number, number], [number, number]] = [[74.0, 11.5], [78.7, 18.6]];
type MapFailure = "network" | "worker" | "webgl" | "data" | "unknown";

export function MapExplorer({ selectedSlug, onSelect, language }: { selectedSlug: string | null; onSelect: (slug: string) => void; language: InterfaceLanguage }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const selectedFeatureId = useRef<string | number | undefined>(undefined);
  const [failure, setFailure] = useState<MapFailure | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!container.current) return;
    let disposed = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let map: MapLibreMap | undefined;

    async function initialize() {
      setFailure(null);
      setLoaded(false);
      try {
        const [workerResponse, dataResponse] = await Promise.all([
          fetch("/maplibre-gl-worker.mjs", { cache: "no-cache" }),
          fetch("/data/karnataka-districts-2011.geojson", { cache: "no-cache" }),
        ]);
        if (!workerResponse.ok) throw new Error("worker");
        if (!dataResponse.ok) throw new Error("network");
        const geojson = await dataResponse.json() as { type?: string; features?: unknown[] };
        const collection = geojson;
        if (collection.type !== "FeatureCollection" || !Array.isArray(collection.features) || collection.features.length < 20) throw new Error("data");
        if (disposed || !container.current) return;

        maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
        map = new maplibregl.Map({ container: container.current, style: EMPTY_STYLE, center: [76.2, 14.7], zoom: 5.5, attributionControl: false });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: "DataMeet · CC BY 2.5 IN · Census 2011 vintage" }));
        resizeObserver = new ResizeObserver(() => map?.resize());
        resizeObserver.observe(container.current);
        timeoutId = setTimeout(() => { if (!disposed) setFailure("unknown"); }, 15_000);

        map.on("load", () => {
          if (!map || disposed) return;
          map.addSource("districts", { type: "geojson", data: geojson, generateId: true } as Parameters<MapLibreMap["addSource"]>[1]);
          map.addLayer({ id: "district-fill", type: "fill", source: "districts", paint: { "fill-color": ["case", ["boolean", ["feature-state", "selected"], false], "#f0b323", ["boolean", ["feature-state", "hover"], false], "#c55b54", "#a83a43"], "fill-opacity": 0.82 } });
          map.addLayer({ id: "district-line", type: "line", source: "districts", paint: { "line-color": "#fff8ec", "line-width": ["case", ["boolean", ["feature-state", "selected"], false], 3, 1.25] } });
          map.fitBounds(BOUNDS, { padding: 34, duration: 0 });
          map.once("idle", () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (!disposed) setLoaded(true);
          });
          let hoveredId: string | number | undefined;
          map.on("click", "district-fill", (event: MapLayerMouseEvent) => {
            const feature = event.features?.[0];
            const district = feature ? districtByHistoricalName.get(String(feature.properties?.district)) : undefined;
            if (district) onSelect(district.slug);
          });
          map.on("mousemove", "district-fill", (event: MapLayerMouseEvent) => {
            const next = event.features?.[0]?.id;
            if (hoveredId !== undefined && hoveredId !== next) map?.setFeatureState({ source: "districts", id: hoveredId }, { hover: false });
            hoveredId = next;
            if (next !== undefined) map?.setFeatureState({ source: "districts", id: next }, { hover: true });
          });
          map.on("mouseenter", "district-fill", () => { if (map) map.getCanvas().style.cursor = "pointer"; });
          map.on("mouseleave", "district-fill", () => {
            if (hoveredId !== undefined) map?.setFeatureState({ source: "districts", id: hoveredId }, { hover: false });
            if (map) map.getCanvas().style.cursor = "";
          });
        });
        map.on("error", (event) => {
          const message = String(event.error?.message ?? "").toLowerCase();
          if (!disposed) setFailure(message.includes("worker") ? "worker" : message.includes("webgl") ? "webgl" : "unknown");
        });
      } catch (error) {
        if (disposed) return;
        const message = error instanceof Error ? error.message : "unknown";
        setFailure(message === "worker" || message === "network" || message === "data" ? message : message.toLowerCase().includes("webgl") ? "webgl" : "unknown");
      }
    }

    void initialize();
    return () => {
      disposed = true;
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [attempt, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded || !map.getSource("districts")) return;
    if (selectedFeatureId.current !== undefined) map.setFeatureState({ source: "districts", id: selectedFeatureId.current }, { selected: false });
    selectedFeatureId.current = undefined;
    const historicalName = selectedSlug ? getDistrictBySlug(selectedSlug)?.geometry.historicalFeatureName : null;
    if (!historicalName) return;
    const feature = map.querySourceFeatures("districts").find((item) => item.properties?.district === historicalName);
    if (feature?.id !== undefined) {
      selectedFeatureId.current = feature.id;
      map.setFeatureState({ source: "districts", id: feature.id }, { selected: true });
    }
  }, [loaded, selectedSlug]);

  const copy = language === "kn" ? {
    loading: "ನಕ್ಷೆ ಸಿದ್ಧವಾಗುತ್ತಿದೆ…", unavailable: "ನಕ್ಷೆ ಈಗ ಲಭ್ಯವಿಲ್ಲ", recovery: "ಕೆಳಗಿನ ಹುಡುಕಬಹುದಾದ ಜಿಲ್ಲಾ ಪಟ್ಟಿಯನ್ನು ಬಳಸಿ ಅಥವಾ ನಕ್ಷೆಯನ್ನು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", directory: "ಜಿಲ್ಲಾ ಪಟ್ಟಿಗೆ ಹೋಗಿ", reset: "ನಕ್ಷೆಯನ್ನು ಮರುಹೊಂದಿಸಿ", selected: "ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ", prompt: "2011ರ ಜಿಲ್ಲಾ ಆಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ ಕೆಳಗಿನ ಪಟ್ಟಿಯನ್ನು ಬಳಸಿ", label: "ಕರ್ನಾಟಕದ 2011 ಜಿಲ್ಲಾ ನಕ್ಷೆ · Interactive Karnataka district map",
  } : {
    loading: "Loading the district map…", unavailable: "Map unavailable", recovery: "Use the searchable district directory below, or try loading the map again.", retry: "Try map again", directory: "Go to district directory", reset: "Reset map view", selected: "selected", prompt: "Select a 2011 district shape or use the directory", label: "Interactive 2011-vintage Karnataka district map",
  };

  if (failure) return <div className="map-fallback" role="status"><AlertTriangle aria-hidden="true" /><strong>{copy.unavailable}</strong><p>{copy.recovery}</p><div className="map-recovery-actions"><button className="button button-secondary" type="button" onClick={() => setAttempt((value) => value + 1)}><RefreshCw size={16} /> {copy.retry}</button><a className="text-link" href="#district-directory-title">{copy.directory}</a></div><small>Diagnostic: {failure}</small></div>;
  const selected = selectedSlug ? getDistrictBySlug(selectedSlug) : null;
  return <div className="map-frame"><div ref={container} className="map-canvas" role="application" aria-label={copy.label} aria-busy={!loaded} data-map-status={selected ? "selected" : loaded ? "loaded" : "loading"}>{!loaded && <span className="map-loading-overlay">{copy.loading}</span>}</div><button className="map-reset" type="button" onClick={() => mapRef.current?.fitBounds(BOUNDS, { padding: 34, duration: 500 })}><LocateFixed size={16} /> {copy.reset}</button><div className="map-caption" aria-live="polite"><MapPin aria-hidden="true" size={18} />{selected ? <span><strong lang="kn">{selected.nameKannada}</strong> · {selected.nameEnglish} {copy.selected}</span> : <span>{copy.prompt}</span>}</div></div>;
}
