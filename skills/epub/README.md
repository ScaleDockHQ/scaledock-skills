# epub

An agent skill for EPUB.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill epub
```

Then ask the agent to apply EPUB.

## What it covers

- when packaging or checking an EPUB publication
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                     | Status          |
| ------------------------ | --------------- |
| EPUB 3.3                 | current         |
| EPUB 3.4                 | preview (build) |
| EPUB Reading Systems 3.3 | current         |
| EPUB Reading Systems 3.4 | preview (build) |
| EPUB Accessibility 1.1   | current         |
| EPUB Accessibility 1.2   | preview (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [EPUB 3.3](https://www.w3.org/TR/epub-33/): Recommendation, epub-33 REC-epub-33-20260113 (Recommendation, 2026-01-13).
- [EPUB 3.4](https://www.w3.org/TR/epub-34/): Candidate Recommendation Draft, epub-34 CRD-epub-34-20261002 (Candidate Recommendation Draft, 2026-10-02).
- [EPUB Reading Systems 3.3](https://www.w3.org/TR/epub-rs-33/): Recommendation, epub-rs-33 REC-epub-rs-33-20241017 (Recommendation, 2024-10-17).
- [EPUB Reading Systems 3.4](https://www.w3.org/TR/epub-rs-34/): Candidate Recommendation Draft, epub-rs-34 CRD-epub-rs-34-20260721 (Candidate Recommendation Draft, 2026-07-21).
- [EPUB Accessibility 1.1](https://www.w3.org/TR/epub-a11y-11/): Recommendation, epub-a11y-11 REC-epub-a11y-11-20241017 (Recommendation, 2024-10-17).
- [EPUB Accessibility 1.2](https://www.w3.org/TR/epub-a11y-12/): Candidate Recommendation Draft, epub-a11y-12 CRD-epub-a11y-12-20260912 (Candidate Recommendation Draft, 2026-09-12).
- [EPUB Accessibility Techniques 1.1](https://www.w3.org/TR/epub-a11y-tech-11/): Note, epub-a11y-tech-11 (Note, 2025-03-13).
- [EPUB 3 Multiple-Rendition Publications 1.1](https://www.w3.org/TR/epub-multi-rend-11/): Note, epub-multi-rend-11 (Note, 2026-01-20).
- [EPUB Accessibility - EU Accessibility Act Mapping](https://www.w3.org/TR/epub-a11y-eaa-mapping/): Note, epub-a11y-eaa-mapping (Note, 2025-08-28).

## License

MIT
