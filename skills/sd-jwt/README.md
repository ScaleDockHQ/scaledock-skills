# sd-jwt

An agent skill for IETF Selective Disclosure for JWTs (RFC 9901), with SD-JWT VC draft-19 and Token Status List draft-21: issuers, wallets and verifiers for selectively disclosable, key-bound and revocable credentials, with upgrades from the pre-RFC drafts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill sd-jwt
```

Then ask your agent to "issue SD-JWT VCs with selectively disclosable claims", "verify an SD-JWT+KB presentation" or "add a token status list for revocation".

## What it covers

- The SD-JWT data model: `_sd`, `...` array elements, `_sd_alg`, Disclosures, salts, hashing with test vectors, decoys and recursive disclosures.
- The `~` compact serialization and the JWS JSON serialization (`disclosures`, `kb_jwt`).
- Key Binding: `cnf`, the `kb+jwt` KB-JWT, `sd_hash`, and the Verifier's Key Binding policy.
- The Issuer, Holder and Verifier processing rules of RFC 9901 § 7, the security considerations, and common mistakes.
- Privacy: unlinkability, batch issuance, storage, transport and Issuer identifiers.
- SD-JWT VC: `dc+sd-jwt`, `vct`, `aka_vcts`, JWT VC Issuer Metadata and `x5c` key discovery, safe HTTP retrieval, Type Metadata, integrity and SVG rendering.
- Token Status List: the compressed bit array, JWT and CWT Status List Tokens, the `status` claim, Status Types, validation, aggregation and herd privacy.
- What changed across the drafts, and upgrade checklists for each family.

## Versions

| Line                                | Status                |
| ----------------------------------- | --------------------- |
| RFC 9901                            | current               |
| SD-JWT drafts -09 to -22            | legacy (upgrade from) |
| SD-JWT drafts -07 and -08           | legacy (upgrade from) |
| SD-JWT drafts -05 and -06           | legacy (upgrade from) |
| SD-JWT drafts -04 and earlier       | legacy (upgrade from) |
| SD-JWT VC draft-19                  | current (build)       |
| SD-JWT VC drafts -12 to -18         | legacy (upgrade from) |
| SD-JWT VC drafts -06 to -11         | legacy (upgrade from) |
| SD-JWT VC drafts -05 and earlier    | legacy (upgrade from) |
| Token Status List draft-21          | current (build)       |
| Token Status List drafts -06 to -20 | legacy (upgrade from) |
| Token Status List drafts -01 to -05 | legacy (upgrade from) |
| Token Status List draft-00          | legacy (upgrade from) |

`references/versions.md` says which line to use in each family and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9901](https://www.rfc-editor.org/rfc/rfc9901.html): RFC (Proposed Standard), November 2025, no errata.
- [draft-ietf-oauth-sd-jwt-vc-19](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-19.txt): WG draft, submitted to the IESG.
- [draft-ietf-oauth-status-list-21](https://www.ietf.org/archive/id/draft-ietf-oauth-status-list-21.txt): WG draft, in the RFC Editor queue.
- The Datatracker records and the RFC Editor queue for revision and state.
- Earlier revisions of all three drafts, for the legacy lines and upgrade checklists.

## License

MIT
