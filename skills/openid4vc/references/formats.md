# Credential formats in OpenID4VCI and OpenID4VP

OpenID4VCI 1.0 and OpenID4VP 1.0 are format-agnostic. Appendix A of OpenID4VCI and Appendix B of OpenID4VP define profiles for three families. This file covers what those appendices say, plus the base rules of the IETF documents under `dc+sd-jwt` that every SD-JWT VC issuer, wallet and verifier needs. The credential formats themselves are defined elsewhere: SD-JWT (RFC 9901), IETF SD-JWT VC (an Internet-Draft, latest -19; HAIP pins -13), IETF Token Status List (an Internet-Draft in the RFC Editor queue, latest -21; HAIP pins -14), ISO/IEC 18013-5 and 23220, and the W3C VC Data Model.

## Identifiers

| Format                                 | Identifier       | OpenID4VCI | OpenID4VP    |
| -------------------------------------- | ---------------- | ---------- | ------------ |
| IETF SD-JWT VC                         | `dc+sd-jwt`      | A.3        | B.3          |
| ISO mdoc                               | `mso_mdoc`       | A.2        | B.2          |
| W3C VC as JWT, no JSON-LD              | `jwt_vc_json`    | A.1.1      | B.1.3.1      |
| W3C VC as JWT, with JSON-LD            | `jwt_vc_json-ld` | A.1.3      | Not profiled |
| W3C VC with Data Integrity and JSON-LD | `ldp_vc`         | A.1.2      | B.1.3.2      |

## IETF SD-JWT VC (`dc+sd-jwt`)

- **Issuance** (OpenID4VCI A.3):
  - Issuer metadata configuration: `vct` is REQUIRED.
  - `credential_signing_alg_values_supported` uses JWS algorithm names.
  - The `credential` in the response is the SD-JWT VC string, not re-encoded.
- **DCQL `meta`** (OpenID4VP B.3.5): `vct_values` is REQUIRED and non-empty. Wallets may return types that inherit from a listed type.
- **Verifier and wallet metadata** (B.3.4): `vp_formats_supported` uses `sd-jwt_alg_values` and `kb-jwt_alg_values`, which hold fully-specified algorithm identifiers.
- **Presentation** (B.3.6): the SD-JWT with the selected disclosures and a Key Binding JWT. The KB-JWT has:
  - `nonce`: the request's `nonce`.
  - `aud`: the full client identifier, or `origin:<origin>` over the DC API.
  - `iat` and `sd_hash`.
  - `transaction_data_hashes`, when `transaction_data` was sent.

```json
{
  "nonce": "n-0S6_WzA2Mj",
  "aud": "x509_san_dns:client.example.org",
  "iat": 1709838604,
  "sd_hash": "Dy-RYwZfaaoC3inJbLslgPvMp09bH-clYP_3qbRqtW4",
  "transaction_data_hashes": ["fOBUSQvo46yQO-wRwXBcGqvnbKIueISEL961_Sjd4do"]
}
```

- **SD-JWT VCLD** (B.3.7): an SD-JWT VC with an optional `ld` claim holding a compact JSON-LD object, such as a W3C VCDM document. `vct`, `iss`, `exp`, `nbf` and `status` are used instead of their VCDM counterparts. It may be used wherever SD-JWT VC is mentioned.

### Base rules from SD-JWT, SD-JWT VC and Token Status List

Section numbers below are RFC 9901, SD-JWT VC draft -19 and Token Status List draft -21. When HAIP is in scope, check them against the revisions HAIP pins (SD-JWT VC -13, Token Status List -14; HAIP § 9.4), which number sections differently.

- **Header and type** (SD-JWT VC § 2.2.1, § 2.2.2): the issuer-signed JWT has `typ` `dc+sd-jwt` and a REQUIRED `vct`, a collision-resistant name for the credential type.
- **Never selectively disclosable** (SD-JWT VC § 2.2.2.3): `iss`, `nbf`, `exp`, `cnf`, `vct`, `vct#integrity`, `aka_vcts` and `status` stay in the issuer-signed payload. `sub` and `iat` may be disclosures. A credential with no disclosable claims has no `_sd` claim and no disclosures (§ 2.2.2.5).
- **Issuer key** (SD-JWT VC § 2.4, § 2.5): verify per RFC 9901 § 7, with the issuer key found through a mechanism the verifier's policy allows for that issuer: JWT VC Issuer Metadata when `iss` is an `https` URL, or the `x5c` chain, whose end-entity subject is then the issuer. Reject the credential if the key cannot be tied to the issuer.
- **Key Binding JWT** (RFC 9901 § 4.3, § 4.3.1): `typ` `kb+jwt`, an `alg` other than `none`, and `iat`, `aud`, `nonce` and `sd_hash`. `sd_hash` is the base64url hash, with the `_sd_alg` algorithm, of `<Issuer-signed JWT>~<Disclosure 1>~...~<Disclosure N>~` as presented. The verifier checks it with the key in the credential's `cnf` (SD-JWT VC § 2.4).
- **Status** (SD-JWT VC § 2.2.2.3, § 2.4; Token Status List § 6.2): `status.status_list` holds `idx` (a non-negative integer) and `uri`. The Status List Token for an SD-JWT VC is a JWT. Check status when present; accepting or rejecting on it is verifier policy.
- **Status List Token** (Token Status List § 5.1, § 8.1): `typ` `statuslist+jwt`, served at `uri` as `application/statuslist+jwt`, with REQUIRED `sub` (equal to the referencing `uri`), `iat` and `status_list` (`bits`, `lst`), and RECOMMENDED `exp` and `ttl`.
- **Status validation** (Token Status List § 8.3, § 7.1):
  1. Validate the credential itself first; an expired credential stays expired even if its status is `0x00` VALID, and an invalid one needs no status fetch.
  2. Validate the Status List Token's signature and claims, check `sub` against `uri`, reject it when expired, and refresh a cached copy after `ttl`.
  3. Decompress `lst` with ZLIB and read the `bits`-wide value at `idx`. An out-of-bounds index means the credential MUST be rejected.
  4. `0x00` is VALID, `0x01` INVALID (revoked) and `0x02` SUSPENDED; `0x03` and `0x0C` to `0x0F` are application specific.

## ISO mdoc (`mso_mdoc`)

- **Issuance** (OpenID4VCI A.2):
  - Issuer metadata configuration: `doctype` is REQUIRED.
  - `credential_signing_alg_values_supported` holds numeric COSE algorithm ids. An IssuerAuth `alg` of `-7` with a P-256 key matches both `-7` and `-9`.
  - The `credential` is the base64url-encoded CBOR `IssuerSigned` structure.
- **DCQL `meta`** (OpenID4VP B.2.3): `doctype_value` is REQUIRED. Claims paths are `[namespace, element]`. A claims query may add `intent_to_retain` (B.2.4).
- **Metadata** (B.2.2):
  - `vp_formats_supported` uses `issuerauth_alg_values` and `deviceauth_alg_values`.
  - For `DeviceMac`, the HMAC identifiers `-65537` to `-65541` map to ECDH with P-256, P-384, P-521, X25519 and X448.
- **Presentation** (B.2.5): each `vp_token` entry is a base64url-encoded `DeviceResponse`. Its device signature or MAC covers a `SessionTranscript` with an OpenID4VP handover (B.2.6):
  - **Redirects** (`OpenID4VPHandover`): the SHA-256 of the CBOR array `[client_id, nonce, jwkThumbprint or null, redirect_uri or response_uri]`. `client_id` includes its prefix.
  - **DC API** (`OpenID4VPDCAPIHandover`): the SHA-256 of `[origin, nonce, jwkThumbprint or null]`. The origin has no `origin:` prefix.
  - `jwkThumbprint` is the RFC 7638 thumbprint of the verifier's encryption key when the response is encrypted, so the verifier can detect re-encryption by a third party.
- **Transaction data** (B.2.1): each transaction data type should define the mdoc data element that returns it. A wallet rejects a type whose data element the issuer did not authorize.

## W3C Verifiable Credentials

- **Issuance** (OpenID4VCI A.1):
  - `credential_definition.type` is REQUIRED. `ldp_vc` and `jwt_vc_json-ld` add `credential_definition.@context`.
  - For `jwt_vc_json`, the `credential` is the JWT, not re-encoded.
  - Data Integrity credentials that do not use JSON-LD canonicalization are not profiled yet (A.1).
- **DCQL `meta`** (OpenID4VP B.1.1): `type_values` is REQUIRED. It is an array of alternatives, each a set of fully expanded type IRIs that must all be present.
- **Claims paths** (B.1.2): paths start at the root of the credential, not the presentation.
- **Holder binding** (B.1): if `require_cryptographic_holder_binding` is true, the wallet returns a Verifiable Presentation. Otherwise it returns the credential alone.
- **Metadata**:
  - `jwt_vc_json` uses `alg_values`.
  - `ldp_vc` uses `proof_type_values` and `cryptosuite_values`.
- **Replay binding** (§14.1.2):
  - `jwt_vc_json`: the VP JWT carries `nonce` and `aud` = client identifier.
  - `ldp_vc`: the proof carries `challenge` = nonce and `domain` = client identifier.

## Holder binding in issuance

- `cryptographic_binding_methods_supported` names how keys are expressed: `jwk`, `cose_key` or `did:<method>` (OpenID4VCI §12.2.4).
- `proof_types_supported` names how the wallet proves possession: `jwt`, `di_vp` or `attestation` (Appendix F).
- The number of credentials returned matches the number of proved keys, unless the issuer issues fewer (§8.3).
- The issuer signs with an algorithm from `credential_signing_alg_values_supported`.
