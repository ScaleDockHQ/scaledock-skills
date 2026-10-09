# rsl

An agent skill for Really Simple Licensing (RSL) 1.0: write, publish and read machine-readable licensing terms that say how AI systems and crawlers may use web content, and what they must pay or report.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill rsl
```

Then ask your agent to "publish an RSL license that allows search but charges for AI training" or "make our crawler honor RSL licenses".

## What it covers

- The RSL XML document: `<content>`, `<license>`, `<permits>`, `<prohibits>`, `<payment>`, `<reporting>`, `<legal>` and the asset metadata elements, with the usage, user, geo and payment vocabularies.
- Conflict resolution: order independence, specific over general, prohibition over permission.
- Discovery: the robots.txt `License` directive, `Link rel="license"`, HTML linked and inline licenses, RSS and embedded file metadata, precedence and `max-age` revalidation.
- The optional Open License Protocol, Crawler Authorization Protocol (`Authorization: License`) and Encrypted Media Standard.

## Versions

| Line    | Status                |
| ------- | --------------------- |
| RSL 1.0 | current               |
| RSL 0.9 | legacy (upgrade from) |

`references/versions.md` lists the errata and how to upgrade 0.9 documents.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RSL 1.0 Specification](https://rslstandard.org/rsl): Recommendation, RSL-SPEC-1.0 (2025-12-10).
- [RSL 1.0 errata](https://rslstandard.org/rsl/errata): latest entry 2026-08-07.
- [RSL latest version pointer](https://rslstandard.org/rsl/latest/) and [RSL Default Access Terms](https://rslstandard.org/rsl/default-terms).
- [RSL 0.9 Specification](https://rslstandard.org/rsl/0.9/): draft, for the legacy line.
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309): RFC.

## License

MIT
