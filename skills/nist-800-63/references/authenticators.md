# Authenticators and verifiers (SP 800-63B-4)

Read this when choosing authenticators for an AAL, writing a password policy, or adding MFA, passkeys, OTP or SMS. Sections cite SP 800-63B-4 unless noted. Source: [SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html).

## Authentication assurance levels (§ 2)

| Aspect                | AAL1 (§ 2.1)                                   | AAL2 (§ 2.2)                                                                                                                      | AAL3 (§ 2.3)                                                                            |
| --------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Factors               | Single- or multi-factor; MFA SHOULD be offered | Two factors: a multi-factor authenticator, or a physical authenticator plus a password or biometric                               | Multi-factor cryptographic, or single-factor cryptographic plus a password or biometric |
| Permitted types       | Any of the seven types                         | MF out-of-band, MF OTP, MF cryptographic; or look-up secret, out-of-band, SF OTP or SF cryptographic plus a password or biometric | Cryptographic only, with a **non-exportable** private key                               |
| Replay resistance     | Not required                                   | At least one authenticator SHALL be replay-resistant                                                                              | SHALL                                                                                   |
| Phishing resistance   | Not required                                   | Verifiers SHALL offer at least one phishing-resistant option; federal staff SHALL use one                                         | SHALL                                                                                   |
| Authentication intent | Not required                                   | SHOULD                                                                                                                            | SHALL, on every authentication and reauthentication                                     |
| Syncable passkeys     | Allowed                                        | Allowed (Appendix B)                                                                                                              | SHALL NOT be used                                                                       |
| Overall timeout       | SHALL be set; SHOULD be ≤ 30 days              | SHALL be set; SHOULD be ≤ 24 hours                                                                                                | SHALL be ≤ 12 hours                                                                     |
| Inactivity timeout    | Optional                                       | SHOULD be ≤ 1 hour                                                                                                                | SHOULD be ≤ 15 minutes                                                                  |

- Federal agencies SHALL select at least AAL2 when personal information is made available online (§ 2).
- Fraud indicators such as geolocation or IP address range MAY add risk-based controls. They SHALL be assessed for efficacy and included in the privacy risk assessment, and they never change the AAL or replace a factor (§ 2).
- All communication between claimant and verifier SHALL use an authenticated protected channel, and authenticators SHALL use approved cryptography (§ 2.1.2, § 2.2.2, § 2.3.2).
- FIPS 140 requirements:
  - Federal verifiers need FIPS 140 Level 1 at every AAL (§ 2.1.2, § 2.2.2, § 2.3.2).
  - Cryptographic authenticators procured by federal agencies need Level 1 at AAL2 (§ 2.2.2).
  - AAL3 authenticators need Level 1 or higher overall (§ 2.3.2).
- A biometric is never an authenticator on its own. It counts only together with a physical authenticator, and local comparison is preferred (§ 2.2.1, § 3.2.3).

## Passwords (§ 3.1.1)

Passwords are "something you know". They are **not phishing-resistant** (§ 3.1.1) and **not replay-resistant** (§ 3.2.7).

| Rule               | Requirement                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Source             | Chosen by the subscriber or assigned randomly by the CSP (§ 3.1.1.1)                                                                                                                                                                                                                                   |
| Minimum length     | **15** characters when used as a single factor; **8** when used only within MFA (§ 3.1.1.2)                                                                                                                                                                                                            |
| Maximum length     | SHOULD allow at least 64 characters                                                                                                                                                                                                                                                                    |
| Characters         | SHOULD accept all printing ASCII, the space character and Unicode. Each Unicode code point counts as one character (SHALL)                                                                                                                                                                             |
| Composition rules  | SHALL NOT be imposed, for example required mixes of character types (§ 3.1.1.1, § 3.1.1.2)                                                                                                                                                                                                             |
| Periodic change    | SHALL NOT be required. SHALL force a change on evidence of compromise                                                                                                                                                                                                                                  |
| Hints              | SHALL NOT be stored where an unauthenticated claimant can read them                                                                                                                                                                                                                                    |
| Security questions | SHALL NOT prompt for knowledge-based authentication or security questions                                                                                                                                                                                                                              |
| Verification       | SHALL request the full password and verify all of it, with no truncation. SHOULD apply NFC normalization before hashing                                                                                                                                                                                |
| Blocklist          | On set or change, SHALL compare the **entire** password against known common, expected or compromised values (breach corpuses, dictionary words, context words such as the service name or username). On a match, SHALL require another password and give the reason                                   |
| Guidance           | SHALL offer guidance on choosing a strong password, especially after a blocklist rejection                                                                                                                                                                                                             |
| Rate limiting      | SHALL limit failed attempts (§ 3.2.2)                                                                                                                                                                                                                                                                  |
| Password managers  | SHALL allow password managers and autofill. SHOULD allow paste. SHOULD offer an option to show the password                                                                                                                                                                                            |
| Typo tolerance     | MAY trim leading and trailing whitespace or accept a differently cased first character, if the result is still long enough                                                                                                                                                                             |
| Transport          | SHALL use approved encryption over an authenticated protected channel                                                                                                                                                                                                                                  |
| Storage            | SHALL be salted and hashed with a password hashing scheme that takes a salt and a cost factor. The salt SHALL be at least 32 bits. Store the salt and hash; SHOULD store the scheme and cost reference. Cost SHOULD be as high as practical and increased over time. SP 800-132 schemes SHOULD be used |
| Pepper             | SHOULD add a keyed hash or encryption with a secret key from an approved random bit generator, stored separately from the hashes, ideally in an HSM or TEE                                                                                                                                             |

Appendix A explains the rationale: length matters more than complexity, and composition rules push users toward predictable patterns.

## Other authenticator types

### Look-up secrets (§ 3.1.2)

- Generated by an approved random bit generator; at least 6 decimal digits; each secret used once; stored hashed.
- Secrets shorter than 112 bits SHALL be salted and password-hashed.
- Failed attempts SHALL be rate-limited.
- Online delivery requires an AAL2 session and the post-enrollment binding rules.
- Not phishing-resistant.

### Out-of-band devices (§ 3.1.3)

- Not phishing-resistant.
- The secret SHALL be transferred between the channels, from the device to the primary channel or the other way round. **Compare-and-approve push is no longer acceptable**, because of authentication-fatigue attacks. Showing a short list of secrets to pick from is not enough either (§ 3.1.3, § 3.1.3.1).
- **Email SHALL NOT be used** for out-of-band authentication. This does not cover confirmation codes and recovery codes, which are not authentication (§ 3.1.3.1).
- The secret is valid for at most **10 minutes**, accepted once, at least 6 digits, and generated by an approved random bit generator. Below 64 bits, failures SHALL be rate-limited, and issuing a new secret SHALL NOT reset the failure count. Push notifications SHOULD be rate-limited (§ 3.1.3.2).
- **PSTN (SMS and voice) is a restricted authenticator** (§ 3.1.3.3, § 3.2.9):
  - Setting or changing the phone number counts as binding a new authenticator (§ 4.1.2).
  - Verifiers SHALL make alternative authenticator types available.
  - Verifiers SHOULD check risk indicators such as SIM change, number porting or device swap before sending.
- **Restricted authenticators** (§ 3.2.9): the CSP SHALL offer an unrestricted alternative at the same AAL, give meaningful notice of the risk, address the risk in its assessment, and keep a migration plan in its DIAS.
- Multi-factor out-of-band (§ 3.1.3.4) requires an activation factor on every use.

### OTP (§ 3.1.4, § 3.1.5)

- Not phishing-resistant. FIPS 140 validation is not required.
- The key SHALL provide at least 112 bits of strength. A time-based nonce SHALL change at least every 2 minutes. Each OTP is accepted only once.
- A TOTP lifetime SHALL be defined from the expected clock drift plus allowances for network delay and user entry.
- Rate limiting: SHALL for single-factor OTP output under 64 bits, otherwise SHOULD (§ 3.1.4.2); always SHALL for multi-factor OTP (§ 3.1.5.2).
- Moving a software OTP to a new device SHOULD be done as a new binding. Alternatively, the key MAY be exported to a sync fabric that meets Appendix B.2.

### Cryptographic authenticators (§ 3.1.6, § 3.1.7)

- Exportable keys are usable at AAL2 and below, and SHOULD be kept in keychain-style storage. Non-exportable keys, required at AAL3, SHALL live in a hardware-isolated environment such as a secure element, TEE, TPM or security key (§ 3.1.6.1, § 3.2.13).
- Verifiers: key strength at least 112 bits; challenge nonce **at least 64 bits**, unique or from an approved random bit generator (§ 3.1.6.2).
- Multi-factor cryptographic authenticators require the activation factor on every authentication. **If the authenticator reports that no activation factor was used, the authentication SHALL be treated as single-factor** (§ 3.1.7.1, § 3.1.7.2).
- Wallets on the subscriber's device are multi-factor cryptographic authenticators that work through federation. Their signed, audience-restricted assertions count as phishing-resistant. Cloud-hosted wallets are not (§ 3.1.7.3).

## Syncable authenticators and passkeys (Appendix B)

- **Sync fabric (B.2):**
  - Keys are generated with approved cryptography.
  - Keys are stored in the sync fabric only encrypted, with at least 112-bit strength, and SHOULD use a user-controlled secret.
  - Private-key operations happen on the local device.
  - Only the authenticated user can access their keys, and access is protected by AAL2-equivalent MFA.
  - The UI SHALL NOT expose the key.
  - Federal enterprise use adds a FISMA moderate sync fabric, device management and agency-managed accounts.
- **WebAuthn Level 3 flags (B.3):**
  - **UP:** verifiers SHOULD confirm it is set.
  - **UV:** verifiers SHALL mark UV as preferred and SHALL inspect it. Without UV the authenticator is single-factor.
  - **BE** (backup eligible): MAY be used to restrict syncable authenticators.
  - **BS** (backup state): SHOULD NOT be used to condition acceptance in public-facing apps.
- **Attestation:** the lack of attestation SHOULD NOT block syncable authenticators in public-facing applications, since requiring it pushes users to phishable options such as SMS. Attestation SHOULD be used when available (B.3). Federal enterprise use SHOULD implement attestation (B.3).
- **Limits:** syncable keys are inherently exportable, so they are allowed up to AAL2 and SHALL NOT be used at AAL3 (B.2, § 2.3.2).
- **Sharing (B.4):** public-facing RPs should assume any syncable authenticator can be shared.

## General verifier requirements (§ 3.2)

- **Physical authenticators (§ 3.2.1):** the CSP SHALL be able to invalidate an authenticator immediately when the subscriber reports it lost, stolen or compromised. Cookies are not authenticators.
- **Rate limiting (§ 3.2.2):**
  - At most **100 consecutive failed attempts** per authenticator per account, then disable the authenticator. It needs rebinding before it can be used again.
  - If several authenticators are involved, disable all of them.
  - Bot challenges, increasing delays and risk-based signals MAY be added.
  - After a successful authentication, the failure count SHOULD be reset.
- **Biometrics (§ 3.2.3):**
  - Used only as part of MFA with a physical authenticator, and a non-biometric alternative SHALL always be offered.
  - False match rate of 1 in 10,000 or better for all demographic groups (§ 3.2.3.1).
  - PAD SHALL be used for face and SHOULD for iris and fingerprint. **Voice SHALL NOT be used** (§ 3.2.3.2).
  - At most 5 consecutive failures, or 10 with PAD. Then a delay of at least 30 seconds before each attempt. Disable biometrics at 50 failures, or 100 with PAD (§ 3.2.3.3).
  - Local comparison SHOULD be used. Biometric activation SHALL be separate from unlocking the device (§ 3.2.3.3).
- **Attestation (§ 3.2.4):** attestations are signed at 112-bit strength or more. Federal enterprise verifiers SHOULD use them; others MAY.
- **Phishing resistance (§ 3.2.5):**
  - Requires cryptographic authentication with approved algorithms. Authenticators with manually entered output (OTP, out-of-band) SHALL NOT be considered phishing-resistant.
  - **Channel binding** (§ 3.2.5.1) signs the TLS channel identifier, as client-authenticated TLS, PIV and CAC do.
  - **Verifier name binding** (§ 3.2.5.2) binds the output to the verifier's authenticated hostname, or to a parent domain at least one level below the public suffix. WebAuthn is the example.
- **Verifier–CSP communication (§ 3.2.6):** mutually authenticated.
- **Authentication intent (§ 3.2.8):** the claimant responds explicitly. A front-camera face capture needs an explicit button.
- **Activation secrets (§ 3.2.10):**
  - At least 4 characters, and SHOULD be 6; a numeric PIN is allowed. A blocklist SHOULD be used.
  - At most 10 failed attempts, then disable the authenticator.
  - Verified in a hardware-protected environment at AAL3. At AAL2 without such hardware, the secret derives the key that decrypts the authentication key.
  - Activation SHALL be a separate operation from unlocking the device.
- **Connected authenticators (§ 3.2.11):**
  - Wireless connections SHALL have a range of no more than 240 m.
  - Pairing codes are at least 6 digits.
  - Connections with a range of 1 m or more SHALL use an authenticated protected channel.
  - Hybrid transports, such as CTAP 2.2, use a QR code plus a proximity check.
- **Random values (§ 3.2.12):** from an approved random bit generator, at least 112-bit strength.

## Binding and characteristics (§ 4.1)

- The CSP SHALL record every bound authenticator and its characteristics, for example single- or multi-factor and phishing-resistant or not. These MAY come from attestation, from issuance, or from typical properties such as the WebAuthn UV bit (§ 4.1).
- Subscriber-provided authenticators (§ 4.1.3): the accepted types SHALL be documented in the practice statement. Missing attestation SHOULD NOT block public use.
- Binding a new authenticator, recovery and notifications are covered in [`sessions-and-recovery.md`](sessions-and-recovery.md).
