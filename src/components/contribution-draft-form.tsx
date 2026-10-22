"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { CheckCircle2, Download, FileAudio, HardDrive, ShieldCheck } from "lucide-react";
import { contributionDraftSchema } from "@/lib/contribution-contract";
import { regions } from "@/lib/regions";
import { useInterfaceLanguage } from "@/components/interface-language";

const STORAGE_KEY = "kannadada-beru-contribution-drafts-v1";
const STORAGE_EVENT = "kannadada-beru-drafts-changed";

type SavedDraft = {
  id: string;
  savedAt: string;
  state: "local_draft";
  payload: unknown;
};

function readDrafts(): SavedDraft[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as SavedDraft[] : [];
  } catch {
    return [];
  }
}

function subscribeToDrafts(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function getDraftCount() {
  return readDrafts().length;
}

export function ContributionDraftForm() {
  const language = useInterfaceLanguage();
  const [message, setMessage] = useState("");
  const draftCount = useSyncExternalStore(subscribeToDrafts, getDraftCount, () => 0);

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("permission") !== "yes") {
      setMessage(language === "kn" ? "ಈ ಪಠ್ಯವನ್ನು ಕೊಡುಗೆಯಾಗಿ ಹಂಚಲು ಅನುಮತಿ ಇದೆ ಎಂದು ದೃಢಪಡಿಸಿ." : "Please confirm that you have permission to share this text as a contribution.");
      return;
    }
    const candidate = contributionDraftSchema.safeParse({
      expressionKannada: form.get("expressionKannada"),
      romanization: form.get("romanization"),
      englishMeaning: form.get("englishMeaning"),
      usageExampleKannada: form.get("usageExampleKannada"),
      localityText: form.get("localityText"),
      linguisticRegionSlug: form.get("linguisticRegionSlug"),
      evidenceNote: form.get("evidenceNote"),
      audio: null,
      consent: {
        granted: true,
        termsVersion: "local-draft-v1",
        grantedAt: new Date().toISOString(),
        attributionPreference: form.get("attributionPreference"),
      },
    });
    if (!candidate.success) {
      setMessage(language === "kn" ? "ಕಡ್ಡಾಯ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸರಿಪಡಿಸಿ." : candidate.error.issues[0]?.message ?? "Please review the required fields.");
      return;
    }
    const drafts = readDrafts();
    drafts.push({ id: crypto.randomUUID(), savedAt: new Date().toISOString(), state: "local_draft", payload: candidate.data });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    window.dispatchEvent(new Event(STORAGE_EVENT));
    setMessage(language === "kn" ? "ಕರಡು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ. ಅದನ್ನು ಸಲ್ಲಿಸಲಾಗಿಲ್ಲ ಅಥವಾ ಪ್ರಕಟಿಸಲಾಗಿಲ್ಲ." : "Draft saved on this device. It has not been submitted or published.");
    event.currentTarget.reset();
  }

  function exportDrafts() {
    const drafts = readDrafts();
    if (!drafts.length) {
      setMessage(language === "kn" ? "ರಫ್ತು ಮಾಡುವ ಮೊದಲು ಕನಿಷ್ಠ ಒಂದು ಕರಡನ್ನು ಉಳಿಸಿ." : "Save at least one draft before exporting.");
      return;
    }
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), drafts }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kannadada-beru-contribution-drafts.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage(language === "kn" ? `${drafts.length} ಕೊಡುಗೆಗಳನ್ನು ಕಡತವಾಗಿ ರಫ್ತು ಮಾಡಲಾಗಿದೆ.` : `${drafts.length} local contribution${drafts.length === 1 ? "" : "s"} exported.`);
  }

  return <section className="shell contribution-workspace" aria-labelledby="draft-form-title">
    <div className="backend-status"><HardDrive aria-hidden="true" /><div><strong>{language === "kn" ? "ಖಾಸಗಿ ಸಾಧನ ಸಂಗ್ರಹ" : "Private on-device collection"}</strong><p>{language === "kn" ? "ನಿಮ್ಮ ದಾಖಲೆಯು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲೇ ಉಳಿಯುತ್ತದೆ. ನೀವು ಕಡತವನ್ನು ರಫ್ತು ಮಾಡುವವರೆಗೆ ಯಾವುದೇ ಮಾಹಿತಿ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ." : "Your record stays in this browser. Nothing is transmitted unless you choose to export it."}</p></div><span>{draftCount} {language === "kn" ? "ಉಳಿಸಲಾಗಿದೆ" : "saved"}</span></div>
    <form className="contribution-form" onSubmit={saveDraft}>
      <div className="form-heading"><p className="eyebrow">{language === "kn" ? "ನಿಮ್ಮ ಊರಿನ ನುಡಿ" : "A word from your place"}</p><h2 id="draft-form-title">{language === "kn" ? "ಪದದ ಜೊತೆ ಅದರ ಕಥೆಯನ್ನೂ ದಾಖಲಿಸಿ" : "Save the story behind the word"}</h2><p>{language === "kn" ? "ಯಾರು, ಎಲ್ಲಿ ಮತ್ತು ಯಾವ ಸಂದರ್ಭದಲ್ಲಿ ಈ ಪದವನ್ನು ಬಳಸುತ್ತಾರೆ ಎಂಬುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ. ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಕಾಪಾಡಲು ಸಂಪರ್ಕ ಮಾಹಿತಿ ಅಥವಾ ಧ್ವನಿಯನ್ನು ಇಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ." : "Tell us who uses the word, where it is heard and what it means in context. Contact details and audio are not collected here."}</p></div>
      <div className="form-grid">
        <label><span>{language === "kn" ? "ಕನ್ನಡ ಪದ ಅಥವಾ ನುಡಿಗಟ್ಟು" : "Kannada word or phrase"}</span><input aria-label="Kannada word or phrase" name="expressionKannada" required maxLength={200} lang="kn" /></label>
        <label><span>{language === "kn" ? "ರೋಮನೀಕೃತ ಕನ್ನಡ" : "Romanized Kannada"}</span><input aria-label="Romanized Kannada" name="romanization" required maxLength={240} placeholder="neeru" /></label>
        <label className="full"><span>{language === "kn" ? "ಸಂದರ್ಭಸಹಿತ ಇಂಗ್ಲಿಷ್ ಅರ್ಥ" : "Contextual English meaning"}</span><textarea aria-label="Contextual English meaning" name="englishMeaning" required maxLength={500} rows={3} /></label>
        <label className="full"><span>{language === "kn" ? "ನೈಜ ಕನ್ನಡ ಬಳಕೆಯ ಉದಾಹರಣೆ" : "Real Kannada usage example"}</span><textarea aria-label="Real Kannada usage example" name="usageExampleKannada" required maxLength={800} rows={3} lang="kn" /></label>
        <label><span>{language === "kn" ? "ಮಾತನಾಡುವವರು ಅಥವಾ ಮೂಲ ತಿಳಿಸಿದ ಸ್ಥಳ" : "Locality as described by the speaker/source"}</span><input aria-label="Locality as described by the speaker/source" name="localityText" required maxLength={160} placeholder={language === "kn" ? "ಊರು, ಹಳ್ಳಿ ಅಥವಾ ಸಮುದಾಯದ ಸಂದರ್ಭ" : "Town, village, or community context"} /></label>
        <label><span>{language === "kn" ? "ಭಾಷಾ ಪ್ರದೇಶ" : "Language region"}</span><select aria-label="Language region" name="linguisticRegionSlug" required defaultValue=""><option value="" disabled>{language === "kn" ? "ಅತ್ಯಂತ ಹೊಂದುವ ಪ್ರದೇಶ ಆರಿಸಿ" : "Choose the closest region"}</option>{regions.map((region) => <option value={region.slug} key={region.id}>{region.nameKannada} · {region.nameEnglish}</option>)}</select></label>
        <label className="full"><span>{language === "kn" ? "ಪುರಾವೆ ಮತ್ತು ಮೂಲದ ಟಿಪ್ಪಣಿ" : "Evidence and source note"}</span><textarea aria-label="Evidence and source note" name="evidenceNote" required minLength={10} maxLength={2000} rows={4} placeholder={language === "kn" ? "ಯಾರು, ಎಲ್ಲಿ, ಯಾವ ಸಂದರ್ಭದಲ್ಲಿ ಬಳಸುತ್ತಾರೆ? ಯಾವ ಪುರಾವೆ ಇದೆ?" : "Who uses it, where, in what situation, and what evidence supports it?"} /></label>
        <label><span>{language === "kn" ? "ಸಾರ್ವಜನಿಕ ಹೆಸರಿನ ಆದ್ಯತೆ" : "Preferred public attribution"}</span><select aria-label="Preferred public attribution" name="attributionPreference" defaultValue="anonymous"><option value="anonymous">{language === "kn" ? "ಅನಾಮಧೇಯ" : "Anonymous"}</option><option value="display_name">{language === "kn" ? "ತೋರಿಸುವ ಹೆಸರು" : "Display name"}</option><option value="full_name">{language === "kn" ? "ಪೂರ್ಣ ಹೆಸರು" : "Full name"}</option></select></label>
        <label className="checkbox-label"><input type="checkbox" name="permission" value="yes" aria-label="I have permission to share this text" /><span>{language === "kn" ? "ಈ ಪಠ್ಯವನ್ನು ಕೊಡುಗೆಯಾಗಿ ಹಂಚಲು ನನಗೆ ಅನುಮತಿ ಇದೆ. ಇದರಿಂದ ಅದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಾರ್ವಜನಿಕವಾಗುವುದಿಲ್ಲ." : "I have permission to share this text as a contribution. It will not become public automatically."}</span></label>
      </div>
      <div className="form-actions"><button className="button button-primary" type="submit"><CheckCircle2 size={18} /> {language === "kn" ? "ಸ್ಥಳೀಯ ಕರಡು ಉಳಿಸಿ" : "Save privately"}</button><button className="button button-secondary" type="button" onClick={exportDrafts}><Download size={18} /> {language === "kn" ? "ಕೊಡುಗೆ ಕಡತ ರಫ್ತು ಮಾಡಿ" : "Export contributions"}</button></div>
      <p className="form-message" aria-live="polite">{message}</p>
      <div className="integrity-note"><ShieldCheck aria-hidden="true" /><span>{language === "kn" ? "ರಫ್ತು ಮಾಡಿದ ದಾಖಲೆಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರಕಟವಾಗುವುದಿಲ್ಲ. ಮೂಲ, ಅನುಮತಿ ಮತ್ತು ನೈಜ ಬಳಕೆಯ ವಿವರಗಳನ್ನು ಗೌರವದಿಂದ ಕಾಪಾಡಲಾಗುತ್ತದೆ." : "Exported contributions are never published automatically. Source, permission and real-world context stay attached to every record."}</span></div>
    </form>
    <aside className="recording-kit" aria-labelledby="recording-kit-title">
      <FileAudio aria-hidden="true" />
      <div><p className="eyebrow">{language === "kn" ? "ಮೈಸೂರು · ಧಾರವಾಡ · ಕಲಬುರಗಿ" : "Mysuru · Dharwad · Kalaburagi"}</p><h2 id="recording-kit-title">{language === "kn" ? "ಒಂದೇ ಪದದ ಧ್ವನಿ ಸಂಗ್ರಹ ಕಿಟ್" : "Same-word recording kit"}</h2><p>{language === "kn" ? "ಸ್ಥಳೀಯ ವಕ್ತಾರರ ಅನುಮತಿ, ಬೆಳೆದ ಜಿಲ್ಲೆ, ನಿಖರ ಪಠ್ಯ ಮತ್ತು ಎರಡನೇ ಮಾನವ ಪರಿಶೀಲನೆಯನ್ನು ಒಂದೇ ದಾಖಲೆಯಲ್ಲಿ ಇಡಿ. ಧ್ವನಿಯನ್ನು ಈ ತಾಣವು ನೇರವಾಗಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ." : "Use one record to capture speaker consent, district of upbringing, the exact prompt and a second human review. This site does not upload or collect the recording itself."}</p></div>
      <a className="button button-secondary" href="/templates/regional-recording-intake.md" download><Download size={18} />{language === "kn" ? "ಸಮ್ಮತಿ ನಮೂನೆ ಪಡೆಯಿರಿ" : "Download consent form"}</a>
    </aside>
  </section>;
}
