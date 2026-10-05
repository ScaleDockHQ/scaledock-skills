# Issuance and presentation

Read this when building or reviewing how a Wallet Unit obtains a PID or attestation, or how it presents attributes to a Relying Party. Sources: ARF 3.0.0 chapters 4, 5 and 6 and Annex 2 Topics 1, 6, 9, 10, 43, 44 and 52; see [Sources](../SKILL.md#sources). Protocol details (OpenID4VCI, OpenID4VP, HAIP, ISO/IEC 18013-5 and 18013-7, ETSI TS 119 472-3, Technical Specification 3) are referenced by the ARF and were not re-read for this skill; use the `openid4vc` and `sd-jwt` skills for the protocol layer.

## Common rules

- Only algorithms from the ECCG Agreed Cryptographic Mechanisms v2.0, for issuance, presentation and verification (`OIA_03`).
- Selective disclosure is supported for every PID and attestation (`OIA_07`), and the Wallet Unit can prove device binding in SD-JWT VC or ISO/IEC 18013-5 form (`OIA_02`).

## Issuance

**Protocol.** OpenID4VCI profiled by HAIP Sections 4 and 6, plus Technical Specification 3 (`ISSU_01`, `ISSU_01a`; § 5.8). Wallet Units and issuers also support the W3C Digital Credentials API for issuance (`ISSU_03`). The Wallet Unit reaches a service supply point by QR code, NFC tag or a preconfigured list; there is no central discovery (§ 6.6.2.2).

**Checks, in order (§ 6.6.2):**

1. **Wallet Unit authenticates the issuer** (§ 6.6.2.2). The issuer signs its Credential Issuer metadata (OpenID4VCI § 12.2.3) with its access certificate key and puts the access certificate and intermediates in `x5c` (`ISSU_22`, `ISSU_32`). The Wallet Unit validates the chain against the Access CA LoTE, and only that LoTE (`ISSU_23`, `ISSU_24`, `ISSU_34`). On failure it warns the User and does not request issuance.
2. **Wallet Unit checks entitlements** (§ 6.6.2.3). The registration certificate in the metadata must be well-formed, signed by a trust anchor from the LoTE of Providers of registration certificates (`ISSU_23c`), unexpired and unrevoked, and carry the same provider identifier and Service identifier as the access certificate. For a PID, `entitlement` and `providesAttestations` must show a registered PID Provider for PIDs (`ISSU_24a`, `ISSU_24b`). This verification applies 24 months after the amended CIR 2024/2982 enters into force.
3. **Issuer validates the Wallet Unit** (§ 6.6.2.4). It verifies the WIA, and the KA for PIDs and device-bound attestations, against the Wallet Provider LoTE (`ISSU_21`, `ISSU_30`, `ISSU_30a`), verifies the KA per OpenID4VCI Appendix F.4 (`WUA_11a`), checks the KA is bound to this issuance by a nonce, and binds the new credential to a KA public key (`WUA_09a`). PID Providers may accept only some Wallet Solutions; Attestation Providers must accept all of them (§ 6.6.2.4.1). Issuers state the key storage and User authentication level they need in metadata (OpenID4VCI § 12.2.4, Appendix D.2; `ISSU_27d`).
4. **Issuer checks Wallet Unit revocation** using the WIA and KA references (§ 6.6.2.5; `ISSU_21`).
5. **Wallet Unit verifies the result** (§ 6.6.2.6). It checks the credential matches the request and its signature, shows the contents and the issuer's identity from its access certificate, and stores it only with User approval (`ISSU_11`). It then discloses the new attestation type to the DC API framework unless the User turned that off (`OIA_08e`, `OIA_08f`).
6. **PID activation** (§ 6.6.2.7). A newly issued PID is activated per CIR 2015/1502 § 2.2.2 before use (`ISSU_05`). The ARF does not prescribe the mechanism.

**Batch issuance and re-issuance.** A batch holds technical credentials with the same type, values and technical validity (§ 6.6.2.9). The re-use method (A to D) comes from `credential_reuse_policy`; see [`credentials-and-formats.md`](credentials-and-formats.md). After re-issuance the Wallet Unit compares attribute values and tells the User about differences (`ISSU_59`).

### Embedded disclosure policies (§ 6.6.2.8; Topic 43)

- For attestations with an embedded disclosure policy, the Regulation requires wallets to inform the User whether the requesting party has permission to access the attestation (Art. 5a(5)(e)). The ARF applies them to QEAAs, PuB-EAAs and non-qualified EAAs, not PIDs (`EDP_01`).
- CIR 2024/2979 Annex III defines three types: **No policy** (the default), **Authorised relying parties only**, and **Specific root of trust**. Wallet Units support the last two (`EDP_02`, `EDP_03`); the authorised list uses Relying Party identifier and Service identifier pairs.
- The format follows ETSI TS 119 472-3 (`EDP_08`). The policy is delivered by value in the Credential Issuer metadata (`EDP_09`), and the Wallet Unit stores it at issuance (`EDP_10`). Adding, changing or deleting a policy means revoking the attestation (`EDP_11`).
- At presentation the Wallet Unit evaluates the policy against the registration certificate (`EDP_06`) and lets the User decide based on the outcome (`EDP_07`). A policy should link to a plain-language explanation, which the Wallet Unit shows (`EDP_05`).

## Presentation flows (§ 4.4, § 5.7)

| Flow                            | Channel set-up                                          | Protocol                                                                         | Rules                          |
| ------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| Proximity, supervised or not    | QR code or NFC engagement, then NFC, BLE or Wi-Fi Aware | ISO/IEC 18013-5 (mdoc only)                                                      | `OIA_01`                       |
| Remote, DC API                  | W3C Digital Credentials API in browser or OS            | OpenID4VP + HAIP § 5, 5.2, 5.3.x, § 6 profile, § 7–8; or ISO/IEC 18013-7 Annex C | `OIA_08`, `OIA_08a`, `OIA_08b` |
| Remote, redirects               | Custom URI scheme                                       | OpenID4VP + HAIP § 5, 5.1, 5.3.x, § 6 profile, § 7–8                             | `OIA_03b`, `OIA_03c`           |
| Remote, ISO/IEC 18013-7 Annex A | Custom URI scheme                                       | ISO/IEC 18013-7 Annex A                                                          | `OIA_03d` (MAY)                |

- Wallet Units support all of OIA_08–OIA_08b and OIA_03b–OIA_03c (`OIA_01a`). The DC API is mandatory for Wallet Units, though still a W3C Working Draft; Relying Parties may still use custom URI schemes (§ 4.4.3.3.1).
- Wallet Units should not support redirects for **cross-device** flows (`OIA_08c`); a Relying Party that does must mitigate phishing, relay, session-binding and origin problems (`OIA_08d`; § 4.4.3.2).
- Cross-device DC API flows use the CTAP hybrid flow with a BLE proximity check; the check is mandatory (`OIA_08g`), and a fully local CTAP 2.3 transport is preferred over the tunnel (§ 4.4.3.3.3, § 4.4.3.5).
- The DC API framework sees only attestation types, never attributes or values (`OIA_08e`). The Wallet Unit, not the browser or OS, handles User approval (§ 4.4.3.3.2; `RPA_07a`).
- Remote responses are encrypted so only the Relying Party Instance can read them (`OIA_09`).
- SD-JWT VC and W3C VCDM cannot be used in ISO/IEC 18013-5 proximity (§ 5.4.3, § 5.4.4).

## Wallet Unit side of a presentation (§ 6.6.3.2–§ 6.6.3.5)

1. **Authenticate the Relying Party Instance** (`RPA_01`–`RPA_04`). The request carries the access certificate and intermediates and is signed with its key. The Wallet Unit verifies the signature, validates the chain to an Access CA LoTE trust anchor, and checks every certificate's revocation by CRL or OCSP, caching CRLs for offline use. On failure it tells the User the request is not trustworthy and either stops or lets the User choose (`RPA_05`, `RPA_06a`); the Wallet Provider decides which per failure reason.
2. **Check the registration certificate** (§ 6.6.3.3). Verify format, signature and validity (`RPRC_17`), identifier and Service identifier equality with the access certificate (`RPRC_17a`), and that every requested attribute is registered (`RPRC_21`). On failure warn the User; the Wallet Provider's policy decides whether to allow all, only registered, or no attributes (`RPRC_21`).
3. **Evaluate any embedded disclosure policy** (§ 6.6.3.4; `EDP_06`).
4. **Get User approval** (§ 6.6.3.5). Authenticate the User first (`RPA_08`). Show the RP and Service trade names and the requested attributes (`OIA_05`, `RPA_06`), the intended use and privacy policy link (`RPA_10`), and the outcomes of steps 2 and 3. Require explicit approval after any certificate warning and for the PID `portrait` (`RPA_07b`, `RPA_07c`). The User can always refuse an attribute (`RPA_07`); a refused attestation is treated as if it did not exist (`RPA_11`). With several matching PIDs or attestations, ask the User which one (`OIA_10`, `OIA_11`).
5. **Respond** with only the approved attributes (§ 6.6.3.2).

## Relying Party side (§ 6.6.3.6–§ 6.6.3.12)

1. **Authenticity**: validate the signature with the right list: PID Provider LoTE (`OIA_12`), QEAA Trusted List under Art. 22 (`OIA_13`), PuB-EAA Provider LoTE (`OIA_14`), the Rulebook's mechanism for non-qualified EAAs (`OIA_15`). Support both list formats and refresh them (`OIA_15a`, `OIA_15b`).
2. **Revocation**: see [`credentials-and-formats.md`](credentials-and-formats.md) (`VCR_12`–`VCR_15`).
3. **Device binding**: should verify the device-binding signature or MAC (`OIA_17`). OpenID4VP's `require_cryptographic_holder_binding` asks for it, and a Wallet Unit then cannot return a non-device-bound attestation (§ 6.6.3.8).
4. **User binding, combined presentations, issuer checks on the Wallet Unit** (§ 6.6.3.9–§ 6.6.3.12).
5. **Discard unique elements and timestamps** once no longer needed (`OIA_16`). Do not retain the portrait unless the law allows it (`PID_03a`).
6. KAs and WIAs never reach the Relying Party (`WUA_07`, `WUA_24`). An RP that checks PID revocation implicitly checks the Wallet Unit (§ 6.6.2.5).

The Wallet Unit also lets the User report suspicious requests to a DPA and ask a Relying Party to erase data (§ 6.6.3.13; Art. 5a(4)(d), Art. 5a(5)(a)(ix)–(x)).

## Intermediaries (§ 6.6.5; Topic 52)

1. The intermediary registers as a Relying Party and gets its own access certificates; under the amended CIR 2025/848 Annex IV 3(k) these carry an association to the intermediated Relying Party.
2. The intermediated Relying Party's registration certificates name the intermediary in `usesIntermediary` (identifier and Service identifier).
3. The intermediary sends its own access certificate and the intermediated party's registration certificate (`RPI_05`).
4. The Wallet Unit checks that `usesIntermediary` matches the access certificate, and shows only the intermediated Relying Party's and Service's trade names (`RPI_07`).
5. The intermediary performs the agreed verifications and forwards attributes only to the intermediated Relying Party (`RPI_08`), storing nothing about the transaction content (Art. 5b(10)). The interface between them is out of scope of the ARF.
