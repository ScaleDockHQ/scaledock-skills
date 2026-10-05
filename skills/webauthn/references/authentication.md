# Authentication

Read this when building `PublicKeyCredentialRequestOptions`, choosing a sign-in flow, verifying an assertion, or enabling related origins and iframes. Section numbers refer to WebAuthn Level 3; "step N" counts the numbered steps of § 7.2. RP ID and origin rules are in [`registration.md`](registration.md).

## Request options (§ 5.5)

| Member             | Rule                                                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `challenge`        | Required. Fresh, random, server-generated and stored; same rules as registration (§ 13.4.3).                                                                                                                                |
| `timeout`          | A hint in milliseconds the client MAY override (§ 5.5). Recommended range 300000 to 600000, default 300000 (§ 15.1).                                                                                                        |
| `rpId`             | The RP ID; the client MUST check the caller origin is in its scope, and the authenticator MUST check it exactly equals the credential's RP ID. Omitted, it defaults to the origin's effective domain (§ 5.5).               |
| `allowCredentials` | For an identified user, SHOULD list the account's credential descriptors, usually all of them, with `transports` whenever possible. For an unidentified user, MAY be empty: only discoverable credentials are used (§ 5.5). |
| `userVerification` | `required`, `preferred` (default) or `discouraged` (§ 5.5; § 5.8.6). No need to filter `allowCredentials` for `required`; the client ignores ineligible credentials (§ 5.5).                                                |
| `hints`            | `security-key`, `client-device`, `hybrid`; hints win over transports and attachment when they conflict (§ 5.8.8).                                                                                                           |
| `extensions`       | Client extension inputs, for example `prf`, `largeBlob`, `appid` (§ 5.5).                                                                                                                                                   |

If `allowCredentials` is not empty and none of the listed credentials can be used, the client MUST return an error (§ 5.5). A credential descriptor list in which every element has an unknown `type` MUST result in an error, because an empty `allowCredentials` means something else (§ 5.8.3).

## Sign-in flows

- **Username first.** The user is identified, then `allowCredentials` lists that account's credentials. This exposes credential IDs and whether the account has any to an unauthenticated caller (§ 13.4.7; § 14.6.3). Mitigations: authenticate with another step first, use discoverable credentials, or answer unknown usernames with plausible imaginary values.
- **Usernameless.** Empty `allowCredentials`; the authenticator MUST return a user handle (§ 5.2.2), and the RP finds the account by `userHandle` (§ 7.2 step 6). Requires credentials registered as discoverable ([`passkeys-and-flags.md`](passkeys-and-flags.md)).
- **Conditional mediation (autofill).** Call `get()` with `mediation: "conditional"` so no prominent modal UI shows unless credentials are discovered. The RP SHOULD first check `isConditionalMediationAvailable()` or the `conditionalGet` capability (§ 5.1.4). The client empties `allowCredentials`, so only discoverable credentials can be used, sets no timeout for the lifetime of the document, and offers credentials from an input field tagged with the `webauthn` autofill token (§ 5.1.4.1).
- **Second factor.** A password or session cookie step first, then WebAuthn with `allowCredentials`; this moves username enumeration to the earlier step (§ 14.6.2).

## Username enumeration (§ 14.6.2)

Non-normative mitigations the spec lists:

- For an unknown username, continue with a syntactically valid request populated with plausible imaginary values. Derive imaginary `allowCredentials` deterministically from the username, so repeated attempts give the same answer and the values do not stand out.
- Make it indistinguishable whether verification failed because the signature is invalid or because no such user or credential exists.
- Use a multi-step ceremony that identifies the user before WebAuthn.

## Verifying an assertion (§ 7.2)

Run every step in order; fail the ceremony when one fails.

1. Build `CredentialRequestOptions` with `publicKey` set to the request options (step 1), and call `navigator.credentials.get()`; on rejection show a user-visible error or guide the user (step 2).
2. Require `credential.response` to be an `AuthenticatorAssertionResponse` (step 3), and get `getClientExtensionResults()` (step 4).
3. If `allowCredentials` was not empty, `credential.id` is one of them (step 5).
4. Identify the user and the credential record (step 6):
   - User identified before the ceremony: the account holds a record whose `id` equals `credential.rawId`; if `userHandle` is present, it equals the account's user handle.
   - User not identified: `userHandle` is present, and the account it identifies holds a record whose `id` equals `credential.rawId`.
5. UTF-8 decode `clientDataJSON` and parse it into `C` (steps 7 to 9).
6. `C.type` is `webauthn.get` (step 10); `C.challenge` equals the base64url encoding of the challenge (step 11); `C.origin` is expected (step 12).
7. If `C.crossOrigin` is true, the RP expected use inside a cross-origin iframe (step 13). If `C.topOrigin` is present, the RP expected that, and it matches an expected embedding page (step 14).
8. `rpIdHash` is SHA-256 of the expected RP ID; with the appid extension it may instead be the hash of the AppID (step 15; § 10.1.1).
9. UP is set (step 16). UV SHOULD be required if, and only if, `userVerification` was `required`; if required, UV is set, otherwise ignore UV (step 17).
10. If BE is not set, BS is not set (step 18). If the RP uses backup state: BE matches the record's `backupEligible` in both directions, then apply RP policy (step 19).
11. Hash `clientDataJSON` with SHA-256 (step 20), and verify `signature` over `authenticatorData || hash` with the record's `publicKey` (step 21).
12. Signature counter: if either the new or the stored `signCount` is non-zero, a new value greater than the stored one is valid; a value less than or equal is a signal, not proof, of a cloned authenticator, a malfunction, or out-of-order processing. Whether to update, fail or score it is RP-specific (step 22; § 6.1.1).
13. Process extension outputs; be prepared for unsolicited ones and for requested ones that were not acted on (step 23).
14. Update the record: `signCount`, `backupState`, and, if `uvInitialized` is false, set it from UV only when authorized by an additional factor equivalent to user verification (SHOULD). Defer these updates until any additional RP security checks pass (SHOULD) (step 24).
15. Continue the ceremony (step 25).

## Related origins (§ 5.11, § 5.11.1)

Use when one RP ID must work on several registrable domains (country domains, brand domains).

- All related origins MUST use one common RP ID.
- Host a JSON document at `https://<rp-id>/.well-known/webauthn` over HTTPS, with content type `application/json` and a top-level `origins` array of one or more web origins. The well-known suffix is registered as `webauthn` (§ 12.5).
- Clients that support this MUST support at least five registrable origin labels; client policy SHOULD set an upper limit. Order the list so the most important labels come first: once the client's label limit is reached, origins with new labels are skipped.
- Clients fetch the document without credentials or referrer, require HTTPS for every redirect, and throw `SecurityError` on a failed fetch, a non-200 status, a wrong content type, invalid JSON or a missing `origins` array.
- The RP's origin check on the server should then exactly match the same origin list (§ 13.4.9).
- Detect support through the `relatedOrigins` capability (§ 5.8.7).

## Iframes and permissions policy (§ 5.9, § 5.10)

- The policy-controlled features `publickey-credentials-create` and `publickey-credentials-get` default to `'self'`. A cross-origin iframe needs `allow="publickey-credentials-get"` (and `publickey-credentials-create` to register).
- Creating a credential in a cross-origin iframe requires transient user activation, and the client SHOULD make clear that the creating origin differs from the top-level origin (§ 5.1.3).
- Embedding risks UI redressing (clickjacking); keep the embedded UI visible, for example with Intersection Observer v2 (§ 13.4.2).
- Validate `crossOrigin` and `topOrigin` on the server (§ 7.2 steps 13 and 14).

## Common mistakes

- Looking up the record by `userHandle` in a username-first flow and skipping the check that it matches the identified account (step 6).
- Requiring UV while the record's `uvInitialized` is false and treating that UV as a second factor (§ 4, Credential Record).
- Failing every sign-in whose counter is 0 and 0: the check only runs when either value is non-zero (step 22).
- Updating `signCount` before later risk checks pass (step 24).
- Returning a different error for unknown accounts than for bad signatures (§ 14.6.2).
