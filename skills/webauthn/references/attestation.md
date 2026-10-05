# Attestation

Read this when deciding whether to request attestation, verifying an attestation statement, or setting a trust policy for authenticator models. Section numbers refer to WebAuthn Level 3; "§ 7.1 step N" counts the numbered steps of § 7.1.

## Do you need it?

- Attestation lets the RP derive assurances about the authenticator, such as its model or how it protects keys, but on its own it cannot show that the attestation object came from the authenticator the user intended rather than a man in the middle; TLS and related protections still carry that (§ 13.4.4, non-normative).
- With self attestation or none, no provenance is provided and the authenticator gives the RP no guarantees about its operation (§ 6.5).
- The authenticator chooses the format and type; the RP only signals preferences with `attestation` and `attestationFormats` (§ 6.5).
- Attestation certificates can track users or link identities; batch attestation and Anonymization CAs mitigate this (§ 14.4.1).

## Conveyance preference (§ 5.4.7)

| Value        | Meaning                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`       | Default. The RP does not want attestation. The client replaces any non-self attestation with a `none` statement; unknown values fall back to this.                                                        |
| `indirect`   | The RP wants a verifiable statement but lets the client decide how; the client MAY substitute an Anonymization CA statement. A verifiable statement is not guaranteed.                                    |
| `direct`     | The RP wants the statement as the authenticator generated it.                                                                                                                                             |
| `enterprise` | The RP wants an enterprise attestation that may uniquely identify the authenticator. User agents MUST NOT provide it unless user agent or authenticator configuration permits it for the requested RP ID. |

With `none`, Level 3 clients keep a self attestation (packed, all-zero AAGUID, no `x5c`) as is, and otherwise set `fmt` to `none` and `attStmt` to an empty map. Unlike Level 2, they no longer zero the AAGUID (§ 5.1.3; § 18.1.1). For `direct` or `enterprise` the client conveys the AAGUID and statement unaltered (§ 5.1.3).

`attestationFormats` is an advisory, ordered list of format identifiers; the authenticator MAY use a format not on it (§ 5.4).

## Attestation types (§ 6.5.3)

- **Basic** (batch): the attestation key pair is shared by a model or batch of authenticators.
- **Self**: no attestation key; the credential private key signs the statement.
- **AttCA**: a TPM-based authenticator gets per-credential AIK certificates from an Attestation CA.
- **AnonCA**: an Anonymization CA issues per-credential certificates that do not identify the authenticator.
- **None**: no attestation information.

Basic, AttCA and AnonCA use the same data structure, so they are distinguishable only with external knowledge about the certificates (§ 6.5.3).

## Formats (§ 8)

Format identifiers are matched case-sensitively, are at most 32 printable US-ASCII characters, and SHOULD be registered in the IANA "WebAuthn Attestation Statement Format Identifiers" registry (§ 8.1). Each format's verification procedure takes `attStmt`, `authenticatorData` and `clientDataHash` and returns an error or the attestation type and trust path (§ 6.5.2).

| `fmt`               | Types              | Verification essentials                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packed`            | Basic, Self, AttCA | With `x5c`: verify `sig` over `authenticatorData` concatenated with `clientDataHash`, using the first certificate's key and `alg`, check § 8.2.1 certificate requirements, and if the certificate has the `id-fido-gen-ce-aaguid` extension it must match `aaguid`. Without `x5c`: self attestation; `alg` must match the credential key and `sig` verifies with the credential key (§ 8.2). |
| `tpm`               | AttCA              | The `pubArea` key equals the credential public key, `certInfo` integrity is verified, `x5c` is present and the AIK certificate meets § 8.3.1 (§ 8.3).                                                                                                                                                                                                                                        |
| `android-key`       | Basic              | `sig` verifies with the first `x5c` certificate; that certificate's key equals the credential key; `attestationChallenge` equals `clientDataHash`; `allApplications` is absent; origin is `KM_ORIGIN_GENERATED` and purpose `KM_PURPOSE_SIGN`, using only `teeEnforced` if only TEE keys are acceptable (§ 8.4).                                                                             |
| `android-safetynet` | Basic              | Deprecated, expected to be removed (§ 8.5).                                                                                                                                                                                                                                                                                                                                                  |
| `fido-u2f`          | Basic, AttCA       | `x5c` has exactly one P-256 EC certificate; `sig` verifies over the concatenation of `0x00`, `rpIdHash`, `clientDataHash`, `credentialId` and the uncompressed `publicKeyU2F` (§ 8.6).                                                                                                                                                                                                       |
| `none`              | None               | Returns type None and an empty trust path (§ 8.7).                                                                                                                                                                                                                                                                                                                                           |
| `apple`             | AnonCA             | SHA-256 of `authenticatorData` concatenated with `clientDataHash` equals the extension OID 1.2.840.113635.100.8.2 in `credCert`, and the credential key equals `credCert`'s key (§ 8.8).                                                                                                                                                                                                     |
| `compound`          | Any                | An array of at least two non-compound statements; verify each, and RP policy decides how many must pass (§ 8.9).                                                                                                                                                                                                                                                                             |

Follow the full procedure in the cited section; the table is a checklist, not a replacement.

## Trust decision (§ 7.1 steps 21 to 24)

1. Match `fmt` against the formats the RP supports (step 21).
2. Run the format's verification procedure (step 22).
3. Get acceptable trust anchors for that type and format from a trusted source or policy. The FIDO Metadata Service is one way, using the `aaguid` (step 23).
4. Assess trustworthiness (step 24): None and Self must each be acceptable under RP policy; otherwise the trust path must chain to an acceptable root, or be an acceptable certificate itself.
5. If the statement is not trustworthy, the RP SHOULD fail registration. Policy MAY instead register the credential and treat it as self attestation, accepting there is no proof of the authenticator model.

If certificates are used, the RP MUST have access to certificate status information for intermediate CAs, and MUST be able to build the chain when the client did not supply it (§ 7.1).

## Revocation (§ 13.4.5)

If an intermediate attestation CA is revoked and policy requires rejecting such attestations, it is RECOMMENDED to also un-register, or downgrade to self-attestation trust, credentials registered after the compromise date that chain to that CA. To make that possible, it is RECOMMENDED to remember intermediate attestation CA certificates at registration. Store `attestationObject` and `attestationClientDataJSON` in the credential record to re-verify later (§ 4, Credential Record).

## Common mistakes

- Requesting `direct` attestation with no trust anchors or policy to evaluate it.
- Treating a `packed` statement without `x5c` as Basic attestation; it is self attestation (§ 8.2).
- Expecting a zero AAGUID under `none`; Level 3 clients send the real one (§ 5.1.3).
- Relying on attestation alone to defeat a man in the middle during registration (§ 13.4.4).
