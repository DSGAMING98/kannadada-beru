# Regional Kannada speech source audit

Verified on 21 October 2026 against publisher pages, repository metadata and the downloaded file headers. No gated corpus or large speech archive was downloaded.

## Release decision

The public app includes **12 CC0 human recordings as General Kannada references** and **zero verified Mysuru–Dharwad–Kalaburagi comparison sets**. The three regional controls remain disabled. The downloaded files passed byte-length, SHA-1/SHA-256 and Ogg container checks, but their Commons records do not state speaker region and independent listening review remains pending.

This is a deliberate evidence boundary: Kannada language metadata is not regional pronunciation evidence.

## Sources checked without Hugging Face authentication

| Source | What is publicly available | Region evidence | Access and rights | Decision |
| --- | --- | --- | --- | --- |
| [Wikimedia Commons / Spell4Wiki](https://commons.wikimedia.org/wiki/Category:Files_uploaded_by_spell4wiki_in_kn) | Thousands of short Kannada pronunciation files. Twelve exact-word OGG files were selected and bundled. | The selected file pages identify Kannada, word, uploader and CC0, but no speaker region or recording locality. | Public direct download; CC0 1.0 on each selected file. | Integrated only as General Kannada references. Never counted as regional audio. |
| [IISc NISP](https://github.com/iiscleap/NISP-Dataset) | Kannada and English read speech, transcripts, speaker IDs and a speaker-information list. The public repository identifies native/place-brought-up district and state. | Target records exist for Mysore (`Kan_0005`, `Kan_0046`), Dharwad (`Kan_0060`) and Gulbarga (`Kan_0022`, `Kan_0036`). This is speaker-origin metadata, not independent proof of a dialect pronunciation. | Repository README states CC BY 4.0. Kannada native audio is split into an approximately 1.53 GB archive. | Best public research lead, but not integrated: target transcripts do not contain a ready, controlled same-prompt set. Word extraction would require archive download, alignment and human review. |
| [OpenSLR SLR79](https://www.openslr.org/79/) | Kannada single-speaker sentence recordings and transcript indexes; 2,186 female and 2,214 male transcript rows were inspected locally. | No regional labels in the published indexes. | Public; CC BY-SA 4.0. Audio archives total about 1.8 GB. | Not suitable for three-region comparison. Transcript indexes only were downloaded. |
| [RESPIN-S1.0](https://spiredatasets.ee.iisc.ac.in/respincorpus) | Five documented Kannada varieties: Central/Bellary, Coastal/Mangalore, Dharwad, Northeastern/Gulbarga and Mysore. Read speech with transcripts. | Explicit corpus variety/location labels, but still dataset metadata rather than independent linguistic validation. | Application form and IISc terms required; attribution and notice duties apply. | Strong controlled-corpus candidate after authorized access, not publicly downloadable for this release. |
| [LDC-IL Kannada Raw Speech Corpus](https://data.ldcil.org/kannada-raw-speech-corpus) | A large Kannada raw-speech resource described as covering regional dialects. | Regional coverage is described at corpus level; record-level suitability must be inspected after lawful access. | Approximately 115 GB with access conditions. | Not a lightweight public integration source. |
| [Lingua Libre Kannada files](https://commons.wikimedia.org/wiki/Category:Lingua_Libre_pronunciation-kan) | Public human word recordings with language, speaker/uploader and transcript-like filenames. | The inspected records did not provide reliable Mysuru, Dharwad or Kalaburagi speaker provenance. | Public Commons files with per-file licence information. | Useful for General Kannada expansion only after the same checks; not regional evidence. |

## Downloaded General Kannada bundle

The 12 files are `ಅಕ್ಕ`, `ಕನ್ನಡ`, `ಗಾಳಿ`, `ತಾಯಿ`, `ತಂದೆ`, `ನೀರು`, `ಪುಸ್ತಕ`, `ಪ್ರೀತಿ`, `ಮಗು`, `ಮಳೆ`, `ಶಾಲೆ`, and `ಹಾಲು`. Eleven are credited to `Srf123`; `ತಾಯಿ` is credited to `Manilpt`. The app keeps the source page, source date, speaker/uploader, CC0 licence, byte length and both checksums in `public/audio/kannada/manifest.json`.

Status of the three-region matrix:

- 12 General Kannada references available.
- 36 target regional slots: 12 prompts × 3 regions.
- 0 region-verified recordings.
- 0 complete same-prompt comparison sets.

## Why NISP is not yet the comparison feature

NISP is public and genuinely useful because it provides speaker-origin district metadata. However, the five target speakers read different paragraph and unique-sentence lists. An intersection check did not find a clean ready-to-publish isolated-word set; common tokens occur inside longer sentences. Producing matched clips would require downloading the full Kannada native archive, locating the correct utterances, forced alignment or careful manual segmentation, replay verification, a second local-speaker review, and confirmation that clipped redistribution preserves the repository’s licence and attribution requirements.

Therefore no 1.53 GB archive was downloaded merely to make the interface appear complete.

## Permission-cleared collection plan

The shortest credible path is a small controlled collection rather than an inferred dataset comparison:

1. Record the same 10–12 prompts in Mysuru, Dharwad and Kalaburagi—30–36 final clips; two speakers per region are preferable for diversity.
2. Recruit consenting adults who self-identify with the variety and document district of upbringing and approximate years lived there. Store current recording location separately.
3. Record lossless WAV masters in a quiet room, then publish trimmed OGG derivatives only after approval.
4. Capture the exact Kannada transcript, Romanization, English meaning, recording type, chosen public credit, consent record, licence and withdrawal state.
5. Ask the speaker to replay and approve the final clip. Ask a second native/community reviewer to confirm transcript match and naturalness.
6. Publish only when rights review, region-metadata review and linguistic review are all complete. Never publish contact details or raw consent documents.

The working ledger is `data/regional-recording-pilot.csv`. A speaker-facing form is downloadable in the app at `/templates/regional-recording-intake.md`.

## Acceptance rule for enabling a regional Play control

A regional control can be enabled only when one record has all of the following: matching prompt ID, audio file, exact transcript, self-reported speaker-origin region, explicit publication permission, reusable licence or project display grant, public attribution preference, speaker replay approval, second human review, and a stable source/consent record ID.

Dataset metadata alone never satisfies the human-review fields.
