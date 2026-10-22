# Regional audio import inbox

Use the private intake page at `/voices/intake` to prepare each recording. It downloads a canonically named audio file and a matching `.json` sidecar.

Place all downloaded audio and JSON pairs directly in this `inbox` folder, then run:

```powershell
pnpm audio:import
```

The importer rejects missing audio, unknown prompts or regions, duplicate slots, unsupported media, incomplete consent, or incomplete human review. It publishes only prompts with all three verified regions. The source code does not need to be edited for a new batch.

Keep private consent evidence outside Git. The exported sidecar stores only a consent reference; the public manifest omits it.
