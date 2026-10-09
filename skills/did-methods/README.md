# did-methods

An agent skill for DID methods: creating and resolving did:web, did:key, did:jwk and did:webvh identifiers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill did-methods
```

Then ask your agent to apply DID methods.

## What it covers

- Four DID methods read from their source repositories: did:web and did:key from the W3C Credentials Community Group, did:jwk from its author's repository, and did:webvh v1.0 from the Decentralized Identity Foundation. Each defines the identifier syntax, how a resolver turns the identifier into a DID document, and which operations the method supports.

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

- [did:web Method Specification](https://raw.githubusercontent.com/w3c-ccg/did-method-web/ea423c114e6f2537498ee6f94e8d794c64f60c18/index.html): Unofficial draft, W3C CCG, commit ea423c1, 2026-05-08.
- [The did:key Method v0.9](https://raw.githubusercontent.com/w3c-ccg/did-method-key/2cc490c38c5aacf58497a87fc0cf8794668bf716/index.html): Unofficial draft, W3C CCG, commit 2cc490c, 2025-11-02.
- [did:jwk Method Specification](https://raw.githubusercontent.com/quartzjer/did-jwk/44e186cf4cc215fc726afeecad1727cc9f9a66e8/spec.md): Community draft, commit 44e186c, 2023-08-19.
- [The did:webvh DID Method v1.0: Specification](https://raw.githubusercontent.com/decentralized-identity/didwebvh/7e39c700fd565ee47badf95c1eda11067dbcf2b7/spec-v1.0/specification.md): DIF specification, v1.0, commit 7e39c70, 2026-09-25.
- [The did:webvh DID Method v1.0: Security and Privacy Considerations](https://raw.githubusercontent.com/decentralized-identity/didwebvh/7e39c700fd565ee47badf95c1eda11067dbcf2b7/spec-v1.0/security_and_privacy.md): DIF specification, v1.0, commit 7e39c70, 2026-09-25.

## License

MIT
