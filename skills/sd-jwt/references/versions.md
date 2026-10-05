# Versions and upgrades

Read this when choosing a target version, reading an SD-JWT, SD-JWT VC or Status List Token written against a pre-RFC draft, or upgrading one. The skill covers three version families: SD-JWT itself (`sd-jwt`), SD-JWT VC (`sd-jwt-vc`) and Token Status List (`status-list`). Sources: RFC 9901, the draft texts and their Document History appendices, the Datatracker records and the RFC Editor queue, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                     | Line                                | Status  | Revision                                                      | Posture | Summary                                                                                |
| ---------------------- | ----------------------------------- | ------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `rfc9901`              | RFC 9901                            | current | RFC 9901, Proposed Standard (November 2025)                   |         | The default target for SD-JWT. No errata, not updated or obsoleted.                    |
| `sd-jwt-draft-09`      | SD-JWT drafts -09 to -22            | legacy  | draft -09 to -22 (13 June 2024 to 29 May 2025)                |         | Same wire format as RFC 9901; -20 made KB-JWT `aud` a single string.                   |
| `sd-jwt-draft-07`      | SD-JWT drafts -07 and -08           | legacy  | draft -07 and -08 (11 December 2023 to 4 March 2024)          |         | `sd_hash` in the KB-JWT; old JWS JSON serialization with a top-level `disclosures`.    |
| `sd-jwt-draft-05`      | SD-JWT drafts -05 and -06           | legacy  | draft -05 and -06 (30 June 2023 to 23 October 2023)           |         | `kb+jwt` KB-JWT; no hash in -05, `_sd_hash` in -06.                                    |
| `sd-jwt-draft-04`      | SD-JWT drafts -04 and earlier       | legacy  | draft -00 to -04 (to 11 April 2023) and the individual drafts |         | "Combined Format", untyped Holder Binding JWT, no array element Disclosures.           |
| `sd-jwt-vc-draft-19`   | SD-JWT VC draft-19                  | current | draft-ietf-oauth-sd-jwt-vc-19 (31 August 2026)                | build   | The default target for SD-JWT VC. Submitted to the IESG; not in the RFC Editor queue.  |
| `sd-jwt-vc-draft-12`   | SD-JWT VC drafts -12 to -18         | legacy  | draft -12 to -18 (20 October 2025 to 3 August 2026)           |         | `dc+sd-jwt`, `locale`, no JSON Schema; no general HTTP retrieval rules yet.            |
| `sd-jwt-vc-draft-06`   | SD-JWT VC drafts -06 to -11         | legacy  | draft -06 to -11 (13 November 2024 to 15 September 2025)      |         | `dc+sd-jwt`, but Type Metadata uses `lang` and `schema` or `schema_uri`.               |
| `sd-jwt-vc-draft-05`   | SD-JWT VC drafts -05 and earlier    | legacy  | draft -00 to -05 (16 August 2023 to 18 September 2024)        |         | `typ` `vc+sd-jwt` and media type `application/vc+sd-jwt`.                              |
| `status-list-draft-21` | Token Status List draft-21          | current | draft-ietf-oauth-status-list-21 (21 June 2026)                | build   | The default target for status. Approved and in the RFC Editor queue; no RFC yet.       |
| `status-list-draft-06` | Token Status List drafts -06 to -20 | legacy  | draft -06 to -20 (3 December 2024 to 20 April 2026)           |         | Same wire format as -21; signed tokens only.                                           |
| `status-list-draft-01` | Token Status List drafts -01 to -05 | legacy  | draft -01 to -05 (6 February 2024 to 21 October 2024)         |         | ZLIB and `status.status_list`, but unsigned `statuslist+json` / `+cbor` lists allowed. |
| `status-list-draft-00` | Token Status List draft-00          | legacy  | draft-ietf-oauth-status-list-00 (23 October 2023)             |         | gzip compression and a flat `status` claim with `idx` and `uri`.                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. SD-JWT VC and Token Status List have no RFC yet, so each is `current` with posture **build**: implement it now, behind a flag or a profile switch where a deployed ecosystem pins an older revision, and re-check the pin before release.

## Which version to use

- SD-JWT: author and verify RFC 9901. Nothing else is supported; a token from a pre-RFC draft is input to an upgrade.
- SD-JWT VC: author draft-19 (`typ: dc+sd-jwt`). Draft-19 no longer carries the transition note that recommended accepting `vc+sd-jwt` as well (Appendix C, -19 entry); accept `vc+sd-jwt` only as an explicit, time-limited policy for a named legacy issuer.
- Token Status List: author draft-21. The RFC Editor queue lists the draft as received on 2026-06-04 at -20, and Datatracker shows -21 as the latest revision with RFC Editor state In Progress; -21 only made editorial fixes (Document History, -21 entry). When the RFC is published, it replaces draft-21 as current and this file gets an upgrade section.
- An ecosystem profile (for example a wallet framework or a presentation protocol) can pin an older SD-JWT VC or Status List revision. Follow the pin for interop, record it, and plan the upgrade below.

## What changed

### RFC 9901 (from draft-22)

RFC 9901 is the published form of draft-22 (RFC Editor record). Both texts define the same claims, header parameters and registrations: `_sd`, `...`, `_sd_alg`, `sd_hash`, `kb+jwt`, `disclosures`, `kb_jwt`, `application/sd-jwt`, `application/sd-jwt+json`, `application/kb+jwt` and the `+sd-jwt` suffix. The RFC Editor record lists no errata and no updating RFC.

### SD-JWT drafts -09 to -22

- -09 distinguished SD-JWT from SD-JWT+KB, added the ABNF, and moved the JWS JSON serialization to the JAdES-aligned structure: `disclosures` and `kb_jwt` as unprotected header parameters (draft-22 Appendix C, -09 entry; draft-09 § 9.1).
- -20 required KB-JWT `aud` to be a single string (draft-20 § 4.3; earlier revisions said only "the intended receiver").
- -14 made `_sd_alg` explicitly case-sensitive and changed the SD-JWT VC example to `dc+sd-jwt` (Appendix C, -14 entry).

### SD-JWT drafts -07 and -08

- -07 renamed the KB-JWT claim `_sd_hash` to `sd_hash`, computed over the Issuer-signed JWT and the selected Disclosures, each followed by `~` (draft-07 § 5.3.1).
- The JWS JSON serialization put Disclosures in a top-level `disclosures` member beside `payload`, and did not define a `kb_jwt` member (draft-08 § 9).

### SD-JWT drafts -05 and -06

- -05 introduced the typed KB-JWT (`typ: kb+jwt`, `iat`, `aud`, `nonce`), array element Disclosures (`{"...": digest}`), the JWS JSON serialization, the media type registrations and the "Key Binding" term (draft-05 § 5.10; Appendix C, -05 entry). Its KB-JWT did not cover the Disclosures (draft-05 § 9.6.1).
- -06 added `_sd_hash` in the KB-JWT, and the rule that `_sd` and `...` must not be used as Disclosure claim names (draft-06 § 5.3; Appendix C, -06 entry).

### SD-JWT drafts -04 and earlier

- The issuance and presentation formats were the "Combined Format for Issuance" and "Combined Format for Presentation"; the Holder Binding JWT had no defined contents (draft-04 §§ 5.3, 5.4, 5.4.1).
- No selectively disclosable array elements (added in -05).
- -02 replaced JWT-encoded disclosures with separate base64url-encoded Disclosures and the per-level `_sd` claim; -03 made `sha-256` the default when `_sd_alg` is absent and required the salt to be a string (Appendix C, -02 and -03 entries). Revisions -00 and -01 and the individual drafts used other claim names and structures and cannot be upgraded field by field.

### SD-JWT VC draft-19

From the Document History (Appendix C, -19 and -18 entries) and a comparison with draft-12:

- A general retrieval section (§ 3): HTTPS only, bounded redirects that stay on HTTPS, time- and size-bounded retrieval, response validation, no use of error response content, and HTTP caching per RFC 9111.
- Integrity verification is defined in the spec (§ 6) and does not depend on CORS; rendering `uri` values are HTTPS URLs or `data:` URIs (§ 5.5.1).
- SSRF rules apply to every dereferenced URL and redirect target (§ 7.1); `nosniff` and a restrictive `Content-Security-Policy` are recommended when serving documents (§ 7.2).
- The transition note recommending acceptance of `vc+sd-jwt` was removed.
- -18 added the optional `aka_vcts` claim (§ 2.2.2.2).
- -17 required rejection when claim metadata is malformed or does not match the credential, and defined when Type Metadata processing happens (§ 5.7).
- -16 renamed "Issuer Signature Mechanism" to "key discovery and validation mechanism" (§ 2.5).

### SD-JWT VC drafts -12 to -18

- -12 changed display `lang` to `locale`, removed JSON Schema (`schema`, `schema_uri`) from Type Metadata, added `mandatory`, required `x5c` in the protected header, and introduced data URIs for binary claim values (draft-12 Appendix C, -12 entry).

### SD-JWT VC drafts -06 to -11

- -06 changed `typ` and the media type from `vc+sd-jwt` to `dc+sd-jwt`, with a note recommending that Verifiers and Holders accept both during a transition (draft-06 § 3.2.1).
- -06 still retrieved Type Metadata from `https://<authority>/.well-known/vct/<type>`; -07 removed the `.well-known` insertion (draft-06 § 6.3.1; Appendix C, -07 entry).
- -11 made `vct` a plain string, kept `vct#integrity` out of Disclosures, and required a JWT Status List Token when `status_list` is used (Appendix C, -11 entry).

### SD-JWT VC drafts -05 and earlier

- `typ` was `vc+sd-jwt` (draft-05).
- -00 used a `type` claim (draft-00 § 4.2.2.1) and `/.well-known/jwt-issuer` (draft-00 § 5); -01 renamed `type` to `vct`; -02 renamed JWT Issuer Metadata to JWT VC Issuer Metadata at `/.well-known/jwt-vc-issuer`; -04 and -05 introduced Type Metadata with display and claim metadata (draft-00 § 5; Appendix C, -01 to -05 entries).

### Token Status List draft-21

- -21 is editorial (Document History, -21 entry). -20 extended the IANA registry requirements.
- -16 made it a MUST to reject a Referenced Token whose index is out of bounds, and changed the historical resolution status codes; -15 limited the CWT form to `COSE_Sign1_Tagged` or `COSE_Mac0_Tagged`; -14 removed `0x0B` from the application-specific range, leaving `0x03` and `0x0C` to `0x0F` (draft-20 Document History; draft-21 § 7.1).

### Token Status List drafts -06 to -20

- -06 removed the unsigned JSON and CBOR Status List options, so a Status List is only served inside a signed or MACed Status List Token (Document History, -06 entry; draft-05 § 8.1 lists `application/statuslist+json` and `+cbor`, draft-06 does not).
- -06 also specified HTTP status codes, allowed redirects and added `status_list_aggregation_endpoint`.

### Token Status List drafts -01 to -05

- -01 moved from gzip to ZLIB and nested the reference as `status.status_list` with `idx` and `uri` (Document History, -01 entry; draft-01 § 6.2).
- -02 added `ttl` and the CWT encoding; -03 added aggregation and required the Status List Token `iss` to match the Referenced Token's `iss` (draft-03 § 5.1); -04 removed that requirement; -05 allowed MACs and added historical resolution and the Status Types registry.

### Token Status List draft-00

- The Referenced Token carried `"status": {"idx": ..., "uri": ...}` with no `status_list` member (draft-00 § 4.2), `lst` was gzip-compressed (Document History, -01 entry), and MACs were forbidden (draft-00 § 4.1).

## Upgrading

### SD-JWT drafts -09 to -22 to RFC 9901

1. Change the version marker: cite RFC 9901 instead of the draft in code, profiles and documentation. Media types, claim names and the serialization stay the same.
2. Replace removed or renamed fields: none. Check that every KB-JWT `aud` is a single string, not an array (§ 4.3).
3. Validate against the target: run the § 7.1 and § 7.3 checks, and the digest test vector in § 4.2.3.
4. Keep behaviour unchanged: issued SD-JWTs stay valid; there is no need to re-issue.

### SD-JWT drafts -07 and -08 to RFC 9901

1. Compact serialization is unchanged; keep `sd_hash` as is.
2. JWS JSON serialization: move `disclosures` from the top level of the JSON object into the (first) unprotected `header`, and carry the KB-JWT in `kb_jwt` there (§ 8.1, § 8.3). Serve it as `application/sd-jwt+json` (§ 11.2.2).
3. Apply the -09 and later rules above.
4. Re-run verification against § 7.1 and § 7.3.

### SD-JWT drafts -05 and -06 to RFC 9901

1. Change the KB-JWT: add `sd_hash` (rename `_sd_hash` from -06) computed per § 4.3.1. A -05 KB-JWT has no hash and must be re-created by the Holder; it cannot be converted.
2. Re-issue SD-JWTs whose Disclosures use `_sd` or `...` as claim names; § 7.1 step 3.c.ii.2 rejects them.
3. Apply the -07 and later steps above.
4. Verifiers stop accepting KB-JWTs without `sd_hash` (§ 4.3: it is REQUIRED).

### SD-JWT drafts -04 and earlier to RFC 9901

1. Re-issue. Map the "Combined Format for Issuance" to the § 4 SD-JWT serialization with the trailing `~`.
2. Replace the untyped Holder Binding JWT with a KB-JWT (`typ: kb+jwt`, `iat`, `aud`, `nonce`, `sd_hash`) signed with the `cnf` key (§ 4.3, § 4.1.2).
3. Where an array needs per-element disclosure, use array element Disclosures (§ 4.2.2, § 4.2.4.2).
4. Drop `_sd_alg` only if the value is `sha-256` (the default, § 4.1.1); ensure salts are strings.

### SD-JWT VC drafts -12 to -18 to draft-19

1. Keep `typ: dc+sd-jwt` and the claim set; nothing on the wire is renamed.
2. Bring every metadata, JWK Set, Type Metadata and rendering fetch under § 3 and § 7.1: HTTPS only, SSRF checks on every redirect target, redirect limits, time and size bounds, response validation, no use of 4xx or 5xx bodies.
3. Verify `#integrity` values with the § 6 procedure, without a CORS dependency; reject rendering `uri` values that are neither HTTPS nor `data:`.
4. From -16 and earlier: reject the credential when claim metadata is malformed or does not match (§ 5.6, § 5.7), and add `aka_vcts` handling if your ecosystem uses it (§ 2.2.2.2).

### SD-JWT VC drafts -06 to -11 to draft-19

1. Rewrite Type Metadata: `lang` to `locale` in display and claim display objects (§ 5.5, § 5.6.2); remove `schema`, `schema_uri` and their `#integrity` (draft-12 removed them); add `mandatory` and `sd` where the type needs them (§ 5.6.3, § 5.6.4).
2. Put `x5c` in the protected header (§ 2.5).
3. From -06: retrieve Type Metadata from the `vct` URL itself, not from `/.well-known/vct/...` (§ 5.3.1).
4. Apply the -12 to -18 steps above.

### SD-JWT VC drafts -05 and earlier to draft-19

1. Change `typ` to `dc+sd-jwt` and the media type to `application/dc+sd-jwt` (§ 2.1, § 2.2.1); re-sign, because `typ` is in the protected header.
2. From -00: rename the `type` claim to `vct` and use a Collision-Resistant Name (§ 2.2.2.1); move issuer metadata from `/.well-known/jwt-issuer` to `/.well-known/jwt-vc-issuer` (§ 4).
3. Apply the -06 to -11 steps above.
4. Verifiers that must read old credentials accept `vc+sd-jwt` only by explicit, time-limited policy; draft-19 does not define it.

### Token Status List drafts -06 to -20 to draft-21

1. Cite draft-21; the token formats, claims and media types are unchanged.
2. Reject Referenced Tokens whose `idx` is out of bounds (§ 8.3 step 6), and treat `0x0B` as reserved, not application-specific (§ 7.1).
3. Encode CWT Status List Tokens as `COSE_Sign1_Tagged` or `COSE_Mac0_Tagged`, without the CWT tag (§ 5.2).
4. Run the Appendix C test vectors.

### Token Status List drafts -01 to -05 to draft-21

1. Stop serving unsigned `application/statuslist+json` or `application/statuslist+cbor` lists; serve only `application/statuslist+jwt` or `application/statuslist+cwt` (§ 8.1, § 8.2).
2. Drop any rule that the Status List Token `iss` must equal the Referenced Token's `iss` (removed in -04); `sub` must equal `status_list.uri` (§ 5.1).
3. Add `exp` and `ttl` (both RECOMMENDED, § 5.1) and apply the -06 to -20 steps above.

### Token Status List draft-00 to draft-21

1. Re-issue Referenced Tokens with `"status": {"status_list": {"idx": ..., "uri": ...}}` (§ 6.2).
2. Re-encode `lst` with DEFLATE in the ZLIB format instead of gzip (§ 4.1).
3. Apply the -01 to -05 steps above.

## Preview

No preview line is listed. The RFC Editor record for RFC 9901 shows no updating or obsoleting RFC, and the next steps for SD-JWT VC and Token Status List are RFC publication of the current drafts, not a new line. When either is published as an RFC, make the RFC the family's current line, make its last draft legacy, and add an upgrade section.
