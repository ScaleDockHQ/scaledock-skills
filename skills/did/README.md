# did

An agent skill for W3C Decentralized Identifiers (DIDs): DID and DID URL syntax, DID documents, resolution and dereferencing, DID methods, and their security and privacy considerations.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill did
```

Then ask your agent to "validate this DID document", "build a DID resolver with the HTTP binding" or "review this DID method specification".

## What it covers

- DID syntax (`did:<method>:<method-specific-id>`), DID URLs with path, query and fragment, relative DID URLs, and the `service`, `serviceType`, `relativeRef`, `versionId`, `versionTime` and `hl` parameters.
- DID documents: `id`, `controller` and `alsoKnownAs`; verification methods with `publicKeyJwk` and `publicKeyMultibase`; the five verification relationships; services; and safe verification method retrieval.
- Representations: JSON and JSON-LD, the `@context` for each line, and the `application/did`, `application/did+json` and `application/did+ld+json` media types.
- DID Resolution: `resolve()` and `dereference()`, options, resolution and document metadata, RFC 9457 errors, the HTTP(S) binding, and resolver architectures and attacks.
- DID methods: specification requirements, the DID Extensions notes, the DID Method Rubric, and `did:web`.
- Security and privacy: proving control, rotation, revocation, recovery, integrity, correlation and service privacy.

## Versions

| Line               | Status                                    |
| ------------------ | ----------------------------------------- |
| DID 1.1            | preview (build, behind a switch)          |
| DID 1.0            | current                                   |
| DID Resolution 1.0 | current (Candidate Recommendation, build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/2022/REC-did-core-20220719/): W3C Recommendation, 19 July 2022.
- [Decentralized Identifiers (DIDs) v1.1](https://www.w3.org/TR/2026/CR-did-1.1-20260305/): W3C Candidate Recommendation Snapshot, 5 March 2026.
- [DIDs v1.1 editor's draft](https://w3c.github.io/did/): commit a2bb463, 27 August 2026.
- [DID Resolution v1](https://www.w3.org/TR/2026/CRD-did-resolution-1.0-20261001/): W3C Candidate Recommendation Draft, 1 October 2026.
- [DID Resolution editor's draft](https://w3c.github.io/did-resolution/): commit a5f3d89, 1 October 2026.
- [Controlled Identifiers v1.0](https://www.w3.org/TR/2025/REC-cid-1.0-20250515/): W3C Recommendation, 15 May 2025.
- [Decentralized Identifier Extensions](https://www.w3.org/TR/2025/NOTE-did-extensions-20251211/): W3C Group Note, 11 December 2025.
- [DID Document Property Extensions](https://www.w3.org/TR/2025/NOTE-did-extensions-properties-20251211/): W3C Group Note, 11 December 2025.
- [DID Method Extensions](https://www.w3.org/TR/2026/NOTE-did-extensions-methods-20261001/): W3C Group Note, 1 October 2026.
- [DID Resolution Extensions](https://www.w3.org/TR/2024/NOTE-did-extensions-resolution-20241119/): W3C Group Note, 19 November 2024.
- [DID Method Rubric](https://www.w3.org/TR/2026/NOTE-did-rubric-20260922/): W3C Group Note, 22 September 2026.
- [did:web Method Specification](https://w3c-ccg.github.io/did-method-web/): W3C Credentials Community Group unofficial draft, commit ea423c1.
- [IANA Media Types registry](https://www.iana.org/assignments/media-types/media-types.txt): last updated 24 September 2026.

## License

MIT
