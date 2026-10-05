# Passkeys, flags and counters

Read this when deciding what a passkey is for the RP, interpreting authenticator data flags, using backup eligibility and backup state, handling signature counters, or tailoring UI with hints and client capabilities. Section numbers refer to WebAuthn Level 3.

## Terms (§ 4, § 6.2)

- **Passkey** is a synonym for a client-side discoverable credential: one usable with an empty `allowCredentials`, so the RP need not identify the user first. "Resident key" and "resident credential" are deprecated names for the same thing, kept in `residentKey` and `requireResidentKey` (§ 4).
- **Multi-device credential**: backup eligible (BE = 1); the use cases call it a "synced passkey". **Single-device credential**: not backup eligible; the use cases call these "device-bound passkeys" (§ 4; § 1.2.1; § 1.2.2).
- **Backed up**: the credential source may be present on an authenticator other than the one that generated it, through sync, import or export (§ 4).
- **Passkey platform authenticator** and **passkey roaming authenticator**: support discoverable credentials and user verification, so they give passwordless multi-factor authentication (§ 6.2). A passkey platform authenticator may be reached locally (`internal`) or over `hybrid` (§ 6.2).
- **User presence** is a test such as a touch; it is not user verification. **User verification** is local authorization by PIN, password or biometric; it tells the RP that the same user performed each verified ceremony with that credential, not who the user is (§ 4).

## Authenticator data (§ 6.1)

| Bytes    | Field                    | Notes                                                                              |
| -------- | ------------------------ | ---------------------------------------------------------------------------------- |
| 32       | `rpIdHash`               | SHA-256 of the RP ID the credential is scoped to.                                  |
| 1        | `flags`                  | Bit 0 UP, bit 2 UV, bit 3 BE, bit 4 BS, bit 6 AT, bit 7 ED; bits 1 and 5 RFU.      |
| 4        | `signCount`              | 32-bit unsigned big-endian.                                                        |
| variable | `attestedCredentialData` | Present only when AT is set, which it is for attestation and never for assertions. |
| variable | `extensions`             | CBOR map, present when ED is set.                                                  |

Authenticator data is at least 37 bytes. UP is set if, and only if, the authenticator tested presence; UV if, and only if, it performed user verification (§ 6.1). Attested credential data holds the 16-byte `aaguid`, a 2-byte length (at most 1023), the credential ID and the COSE_Key public key, which MUST contain `alg` (§ 6.5.1).

## Backup eligibility and backup state (§ 6.1.3)

| BE  | BS  | Meaning                                                        |
| --- | --- | -------------------------------------------------------------- |
| 0   | 0   | Single-device credential.                                      |
| 0   | 1   | Not allowed: fail the ceremony (§ 7.1 step 17; § 7.2 step 18). |
| 1   | 0   | Multi-device credential, not currently backed up.              |
| 1   | 1   | Multi-device credential, currently backed up.                  |

- BE is set at creation and MUST NOT change; BS may change over time. An authenticator unsure of the backup SHOULD NOT set BS (§ 6.1; § 6.1.3).
- It is RECOMMENDED that RPs store the latest values with the account (§ 6.1.3). The credential record keeps `backupEligible` from registration and updates `backupState` on each assertion (§ 7.2 step 24).
- If the RP uses backup state, an assertion whose BE differs from the stored `backupEligible` fails (§ 7.2 step 19).

Uses from the spec's non-exhaustive list (§ 6.1.3):

- **BE = 0**: the credential is not resilient to device loss. RPs SHOULD ensure the account has additional authenticators or an account recovery process.
- **BS 0 to 1**: the credential is now protected from single device loss; the RP MAY prompt the user to remove their password.
- **BS 1 to 0**: no longer backed up; the RP SHOULD guide the user to validate other factors, and SHOULD help a user with no other credential add one.

## Signature counter (§ 6.1.1; § 7.2 step 22)

- Authenticators SHOULD implement a counter, per credential (SHOULD) rather than global. Authenticators without one leave `signCount` at zero.
- The RP stores the counter from the most recent assertion, or from registration.
- If either the stored or the new value is non-zero and the new value is less than or equal to the stored one, a cloned authenticator may exist, the authenticator may be malfunctioning, or assertions may be processed out of order. This is a signal, not proof; how to react is RP-specific risk scoring.

## User verification state (§ 4, Credential Record)

- `uvInitialized` records whether the credential has had the UV flag set; registration initializes it from UV (§ 7.1 step 27).
- When it is true, the RP MAY treat UV as an authentication factor, for example skipping a password prompt even when UV was not required.
- When it is false, including the ceremony that would set it true, UV MUST NOT be relied on as a factor, and setting it SHOULD require another factor equivalent to user verification (§ 7.2 step 24).

## Credential loss (§ 13.4.6)

WebAuthn defines no protocol to back up or share private keys. RPs SHOULD let and encourage users to register several credentials, and SHOULD use `excludeCredentials` and `user.id` so they are bound to different authenticators.

## Attachment, hints and capabilities

- `PublicKeyCredential.authenticatorAttachment` reports `platform` or `cross-platform` for the completed ceremony; RPs SHOULD treat unknown values as null. A `cross-platform` result while `isUserVerifyingPlatformAuthenticatorAvailable()` is true is a chance to offer registering the platform authenticator (§ 5.1).
- Transports (§ 5.8.4): `usb`, `nfc`, `ble`, `smart-card`, `hybrid`, `internal`. RPs SHOULD accept and store unknown values returned by `getTransports()` (§ 5.2.1).
- Hints (§ 5.8.8): `security-key`, `client-device`, `hybrid`, most preferred first; they do not bind the user agent. In creation options, pair `security-key` and `hybrid` with `authenticatorAttachment: "cross-platform"`, and `client-device` with `platform`, for older user agents (SHOULD).
- `getClientCapabilities()` (§ 5.1.7; § 5.8.7) returns booleans for `conditionalCreate`, `conditionalGet`, `hybridTransport`, `passkeyPlatformAuthenticator`, `userVerifyingPlatformAuthenticator`, `relatedOrigins`, `signalAllAcceptedCredentials`, `signalCurrentUserDetails`, `signalUnknownCredential`, and `extension:<id>` keys. A missing key means unknown, not unsupported. An `extension:` key that is true does not mean the authenticator will process the extension (MUST NOT assume so).

## Common mistakes

- Treating BE = 1 as proof the credential is backed up; that is BS (§ 6.1.3).
- Treating a passkey as device-bound because registration happened on one device; check BE (§ 6.1.3).
- Locking an account on the first counter regression without considering out-of-order processing (§ 6.1.1).
- Relying on UV as a second factor before `uvInitialized` is true (§ 4, Credential Record).
