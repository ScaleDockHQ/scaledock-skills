# Versions and upgrades

Read this when choosing a target version, reading messages or an API built against a pre-RFC SCITT draft, or upgrading. Sources: RFC 9943, RFC 9942, draft-ietf-scitt-scrapi-11, the earlier architecture and SCRAPI revisions named below, and their datatracker entries, listed in [Sources](../SKILL.md#sources).

## Version lines

Two families: `architecture` (the message formats and roles, RFC 9943) and `scrapi` (the HTTP API). Each has one current line. COSE Receipts (RFC 9942) is a dependency, not a separate line.

| Id                | Line                              | Status  | Revision                                                          | Posture | Summary                                                                                                    |
| ----------------- | --------------------------------- | ------- | ----------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `rfc9943`         | RFC 9943                          | current | RFC 9943, Standards Track (June 2026)                             |         | The default. Registered labels 394, 395, 396 and the two `application/scitt-*+cose` media types.           |
| `arch-draft-22`   | architecture draft-05 to draft-22 | legacy  | draft-ietf-scitt-architecture-05 (2024-02-10) to -22 (2025-10-10) |         | CWT Claims at 15, but Receipts used temporary labels `-111` (vds) and `-222` (vdp).                        |
| `arch-draft-04`   | architecture draft-04 and earlier | legacy  | draft-ietf-scitt-architecture-00 (2022-12-08) to -04 (2023-10-23) |         | Temporary labels 391 (DID Issuer), 392 (Feed), 393 (Reg_Info); -04 moved to CWT Claims at temporary 13.    |
| `scrapi-draft-11` | SCRAPI draft-11                   | current | draft-ietf-scitt-scrapi-11 (2026-06-26), in the RFC Editor queue  | build   | The default API: key discovery, register with 201 or 202, resolve Receipt with 200, 204 or 404.            |
| `scrapi-draft-10` | SCRAPI draft-04 to draft-10       | legacy  | draft-ietf-scitt-scrapi-04 (2025-03-03) to -10 (2026-05-13)       |         | 303 See Other then 302 Found polling on a temporary locator; -04 to -06 also had a configuration endpoint. |
| `scrapi-draft-03` | SCRAPI draft-03 and earlier       | legacy  | draft-ietf-scitt-scrapi-00 (2024-01-25) to -03 (2025-01-08)       |         | Early designs: JSON problem details (-00 to -02), `/operations/{id}` polling (-00, -03), other paths.      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

SCRAPI has no RFC yet, so its current line is the latest draft with a **build** posture: implement it, and expect editorial or minor changes when the RFC is published. The datatracker shows it in the RFC Editor queue with the IESG state "RFC Ed Queue"; revision -11 expires 2026-12-28. SCRAPI -11 still cites the architecture as draft-ietf-scitt-architecture-22; read that as RFC 9943.

## Which version to use

- Messages: RFC 9943 with RFC 9942 Receipts. No other architecture line is supported.
- API: SCRAPI draft-11. Behind a flag or version marker if you must keep a legacy flow alive for existing clients.
- A Receipt with `-111` or `-222` in its headers, or a Signed Statement with header 391, 392, 393 or 13 for claims, is legacy input to an upgrade.
- A TS exposing `/operations/...`, `/.well-known/transparency-configuration`, `/.well-known/scitt-configuration` or `/.well-known/issuer/...`, or returning 303 from `POST /entries`, is on a legacy SCRAPI line.

## What changed

### RFC 9943 (from architecture draft-22)

- Receipt header labels became the IANA-registered values from RFC 9942: `vds` 395 (was `-111`) and `vdp` 396 (was `-222`) (RFC 9943 § 7 Figures 9 and 10; draft-22 Figures 8 and 9). `receipts` stays 394.
- The dependency is RFC 9942 instead of draft-ietf-cose-merkle-tree-proofs.
- The media types `application/scitt-statement+cose` and `application/scitt-receipt+cose` (present since draft-13) are registered, with CoAP Content-Formats 277 and 278 (§ 10).

### architecture draft-05 to draft-22 (from draft-04)

- Issuer and Subject moved into CWT Claims at header label 15 with `iss` (1) and `sub` (2) (draft-05 Figure 1). Draft-04 had CWT Claims at temporary label 13 plus `393 => Reg_Info`.
- The `Reg_Info` header (`register_by`, `sequence_no`, `issuance_ts`, `no_replay`) and the Feed concept as a header were removed.
- Draft-11 and draft-12 wrote `receipts` as `TBD_0`; the other revisions in this line used 394. Header map wildcards were `* int => any` through at least draft-20; draft-22 and RFC 9943 Figure 3 use `* label => any` with `label = int / tstr`, so text labels are allowed.

### architecture draft-04 and earlier

Draft-00 to draft-03 defined a fixed protected header: 1 alg, 3 payload type, 4 kid, 391 DID of the Issuer, 392 Feed, 393 Reg_Info, all mandatory, with Receipts at temporary 394 in the unprotected header (draft-02 § 6.1). Issuers were DIDs, with `did:web` required for TS identifiers (draft-02 § 6.2).

### SCRAPI draft-11 (from draft-10)

- Asynchronous registration returns **202 Accepted** with `Location` (was 303 See Other); polling returns **204 No Content** with `Retry-After` and `Cache-Control: no-store` (was 302 Found) (§ 2.3.2, § 2.4.2).
- The separate "Query Registration Status" resource merged into "Resolve Receipt"; a failed asynchronous registration is a 404 with problem details (§ 2.4.3).
- `Location` on 201 is now MUST, and the same `Location` MUST be returned for synchronous and asynchronous registration of the same statement (§ 2.3.1). Draft-10 allowed temporary locators and a different final locator.
- Clients MUST send `Accept: application/cbor` to the key resources (was SHOULD) (§ 2.1, § 2.2).
- 429 moved under registration (§ 2.3.4).

### SCRAPI draft-04 to draft-10 (from draft-03)

- Registration status moved from draft-03's `/operations/{id}` with CBOR bodies `{"OperationID", "Status": "running" | "succeeded" | "failed"}` to 303 and 302 redirects on `/entries/...` (draft-04 § 2.1.2.2, § 2.1.3.1).
- Draft-04 and draft-05 served `/.well-known/transparency-configuration` and `/.well-known/issuer/...`; draft-06 renamed the first to `/.well-known/scitt-configuration`.
- Draft-06 added `/.well-known/scitt-keys`. Draft-07 removed the configuration and issuer resolution endpoints but kept optional Exchange Receipt, Resolve Signed Statement and Resolve Transparent Statement endpoints; draft-08 dropped those too.
- Draft-07 added `/.well-known/scitt-keys/{kid_value}`.

### SCRAPI draft-03 and earlier

The early revisions differ from each other and from draft-11:

- Draft-00 used JSON bodies, RFC 7807 problem details, a registration challenge endpoint, and `/operations/{operation_id}` polling with `{"operationId", "status"}` bodies.
- Draft-01 and draft-02 used JSON problem details (RFC 9457), `/.well-known/transparency-configuration`, a 202 whose `Location` pointed under `/receipts/`, and extra resources such as `POST /signed-statements/issue`.
- Draft-03 used `application/concise-problem-details+cbor` errors, `/.well-known/transparency-configuration`, and 202 Accepted with `Location: /operations/{id}`, polled until `"Status": "succeeded"` returned the EntryID.

## Upgrading

### arch-draft-22 to rfc9943

1. Change the version marker: cite RFC 9943 and RFC 9942 instead of the drafts.
2. Replace renamed fields: in Receipts, write `vds` at 395 instead of `-111` and `vdp` at 396 instead of `-222`. Keep `receipts` at 394. Verifiers may accept the old labels only behind an explicit legacy switch, since unregistered labels fail RFC 9942 § 4.3.
3. Validate against RFC 9943 Figure 3 and Figure 7, and RFC 9942 Figure 1: CWT Claims with `iss` and `sub` in the protected header of Signed Statements and Receipts, `kid` when no `x5t`/`x5chain`, and tagged COSE_Sign1 everywhere.
4. Keep behaviour unchanged: re-issue fresh Receipts for existing entries at the same VDS positions; do not re-register or reorder entries.

### arch-draft-04 to rfc9943

1. Change the version marker to RFC 9943.
2. Replace removed fields: move the Issuer (391, a DID) into CWT Claims `iss` (15 → 1) and the Feed (392) into `sub` (15 → 2); move claims at temporary 13 to 15. Drop `Reg_Info` (393); carry policy inputs as protected headers your Registration Policy names, and issuer timestamps as `iat` in CWT Claims (SCRAPI § 4.4.2.1).
3. Re-sign: the protected header is covered by the signature, so old Signed Statements cannot be rewritten; Issuers sign new ones and register them.
4. Then apply the draft-22 to RFC 9943 steps for Receipts, and check that the TS's Registration Policy and trust anchors are registered on the VDS (§ 5.1.1.1).

### scrapi-draft-10 to scrapi-draft-11

1. Change the version marker to draft-ietf-scitt-scrapi-11.
2. Replace the async flow: return 202 with `Location` (no body) instead of 303; return 204 with `Retry-After` and `Cache-Control: no-store` instead of 302; return the Receipt with 200 at the same `Location`; return 404 with "Registration Failed" for failures.
3. Make `Location` stable: the same URL for sync and async, and no temporary-then-final locator.
4. Validate: clients treat 202 and 204 as "keep polling", honour `Retry-After`, and handle any status by class plus problem details.
5. Keep behaviour unchanged: existing EntryIDs keep resolving to fresh Receipts.

### scrapi-draft-03 to scrapi-draft-11

1. Change the version marker to draft-ietf-scitt-scrapi-11.
2. Remove `/operations/{id}`, the `OperationID`/`Status` bodies, the configuration and issuer endpoints, and any JSON problem details. Serve keys at `/.well-known/scitt-keys` and `/.well-known/scitt-keys/{kid_value}`.
3. Implement the draft-11 register and resolve flow above, with CBOR concise problem details for every error.
4. Keep behaviour unchanged: map old operation IDs to their final EntryIDs so existing clients can still fetch Receipts during migration.

## Preview

No preview line is listed. RFC 9943 has no updating or obsoleting RFC on its RFC Editor page. SCRAPI is in the RFC Editor queue; when it is published, make its RFC the current `scrapi` line, mark `scrapi-draft-11` legacy, and add an upgrade section for any changes. Watch the SCITT working group page for new work items.
