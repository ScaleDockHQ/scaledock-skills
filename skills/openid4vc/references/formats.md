# Credential formats in OpenID4VCI and OpenID4VP

OpenID4VCI 1.0 and OpenID4VP 1.0 are format-agnostic. Appendix A of OpenID4VCI and Appendix B of OpenID4VP define profiles for three families. This file covers only what those appendices say. The credential formats themselves are defined elsewhere: IETF SD-JWT VC (a draft; HAIP pins draft -13), ISO/IEC 18013-5 and 23220, and the W3C VC Data Model.

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
