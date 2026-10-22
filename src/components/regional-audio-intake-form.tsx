"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download, FileAudio, ShieldCheck } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { pronunciationRegions } from "@/lib/pronunciation-audio";
import { regionalPrompts } from "@/lib/regional-pronunciation-pilot";

const requiredReviewChecks = ["transcriptMatchesAudio", "meaningMatchesPrompt", "regionSelfReported", "speakerApproved", "communityReviewed", "rightsChecked"] as const;

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function extensionFor(file: File) {
  const match = file.name.toLowerCase().match(/\.(ogg|wav|mp3|webm|m4a|mp4)$/);
  if (match) return `.${match[1]}`;
  if (file.type.includes("ogg")) return ".ogg";
  if (file.type.includes("wav")) return ".wav";
  if (file.type.includes("mpeg")) return ".mp3";
  if (file.type.includes("mp4")) return ".m4a";
  return ".webm";
}

export function RegionalAudioIntakeForm() {
  const language = useInterfaceLanguage();
  const [audio, setAudio] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const previewUrlRef = useRef("");

  useEffect(() => () => { if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current); }, []);

  function selectAudio(file: File | null) {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = file ? URL.createObjectURL(file) : "";
    previewUrlRef.current = url;
    setAudio(file);
    setPreviewUrl(url);
  }

  function exportPackage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!audio) {
      setMessage(language === "kn" ? "ಮೊದಲು ಧ್ವನಿ ಕಡತವನ್ನು ದಾಖಲಿಸಿ ಅಥವಾ ಆರಿಸಿ." : "Record or choose an audio file first.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const missingCheck = ["adultConfirmed", "permissionToPublish", ...requiredReviewChecks].find((name) => form.get(name) !== "yes");
    if (missingCheck) {
      setMessage(language === "kn" ? "ಸಮ್ಮತಿ ಮತ್ತು ಎಲ್ಲಾ ಮಾನವ ಪರಿಶೀಲನೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ." : "Complete consent and every human-review check before export.");
      return;
    }
    const promptId = String(form.get("promptId"));
    const regionId = String(form.get("regionId"));
    const extension = extensionFor(audio);
    const audioFileName = `${promptId}-${regionId}${extension}`;
    const payload = {
      schemaVersion: 1,
      promptId,
      regionId,
      transcriptKannada: String(form.get("transcriptKannada")).trim(),
      romanization: String(form.get("romanization")).trim(),
      audioFileName,
      speakerCredit: String(form.get("speakerCredit")).trim(),
      attributionPreference: String(form.get("attributionPreference")),
      districtGrewUp: String(form.get("districtGrewUp")).trim(),
      yearsLivedThere: Number(form.get("yearsLivedThere")),
      recordedAt: String(form.get("recordedAt")),
      adultConfirmed: true,
      consentReference: String(form.get("consentReference")).trim(),
      permissionToPublish: true,
      permission: String(form.get("permission")),
      reviewerCredit: String(form.get("reviewerCredit")).trim(),
      reviewedAt: String(form.get("reviewedAt")),
      review: Object.fromEntries(requiredReviewChecks.map((name) => [name, true])),
    };
    downloadBlob(audio, audioFileName);
    window.setTimeout(() => downloadBlob(new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" }), `${promptId}-${regionId}.json`), 150);
    setMessage(language === "kn" ? "ಧ್ವನಿ ಮತ್ತು ಅದರ ಪರಿಶೀಲಿತ ಮಾಹಿತಿ ಕಡತಗಳನ್ನು ರಫ್ತು ಮಾಡಲಾಗಿದೆ." : "Audio and its reviewed metadata sidecar were exported.");
  }

  return <section className="shell audio-intake-workspace" aria-labelledby="audio-intake-title">
    <Link className="back-link" href="/voices"><ArrowLeft size={16} />{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to regional voices"}</Link>
    <div className="audio-intake-summary">
      <div><p className="eyebrow">5 prompts × 3 regions = 15 clips</p><h2 id="audio-intake-title">{language === "kn" ? "ನೈಜ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿ ಸಂಗ್ರಹ" : "Authentic regional voice intake"}</h2><p>{language === "kn" ? "ಮೈಸೂರು, ಧಾರವಾಡ ಮತ್ತು ಕಲಬುರಗಿಯ ವಕ್ತಾರರು ಒಂದೇ ಅರ್ಥವನ್ನು ತಮ್ಮ ಸಹಜ ಪ್ರಾದೇಶಿಕ ಕನ್ನಡದಲ್ಲಿ ಹೇಳಬಹುದು. ಪ್ರತಿ ಕಡತದ ಜೊತೆಗೆ ನಿಖರ ಪಠ್ಯ, ಸ್ವಯಂ ತಿಳಿಸಿದ ಪ್ರದೇಶ, ಸಮ್ಮತಿ ಮತ್ತು ಮಾನವ ಪರಿಶೀಲನೆ ಉಳಿಯುತ್ತದೆ." : "Speakers from Mysuru, Dharwad and Kalaburagi may express the same meaning in their natural regional Kannada. Every clip stays paired with its exact transcript, self-reported region, consent and human review."}</p></div>
      <div><strong>15</strong><span>{language === "kn" ? "ಒಟ್ಟು ಬೇಕಿರುವ ಧ್ವನಿಗಳು" : "total clips required"}</span></div>
    </div>

    <div className="audio-prompt-list">
      {regionalPrompts.map((prompt) => <article key={prompt.id}><span>{prompt.number}</span><div><strong lang="kn">{prompt.meaningKannada}</strong><p>{prompt.meaningEnglish}</p><small>{prompt.speakerDirection}</small></div></article>)}
    </div>

    <form className="contribution-form audio-intake-form" onSubmit={exportPackage}>
      <div className="form-heading"><p className="eyebrow">{language === "kn" ? "ಒಂದು ಧ್ವನಿ · ಒಂದು ಮಾಹಿತಿ ಕಡತ" : "One clip · one metadata file"}</p><h2>{language === "kn" ? "ಧ್ವನಿ ಪ್ಯಾಕೇಜ್ ಸಿದ್ಧಪಡಿಸಿ" : "Prepare a recording package"}</h2><p>{language === "kn" ? "ಪ್ರತಿ ವಕ್ತಾರನ ಐದು ಧ್ವನಿಗಳಿಗೆ ಈ ನಮೂನೆಯನ್ನು ಐದು ಬಾರಿ ಬಳಸಿ. ಧ್ವನಿ ಅಥವಾ ಮಾಹಿತಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗುವುದಿಲ್ಲ." : "Use this form five times for each speaker. Audio and metadata are never uploaded automatically."}</p></div>
      <div className="form-grid">
        <label><span>{language === "kn" ? "ಅರ್ಥ ಆಧಾರಿತ ಪ್ರಾಂಪ್ಟ್" : "Meaning-based prompt"}</span><select name="promptId" aria-label="Meaning-based prompt" required defaultValue={regionalPrompts[0].id}>{regionalPrompts.map((prompt) => <option key={prompt.id} value={prompt.id}>{prompt.number}. {prompt.meaningEnglish}</option>)}</select></label>
        <label><span>{language === "kn" ? "ವಕ್ತಾರರು ಸ್ವತಃ ತಿಳಿಸಿದ ಪ್ರದೇಶ" : "Speaker’s self-reported region"}</span><select name="regionId" aria-label="Speaker’s self-reported region" required defaultValue=""><option value="" disabled>{language === "kn" ? "ಪ್ರದೇಶ ಆರಿಸಿ" : "Choose region"}</option>{pronunciationRegions.map((region) => <option key={region.id} value={region.id}>{region.nameKannada} · {region.nameEnglish}</option>)}</select></label>
        <label className="full"><span>{language === "kn" ? "ಧ್ವನಿ ದಾಖಲಿಸಿ ಅಥವಾ ಕಡತ ಆರಿಸಿ" : "Record or choose audio"}</span><input aria-label="Record or choose audio" type="file" accept="audio/*" capture="user" required onChange={(event) => selectAudio(event.currentTarget.files?.[0] ?? null)} /></label>
        {previewUrl ? <div className="full audio-local-preview"><FileAudio aria-hidden="true" /><audio controls preload="metadata" src={previewUrl} /><span>{audio?.name}</span></div> : null}
        <label className="full"><span>{language === "kn" ? "ಧ್ವನಿಯಲ್ಲಿ ನಿಜವಾಗಿ ಹೇಳಿದ ಕನ್ನಡ ಪಠ್ಯ" : "Exact spoken Kannada transcript"}</span><textarea name="transcriptKannada" aria-label="Exact spoken Kannada transcript" lang="kn" required minLength={2} maxLength={500} rows={3} /></label>
        <label className="full"><span>{language === "kn" ? "ರೋಮನೀಕೃತ ರೂಪ (ಐಚ್ಛಿಕ)" : "Romanized Kannada (optional)"}</span><input name="romanization" aria-label="Romanized Kannada" maxLength={500} /></label>
        <label><span>{language === "kn" ? "ಬೆಳೆದ ಜಿಲ್ಲೆ" : "District where speaker grew up"}</span><input name="districtGrewUp" aria-label="District where speaker grew up" required maxLength={120} /></label>
        <label><span>{language === "kn" ? "ಅಲ್ಲಿ ವಾಸಿಸಿದ ವರ್ಷಗಳು" : "Approximate years lived there"}</span><input name="yearsLivedThere" aria-label="Approximate years lived there" type="number" required min={1} max={100} /></label>
        <label><span>{language === "kn" ? "ಸಾರ್ವಜನಿಕ ಹೆಸರಿನ ಆಯ್ಕೆ" : "Attribution preference"}</span><select name="attributionPreference" defaultValue="anonymous"><option value="anonymous">Anonymous</option><option value="display_name">Display name</option><option value="full_name">Full name</option></select></label>
        <label><span>{language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕ್ರೆಡಿಟ್" : "Public speaker credit"}</span><input name="speakerCredit" aria-label="Public speaker credit" required defaultValue="Anonymous consenting speaker" maxLength={120} /></label>
        <label><span>{language === "kn" ? "ದಾಖಲಿಸಿದ ದಿನ" : "Recording date"}</span><input name="recordedAt" aria-label="Recording date" type="date" required /></label>
        <label><span>{language === "kn" ? "ಪ್ರಕಟಣೆಯ ಅನುಮತಿ" : "Publication permission"}</span><select name="permission" defaultValue="project-only"><option value="project-only">Project-only display permission</option><option value="CC-BY-4.0">CC BY 4.0</option><option value="CC0-1.0">CC0 1.0</option></select></label>
        <label className="full"><span>{language === "kn" ? "ಸಹಿ ಮಾಡಿದ ನಮೂನೆ ಅಥವಾ ದಾಖಲಿತ ಸಮ್ಮತಿಯ ಉಲ್ಲೇಖ" : "Signed-form or recorded-consent reference"}</span><input name="consentReference" aria-label="Consent reference" required maxLength={240} placeholder="Private file ID or consent recording filename" /></label>
        <label className="checkbox-label"><input type="checkbox" name="adultConfirmed" value="yes" /><span>{language === "kn" ? "ವಕ್ತಾರರು 18 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನವರು." : "The speaker confirms they are 18 or older."}</span></label>
        <label className="checkbox-label"><input type="checkbox" name="permissionToPublish" value="yes" /><span>{language === "kn" ? "ವಕ್ತಾರರು ಆಯ್ದ ಷರತ್ತಿನಡಿ ಈ ಧ್ವನಿ, ಪಠ್ಯ ಮತ್ತು ಪ್ರದೇಶದ ಮಾಹಿತಿಯನ್ನು ಪ್ರಕಟಿಸಲು ಅನುಮತಿಸಿದ್ದಾರೆ." : "The speaker permits publication of this audio, transcript and region metadata under the selected terms."}</span></label>
        <label><span>{language === "kn" ? "ಮಾನವ ಪರಿಶೀಲಕರ ಹೆಸರು/ID" : "Human reviewer name/ID"}</span><input name="reviewerCredit" aria-label="Human reviewer name or ID" required maxLength={120} /></label>
        <label><span>{language === "kn" ? "ಪರಿಶೀಲಿಸಿದ ದಿನ" : "Review date"}</span><input name="reviewedAt" aria-label="Review date" type="date" required /></label>
        <fieldset className="full review-checks"><legend>{language === "kn" ? "ಕಡ್ಡಾಯ ಮಾನವ ಪರಿಶೀಲನೆ" : "Required human review"}</legend>
          <label><input type="checkbox" name="transcriptMatchesAudio" value="yes" />Transcript exactly matches the audio.</label>
          <label><input type="checkbox" name="meaningMatchesPrompt" value="yes" />The spoken expression preserves the selected prompt’s meaning.</label>
          <label><input type="checkbox" name="regionSelfReported" value="yes" />Region is self-reported, not inferred from accent or address.</label>
          <label><input type="checkbox" name="speakerApproved" value="yes" />Speaker replayed and approved the final clip.</label>
          <label><input type="checkbox" name="communityReviewed" value="yes" />A second local/native reviewer confirmed meaning and naturalness.</label>
          <label><input type="checkbox" name="rightsChecked" value="yes" />Permission, attribution and publication rights were checked.</label>
        </fieldset>
      </div>
      <div className="form-actions"><button className="button button-primary" type="submit"><Download size={18} />{language === "kn" ? "ಧ್ವನಿ + ಮಾಹಿತಿ ರಫ್ತು ಮಾಡಿ" : "Export audio + metadata"}</button></div>
      <p className="form-message" aria-live="polite">{message}</p>
      <div className="integrity-note"><ShieldCheck aria-hidden="true" /><span>{language === "kn" ? "ಎಲ್ಲಾ ಮೂರು ಪ್ರದೇಶಗಳ ಪರಿಶೀಲಿತ ಧ್ವನಿಗಳು ದೊರೆತ ಪ್ರಾಂಪ್ಟ್ ಮಾತ್ರ ಹೋಲಿಕೆ ಪುಟದಲ್ಲಿ ಸಕ್ರಿಯವಾಗುತ್ತದೆ." : "A prompt becomes playable on the comparison page only after verified clips from all three regions are present."}</span></div>
    </form>

    <aside className="audio-import-handoff"><CheckCircle2 aria-hidden="true" /><div><strong>{language === "kn" ? "ರಫ್ತು ಮಾಡಿದ ಕಡತಗಳನ್ನು ಇಲ್ಲಿ ಇಡಿ" : "Place exported files here"}</strong><code>regional-audio-intake/inbox/</code><p>{language === "kn" ? "ಎಲ್ಲಾ 15 audio + JSON ಜೋಡಿಗಳನ್ನು ಇಟ್ಟು pnpm audio:import ಚಲಾಯಿಸಿ. ಅಪ್ಲಿಕೇಶನ್ ಮೂಲವನ್ನು ಕೈಯಾರೆ ಬದಲಾಯಿಸಬೇಕಾಗಿಲ್ಲ." : "Add all 15 audio + JSON pairs, then run pnpm audio:import. No application source editing is required."}</p></div></aside>
  </section>;
}
