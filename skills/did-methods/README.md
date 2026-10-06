# did-methods

An agent skill for DID methods.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill did-methods
```

Then ask the agent to apply DID methods.

## What it covers

- when resolving did:web, did:key, did:jwk, or did:webvh
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line      | Status  |
| --------- | ------- |
| did:web   | current |
| did:key   | current |
| did:jwk   | current |
| did:webvh | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [did:web](https://w3c-ccg.github.io/did-method-web/): Unofficial draft, did:web method, fetched 2026-10-06 (Unofficial draft, 2026-10-06).
- [did:key](https://raw.githubusercontent.com/w3c-ccg/did-method-key/main/README.md): Community draft, did:key method, fetched 2026-10-06 (Community draft, 2026-10-06).
- [did:jwk](https://raw.githubusercontent.com/quartzjer/did-jwk/main/spec.md): Community draft, did:jwk method, fetched 2026-10-06 (Community draft, 2026-10-06).
- [did:webvh](https://identity.foundation/didwebvh/v1.0/): DIF specification, did:webvh v1.0, fetched 2026-10-06 (DIF specification, 2026-10-06).

## License

MIT
