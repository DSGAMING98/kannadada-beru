"use client";

import { useRef, useState } from "react";
import { ExternalLink, Pause, Play, Volume2 } from "lucide-react";
import type { RegionalAudioSample } from "@/lib/regional-audio";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function RegionalAudioPlayer({ sample }: { sample: RegionalAudioSample }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function syncDuration(audio: HTMLAudioElement) {
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }

  const progress = duration > 0 ? `${Math.min(100, (currentTime / duration) * 100)}%` : "0%";

  return (
    <article className="regional-audio-card">
      <div className="regional-audio-copy">
        <p className="eyebrow"><Volume2 size={15} aria-hidden="true" /> ಕರಾವಳಿಯ ದನಿ · Voice of the coast</p>
        <div className="regional-audio-word">
          <div>
            <h3 lang="kn">{sample.transcript}</h3>
            <p>{sample.romanization}</p>
          </div>
          <span>{sample.languageKannada} · {sample.languageEnglish}</span>
        </div>
        <p lang="kn">{sample.meaningKannada}</p>
        <p>{sample.meaningEnglish}</p>
      </div>

      <div className="regional-audio-controls">
        <audio
          ref={audioRef}
          src={sample.audioUrl}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) => { setCurrentTime(event.currentTarget.currentTime); syncDuration(event.currentTarget); }}
          onLoadedMetadata={(event) => syncDuration(event.currentTarget)}
          onDurationChange={(event) => syncDuration(event.currentTarget)}
        />
        <button type="button" className="audio-play-button" onClick={togglePlayback} aria-label={playing ? `Pause ${sample.transcript}` : `Play ${sample.transcript}`}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <div className="audio-timeline">
          <div className="audio-track" aria-hidden="true"><span style={{ width: progress }} /></div>
          <span>{formatTime(currentTime)}{duration > 0 ? ` / ${formatTime(duration)}` : ""}</span>
        </div>
      </div>

      <div className="regional-audio-credit">
        <span>Voice: {sample.speaker} · {sample.recordedAt}</span>
        <span><a href={sample.sourceUrl} target="_blank" rel="noreferrer">Wikimedia Commons <ExternalLink size={13} /></a> · <a href={sample.licenseUrl} target="_blank" rel="noreferrer">{sample.licenseName}</a></span>
      </div>
      <details>
        <summary>About this recording</summary>
        <p>{sample.provenanceNote}</p>
        <p>Locality: {sample.locality} · Recording type: {sample.audioType.replaceAll("_", " ")} · Rights checked: {sample.rightsVerified ? "yes" : "no"}</p>
      </details>
    </article>
  );
}
