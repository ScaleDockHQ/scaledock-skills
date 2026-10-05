# Versions and upgrades

Read this when choosing which WebAuthn level to build to, reading code or documentation written for an older level, upgrading, or checking the Level 4 draft. Sources: the Level 1, 2 and 3 Recommendations, the Level 4 First Public Working Draft and the editor's draft, listed in [Sources](../SKILL.md#sources). Level 3 § 18.1 lists its changes since Level 2; Level 4 § 18.1 lists its changes since Level 3. Level 2 has no revision history section, so its changes from Level 1 below come from comparing the two texts.

## Version lines

| Id                | Line             | Status    | Revision                                      | Posture | Summary                                                                                                       |
| ----------------- | ---------------- | --------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `level-4-preview` | WebAuthn Level 4 | preview   | First Public Working Draft, 15 September 2026 | track   | Adds the `remoteClientDataJSON` extension for remote desktop clients and tightens prf outputs.                |
| `level-3`         | WebAuthn Level 3 | current   | W3C Recommendation, 25 August 2026            |         | Passkeys: BE and BS flags, credential records, JSON methods, conditional mediation, related origins, signals. |
| `level-2`         | WebAuthn Level 2 | supported | W3C Recommendation, 8 April 2021              |         | `residentKey`, `crossOrigin`, credProps, largeBlob, enterprise and Apple attestation, `getPublicKey()`.       |
| `level-1`         | WebAuthn Level 1 | legacy    | W3C Recommendation, 4 March 2019              |         | The first Recommendation: `requireResidentKey`, Token Binding in client data, transaction extensions.         |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Level 3 states there have been no substantive changes since its Candidate Recommendation Snapshot of 26 May 2026 (Level 3, Status of this document). The editor's draft at `w3c.github.io/webauthn` carries the Level 4 content, including § 10.1.6 `remoteClientDataJSON`, although its header still says Level 3 Recommendation; treat it as the Level 4 working text.

## Which version to use

- Build Relying Parties to WebAuthn Level 3. Its verification steps (§ 7.1, § 7.2) are a superset of Level 2's, apart from the removed Token Binding check.
- Keep WebAuthn Level 2 behaviour only for a named library or client that lacks a Level 3 feature. Level 3 notes that `getPublicKey()` and `getAuthenticatorData()` only exist from Level 2 on, and RPs SHOULD feature-detect them (Level 3 § 5.2.1.1). Feature-detect conditional mediation with `isConditionalMediationAvailable()` or `getClientCapabilities()` (§ 5.1.3, § 5.1.4).
- Treat WebAuthn Level 1 code as input to an upgrade. The assertion signature is still over the authenticator data concatenated with the SHA-256 hash of the client data in every level (§ 7.2 step 21; Level 1 § 7.2), so stored credential public keys stay usable.
- Follow WebAuthn Level 4 only to see what is coming. Its posture is **track**: emit nothing from it.

## What changed

### WebAuthn Level 4 (draft)

From Level 4 § 18.1:

- Required authenticator extension outputs for the prf extension not to contain cleartext PRF outputs.
- New `remoteClientDataJSON` registration and authentication extension (§ 10.1.6), behind a powerful feature and a policy-controlled feature `publickey-credentials-remote-client-data-json` whose default allowlist is `'none'` and default permission is denied; the permission is per origin and MUST NOT allow all origins.
- Virtual Authenticator commands gained explicit `signCount` handling (testing only).
- Security Considerations are renumbered: Level 3 § 13.4.9 "Validating the origin of a credential" is Level 4 § 13.5.9, because a new § 13.4.1 covers `remoteClientDataJSON`. The § 7.1 and § 7.2 steps are otherwise unchanged.

### WebAuthn Level 3

From Level 3 § 18.1.1 and § 18.1.2:

- New: `toJSON()`, `parseCreationOptionsFromJSON()` and `parseRequestOptionsFromJSON()` (§ 5.1, § 5.1.8, § 5.1.9).
- New: conditional mediation for create and get (§ 5.1.3, § 5.1.4), `getClientCapabilities()` (§ 5.1.7), and the `hybrid` transport (§ 5.8.4).
- New: signal methods `signalUnknownCredential`, `signalAllAcceptedCredentials`, `signalCurrentUserDetails` (§ 5.1.10).
- New: `topOrigin` in client data, create in cross-origin iframes with `publickey-credentials-create` (§ 5.8.1, § 5.9, § 5.10), and related origins with `/.well-known/webauthn` (§ 5.11).
- New: the BE and BS authenticator data flags (§ 6.1, § 6.1.3), `hints` (§ 5.8.8), `attestationFormats` (§ 5.4), the compound attestation format (§ 8.9), and the prf extension (§ 10.1.4).
- New: the credential record concept, and § 7.1 and § 7.2 rewritten around it, with steps for `crossOrigin`, `topOrigin`, BE and BS, credential ID length and `uvInitialized`.
- Changed: `aaguid` is no longer zeroed when attestation is `none` (§ 5.1.3); ESP256, ESP384 and ESP512 keys must be uncompressed (§ 5.8.5); timeout guidance (§ 15.1); the uvm extension is dropped.
- Deprecated: `rp.name` (§ 5.4.1), the Android SafetyNet format (§ 8.5), in-field language and direction metadata (§ 6.4.2); `tokenBinding` is `[RESERVED]` (§ 5.8.1); COSE algorithms -9, -51, -52 and -19 are NOT RECOMMENDED in `pubKeyCredParams` (§ 5.4).
- § 7.1 now checks the origin against "an origin expected by the Relying Party" instead of "the Relying Party's origin", and allows a registration without UP under conditional mediation (§ 7.1 steps 9 and 15).

### WebAuthn Level 2

Compared with the Level 1 text:

- `authenticatorSelection.residentKey` with `discouraged`, `preferred` and `required` (Level 2 § 5.4.4, § 5.4.6). `requireResidentKey` is kept for Level 1 compatibility, and RPs SHOULD set it to true if, and only if, `residentKey` is `required`.
- `enterprise` attestation conveyance (Level 2 § 5.4.7), and the Apple Anonymous format (Level 2 § 8.8).
- `crossOrigin` in client data and the `publickey-credentials-get` permissions policy for cross-origin iframes (Level 2 § 5.8.1, § 5.9, § 5.10).
- `getTransports()`, `getAuthenticatorData()`, `getPublicKey()` and `getPublicKeyAlgorithm()` on the attestation response (Level 2 § 5.2.1).
- New extensions appidExclude, credProps and largeBlob (Level 2 § 10.2, § 10.4, § 10.5); the Level 1 txAuthSimple, txAuthGeneric, authnSel, exts, uvi, loc and biometricPerfBounds extensions are gone.
- § 7.1 and § 7.2 now start by building the options and calling `create()` or `get()`; § 7.1 RECOMMENDS storing the `getTransports()` value, and § 7.2 says each `allowCredentials` item SHOULD carry it (Level 2 § 7.1, § 7.2). Level 1 started from an already received response (Level 1 § 7.1, § 7.2).

### WebAuthn Level 1

- The first Recommendation. `AuthenticatorSelectionCriteria` has a boolean `requireResidentKey` (Level 1 § 5.4.4), client data is at § 5.10.1 and includes `tokenBinding`, and § 7.1 and § 7.2 verify Token Binding status (Level 1 § 7.1).

## Upgrading

### WebAuthn Level 2 to WebAuthn Level 3

1. Change the version marker: there is none on the wire. Update the libraries and the documentation that cite Level 2.
2. Replace removed or renamed behaviour:
   - Server: drop the `C.tokenBinding` check; it is `[RESERVED]` (§ 5.8.1).
   - Server: add the `crossOrigin` and `topOrigin` checks (§ 7.1 steps 10 and 11; § 7.2 steps 13 and 14).
   - Server: add the BE and BS checks and store `backupEligible` and `backupState` (§ 7.1 steps 17 to 19; § 7.2 steps 18 and 19). Records created earlier have no `backupEligible`, and Level 3 defines no migration for them: decide one explicitly (for example, record the BE value of the next assertion) before enforcing § 7.2 step 19 on them.
   - Server: add `uvInitialized` to the record and set it to false for existing credentials, so the UV flag is not relied on until § 7.2 step 24 initializes it, which SHOULD require an additional factor equivalent to user verification (§ 4, Credential Record).
   - Server: reject credential IDs over 1023 bytes, and fail registration of a credential ID already registered to any user rather than replacing it (§ 7.1 steps 25 and 26).
   - Server: stop reading `aaguid` as zero when attestation is `none`; Level 3 clients may send the real AAGUID (§ 5.1.3).
   - Options: keep `rp.name` (still required) but MAY set it to the RP ID (§ 5.4.1); add `hints` and keep `authenticatorAttachment` in line with them (§ 5.8.8); drop -9, -51, -52 and -19 from `pubKeyCredParams` in favour of -7, -35, -36 and -8 (§ 5.4).
   - Client: replace hand-written base64url conversion with `parseCreationOptionsFromJSON()`, `parseRequestOptionsFromJSON()` and `toJSON()` where available (§ 5.1.8, § 5.1.9, § 5.1).
3. Validate against the target: run the Verify list in `SKILL.md`.
4. Keep behaviour unchanged: credentials registered under Level 2 still authenticate; nothing in the upgrade re-registers a user.

### WebAuthn Level 1 to WebAuthn Level 2

1. Change the version marker: none on the wire; update the libraries.
2. Replace removed or renamed behaviour:
   - Options: set `residentKey`, and set `requireResidentKey` to true only when `residentKey` is `required` (Level 2 § 5.4.4).
   - Server: store `getTransports()` with the credential and send it back in `allowCredentials` (Level 2 § 7.1, § 7.2).
   - Server: remove uses of the Level 1 transaction and selection extensions; they are not in Level 2.
3. Validate against the target: run the Level 2 § 7.1 and § 7.2 steps.
4. Keep behaviour unchanged: existing credentials and their sign counts stay valid.

### WebAuthn Level 1 to WebAuthn Level 3

Apply the two checklists above in order. The changes that matter most are dropping Token Binding, adding `residentKey` and discoverable-credential flows, storing transports, BE, BS and `uvInitialized` in a credential record, and validating `crossOrigin` and `topOrigin`. Validate the result against the Level 3 Verify list in `SKILL.md`.

## Preview: WebAuthn Level 4

The First Public Working Draft of 15 September 2026 lives at `https://www.w3.org/TR/webauthn-4/`; the editor's draft has the same content. Posture: **track**. Do not request `remoteClientDataJSON`, do not rely on the Level 4 prf output rule, and do not cite Level 4 section numbers in Level 3 code. Watch Level 4 § 18.1 for further changes. When Level 4 becomes a Recommendation: make it current, make Level 3 supported, move Level 2 to legacy if the Working Group supersedes it, and add an upgrade section.
