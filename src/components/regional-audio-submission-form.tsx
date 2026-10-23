"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { CheckCircle2, FileAudio, LoaderCircle, LockKeyhole, Send, ShieldCheck } from "lucide-react";
import { useInterfaceLanguage } from "@/components/interface-language";
import { pronunciationRegions } from "@/lib/pronunciation-audio";
import { regionalAudioSubmissionSchema } from "@/lib/regional-audio-submission";
import { regionalPrompts } from "@/lib/regional-pronunciation-pilot";

function audioExtension(file: File) {
  const match = file.name.toLowerCase().match(/\.(ogg|wav|mp3|webm|m4a|mp4)$/);
  return match?.[1] ?? (file.type.includes("mp4") ? "m4a" : "webm");
}

export function RegionalAudioSubmissionForm() {
  const language = useInterfaceLanguage();
  const [audio, setAudio] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const previewUrlRef = useRef("");

  useEffect(() => () => { if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current); }, []);

  function selectAudio(file: File | null) {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = file ? URL.createObjectURL(file) : "";
    previewUrlRef.current = url;
    setAudio(file);
    setPreviewUrl(url);
  }

  async function submitContribution(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!audio) {
      setMessage(language === "kn" ? "ಮೊದಲು ಧ್ವನಿಯನ್ನು ದಾಖಲಿಸಿ ಅಥವಾ ಆರಿಸಿ." : "Record or choose an audio file first.");
      return;
    }
    if (audio.size > 15 * 1024 * 1024) {
      setMessage(language === "kn" ? "ಧ್ವನಿ ಕಡತವು 15 MB ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು." : "The audio file must be smaller than 15 MB.");
      return;
    }
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const submissionId = crypto.randomUUID();
    const parsed = regionalAudioSubmissionSchema.safeParse({
      schemaVersion: 1,
      submissionId,
      promptId: form.get("promptId"),
      regionId: form.get("regionId"),
      transcriptKannada: form.get("transcriptKannada"),
      romanization: form.get("romanization"),
      districtGrewUp: form.get("districtGrewUp"),
      yearsLivedThere: Number(form.get("yearsLivedThere")),
      recordedAt: form.get("recordedAt"),
      attributionPreference: form.get("attributionPreference"),
      speakerCredit: form.get("speakerCredit"),
      contactEmail: form.get("contactEmail"),
      permission: form.get("permission"),
      adultConfirmed: form.get("adultConfirmed") === "yes",
      consentToReviewAndPublish: form.get("consentToReviewAndPublish") === "yes",
      consentName: form.get("consentName"),
      website: form.get("website"),
    });
    if (!parsed.success) {
      setMessage(language === "kn" ? "ಕಡ್ಡಾಯ ಮಾಹಿತಿ ಮತ್ತು ಸಮ್ಮತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ." : parsed.error.issues[0]?.message ?? "Review the required fields.");
      return;
    }
    setSubmitting(true);
    setMessage(language === "kn" ? "ಧ್ವನಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…" : "Sending your recording securely…");
    try {
      await upload(`review-submissions/${submissionId}/audio.${audioExtension(audio)}`, audio, {
        access: "private",
        handleUploadUrl: "/api/regional-audio-submissions/upload",
        clientPayload: JSON.stringify(parsed.data),
        headers: { "x-contributor-code": String(form.get("contributorCode")) },
      });
      setSubmittedId(submissionId);
      setMessage(language === "kn" ? "ನಿಮ್ಮ ಧ್ವನಿ ಸುರಕ್ಷಿತವಾಗಿ ತಲುಪಿದೆ. ಧನ್ಯವಾದಗಳು!" : "Your voice contribution arrived safely. Thank you!");
      formElement.reset();
      selectAudio(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : (language === "kn" ? "ಸಲ್ಲಿಕೆ ವಿಫಲವಾಗಿದೆ." : "Submission failed."));
    } finally {
      setSubmitting(false);
    }
  }

  return <section className="shell public-audio-contribution" aria-labelledby="public-audio-title">
    <div className="submission-principle"><ShieldCheck aria-hidden="true" /><div><strong>{language === "kn" ? "ಸುರಕ್ಷಿತ ಮತ್ತು ಸಮ್ಮತಿ ಆಧಾರಿತ ಕೊಡುಗೆ" : "Private, permission-led contribution"}</strong><p>{language === "kn" ? "ನಿಮ್ಮ ಧ್ವನಿ ಖಾಸಗಿಯಾಗಿ ಸಂಗ್ರಹವಾಗುತ್ತದೆ. ಪಠ್ಯ, ಅನುಮತಿ, ಧ್ವನಿ ಗುಣಮಟ್ಟ ಮತ್ತು ನೀವು ತಿಳಿಸಿದ ಪ್ರದೇಶದ ಮಾಹಿತಿ ಹೊಂದಿದ ಆಯ್ದ ಧ್ವನಿಗಳು ಮಾತ್ರ ಸಾರ್ವಜನಿಕ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರುತ್ತವೆ." : "Your recording stays private. Selected clips join the public collection only when the transcript, permission, audio quality and self-reported region are complete."}</p></div></div>

    <div className="audio-prompt-list">
      {regionalPrompts.map((prompt) => <article key={prompt.id}><span>{prompt.number}</span><div><strong lang="kn">{prompt.meaningKannada}</strong><p>{prompt.meaningEnglish}</p><small>{prompt.speakerDirection}</small></div></article>)}
    </div>

    {submittedId ? <div className="submission-success" role="status"><CheckCircle2 aria-hidden="true" /><div><strong>{language === "kn" ? "ಕೊಡುಗೆ ತಲುಪಿದೆ" : "Contribution received"}</strong><p>{language === "kn" ? "ಈ ಗುರುತನ್ನು ಉಳಿಸಿಕೊಳ್ಳಿ:" : "Keep this reference:"} <code>{submittedId}</code></p></div></div> : null}

    <form className="contribution-form audio-submission-form" onSubmit={submitContribution}>
      <div className="form-heading"><p className="eyebrow">{language === "kn" ? "ನಿಮ್ಮ ನುಡಿ · ನಿಮ್ಮ ಧ್ವನಿ" : "Your expression · your voice"}</p><h2 id="public-audio-title">{language === "kn" ? "ಪ್ರಾದೇಶಿಕ ಕನ್ನಡ ಧ್ವನಿ ಕೊಡುಗೆ ನೀಡಿ" : "Contribute a regional Kannada voice"}</h2><p>{language === "kn" ? "ಕೆಳಗಿನ ಅರ್ಥಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ, ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸಹಜವಾಗಿ ಹೇಳುವ ರೀತಿಯಲ್ಲಿ ದಾಖಲಿಸಿ. ಒಂದೇ ಪದಗಳನ್ನು ಬಳಸಬೇಕಿಲ್ಲ; ಅರ್ಥ ಒಂದೇ ಇರಬೇಕು." : "Choose one meaning and record how you naturally say it in your region. The wording may differ; the intended meaning must stay the same."}</p></div>
      <div className="form-grid">
        <label><span>{language === "kn" ? "ಕೊಡುಗೆ ಪ್ರಾಂಪ್ಟ್" : "Contribution prompt"}</span><select name="promptId" aria-label="Contribution prompt" required defaultValue={regionalPrompts[0].id}>{regionalPrompts.map((prompt) => <option key={prompt.id} value={prompt.id}>{prompt.number}. {prompt.meaningEnglish}</option>)}</select></label>
        <label><span>{language === "kn" ? "ನೀವು ಸ್ವತಃ ಗುರುತಿಸುವ ಪ್ರದೇಶ" : "Your self-identified region"}</span><select name="regionId" aria-label="Self-identified region" required defaultValue=""><option value="" disabled>{language === "kn" ? "ಪ್ರದೇಶ ಆರಿಸಿ" : "Choose region"}</option>{pronunciationRegions.map((region) => <option key={region.id} value={region.id}>{region.nameKannada} · {region.nameEnglish}</option>)}</select></label>
        <label className="full"><span>{language === "kn" ? "ಧ್ವನಿ ದಾಖಲಿಸಿ ಅಥವಾ ಆರಿಸಿ (ಗರಿಷ್ಠ 15 MB)" : "Record or choose audio (maximum 15 MB)"}</span><input aria-label="Contribution audio" type="file" accept="audio/*" capture="user" required onChange={(event) => selectAudio(event.currentTarget.files?.[0] ?? null)} /></label>
        {previewUrl ? <div className="full audio-local-preview"><FileAudio aria-hidden="true" /><audio controls preload="metadata" src={previewUrl} /><span>{audio?.name}</span></div> : null}
        <label className="full"><span>{language === "kn" ? "ನೀವು ನಿಜವಾಗಿ ಹೇಳಿದ ಕನ್ನಡ ಪಠ್ಯ" : "Exact Kannada words you spoke"}</span><textarea name="transcriptKannada" aria-label="Exact Kannada words spoken" lang="kn" required minLength={2} maxLength={500} rows={3} /></label>
        <label className="full"><span>{language === "kn" ? "ರೋಮನೀಕೃತ ಕನ್ನಡ (ಐಚ್ಛಿಕ)" : "Romanized Kannada (optional)"}</span><input name="romanization" aria-label="Submission Romanized Kannada" maxLength={500} /></label>
        <label><span>{language === "kn" ? "ನೀವು ಬೆಳೆದ ಜಿಲ್ಲೆ" : "District where you grew up"}</span><input name="districtGrewUp" aria-label="Contributor district" required maxLength={120} /></label>
        <label><span>{language === "kn" ? "ಅಲ್ಲಿ ವಾಸಿಸಿದ ಅಂದಾಜು ವರ್ಷಗಳು" : "Approximate years lived there"}</span><input name="yearsLivedThere" aria-label="Contributor years lived there" type="number" required min={1} max={100} /></label>
        <label><span>{language === "kn" ? "ಧ್ವನಿ ದಾಖಲಿಸಿದ ದಿನ" : "Recording date"}</span><input name="recordedAt" aria-label="Contribution recording date" type="date" required /></label>
        <label><span>{language === "kn" ? "ಹೆಸರಿನ ಆಯ್ಕೆ" : "Attribution preference"}</span><select name="attributionPreference" aria-label="Contribution attribution preference" defaultValue="anonymous"><option value="anonymous">Anonymous</option><option value="display_name">Display name</option><option value="full_name">Full name</option></select></label>
        <label><span>{language === "kn" ? "ಪ್ರಕಟಿಸಬೇಕಾದ ಹೆಸರು" : "Public speaker credit"}</span><input name="speakerCredit" aria-label="Contribution speaker credit" required defaultValue="Anonymous consenting speaker" maxLength={120} /></label>
        <label><span>{language === "kn" ? "ಸಂಪರ್ಕ ಇಮೇಲ್ (ಐಚ್ಛಿಕ, ಖಾಸಗಿ)" : "Contact email (optional, private)"}</span><input name="contactEmail" aria-label="Private contact email" type="email" maxLength={200} /></label>
        <label><span>{language === "kn" ? "ಪ್ರಕಟಣೆಯ ಅನುಮತಿ" : "Publication permission"}</span><select name="permission" aria-label="Contribution publication permission" defaultValue="project-only"><option value="project-only">Project-only display permission</option><option value="CC-BY-4.0">CC BY 4.0</option><option value="CC0-1.0">CC0 1.0</option></select></label>
        <label><span>{language === "kn" ? "ಕೊಡುಗೆದಾರರ ಪ್ರವೇಶ ಕೋಡ್" : "Contributor access code"}</span><input name="contributorCode" aria-label="Contributor access code" type="password" required autoComplete="off" /></label>
        <label><span>{language === "kn" ? "ಸಮ್ಮತಿಯ ಹೆಸರು / ಸಹಿ" : "Consent name / signature"}</span><input name="consentName" aria-label="Consent name or signature" required maxLength={120} /></label>
        <label className="checkbox-label"><input type="checkbox" name="adultConfirmed" value="yes" /><span>{language === "kn" ? "ನಾನು 18 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಯಸ್ಸಿನವನು/ವಳು ಮತ್ತು ಇದು ನನ್ನ ಧ್ವನಿ." : "I am 18 or older and this is my voice."}</span></label>
        <label className="checkbox-label"><input type="checkbox" name="consentToReviewAndPublish" value="yes" /><span>{language === "kn" ? "ಆಯ್ದ ಷರತ್ತಿನಡಿ ಪರಿಶೀಲನೆಗಾಗಿ ಸಂಗ್ರಹಿಸಲು ಮತ್ತು ಆಯ್ಕೆಯಾದರೆ ಧ್ವನಿ, ಪಠ್ಯ, ಪ್ರದೇಶದ ಮಾಹಿತಿಯನ್ನು ಪ್ರಕಟಿಸಲು ಅನುಮತಿ ನೀಡುತ್ತೇನೆ." : "I permit private review and, if selected, publication of the audio, transcript and region metadata under the chosen terms."}</span></label>
        <label className="sr-only" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-actions"><button className="button button-primary" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}{language === "kn" ? "ಧ್ವನಿ ಕಳುಹಿಸಿ" : "Send contribution"}</button></div>
      <p className="form-message" aria-live="polite">{message}</p>
      <div className="private-upload-note"><LockKeyhole aria-hidden="true" /><span>{language === "kn" ? "ನಿಮ್ಮ ಧ್ವನಿ ಖಾಸಗಿ ಸಂಗ್ರಹಕ್ಕೆ ಹೋಗುತ್ತದೆ ಮತ್ತು ನೀವು ಆರಿಸಿದ ಅನುಮತಿಯಡಿ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ." : "Your recording goes to private storage and is used only under the permission you choose."}</span></div>
    </form>
  </section>;
}
