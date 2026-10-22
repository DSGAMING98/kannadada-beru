# Data sources and attribution

Kannadada Beru keeps geography, dictionary meaning, regional usage and pronunciation as separate evidence types. A place label is never treated as proof of how a person speaks.

## Karnataka geography

The bundled Census-2011 district boundary layer comes from the [DataMeet Community Maps Project](https://github.com/datameet/maps/tree/master/Districts) under CC BY 2.5 India. It contains 30 historical boundary features. The current directory covers all 31 Karnataka districts, including Vijayanagara and the Bengaluru South name, using the [Integrated Government Online Directory](https://igod.gov.in/sg/KA/E042/organizations), [Karnataka District Portal](https://karnataka.s3waas.gov.in/) and district administration references. Boundaries support exploration; they do not define language boundaries.

## Kannada dictionary

The searchable dictionary is a derived snapshot of [V. Krishna’s Alar Kannada–English Dictionary](https://alar.ink), published from the [Alar data repository](https://github.com/alar-dict/data) under ODC-ODbL 1.0. It contains 156,650 entries, 139,991 distinct headwords and 247,674 English definitions. Each result links back to Alar. Dictionary entries are general references, not regional-use claims. Browser-generated speech is visibly labelled as device output.

## Regional usage

Eight compact usage examples retain their published sources. North Karnataka/Dharwad forms come from Mahesh Gajabar’s Kannada OneIndia feature [ಧಾರವಾಡ ಕನ್ನಡದಾಗ ಏನಿಲ್ಲ?](https://kannada.oneindia.com/literature/articles/2010/0612-north-karnataka-kannada-dialect.html), published 15 June 2010. Kundapura-region expressions retain the script printed by [The New Indian Express](https://www.newindianexpress.com/good-news/2023/Nov/05/karnataka-what-do-the-movies-bilindar-girmit-ammachi-yemba-nenapu-and-kadal-have-in-common-2630188.html), published 5 November 2023. Published text evidence does not substitute for a matching recording or native review.

## General Kannada human audio

Twelve isolated-word OGG recordings were downloaded from Wikimedia Commons files uploaded through Spell4Wiki. Each file page identifies the exact Kannada word, Kannada language, uploader/speaker and CC0 1.0 dedication. The app bundles them for reliable playback and keeps a machine-readable record at [`public/audio/kannada/manifest.json`](../public/audio/kannada/manifest.json).

The source pages publish no speaker-region metadata. The recordings are therefore labelled **General Kannada human reference**, never Mysuru, Dharwad or Kalaburagi. Source metadata and file integrity are checked; independent listening/linguistic review remains pending.

## Three-region pronunciation research

The [regional speech source audit](REGIONAL_AUDIO_DATASET_AUDIT.md) covers Wikimedia/Spell4Wiki, public IISc NISP, OpenSLR 79, RESPIN-S1.0, LDC-IL and Lingua Libre. NISP publicly exposes Mysore, Dharwad and Gulbarga speaker-origin records, but does not provide a ready matched prompt set for the target speakers. No regional audio from NISP, RESPIN or LDC-IL is published in this release.

## Karavali human audio

The Karavali profile streams the Tulu expression `ಕುಡ್ಲ` (Mangaluru), credited to `Deepakpadukone20`, from its [Wikimedia Commons source page](https://commons.wikimedia.org/wiki/File:Tcy-%E0%B2%95%E0%B3%81%E0%B2%A1%E0%B3%8D%E0%B2%B2.ogg) under CC0 1.0. It is Tulu, not a Kannada dialect, and is not counted as a regional Kannada voice.

## Software and brand assets

MapLibre GL JS, Lucide React, Next.js, React, Zod, Vitest and Playwright retain their package licences. The Kannada-root logo was supplied by the project owner and is used across the website and install icons. Consolidated notices are in [Third-Party Notices](../THIRD_PARTY_NOTICES.md).
