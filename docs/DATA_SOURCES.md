# Data Sources and Attribution

Kannadada Beru keeps source information close to the material it supports. Geographic context, dictionary definitions, regional usage, and pronunciation each retain their own attribution.

## Karnataka geography

**Boundary dataset:** DataMeet Community Maps Project, India District Map, Census 2011 edition

**Source:** https://github.com/datameet/maps/tree/master/Districts

**Licence:** Creative Commons Attribution 2.5 India

The Karnataka records were converted to GeoJSON and bundled locally. This layer contains 30 Census-2011 features and is presented as historical administrative geography. The current directory contains all 31 Karnataka districts, including Vijayanagara and the current Bengaluru South naming.

**Current directory references:**

- Integrated Government Online Directory: https://igod.gov.in/sg/KA/E042/organizations
- Karnataka District Portal: https://karnataka.s3waas.gov.in/
- Bengaluru South district administration: https://bengalurusouth.nic.in/en/about-district

District boundaries support exploration and do not define language boundaries.

## Kannada dictionary

**Source:** V. Krishna's Alar Kannada-English Dictionary

**Repository:** https://github.com/alar-dict/data

**Public dictionary:** https://alar.ink

**Licence:** ODC-ODbL 1.0

The integrated snapshot contains **156,650 entries**, **139,991 distinct headwords**, and **247,674 English definitions**. Fifty Kannada-initial shards allow the browser to load one section at a time. Each dictionary card retains a link to Alar, and the derived dataset keeps the same attribution and share-alike obligations.

The 40-word editorial learning set powers compact search examples and the Pada Beru game. Device speech is labelled as device output.

## Regional usage

Eight compact regional examples are presented with their cited publishers:

- North Karnataka and Dharwad forms from Mahesh Gajabar's Kannada OneIndia feature, [ಧಾರವಾಡ ಕನ್ನಡದಾಗ ಏನಿಲ್ಲ?](https://kannada.oneindia.com/literature/articles/2010/0612-north-karnataka-kannada-dialect.html), published 15 June 2010.
- Kundapura-region expressions retained in the form printed by [The New Indian Express](https://www.newindianexpress.com/good-news/2023/Nov/05/karnataka-what-do-the-movies-bilindar-girmit-ammachi-yemba-nenapu-and-kadal-have-in-common-2630188.html), published 5 November 2023.

The app displays these examples in the Many Living Voices showcase as source-documented regional usage and preserves the script form supplied by each publication. No independent native-speaker approval or matching regional Kannada audio is claimed.

## Regional speech research

The project evaluated the gated Vaani transcription subset, IndicVoices, the full Vaani corpus and RESPIN-S1.0. Their public documentation confirms Kannada coverage, district metadata and CC BY 4.0 licensing, but this release did not access gated rows or publish their audio. See the [regional speech dataset audit](REGIONAL_AUDIO_DATASET_AUDIT.md) for exact configurations, sizes, access conditions and the permission-cleared pilot procedure.

## Karavali human audio

**Expression:** `ಕುಡ್ಲ`

**Language:** Tulu

**Meaning:** Mangaluru

**Speaker and uploader:** Deepakpadukone20

**Source:** https://commons.wikimedia.org/wiki/File:Tcy-%E0%B2%95%E0%B3%81%E0%B2%A1%E0%B3%8D%E0%B2%B2.ogg

**Licence:** CC0 1.0

The recording appears with its transcript, language, regional context, source, speaker credit, recording type, rights check, and reuse status. It is Tulu, not a Kannada dialect, and is not counted as a regional Kannada voice.

## Software and brand assets

- MapLibre GL JS renders the local geographic layer under its package licence.
- Lucide React supplies interface icons under its package licence.
- Next.js, React, Zod, Vitest, and Playwright retain their package licences.
- The Kannada-root logo was supplied by the project owner and is used across the website and install icons.

See [Third-Party Notices](../THIRD_PARTY_NOTICES.md) for the repository's consolidated attribution record.
