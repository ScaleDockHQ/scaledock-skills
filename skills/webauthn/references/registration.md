# Registration

Read this when building `PublicKeyCredentialCreationOptions`, designing the credential record, or verifying a registration response. Section numbers refer to WebAuthn Level 3; "step N" counts the numbered steps of § 7.1. The RP ID and origin rules at the end apply to authentication too.

## Creation options (§ 5.4)

| Member                   | Rule                                                                                                                                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rp.id`                  | The RP ID. Omitted, it defaults to the caller origin's effective domain (§ 5.4).                                                                                                                                                                   |
| `rp.name`                | Required but deprecated, because many clients do not display it. RPs MAY set it to the RP ID (§ 5.4.1).                                                                                                                                            |
| `user.id`                | The user handle: opaque, 1 to 64 bytes or the client throws `TypeError`, MUST NOT be empty, MUST NOT contain personally identifying information (§ 5.4.3; § 5.1.3). RECOMMENDED: 64 random bytes stored in the account (§ 14.6.1).                 |
| `user.name`              | Required. The primary value clients show to identify the account, for example an email or username (§ 5.4.1).                                                                                                                                      |
| `user.displayName`       | Required. A display name the RP SHOULD let the user choose; an empty string if none is suitable (§ 5.4.3).                                                                                                                                         |
| `challenge`              | Fresh random bytes from the server; see the challenge rules below (§ 13.4.3).                                                                                                                                                                      |
| `pubKeyCredParams`       | Ordered by preference. RPs that want wide support SHOULD include -8 (EdDSA), -7 (ES256) and -257 (RS256). -9, -51, -52 and -19 are NOT RECOMMENDED; use -7, -35, -36 and -8 (§ 5.4). An empty list makes the client use ES256 and RS256 (§ 5.1.3). |
| `timeout`                | A hint in milliseconds the client MAY override (§ 5.4). Recommended range 300000 to 600000, default 300000 (§ 15.1).                                                                                                                               |
| `excludeCredentials`     | The RP SHOULD list the account's existing credentials, so the new credential is not created on an authenticator that already holds one for this user (§ 5.4; § 13.4.6).                                                                            |
| `authenticatorSelection` | `authenticatorAttachment`, `residentKey`, `requireResidentKey` (true if, and only if, `residentKey` is `required`) and `userVerification`, default `preferred` (§ 5.4.4).                                                                          |
| `hints`                  | `security-key`, `client-device` or `hybrid`, in preference order; set the matching `authenticatorAttachment` for older user agents (§ 5.8.8). See [`passkeys-and-flags.md`](passkeys-and-flags.md).                                                |
| `attestation`            | Default `none`; unknown values behave as `none` (§ 5.4, § 5.4.7). See [`attestation.md`](attestation.md).                                                                                                                                          |
| `attestationFormats`     | Advisory preference list of format identifiers, most preferred first (§ 5.4).                                                                                                                                                                      |
| `extensions`             | Client extension inputs, for example `credProps`, `prf`, `largeBlob` (§ 5.4). See [`extensions-and-json.md`](extensions-and-json.md).                                                                                                              |

`residentKey` values (§ 5.4.6): `discouraged` (prefer a server-side credential, accept a discoverable one), `preferred` (strongly prefer a discoverable credential; takes precedence over `userVerification`), `required` (the client MUST return an error if it cannot create a discoverable credential). Use the credProps extension to learn which was created.

Conditional create (§ 5.1.3): with `mediation: "conditional"` the RP asks to register without prominent modal UI if the user already consented. The RP SHOULD first check the `conditionalCreate` capability with `getClientCapabilities()`. The client then does not require user presence or verification unless performed, which is why § 7.1 step 15 skips the UP check for conditional registrations. Conditional create throws `NotAllowedError` in a cross-origin iframe (§ 5.1.3).

## Challenges (§ 13.4.3)

- Generate both creation and request challenges randomly in an environment the RP trusts, for example the server (MUST).
- The returned challenge MUST match; store it server-side until the operation completes (SHOULD), so the check does not rely on the client.
- Challenges MUST contain enough entropy to make guessing infeasible and SHOULD be at least 16 bytes.
- Challenges SHOULD be valid for about the upper limit of the recommended ceremony timeout (§ 15.1: 600000 ms).

## The credential record (§ 4, Credential Record)

The RP MUST store some properties of each registered credential. RECOMMENDED items: `type`, `id`, `publicKey`, `signCount`, `transports`, `uvInitialized`, `backupEligible`, `backupState`. OPTIONAL: `attestationObject` and `attestationClientDataJSON` (to re-verify attestation later); § 7.1 step 27 also lists `rpId` as optional. RPs MAY delete records, including on user request.

Do not modify the stored `transports`: changing or removing values can hurt the user experience or prevent use of the credential (§ 4, Credential Record).

## Verifying a registration (§ 7.1)

Run every step in order; fail the ceremony when one fails.

1. Build `CredentialCreationOptions` with `publicKey` set to the creation options (step 1).
2. Call `navigator.credentials.create()`; on rejection show a user-visible error or guide the user, for example to another authenticator on `InvalidStateError` (step 2).
3. Require `credential.response` to be an `AuthenticatorAttestationResponse` (step 3), and get `getClientExtensionResults()` (step 4).
4. UTF-8 decode `clientDataJSON`, stripping any BOM, and parse it as JSON into `C` (steps 5 and 6). Parsers must tolerate unknown keys and key reordering (§ 5.8.1).
5. `C.type` is `webauthn.create` (step 7). `C.challenge` equals the base64url encoding of the challenge (step 8). `C.origin` is an origin the RP expects (step 9).
6. If `C.crossOrigin` is true, the RP expected creation inside a cross-origin iframe (step 10). If `C.topOrigin` is present, the RP expected that, and `topOrigin` is a page origin it expects to be framed by (step 11).
7. Hash `clientDataJSON` with SHA-256 (step 12), and CBOR-decode `attestationObject` into `fmt`, `authData` and `attStmt` (step 13).
8. `rpIdHash` is SHA-256 of the expected RP ID (step 14).
9. UP is set, unless `mediation` was `conditional` (step 15). UV is set if the RP requires user verification (step 16).
10. If BE is not set, BS is not set (step 17). Evaluate BE and BS if the RP uses them in UX or policy (steps 18 and 19).
11. The credential public key's `alg` matches one of `pubKeyCredParams` (step 20).
12. Match `fmt` case-sensitively against supported format identifiers (step 21), run that format's verification procedure (step 22), obtain trust anchors (step 23) and assess trustworthiness (step 24). See [`attestation.md`](attestation.md).
13. The credential ID is at most 1023 bytes, and not yet registered for any user; otherwise the RP SHOULD fail (steps 25 and 26).
14. Build the credential record from `authData` and the response: `signCount`, `uvInitialized` from UV, `transports` from `getTransports()`, `backupEligible` from BE, `backupState` from BS (step 27).
15. Process client and authenticator extension outputs; be prepared for unsolicited outputs and for requested extensions that were not acted on (step 28).
16. Store the record in the account named by `user` (step 29).

Why duplicate credential IDs fail (step 26 note): attestation other than self attestation does not prove possession of the private key at registration, so an attacker holding a victim's credential ID and public key could register them to the attacker's account, and with discoverable credentials the victim could be signed in to the attacker's account.

Attestation certificates (end of § 7.1): if certificates are used, the RP MUST have access to certificate status for intermediate CAs, and MUST be able to build the chain if the client did not send it.

## RP ID and origin rules (shared with authentication)

- The RP ID is a valid domain string. It defaults to the caller origin's effective domain and may be set to that domain or a registrable domain suffix of it; the origin's scheme must be `https`, or `http` with host `localhost`. For `https://login.example.com:1337`, `login.example.com` and `example.com` are valid RP IDs, `m.login.example.com` and `com` are not (§ 4, RP ID).
- An RP ID outside that rule is accepted only through related origins (§ 5.1.3; § 5.11). See [`authentication.md`](authentication.md).
- Validate `C.origin` on registration and authentication: MUST NOT accept unexpected values (§ 13.4.9). Methods, from the spec's examples: exact match for a single origin (SHOULD, for an app served only at one origin); an exact allow list for a few origins or for related origins; a structural rule (scheme `https`, host equal to or under the RP ID) for a large, changing set; an operating-system app identifier for a companion native app.
- By default the RP SHOULD NOT accept a subdomain origin; if it does, it MUST NOT serve untrusted code on any allowed subdomain, because code on a subdomain can exercise credentials scoped to the parent RP ID (§ 13.4.8).
- When `topOrigin` is present the RP MUST validate it: exact equality with `origin` for an app that must not be framed, an allow list of embedding sites, or a dynamic check (§ 13.4.9).
- Limit third-party script and use Content Security Policy on origins in the credentials' scope (SHOULD) (§ 13.4.8).

## Common mistakes

- Comparing `C.challenge` with a value echoed by the client instead of the one stored server-side (§ 13.4.3).
- Using the email address or username as `user.id` (§ 14.6.1).
- Replacing an existing record when a registration reuses a known credential ID (step 26).
- Accepting any `fmt` without a verification procedure, or treating `none` as verified attestation (steps 21 to 24).
- Omitting `excludeCredentials`, so a user registers the same authenticator twice (§ 5.4).
