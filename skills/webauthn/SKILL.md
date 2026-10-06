---
name: webauthn
description: >-
  W3C WebAuthn Level 3: build and verify passkey registration and authentication for relying parties, following the § 7.1 and § 7.2 verification steps. Use when adding, reviewing or upgrading passkeys or security keys on a website or server: PublicKeyCredentialCreationOptions and PublicKeyCredentialRequestOptions, challenge handling, RP ID (rpId) and origin checks, topOrigin and related origins (/.well-known/webauthn), user verification versus user presence, discoverable credentials and residentKey, conditional mediation (passkey autofill), attestation conveyance and formats (packed, tpm, android-key, apple, none, compound), signature counters, backup eligibility and backup state flags (BE, BS, synced passkeys), credential records, toJSON, parseCreationOptionsFromJSON and parseRequestOptionsFromJSON, signal methods, and the credProps, prf and largeBlob extensions. Targets WebAuthn Level 3; supports WebAuthn Level 2, upgrades from WebAuthn Level 1, and tracks the WebAuthn Level 4 draft.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Web Authentication (WebAuthn)

Web Authentication, published by the W3C Web Authentication Working Group, defines a browser API for creating and using public key credentials (passkeys and security keys) scoped to a Relying Party, and the steps a Relying Party server performs to verify them. This skill pins WebAuthn Level 3 (W3C Recommendation, 25 August 2026) and produces Relying Party options, verification code, or a review that meets its MUST-level rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Section numbers refer to WebAuthn Level 3 unless another level or document is named; "§ 7.1 step 14" counts the numbered steps of that algorithm. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Relying Party server (generates options, verifies responses, stores credential records), Relying Party front end (calls `navigator.credentials.create()` and `get()`), or both. Clients, authenticators and CTAP are out of scope except where an RP depends on them.
- Sign-in flow: username first with `allowCredentials`, usernameless with discoverable credentials, conditional mediation (autofill), or WebAuthn as a second factor after a password.
- Origins: the RP ID, every origin that runs ceremonies, any cross-origin iframe embedding (`topOrigin`), related origins on other domains, and native app origins.
- Attestation policy: none (consumer default), or verified attestation for named authenticator models (often workforce).
- Target version: WebAuthn Level 3 (current, the default). WebAuthn Level 2 is supported: keep its behaviour only for a named peer or library that cannot do Level 3. WebAuthn Level 1 is legacy: read it and upgrade from it, never author it. WebAuthn Level 4 is a preview (posture: track): never emit it. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read the W3C TR pages in [Sources](#sources) for a newer Recommendation or Working Draft, then the editor's draft and its revision history (§ 18), then the CTAP version the current level cites. Update the pins and bump the version.

## Invariants

1. **Challenges are random, server-made and single-use.** Generate `challenge` in a trusted environment with enough entropy to make guessing infeasible (SHOULD be at least 16 bytes), store it until the ceremony ends, and require `C.challenge` to equal its base64url encoding. Tolerating a mismatch compromises the protocol (§ 13.4.3; § 7.1 step 8; § 7.2 step 11).
2. **Check the ceremony type.** `C.type` MUST be `webauthn.create` at registration and `webauthn.get` at authentication (§ 7.1 step 7; § 7.2 step 10).
3. **Validate the origin.** The RP MUST validate `C.origin` and MUST NOT accept unexpected values; by default it SHOULD NOT accept subdomain origins. When `topOrigin` is present, the RP MUST validate it too (§ 13.4.9; § 13.4.8).
4. **Check the RP ID hash.** `rpIdHash` in the authenticator data MUST be the SHA-256 hash of the RP ID the RP expects (§ 7.1 step 14; § 7.2 step 15). The RP ID is the origin's effective domain or a registrable domain suffix of it (§ 4, RP ID), unless related origins apply (§ 5.11).
5. **Presence and verification are separate checks.** UP MUST be set, except at registration with conditional mediation; UV MUST be set when the RP requires user verification (§ 7.1 steps 15 and 16; § 7.2 steps 16 and 17).
6. **Verify the assertion signature with the stored key.** The signature MUST verify over `authenticatorData || SHA-256(clientDataJSON)` using the credential record's public key (§ 7.2 steps 20 and 21).
7. **Only accept requested algorithms.** The credential public key's `alg` MUST match an entry in `pubKeyCredParams` (§ 7.1 step 20).
8. **Backup flags are consistent.** If BE is not set, BS MUST NOT be set; BE never changes for a credential, so an assertion whose BE differs from the record's `backupEligible` fails when the RP uses backup state (§ 6.1.3; § 7.1 step 17; § 7.2 steps 18 and 19).
9. **Credential IDs are bounded and unique.** Fail registration when the credential ID is longer than 1023 bytes or already registered to any user (both SHOULD) (§ 7.1 steps 25 and 26).
10. **The user handle is opaque.** `user.id` is 1 to 64 bytes, MUST NOT be empty and MUST NOT contain personally identifying information, including unsalted hashes of it; authorization decisions MUST be based on it, not on `name` or `displayName` (§ 5.4.3; § 14.6.1).
11. **Bind the assertion to the account.** The credential MUST be one listed in a non-empty `allowCredentials`, and must belong to the identified account; for usernameless sign-in, `userHandle` MUST be present and identify the account that holds the credential (§ 7.2 steps 5 and 6).
12. **Do not trust UV before it is initialized.** While the record's `uvInitialized` is false, the UV flag MUST NOT be relied on as an authentication factor (§ 4, Credential Record).
13. **Expect unsolicited and missing extension outputs.** The RP MUST handle outputs it did not request and requests the client or authenticator ignored (§ 7.1 step 28; § 7.2 step 23).

## Workflow

1. **Pick the version.** Target WebAuthn Level 3. List any library or peer that only does Level 2.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target level is recorded, and it is not Level 1 or the Level 4 draft.
2. **Design the account model.** Define the credential record fields, a random 64-byte user handle per account, and the expected RP ID and origin list.
   -> [`references/registration.md`](references/registration.md)
   ✓ The record stores `id`, `publicKey`, `signCount`, `transports`, `uvInitialized`, `backupEligible` and `backupState`.
3. **Build creation options.** Set `rp`, `user`, a fresh `challenge`, `pubKeyCredParams`, `excludeCredentials`, `authenticatorSelection`, `hints`, `attestation` and `extensions`.
   -> [`references/registration.md`](references/registration.md)
   ✓ The options round-trip through `PublicKeyCredential.parseCreationOptionsFromJSON()`.
4. **Verify registration.** Run § 7.1 in order and store the credential record only when every step passes.
   -> [`references/registration.md`](references/registration.md)
   ✓ Each § 7.1 step maps to a line of code or a documented reason it does not apply.
5. **Set the attestation policy.** Default to `none`; request and verify attestation only with a trust anchor source and a policy for each format.
   -> [`references/attestation.md`](references/attestation.md)
   ✓ Every accepted `fmt` has a verification procedure and a trust decision.
6. **Build request options and pick the sign-in flow.** Username first, usernameless, or conditional mediation, with enumeration defences.
   -> [`references/authentication.md`](references/authentication.md)
   ✓ An unknown username gets a response indistinguishable from a known one.
7. **Verify the assertion.** Run § 7.2 in order, then update `signCount`, `backupState` and `uvInitialized`.
   -> [`references/authentication.md`](references/authentication.md)
   ✓ A tampered `clientDataJSON`, wrong origin, wrong RP ID or replayed challenge fails.
8. **Apply passkey policy.** Use BE and BS, the signature counter and authenticator attachment to drive recovery and step-up prompts.
   -> [`references/passkeys-and-flags.md`](references/passkeys-and-flags.md)
   ✓ A single-device credential prompts for a second credential or a recovery path.
9. **Wire JSON, signals and extensions.** Send options as JSON, post `toJSON()` output, call the signal methods, and handle credProps, prf and largeBlob.
   -> [`references/extensions-and-json.md`](references/extensions-and-json.md)
   ✓ PRF `results` never reach the server unless the design needs them there.
10. **Upgrade** (only when asked). Follow the checklist for each step from the source level to Level 3.
    -> [`references/versions.md`](references/versions.md)
    ✓ Credentials registered under the old level still authenticate, and the Verify list below passes.

## Verify before done

- [ ] Challenges come from a CSPRNG, are at least 16 bytes, are stored server-side, and are rejected on reuse or after the ceremony timeout (§ 13.4.3; § 15.1).
- [ ] Registration and authentication reject a wrong `type`, `challenge`, `origin`, `topOrigin` or `rpIdHash`.
- [ ] Origin matching is exact against an allow list, or a documented structural rule; subdomains are not accepted by default (§ 13.4.9).
- [ ] UV is checked when `userVerification` is `required`; UP is checked except for conditional create.
- [ ] Registration rejects an `alg` not in `pubKeyCredParams`, a credential ID over 1023 bytes, and a credential ID already registered.
- [ ] The credential record stores transports, BE, BS, `uvInitialized` and the sign count, and authentication updates them after all checks pass (§ 7.2 step 24).
- [ ] A BS flag with BE unset, or a BE value that differs from the record, fails the ceremony when backup state is used.
- [ ] A sign count that does not increase (when either value is non-zero) feeds risk scoring (§ 7.2 step 22).
- [ ] `user.id` is random, 1 to 64 bytes, and contains no email, username or unsalted hash of them.
- [ ] Nothing from the Level 4 draft, such as `remoteClientDataJSON`, is emitted.

## Reference index

- **`references/versions.md`**: every WebAuthn level with its status, what each changed, upgrade checklists, and the Level 4 draft. Load for steps 1 and 10.
- **`references/registration.md`**: creation options, the credential record, the § 7.1 steps, `excludeCredentials`, algorithms, and RP ID and origin rules shared with authentication.
- **`references/authentication.md`**: request options, username-first, usernameless and conditional flows, the § 7.2 steps, related origins, iframes, and username enumeration.
- **`references/attestation.md`**: conveyance preferences, attestation types, the defined formats and their verification, trust anchors, revocation and privacy.
- **`references/passkeys-and-flags.md`**: passkeys and discoverable credentials, authenticator data flags, BE and BS, signature counters, `uvInitialized`, attachment, hints and client capabilities.
- **`references/extensions-and-json.md`**: `toJSON()`, the JSON option types and parsers, signal methods, the extension framework, credProps, prf, largeBlob and appid.

## Related skills

- `openid-connect`, when passkeys sign users in to an OpenID Provider that then issues ID tokens: `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`
- `oauth`, when a WebAuthn sign-in sits inside an OAuth authorization server's login step: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`
- `nist-800-63`, for mapping passkeys and security keys to authenticator assurance levels: `npx skills add ScaleDockHQ/scaledock-skills --skill nist-800-63`
- `credential-management`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill credential-management`
- `dbsc`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill dbsc`
- `secure-payment-confirmation`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill secure-payment-confirmation`
- `digital-credentials`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill digital-credentials`
- `fido-ctap`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill fido-ctap`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Web Authentication: An API for accessing Public Key Credentials - Level 3](https://www.w3.org/TR/webauthn-3/): W3C Recommendation, 25 August 2026 (REC-webauthn-3-20260825), checked 2026-10-05.
- [Web Authentication: An API for accessing Public Key Credentials - Level 2](https://www.w3.org/TR/webauthn-2/): W3C Recommendation, 8 April 2021 (REC-webauthn-2-20210408), checked 2026-10-05.
- [Web Authentication: An API for accessing Public Key Credentials Level 1](https://www.w3.org/TR/webauthn-1/): W3C Recommendation, 4 March 2019 (REC-webauthn-1-20190304), checked 2026-10-05.
- [Web Authentication: An API for accessing Public Key Credentials - Level 4](https://www.w3.org/TR/webauthn-4/): W3C First Public Working Draft, 15 September 2026 (WD-webauthn-4-20260915), checked 2026-10-05. Draft posture: track.
- [Web Authentication editor's draft](https://w3c.github.io/webauthn/): Editor's Draft as of 2026-10-05; its content matches the Level 4 draft (it includes `remoteClientDataJSON`) although its header still reads Level 3, checked 2026-10-05. Draft posture: track.
- [Client to Authenticator Protocol (CTAP) 2.3](https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html): FIDO Alliance Proposed Standard, 26 February 2026, the `[FIDO-CTAP]` version WebAuthn Level 3 cites; used only for hmac-secret, large blobs and credential management, checked 2026-10-05.
