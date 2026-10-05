# HAIP 1.0: OpenID4VC High Assurance Interoperability Profile

HAIP 1.0 (Final, published 24 December 2025) profiles OpenID4VCI, OpenID4VP, the W3C Digital Credentials API, IETF SD-JWT VC and ISO mdoc for high-assurance use. Section numbers refer to HAIP.

## Scope (§3)

- **Flows**:
  - Issuance with OpenID4VCI.
  - Presentation with OpenID4VP over redirects.
  - Presentation with OpenID4VP over the W3C Digital Credentials API.
- An implementation may support any subset of flows, but must meet every requirement for each flow it supports and for the non-flow sections.
- Each flow supports at least one of SD-JWT VC or ISO mdoc. Optional parameters in the profiled specifications stay optional unless HAIP says otherwise.
- **Out of scope** (§3.4):
  - Trust management, including how trust anchors are obtained.
  - Offline presentation, for example over BLE.
- **Ecosystem choices** (§9.3): ecosystems decide the flows, formats, signed metadata, offer delivery, attestation formats, X.509 profiles and any extra algorithms.

## Issuance (§4)

- [ ] Wallet and issuer support the authorization code flow and at least one of SD-JWT VC or ISO mdoc.
- [ ] They follow the applicable FAPI 2.0 Security Profile: PKCE with S256, PAR where applicable, and `iss` in the authorization response (RFC 9207).
- [ ] DPoP is supported for sender-constrained tokens. Wallets handle `DPoP-Nonce` from the nonce endpoint and other endpoints.
- [ ] Not taken from FAPI 2.0:
  - Its client authentication methods; wallet attestation may be used instead.
  - PAR, except when the authorization endpoint is used.
  - SP §5.4.1 clause 1, which §7 replaces.
- [ ] Issuer-initiated flows use the OpenID4VCI credential offer.
- [ ] If batch issuance is offered, the issuer advertises `batch_credential_issuance`, and wallets SHOULD use batches instead of repeated single requests.

**Metadata (§4.1):**

- [ ] The authorization server publishes RFC 8414 metadata.
- [ ] Issuer metadata follows OpenID4VCI §12.2.2, with a `scope` for every credential configuration.
- [ ] If ecosystem policy needs more issuer authentication than TLS gives, both sides support signed issuer metadata, with keys in `x5c`. The trust anchor is excluded, and the signing certificate is not self-signed.
- [ ] Wallets that render issuer images support SVG and PNG, from both `data:` and `https` URLs.
- [ ] If any configuration has `cryptographic_binding_methods_supported`, `nonce_endpoint` is present.

**Offer and authorization (§4.2, §4.3):**

- [ ] The `authorization_code` grant is supported in offers. The offer includes a `scope`, and the wallet uses it in the authorization request.
- [ ] Offers work same-device and cross-device. `haip-vci://` MAY be used to invoke the wallet.
- [ ] Wallets authenticate at PAR the same way as at the token endpoint. Each `scope` maps to one credential type.

**Token and client authentication (§4.4):**

- [ ] Refresh tokens are RECOMMENDED for credential refresh. They are NOT RECOMMENDED for refreshing more than a year after the original issuance.
- [ ] Wallets use, and issuers require, client authentication at every OAuth endpoint that supports it, such as PAR and token (§4.4.1).
- [ ] Ecosystems SHOULD use the OpenID4VCI Appendix E wallet attestation. When they do:
  - `x5c` carries the signing certificate and chain, without the trust anchor.
  - An attestation is not reused across issuers and has no per-instance identifier.
  - `sub` is shared by every instance of that wallet implementation.
  - The PAR `client_id` equals that `sub`.

**Key attestation (§4.5.1):**

- [ ] Wallets support key attestations. Ecosystems SHOULD use OpenID4VCI Appendix D, with the `jwt` proof type carrying `key_attestation` and with the `attestation` proof type.
- [ ] With Appendix D, the validation key is in `x5c`, the trust anchor is excluded, and the signing certificate is not self-signed.
- [ ] For a batch with holder binding, all keys SHOULD be attested in one key attestation.

## Presentation (§5)

All flows:

- [ ] At least one of SD-JWT VC or ISO mdoc is supported, and `response_type` is `vp_token`.
- [ ] Signed requests use the `x509_hash` client identifier prefix, with the same `x5c` rules: no trust anchor, and not self-signed.
- [ ] DCQL is used for the query and the response.
- [ ] Response encryption follows OpenID4VP §8.3:
  - ECDH-ES with P-256 keys MUST be supported.
  - Verifiers support `A128GCM` and `A256GCM`, and list both in `encrypted_response_enc_values_supported`.
  - Wallets support at least one of them, and SHOULD use `A256GCM` when they support both.
- [ ] Verifiers send ephemeral encryption keys, specific to each request, in `client_metadata`.
- [ ] The `aki` trusted-authorities query is supported. It can carry keys from several X.509 trust schemes, such as an ISO mDL VICAL or ETSI Trusted Lists.

**Redirects (§5.1):**

- [ ] Requests are signed JARs passed by `request_uri`.
- [ ] Responses use `direct_post.jwt`, and the OpenID4VP §14.3 considerations apply.
- [ ] Same-device flow is supported, and verifiers SHOULD use only same-device unless they do not rely on session binding (for example, in proximity). In same-device flows:
  - The verifier returns `redirect_uri` from the response URI.
  - The wallet follows it.
  - The verifier rejects the presentation if the redirect does not come back or arrives in a different session.
- [ ] `haip-vp://` MAY be used to invoke the wallet.

**Digital Credentials API (§5.2):**

- [ ] Invocation is through the W3C Digital Credentials API or an equivalent platform API.
- [ ] `response_mode` is `dc_api.jwt`, following OpenID4VP Appendix A.
- [ ] Wallets support unsigned, signed and multi-signed requests. Verifiers support at least one.

**Formats (§5.3):**

- [ ] mdoc uses `mso_mdoc`, with one `DeviceResponse` per returned mdoc, each matching its DCQL query. An MSO revocation mechanism, if used, is one from ISO/IEC 18013-5 second edition.
- [ ] SD-JWT VC uses `dc+sd-jwt`.

## SD-JWT VC profile (§6.1)

- [ ] Compact serialization is supported (RFC 9901). JSON serialization MAY be.
- [ ] If the validity period is limited (RECOMMENDED), the credential uses `exp`, `status` or both.
- [ ] `cnf` follows SD-JWT VC and includes `jwk` when the configuration requires holder binding.
- [ ] `status`, if present, holds a `status_list` (Token Status List). The Status List Token has its key in `x5c`, without the trust anchor, and not self-signed.
- [ ] Each credential has its own unique, unpredictable status list index.
- [ ] Issuers sign with a certificate and chain in `x5c` (SD-JWT VC §3.5 as HAIP cites it, § 2.5 in draft -19), without the trust anchor and not self-signed. All parties support this key resolution (§6.1.1).
- [ ] Holder-bound credentials are always presented with a KB-JWT (§6.1.1.1).

## Algorithms (§7, §8, §10.2)

- [ ] Everyone supports at least ECDSA with P-256 and SHA-256: ES256 in JOSE, and COSE `-7` or `-9`.
  - Issuers use it to validate wallet attestations and their PoP, key attestations, and `jwt` proofs.
  - Verifiers use it for presentation signatures (KB-JWT, mdoc `deviceSignature`) and status information.
  - Wallets use it for signed requests and signed issuer metadata.
- [ ] SHA-256 is supported for SD-JWT VC and mdoc digests.
- [ ] Extra algorithms are listed in metadata. Key sizes follow NIST, BSI or ECCG guidance.

## Pre-final dependencies (§9.4)

HAIP pins SD-JWT VC draft -13 and Token Status List draft -14. Implementations keep using those versions, even after the final RFCs appear, until a HAIP profile or new version says otherwise. These versions override those named in OpenID4VCI and OpenID4VP.

As read on 2026-10-05, neither has become an RFC: SD-JWT VC is at draft -19 (waiting for AD go-ahead) and Token Status List at draft -21 (in the RFC Editor queue). SD-JWT itself is RFC 9901. The base rules of all three are in [`formats.md`](formats.md).

## Conformance (§10.1)

The OpenID conformance tests for OpenID4VCI and OpenID4VP test HAIP. See [`certification.md`](certification.md).
