# Regional Kannada speech dataset audit

Verified on 19 October 2026 against the official dataset pages, published papers and access terms. No gated audio was downloaded.

## Release decision

Kannadada Beru has not published a Vaani, IndicVoices or RESPIN clip in this release. All three repositories require an access agreement, and this workstation has no authorized Hugging Face token or RESPIN access grant. A district label alone also cannot establish a speaker's native variety. The product therefore publishes sourced regional text records, keeps Kannada voice counts at zero, and shows the existing Tulu recording only as a separate coastal-language example.

## Dataset comparison

| Dataset | Kannada coverage and metadata | Speech character | Access and licence | MVP decision |
| --- | --- | --- | --- | --- |
| [Vaani transcription subset](https://huggingface.co/datasets/ARTPARK-IISc/Vaani-transcription-part) | `audio/Kannada`; 59,085 train, 16,952 validation and 16,418 test rows. Fields include audio, language, gender, state, district and transcript. The official card reports 151.12 transcribed Kannada hours. | Natural, image-prompted speech with transcripts. Record-level transcript and locality still require listening checks. | Gated contact-sharing agreement and token required. Dataset card: CC BY 4.0. | Best first candidate after authorized access. No rows or clip IDs were accessible in this audit. |
| [IndicVoices](https://huggingface.co/datasets/ai4bharat/IndicVoices) | `kannada`; 313,221 train and 4,126 validation rows. Fields include speaker ID, district, state, scenario, task, transcript variants and verification report. | Collection includes read, extempore and conversational speech. Prefer extempore or conversational samples. | Gated contact-sharing agreement and token required. Dataset card: CC BY 4.0. | Strong second candidate. No rows or clip IDs were accessible in this audit. |
| [Vaani full corpus](https://huggingface.co/datasets/ARTPARK-IISc/Vaani) | `audio/Kannada`; 1,527,091 train rows. Fields include speaker ID, district, pincode, years of stay, transcript availability and transcript. | Natural, image-prompted speech; many rows are not transcribed. | Gated contact-sharing agreement and token required. Dataset card: CC BY 4.0. | Supplementary discovery source. Use only transcribed, individually reviewed rows. |
| [RESPIN-S1.0](https://spiredatasets.ee.iisc.ac.in/respincorpus) | Kannada covers Central (Bellary), Coastal/Dakshin (Mangalore), Dharwad Kannada (Dharwad), Northeastern (Gulbarga) and Mysore Kannada (Mysore). The paper reports clean Kannada durations of 237.38, 245.03, 235.92, 248.10 and 228.13 hours respectively. | Read speech from agriculture and finance prompts, not spontaneous conversation. | Access form and acceptance of IISc terms required. Terms incorporate CC BY 4.0 attribution and notice duties. | Valuable research fallback, but not the lead source for an everyday listening showcase. No access grant was used. |

## Evidence boundaries

- Vaani district, pincode and years-of-stay fields support discovery; they do not prove a native regional accent.
- IndicVoices district and speaker fields allow controlled filtering; every selected utterance still needs transcript, naturalness and speaker-community checks.
- RESPIN's five Kannada labels and locations are documented in the 2025 corpus paper. Its recordings are read speech, so the interface must not describe them as spontaneous daily conversation.
- The dataset licences permit reuse with attribution after access conditions are accepted. Record-level suitability, privacy and publication approval still need review.
- Tulu, Beary and Konkani remain distinct languages and are never counted as Kannada dialect samples.

## Candidate clip ledger

No candidate clip IDs have been recorded because the underlying gated rows were not lawfully accessible during this audit. Inventing IDs or choosing rows from metadata alone would weaken the evidence chain.

## Small authorized pilot

After the project owner accepts the Vaani and IndicVoices access conditions and provides an authorized token locally, the pilot should stream metadata first and inspect no more than ten Kannada recordings:

1. Filter for Karnataka, Kannada and the target districts around Dharwad, Mysuru, Udupi or Dakshina Kannada, Kalaburagi, Bidar and Raichur.
2. Prefer IndicVoices conversational or extempore tasks and Vaani rows with a non-empty transcript.
3. Listen to each row and check audio-transcript alignment, intelligibility and whether the utterance contains a useful everyday expression.
4. Confirm what the speaker metadata actually establishes. Do not infer native variety from current district alone.
5. Ask a suitable local speaker to review the linguistic match.
6. Publish only records with a stable source ID, source URL, transcript, language, locality confidence, recording type, licence, attribution, rights check and publication approval.

The immediate user action is: sign in to Hugging Face, accept access for the Vaani transcription subset and IndicVoices, then create a read token and expose it locally as `HF_TOKEN`. Do not commit the token.

## Sources

- [Vaani transcription subset](https://huggingface.co/datasets/ARTPARK-IISc/Vaani-transcription-part)
- [IndicVoices](https://huggingface.co/datasets/ai4bharat/IndicVoices)
- [Vaani full corpus](https://huggingface.co/datasets/ARTPARK-IISc/Vaani)
- [Vaani district explorer](https://vaani.iisc.ac.in/dataset)
- [RESPIN-S1.0 corpus paper](https://papers.nips.cc/paper_files/paper/2025/file/d88714d4f2c1e826d33d6c1eb1497ec9-Paper-Datasets_and_Benchmarks_Track.pdf)
- [RESPIN terms](https://ee.iisc.ac.in/madasrdataset/RESPIN_Data_TAC.pdf)
- [Modern Kannada dialect study](https://doi.org/10.1007/s10772-025-10243-8)
- [A Manual of Modern Kannada](https://hasp.ub.uni-heidelberg.de/catalog/book/736)
