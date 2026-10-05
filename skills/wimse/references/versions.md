# Versions and upgrades

Read this when choosing which revision of each WIMSE draft to target, meeting code written against an older revision or against the single `draft-ietf-wimse-s2s-protocol` document, upgrading it, or deciding what to do with AIMS. Sources: the text of every current draft and of `draft-ietf-wimse-s2s-protocol-07`, `draft-ietf-wimse-wpt-01` and `draft-ietf-wimse-http-signature-06`, their Document History appendices, the WG documents list and the datatracker pages, listed in [Sources](../SKILL.md#sources).

WIMSE has no RFC. Each working group draft is versioned on its own, so each is its own family with one current line: its latest revision, with a draft posture. Legacy lines are earlier revisions that changed the wire format, and the single document that the credential and protocol drafts were split out of.

## Version lines

| Id              | Line                                            | Status  | Revision                                       | Posture | Summary                                                                                             |
| --------------- | ----------------------------------------------- | ------- | ---------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `arch-08`       | draft-ietf-wimse-arch-08                        | current | -08 (2026-07-06), Informational                | name    | Terms, trust domains, credentials, scenarios, layered authentication, audit and AI intermediaries.  |
| `identifier-03` | draft-ietf-wimse-identifier-03                  | current | -03 (2026-07-06), Standards Track              | build   | The Workload Identifier URI rules and the `wimse` URI scheme.                                       |
| `creds-02`      | draft-ietf-wimse-workload-creds-02              | current | -02 (2026-07-02), Standards Track              | build   | The Workload Identity Token (WIT) and Workload Identity Certificate (WIC), and trust anchors.       |
| `s2s-07`        | draft-ietf-wimse-s2s-protocol-07                | legacy  | -00 to -07 (to 2025-10-16), Replaced           |         | The one document that held WIT, WIC, WPT, HTTP signatures and mTLS before the split.                |
| `wpt-02`        | draft-ietf-wimse-wpt-02                         | current | -02 (2026-08-27), Standards Track              | build   | The Workload Proof Token in `Authorization: WPT`.                                                   |
| `wpt-01`        | draft-ietf-wimse-wpt-01 and earlier             | legacy  | -00 to -01 (to 2026-03-02)                     |         | The WPT in a `Workload-Proof-Token` header field, with an `ath` claim.                              |
| `httpsig-07`    | draft-ietf-wimse-http-signature-07              | current | -07 (2026-09-20), Standards Track              | build   | The RFC 9421 profile with `@path` and `@query`, tag-based selection and tightened response signing. |
| `httpsig-06`    | draft-ietf-wimse-http-signature-06 and earlier  | legacy  | -00 to -06 (to 2026-08-04)                     |         | The profile that covered `@request-target` and chose the signature by label.                        |
| `mtls-02`       | draft-ietf-wimse-mutual-tls-02                  | current | -02 (2026-07-06), Standards Track              | build   | Mutual TLS with Workload Identity Certificates.                                                     |
| `practices-07`  | draft-ietf-wimse-workload-identity-practices-07 | current | -07 (2026-09-22), Informational, with the IESG | build   | How platforms deliver workload credentials, and the MUSTs around delivery, audience and lifetime.   |
| `aims-00`       | draft-ietf-wimse-aims-00                        | current | -00 (2026-09-15), Informational, just adopted  | track   | A framework for AI agent identity that composes WIMSE, SPIFFE and OAuth.                            |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. Postures: **build** means implement it now, pinned to the revision; **name** means use its names and shapes; **track** means watch it and build nothing that depends on it.

The datatracker, read 2026-10-05, lists these revisions as the latest of every WIMSE WG document. `draft-ietf-wimse-workload-identity-practices-07` is "Submitted to IESG for Publication" with IESG state "AD Evaluation::AD Followup"; every other active draft is a "WG Document". `draft-ietf-wimse-s2s-protocol` is a Replaced (Dead) WG document, replaced by workload-creds, wpt, http-signature and mutual-tls. Earlier names: the architecture replaces `draft-salowey-wimse-arch`, the practices draft replaces `draft-ietf-wimse-workload-identity-bcp` (titled "OAuth 2.0 Client Assertion in Workload Environments"), and AIMS replaces `draft-klrc-aiagent-auth`. Individual `draft-*-wimse-*` drafts that the WG has not adopted are not covered.

## Which version to use

- Default to the current line of every draft you use, at the pinned revision. Caller and callee must agree on the revision of the binding they share, because wpt-02 and http-signature-07 changed the wire format.
- Implement identifier-03, workload-creds-02, wpt-02, http-signature-07 and mutual-tls-02 (build). Apply practices-07 to credential delivery (build).
- Use arch-08 for terms, components and threat model (name); it defines no wire format.
- Read aims-00 for direction only (track). It is a -00 draft and some of its text already lags the protocol drafts: it describes the WPT in a `Workload-Proof-Token` header (aims § 9.2.1) and the signature profile with `@request-target` (aims § 9.2.2), both replaced.
- Treat anything on a legacy line as input to an upgrade. No line is supported.
- Watch for: an RFC number for practices; the chartered token exchange protocol and profiles, which have milestones but no WG draft yet (charter); and the dangling cross-reference noted in [`tokens.md`](tokens.md).

## What changed

### draft-ietf-wimse-workload-creds-02 (creds § A.1 to A.3)

- -00: split out of s2s-protocol-07; WPT, HTTP signatures and mTLS moved to their own drafts.
- -01: `iss` is RECOMMENDED for auditing, but validation uses `sub`, not `iss`; the `wimse` URI scheme moved to the identifier draft.
- -02: exactly one Workload Identifier per credential (§ 4); a Trust Anchors section with WIT key selection and rotation (§ 3); reworked security considerations, including WIC validation and lifetime (§ 9.3); client authorization covers both WIT and WIC (§ 7); "level" renamed "layer".

### draft-ietf-wimse-wpt-02 (wpt § A.1 to A.3)

- -00: WPT only; WIT, WIC and the HTTP signature profile removed.
- -01: `jti` clarified, examples fixed, audience security considerations added.
- -02: the WPT moves into the `Authorization` field with a new `WPT` authentication scheme, replacing the `Workload-Proof-Token` header field; failures get 401 with `WWW-Authenticate: WPT`; the `ath` claim is removed; § 2.2 now forbids relying on a bearer token in the same request; raw WPTs must not be logged (§ 3.1.5); WIT validation is referenced from workload-creds.

### draft-ietf-wimse-http-signature-07 (httpsig § A.1 to A.8)

- -00: extracted from s2s-protocol-07.
- -01: response signing and signature versus token lifetime clarified; security goals added.
- -02: a `Wimse-Audience` header field (replaced in -03).
- -03: `wimse-aud` signature parameter replaces the header field.
- -04: `wimse-req-nonce` required on signed responses and registered; -05 regenerated the examples to match.
- -06: `wimse-sign-response` lets the client require a signed response.
- -07: `@path` and `@query` replace `@request-target`; `@authority` deliberately not covered; the WIMSE signature is selected by `tag`, never by label, and two signatures with the tag reject the message; tighter response-signing rules with `Accept-Signature`; nonces random with negligible collision probability, replay caches local; algorithm from `cnf.jwk.alg` with no own baseline.

### draft-ietf-wimse-mutual-tls-02 (mtls § A.1 to A.3)

- -00: extracted from s2s-protocol-07, with a server name validation consideration. -01: security considerations. -02: server name validation reworked (§ 3.2.1).

### draft-ietf-wimse-identifier-03 (id § B.1 to B.3)

- Since -00: identifier scope, then renamed "Origin" (§ 4.6); URI requirements (§ 4.1); the `wimse` scheme (§ 4.4); separation of logical workloads and instances. -03 softens the information disclosure text and aligns terminology.

### draft-ietf-wimse-arch-08 (arch, "Changes since draft -06")

- Workload separated from workload instance; the workload identifier definition moved to the identifier draft; credential provisioning updated; § 3.3 adds the message flow with PEP and PDP.

### draft-ietf-wimse-workload-identity-practices-07 (practices, Appendix B)

- -07 hardens SHOULD and MUST text after AD feedback; -06 covers credentials on durable storage and addresses the AD evaluation; -05 discourages environment variables and separates cloud metadata credentials from workload identities.

### draft-ietf-wimse-s2s-protocol-07

The last single-document revision (16 October 2025) defined the WIT (§ 3.1), "Option 1: DPoP-Inspired Authentication" with a `Workload-Proof-Token` header field and an `ath` claim (§ 3.2), "Option 2" HTTP signatures covering `@method` and `@request-target` (§ 3.3), mutual TLS (§ 4) and the `wimse` URI scheme registration (§ 7.4). Its WIC rule already required a single URI SAN (§ 4.1).

## Upgrading

### draft-ietf-wimse-s2s-protocol-07 to the split drafts

1. Re-pin references: WIT and WIC to workload-creds-02, the DPoP-inspired option to wpt-02, the HTTP signature option to http-signature-07, mutual TLS to mutual-tls-02, and the `wimse` scheme to identifier-03.
2. WIT: keep `typ` `wit+jwt`, `sub`, `exp`, `cnf.jwk.alg` and the `Workload-Identity-Token` header. Configure trust anchors per trust domain and stop resolving keys from `iss` alone (creds § 3). Check that each WIT and WIC carries one identifier (creds § 4).
3. Identifiers: enforce id § 4.1 (no query, fragment, userinfo or port; 2048-byte support) and full-URI comparison (id § 4.3).
4. Then apply the two upgrades below for the WPT and the HTTP signature profile. Mutual TLS needs no wire change; add the trust-domain check and DNS-ID validation of mtls § 3.2 and § 3.2.1.

### draft-ietf-wimse-wpt-01 and earlier (or s2s-protocol Option 1) to draft-ietf-wimse-wpt-02

1. Callers: send the WPT as `Authorization: WPT <jwt>` instead of `Workload-Proof-Token: <jwt>` (wpt § 2).
2. Remove `ath`. A request with a WPT can no longer carry an OAuth access token in `Authorization`; move context into a Txn-Token (bound with `tth`) or another header field (bound with `oth`), and never rely on a bearer token to authenticate the caller (wpt § 2.2).
3. Callees: require exactly one `Authorization` field using the `WPT` scheme, then run the full validation list (wpt § 2).
4. Errors: switch WPT failures from 400 to 401 with `WWW-Authenticate: WPT`; keep 400 for errors unrelated to credentials (wpt § 2.1).
5. Stop logging raw WPTs (wpt § 3.1.5).
6. Roll out caller and callee together, or have the callee accept both forms for a bounded window while it still validates the WPT fully.

### draft-ietf-wimse-http-signature-06 and earlier (or s2s-protocol Option 2) to draft-ietf-wimse-http-signature-07

1. Replace `@request-target` with `@path` and `@query` on requests, and `@request-target;req` with `@path;req` and `@query;req` on signed responses; sign `@query` even with no query (value `?`) (httpsig § 3).
2. Do not cover `@authority`; carry the audience in `wimse-aud`. From -02 or earlier, replace the `Wimse-Audience` header field with the `wimse-aud` parameter.
3. Verifiers: select the signature by `tag="wimse-workload-to-workload"`, not by the label `wimse`, and reject a message with two such signatures.
4. Generate nonces randomly with negligible collision probability; keep replay caches local policy (httpsig § 3).
5. Responses: always include `wimse-req-nonce` on signed responses; honour `wimse-sign-response`, and return 400 or 501 when a required signed response cannot be produced (httpsig § 3.3 to § 3.6).
6. Verify against the RFC 9421 examples in httpsig § 3.7 before deploying.

## Preview: none, and AIMS posture

No WIMSE draft has a `-preview` line, because no line is released yet: every current line is itself a draft with a posture. AIMS (`aims-00`) is the least mature: posture **track**. Use its model (agents are workloads, one WIMSE identifier per agent, OAuth for delegated authorization) to inform design, but cite the protocol drafts, not AIMS, for anything on the wire. When a draft becomes an RFC: make the RFC line current, make the draft line legacy with an upgrade section, and drop the posture.
