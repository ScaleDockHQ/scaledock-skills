# Versions and upgrades

Read this when choosing a target version for issuance, presentation or HAIP, meeting a wallet, issuer or verifier built on an Implementer's Draft, or deciding what to do with the 1.1 drafts. Each specification is its own family with its own current line: `vci` (OpenID4VCI), `vp` (OpenID4VP) and `haip` (HAIP). Sources: the three Finals, their Implementer's Drafts, the Document History of the last draft before each Final (OpenID4VCI draft 17, OpenID4VP draft 29, HAIP draft 06), the 1.1 editor's drafts and the OpenID4VP conformance testing page, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line                      | Status  | Revision                                | Posture | Summary                                                                                        |
| ------------------ | ------------------------- | ------- | --------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `vci-1.1-preview`  | OpenID4VCI 1.1            | preview | editor's draft -01, 1 October 2026      | track   | 1.0 plus Interactive Authorization, `invalid_tx_code` and credential response metadata.        |
| `vci-1.0`          | OpenID4VCI 1.0            | current | Final, 16 September 2025                |         | The default issuance target.                                                                   |
| `vci-id2`          | OpenID4VCI ID2 (draft 15) | legacy  | Implementer's Draft 2, 19 December 2024 |         | Nonce endpoint, `proofs`, wallet and key attestations, `dc+sd-jwt`; pre-`credential_metadata`. |
| `vci-id1`          | OpenID4VCI ID1 (draft 13) | legacy  | Implementer's Draft 1, 8 February 2024  |         | `c_nonce` in token and credential responses, Batch Credential Endpoint, `vc+sd-jwt`.           |
| `vp-1.1-preview`   | OpenID4VP 1.1             | preview | editor's draft -01, 1 October 2026      | track   | Clarifications to 1.0, HPKE `info`, and new security considerations.                           |
| `vp-1.0`           | OpenID4VP 1.0             | current | Final, 9 July 2025                      |         | The default presentation target. DCQL only.                                                    |
| `vp-id3`           | OpenID4VP ID3 (draft 23)  | legacy  | Implementer's Draft 3, 2 December 2024  |         | DCQL and Presentation Exchange side by side, `client_id` prefixes, JARM.                       |
| `vp-id2`           | OpenID4VP ID2 (draft 18)  | legacy  | Implementer's Draft 2, 21 April 2023    |         | Presentation Exchange, `client_id_scheme`, JARM. The version ISO 18013-7 Annex B uses.         |
| `haip-1.1-preview` | HAIP 1.1                  | preview | editor's draft -01, 24 September 2026   | track   | 1.0 plus an HPKE profile.                                                                      |
| `haip-1.0`         | HAIP 1.0                  | current | Final, 24 December 2025                 |         | The default high-assurance profile, required for certification.                                |
| `haip-id1`         | HAIP ID1 (draft 03)       | legacy  | Implementer's Draft 1, 7 February 2025  |         | Profiled OpenID4VP draft 24 and pre-Final OpenID4VCI.                                          |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The W3C Digital Credentials API is not a version line of OpenID4VCI, OpenID4VP or HAIP. It is the `digital-credentials` skill. This skill cites it where a wallet presents a credential through the browser API.

OpenID4VP also had a first Implementer's Draft, published as OpenID Connect for Verifiable Presentations (28 January 2022), before the base protocol moved to OAuth 2.0 in draft 11 (OpenID4VP draft 29 Appendix H). Treat it like ID2: read it and upgrade.

## Which version to use

- Build issuers, wallets and verifiers against OpenID4VCI 1.0, OpenID4VP 1.0 and, when the ecosystem requires it, HAIP 1.0. Cite the unversioned URL, which carries any errata; the `-final` URL keeps the approved text (OpenID4VCI § 1.1, OpenID4VP § 1.2, HAIP § 1.2).
- OpenID certification accepts only OpenID4VP 1.0 Final, and HAIP 1.0 Final support is mandatory for it. Older OpenID4VP versions, including the ID2 version used in ISO 18013-7 Annex B, can be tested but not certified (OpenID4VP conformance testing page).
- A verifier or wallet that must interoperate with an ISO 18013-7 Annex B deployment may need to read OpenID4VP ID2 messages. Keep that path separate, label it legacy, and never let it weaken the 1.0 checks. OpenID4VP draft 27 removed its references to ISO 18013-7 because that standard references an older version (OpenID4VP draft 29 Appendix H).
- Keep the pre-final dependencies each Final pins, unless a profile or a new version updates them: OpenID4VP pins OpenID Federation draft 43 and SD-JWT VC draft 09 (OpenID4VP § 13.4), OpenID4VCI pins OpenID Federation draft 43, SD-JWT VC draft 11 and Attestation-Based Client Authentication draft 07 (OpenID4VCI § 14.7), and HAIP pins SD-JWT VC draft 13 and Token Status List draft 14, overriding the versions in OpenID4VCI and OpenID4VP (HAIP § 9.4). As read on 2026-10-05, SD-JWT VC is at draft -19 and Token Status List at draft -21; neither is an RFC yet, while SD-JWT is RFC 9901. Read the latest drafts for context, but do not move a HAIP deployment to them until HAIP does.
- Treat any Implementer's Draft implementation as input to an upgrade. Emit nothing from a 1.1 editor's draft.

## What changed

The changes below come from the Document History appendices of the last draft before each Final (OpenID4VCI draft 17 Appendix L, OpenID4VP draft 29 Appendix H, HAIP draft 06 Appendix D); the Finals do not carry the history. Section numbers are those of the Final.

### OpenID4VCI 1.0 (from ID2, draft 15)

- Claims and display move into `credential_metadata` in each credential configuration (draft 16, § 12.2.4). Signed metadata uses a new mechanism and the `signed_metadata` parameter is gone (draft 16, § 12.2.3).
- The metadata URL inserts `/.well-known/openid-credential-issuer` between host and path (draft 16, § 12.2.2).
- The single `proof` request parameter is removed; send `proofs` (draft 16, § 8.2). The proof types move to Appendix F, and `proof_signing_alg_values_supported` is specific to each proof type (draft 16).
- Credential request encryption is added and is required when response encryption is used (draft 16, § 10).
- Errors `unknown_credential_configuration` and `unknown_credential_identifier` replace `unsupported_credential_type` and `unsupported_credential_format` (draft 16, § 8.3.1).
- Deferred issuance: the pending state and `interval` move into the responses, and the Deferred Credential Response requires `transaction_id` while still pending (drafts 16 and 17, § 8.3, § 9.2).
- `ldp_vp` becomes `di_vp`, `keyattestation+jwt` becomes `key-attestation+jwt`, and mdoc `credential_signing_alg_values_supported` uses COSE algorithm values (draft 16, Appendix A, Appendix D).
- The Nonce Endpoint may return a DPoP nonce, and needs no access token (draft 16, § 7).

### OpenID4VCI ID2 (from ID1, draft 13)

- The Batch Credential Endpoint and the CWT proof type are removed; the Credential Endpoint issues several instances for several keys (draft 14).
- `c_nonce` and `c_nonce_expires_in` leave the token and credential responses; the Nonce Endpoint supplies `c_nonce` (draft 15).
- The credential request drops `format` and format-specific parameters and uses `credential_identifier` or `credential_configuration_id`; the response always returns a `credentials` array (draft 15).
- Wallet attestations, key attestations and the `attestation` proof type are added (draft 15).
- `vc+sd-jwt` becomes `dc+sd-jwt` (draft 15).

### OpenID4VP 1.0 (from ID3, draft 23)

- DIF Presentation Exchange is removed; DCQL in `dcql_query` is the only query language, and `meta` is mandatory in each Credential Query (drafts 26 and 29, § 6).
- JARM and response signing are removed. Encrypted responses are JWEs built directly from a key in `client_metadata.jwks`, with `encrypted_response_enc_values_supported` (drafts 26 and 28, § 8.3).
- "Client ID Scheme" is renamed Client Identifier Prefix, with `client_id_prefixes_supported`. `x509_hash` is added and `x509_san_uri` removed (draft 25); `openid_federation:` and `decentralized_identifier:` are defined (draft 26) (§ 5.9.3).
- Request objects MUST have `typ` `oauth-authz-req+jwt` (draft 24, § 5).
- `vp_formats` becomes `vp_formats_supported`, always format-specific, with fully-specified algorithms for `mso_mdoc` and `dc+sd-jwt` (draft 27, § 11.1, Appendix B).
- `verifier_attestations` becomes `verifier_info` (draft 29, § 5.11).
- `require_cryptographic_holder_binding` allows presentations without holder binding (draft 26, § 5.3).
- DC API: responses are bound to the Origin, protocol identifiers are `openid4vp-v1-unsigned`, `openid4vp-v1-signed` and `openid4vp-v1-multisigned` (drafts 25, 26 and 29, Appendix A).
- AnonCreds support is removed (draft 27). The mdoc SessionTranscript is defined for redirects too (draft 29, Appendix B.2).

### OpenID4VP ID3 (from ID2, draft 18)

- DCQL is introduced alongside Presentation Exchange, and `transaction_data` is added (draft 22).
- `client_id_scheme` is removed and becomes a prefix of `client_id`, to fix a security issue (draft 22).
- `client_metadata_uri` is removed (draft 21). The `x509_san_dns`, `x509_san_uri` and `verifier_attestation` schemes are added (drafts 19 and 20).
- The SD-JWT VC profile is added, and `vc+sd-jwt` becomes `dc+sd-jwt` (drafts 21 and 23). The browser API annex is added (drafts 21 and 23).

### HAIP 1.0 (from ID1, draft 03)

- Presentation: only `x509_hash` may be used for signed requests; `x509_san_dns` and `verifier_attestation` are no longer permitted, and self-signed certificates are prohibited (draft 04, § 5.1). Ephemeral encryption keys are required (draft 04). Same-device flows are mandatory for redirects (draft 05, § 5.1). Verifiers support A128GCM and A256GCM (draft 06).
- The `haip://` scheme is replaced by `haip-vp://` and `haip-vci://`, whose support is an Ecosystem decision (draft 04, Appendix A.1).
- Issuance: key attestations are required, signed issuer metadata is added, ISO mdoc issuance is supported, and most of the FAPI 2.0 Security Profile applies (drafts 04 and 05, § 4). Wallet attestations become recommended rather than mandatory (draft 05). The key attestation requires an `x5c` header (draft 06).
- Presentation Exchange and SIOPv2 are removed; DCQL applies as OpenID4VP defines it (drafts 04 and 06).
- Signatures: at least ECDSA with P-256 and SHA-256, with Ecosystem-specific exceptions (draft 05, § 7, § 8). The DC API gains the multi-signed variant (draft 06, § 5.2).
- References move to OpenID4VCI 1.0 and OpenID4VP 1.0 Final (draft 04).

## Upgrading

Run the upgrades per family. For a line two steps back, apply each step in order.

### OpenID4VCI ID1 to ID2

1. Change the pinned revision to ID2 (draft 15), then continue to 1.0; ID2 is not a target.
2. Remove `batch_credential_endpoint` and CWT proofs. Request several credentials with several keys at the Credential Endpoint.
3. Move nonce handling to the Nonce Endpoint, drop `format` from credential requests, read `credentials` as an array, and rename `vc+sd-jwt` to `dc+sd-jwt`.
4. Keep behaviour unchanged: the same offer still yields the same credentials, bound to the same keys.

### OpenID4VCI ID2 to 1.0

1. Change the pinned revision to OpenID4VCI 1.0 and move metadata to `/.well-known/openid-credential-issuer` inserted between host and path (§ 12.2.2).
2. Replace removed or renamed fields: wrap `claims` and `display` in `credential_metadata`; send `proofs`, never `proof`; rename `ldp_vp` to `di_vp` and `keyattestation+jwt` to `key-attestation+jwt`; map the old error codes to `unknown_credential_configuration` and `unknown_credential_identifier`; replace `signed_metadata` with the § 12.2.3 mechanism.
3. Add request encryption wherever response encryption is used (§ 10), and return `transaction_id` in pending deferred responses (§ 9.2).
4. Validate with the OpenID4VCI conformance tests in [`certification.md`](certification.md) and the checks in [`issuance.md`](issuance.md).
5. Keep behaviour unchanged: the same wallet obtains the same credentials from the same offer.

### OpenID4VP ID2 to ID3

1. Change the pinned revision to ID3 (draft 23), then continue to 1.0; ID3 is not a target.
2. Replace `client_id_scheme` with the prefix in `client_id`, drop `client_metadata_uri`, and rename `vc+sd-jwt` to `dc+sd-jwt`.
3. Translate each `presentation_definition` into an equivalent `dcql_query`, since 1.0 removes Presentation Exchange.
4. Keep behaviour unchanged: the same credentials and claims are requested and accepted.

### OpenID4VP ID3 to 1.0

1. Change the pinned revision to OpenID4VP 1.0, and give every request object `typ` `oauth-authz-req+jwt` (§ 5).
2. Replace removed or renamed fields: `presentation_definition` and `presentation_submission` to `dcql_query` with `meta` in each Credential Query ([`dcql.md`](dcql.md)); `x509_san_uri` to `x509_hash` or another § 5.9.3 prefix; `vp_formats` to format-specific `vp_formats_supported`; `verifier_attestations` to `verifier_info`; JARM `authorization_encrypted_response_*` to a JWE built from `client_metadata.jwks` and `encrypted_response_enc_values_supported` (§ 8.3); DC API protocol `openid4vp` (ID3 Appendix A.1) to the `openid4vp-v1-*` identifiers ([`dc-api.md`](dc-api.md)).
3. Validate with the OpenID4VP and HAIP test plans in [`certification.md`](certification.md), and the checks in [`presentation.md`](presentation.md).
4. Keep behaviour unchanged: the same request yields the same claims, bound to the same nonce and audience.

### HAIP ID1 to 1.0

1. Change the pinned revision to HAIP 1.0, and upgrade OpenID4VCI and OpenID4VP to 1.0 first.
2. Replace removed options: `x509_san_dns` and `verifier_attestation` prefixes to `x509_hash`; `haip://` to `haip-vp://` or `haip-vci://` where the Ecosystem uses them; Presentation Exchange to DCQL.
3. Add the new requirements: key attestations with `x5c`, signed issuer metadata, ephemeral response encryption keys, A128GCM and A256GCM at the verifier, and same-device redirect flows.
4. Validate with the HAIP test plans and the checklist in [`haip.md`](haip.md).
5. Keep behaviour unchanged: every flow that passed under ID1 still completes, now under the 1.0 checks.

## Preview: OpenID4VCI 1.1

`vci-1.1-preview` is the 1.1 editor's draft (-01, 1 October 2026), built from the working group repository. It starts from the 1.0 Final text and adds: an Interactive Authorization Endpoint based on OAuth 2.0 for First-Party Applications, with `interactive_authorization_endpoint` and `require_interactive_authorization_request` metadata and format-specific bindings (§ 6, Appendix A); the `invalid_tx_code` error for the Pre-Authorized Code Flow; optional metadata in the Credential Response; and removal of a terminating `/` from the issuer identifier when forming the metadata URL (OpenID4VCI 1.1 Appendix L). Section numbers after § 5 shift by one. Posture: track. Never emit `interactive_authorization_endpoint`, `iae:` prefixes or the `iae_post` response mode.

## Preview: OpenID4VP 1.1

`vp-1.1-preview` is the 1.1 editor's draft (-01, 1 October 2026). It clarifies 1.0: a W3C credential requested without holder binding goes directly in the VP Token; wallets do not follow HTTP redirects; `encrypted_response_enc_values_supported` applies only to JWE content encryption, not JOSE HPKE; the Origin is compared as a plain string; a VP Token is never empty and errors use an error response. It adds HPKE use of the `info` parameter and security considerations on untrusted input and on not using a VP Token as an access token (OpenID4VP 1.1 Appendix H). Posture: track. Apply a clarification only where it matches what 1.0 already allows, and never emit HPKE-based responses from it.

## Preview: HAIP 1.1

`haip-1.1-preview` is the 1.1 editor's draft (-01, 24 September 2026). It adds an HPKE profile and clarifies that the DCQL query travels in `dcql_query` (HAIP 1.1 Appendix D). Posture: track. Do not claim HAIP 1.1 conformance or emit its HPKE profile.

When a 1.1 line is approved as Final: make it current in its family, make the 1.0 line supported, add an upgrade section from 1.0, re-pin the Final URL, and recheck the conformance pages for the certifiable version.
