# JSON, signals and extensions

Read this when moving options and responses between browser and server as JSON, keeping authenticators in sync with signal methods, or using the credProps, prf, largeBlob or appid extensions. Section numbers refer to WebAuthn Level 3. CTAP is cited only where WebAuthn defers to it.

## JSON serialization

**Responses: `toJSON()` (§ 5.1).** Returns `RegistrationResponseJSON` or `AuthenticationResponseJSON`, suitable for an `application/json` POST. Every `ArrayBuffer` is base64url encoded (`Base64URLString`).

- `RegistrationResponseJSON`: `id`, `rawId`, `response`, `authenticatorAttachment`, `clientExtensionResults`, `type`. Its `response` has `clientDataJSON`, `authenticatorData`, `transports`, `publicKey` (absent when the user agent does not understand the negotiated algorithm), `publicKeyAlgorithm` and `attestationObject`.
- `AuthenticationResponseJSON`: `id`, `rawId`, `response`, `authenticatorAttachment`, `clientExtensionResults`, `type`. Its `response` has `clientDataJSON`, `authenticatorData`, `signature` and optional `userHandle`.
- `clientExtensionResults` MUST be the output of `getClientExtensionResults()` with buffers base64url encoded. This includes prf `results` if present (§ 10.1.4).

**Options: `parseCreationOptionsFromJSON()` and `parseRequestOptionsFromJSON()` (§ 5.1.8, § 5.1.9).** The server sends `PublicKeyCredentialCreationOptionsJSON` or `PublicKeyCredentialRequestOptionsJSON`, with `challenge`, `user.id` and descriptor `id` values as base64url strings; the client converts them to buffers, including in client extension inputs it processes. A parse problem MUST throw `EncodingError`. Feature-detect these static methods before relying on them; they are new in Level 3 (§ 18.1.1).

**Server-side public key.** `getPublicKey()` returns the credential key as DER SubjectPublicKeyInfo, or null. User agents MUST return it for -7 (ES256, uncompressed P-256), -257 (RS256) and -8 (EdDSA with Ed25519). Use `getPublicKeyAlgorithm()` for the algorithm. RPs that verify attestation still parse the key from `attestationObject`, because that is the copy the authenticator signed (§ 5.2.1.1).

**Client data must stay byte-exact.** The RP hashes `clientDataJSON` exactly as received; never re-serialize it (§ 5.2.1; § 5.2.2). A verifier without a full JSON parser may use the limited verification algorithm, which relies on the fixed order `type`, `challenge`, `origin`, `crossOrigin`, `topOrigin` (§ 5.8.1.1 to § 5.8.1.3).

## Signal methods (§ 5.1.10)

| Method                                                                     | Use                                                                                                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `signalUnknownCredential({ rpId, credentialId })`                          | The RP did not recognize a credential, for example it was deleted. Safe toward an unauthenticated caller; the RP SHOULD use it there (§ 14.6.3). |
| `signalAllAcceptedCredentials({ rpId, userId, allAcceptedCredentialIds })` | The full list of a user's credential IDs. RPs SHOULD prefer it when the user is authenticated.                                                   |
| `signalCurrentUserDetails({ rpId, userId, name, displayName })`            | Update the user's displayed names on authenticators.                                                                                             |

The promise resolving only means the options were well formed; it does not say whether any authenticator acted, so as not to leak credential information. Authenticators MAY deviate from the recommended actions, and clients MAY use CTAP `authenticatorCredentialManagement` where an authenticator cannot process the action (§ 5.1.10; CTAP § 6.8). `rpId` is validated against the caller origin, or through related origins (§ 5.1.10.1).

## Extension framework (§ 9; § 7.1 step 28; § 7.2 step 23)

- Every extension is a client extension; some are also authenticator extensions. All extensions are OPTIONAL for clients and authenticators.
- The RP MUST be prepared for outputs it did not request, by ignoring them or rejecting the response, and for requested extensions that were not acted on.
- `getClientCapabilities()` MAY report `extension:<identifier>` keys; even when true, the RP MUST NOT assume the authenticator processes the extension (§ 5.1.7).
- The up-to-date list is the IANA "WebAuthn Extension Identifiers" registry (§ 5.4).

## credProps (§ 10.1.3)

- Registration only. Input `credProps: true`; output `credProps.rk`.
- `rk: true` means a discoverable credential, `false` a server-side credential, absent means unknown. Some authenticators create discoverable credentials without being asked, so a client may omit `rk`; if credProps is supported, a missing `rk` most likely means non-discoverable.
- Use it with `residentKey: "preferred"` or `"discouraged"`, when either kind may be created (§ 5.4.6).

## prf (§ 10.1.4)

- Registration and authentication. Evaluates a per-credential pseudo-random function that maps inputs to 32-byte outputs, for example to derive keys that encrypt user data client-side.
- Inputs: `eval: { first, second? }`, or `evalByCredential` keyed by base64url credential ID, only when `allowCredentials` is not empty. `evalByCredential` at registration, or with empty `allowCredentials`, is `NotSupportedError`; a key that is empty, not base64url, or not in `allowCredentials` is `SyntaxError`.
- The client hashes each input as `SHA-256(UTF8Encode("WebAuthn PRF") || 0x00 || input)` before sending it to the authenticator, so a site cannot evaluate the PRF at arbitrary inputs.
- Outputs: `enabled` (registration only, true if the PRF is available) and `results`. Outputs may be missing at registration; then an assertion is needed.
- Built on the CTAP `hmac-secret` extension when available. `hmac-secret` has two PRFs per credential; WebAuthn exposes only the one used with user verification, which MUST be used and overrides `userVerification` if needed (§ 10.1.4; CTAP § 12.7).
- `toJSON()` includes `results`. When PRF outputs are keys meant to stay on the client, it may be necessary to omit `results` before sending the credential to a server (§ 10.1.4).
- Two inputs in one assertion allow key rotation: evaluate the old and a fresh input, then re-encrypt under the new output (§ 10.1.4).

## largeBlob (§ 10.1.5)

- Stores opaque data with a credential, for example a certificate. Useful only in specific cases, since RPs can usually store state themselves.
- Registration: `largeBlob: { support: "required" | "preferred" }`; output `supported`. `read` or `write` at registration is `NotSupportedError`. RPs SHOULD request it at registration if they will use it at authentication.
- Authentication: `{ read: true }` returns `blob` (absent if the read failed), or `{ write: bytes }` returns `written`. Both together, or `support` at authentication, is `NotSupportedError`. `write` needs `allowCredentials` with exactly one element.
- Roaming authenticators that use CTAP only support it for discoverable credentials, and may fail unless `residentKey` is `preferred` or `required` (§ 10.1.5; CTAP § 6.10.3).

## appid and appidExclude (§ 10.1.1, § 10.1.2)

- `appid` lets an RP that registered credentials with the legacy FIDO U2F JavaScript API request assertions for them. List the U2F key handles (decoded to bytes) in `allowCredentials` with type `public-key`, and accept an `rpIdHash` that is the hash of the AppID instead of the RP ID (§ 7.2 step 15).
- `appidExclude` (registration) makes the client treat `excludeCredentials` as both WebAuthn credentials and legacy U2F key handles for the given AppID, so a new credential is not created on an authenticator that already holds a legacy one.
- `appid` does not create FIDO U2F compatible credentials (§ 10.1.1).

## Common mistakes

- Re-encoding `clientDataJSON` after parsing it, which breaks the signature (§ 5.2.2).
- Sending PRF `results` to the server unintentionally through `toJSON()` (§ 10.1.4).
- Treating a missing `credProps.rk` as "discoverable" (§ 10.1.3).
- Using `signalAllAcceptedCredentials` before the user is authenticated, which exposes credential IDs (§ 14.6.3).
