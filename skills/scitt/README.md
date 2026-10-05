# scitt

An agent skill for IETF SCITT (Supply Chain Integrity, Transparency and Trust): RFC 9943 Signed Statements, Transparency Services and Receipts, RFC 9942 COSE Receipts, and the SCRAPI HTTP API.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scitt
```

Then ask your agent to "register our SBOM as a SCITT Signed Statement", "implement a SCRAPI Transparency Service" or "verify this Transparent Statement's Receipt".

## What it covers

- Roles: Issuers, Transparency Services, Clients, Relying Parties and Auditors, with the Transparency Service's mandatory registration checks, Registration Policies, trust anchors and bootstrapping.
- Signed Statements as COSE_Sign1 with CWT Claims `iss` and `sub`, `kid`, `x5t` or `x5chain`, and attached, detached or hashed payloads.
- Receipts (labels 394, 395, 396), RFC9162_SHA256 inclusion and consistency proofs, Transparent Statements and the `application/scitt-*+cose` media types.
- SCRAPI: key discovery at `/.well-known/scitt-keys`, registration with 201 or 202, Receipt polling with 200, 204 or 404, concise problem details, retries and rate limiting.
- Verification and auditing, and upgrades from pre-RFC architecture and SCRAPI drafts.

## Versions

| Line                              | Status                |
| --------------------------------- | --------------------- |
| RFC 9943                          | current               |
| architecture draft-05 to draft-22 | legacy (upgrade from) |
| architecture draft-04 and earlier | legacy (upgrade from) |
| SCRAPI draft-11                   | current (build)       |
| SCRAPI draft-04 to draft-10       | legacy (upgrade from) |
| SCRAPI draft-03 and earlier       | legacy (upgrade from) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9943](https://www.rfc-editor.org/rfc/rfc9943.html): RFC (Standards Track), June 2026.
- [RFC 9942](https://www.rfc-editor.org/rfc/rfc9942.html): RFC (Standards Track), June 2026.
- [draft-ietf-scitt-scrapi-11](https://www.ietf.org/archive/id/draft-ietf-scitt-scrapi-11.txt): WG draft in the RFC Editor queue, 2026-06-26.
- Datatracker entries for draft-ietf-scitt-scrapi, draft-ietf-scitt-architecture and draft-ietf-cose-merkle-tree-proofs.
- Earlier architecture drafts -22, -05, -04 and -02, and SCRAPI drafts -10, -06, -04, -03 and -00, for the legacy lines.
- [IETF SCITT working group](https://datatracker.ietf.org/wg/scitt/about/): charter-ietf-scitt-01.

## License

MIT
