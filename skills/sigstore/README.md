# sigstore

An agent skill for Sigstore.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill sigstore
```

Then ask the agent to apply Sigstore.

## What it covers

- when signing or verifying with Sigstore
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line            | Status  |
| --------------- | ------- |
| Sigstore bundle | current |
| Sigstore Rekor  | current |
| Sigstore Fulcio | current |
| Sigstore cosign | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Sigstore bundle](https://docs.sigstore.dev/about/bundle/): Documentation, Sigstore bundle, fetched 2026-10-06 (Documentation, 2026-10-06).
- [Sigstore Rekor](https://docs.sigstore.dev/logging/overview/): Documentation, Rekor transparency log, fetched 2026-10-06 (Documentation, 2026-10-06).
- [Sigstore Fulcio](https://docs.sigstore.dev/certificate_authority/overview/): Documentation, Fulcio certificate authority, fetched 2026-10-06 (Documentation, 2026-10-06).
- [Sigstore cosign](https://docs.sigstore.dev/cosign/signing/overview/): Documentation, cosign signing, fetched 2026-10-06 (Documentation, 2026-10-06).

## License

MIT
