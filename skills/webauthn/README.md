# webauthn

An agent skill for W3C Web Authentication (WebAuthn): passkey and security key registration and authentication for relying parties, verified step by step against § 7.1 and § 7.2 of WebAuthn Level 3.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill webauthn
```

Then ask your agent to "add passkey sign-in to our app", "review our WebAuthn assertion verification" or "upgrade our WebAuthn Level 2 server to Level 3".

## What it covers

- Creation and request options: challenges, RP ID, user handles, algorithms, `residentKey`, `userVerification`, `hints` and timeouts.
- The registration (§ 7.1) and authentication (§ 7.2) verification steps, the credential record, and origin, `topOrigin` and related origin checks.
- Username-first, usernameless and conditional mediation (autofill) sign-in, and username enumeration defences.
- Attestation conveyance, attestation types, the defined formats and trust decisions.
- Passkeys and discoverable credentials, the UP, UV, BE and BS flags, signature counters and `uvInitialized`.
- `toJSON()`, `parseCreationOptionsFromJSON()`, `parseRequestOptionsFromJSON()`, signal methods, and the credProps, prf, largeBlob and appid extensions.

## Versions

| Line             | Status                |
| ---------------- | --------------------- |
| WebAuthn Level 4 | preview (track)       |
| WebAuthn Level 3 | current               |
| WebAuthn Level 2 | supported             |
| WebAuthn Level 1 | legacy (upgrade from) |

`references/versions.md` says which level to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/): W3C Recommendation, 25 August 2026.
- [WebAuthn Level 2](https://www.w3.org/TR/webauthn-2/): W3C Recommendation, 8 April 2021.
- [WebAuthn Level 1](https://www.w3.org/TR/webauthn-1/): W3C Recommendation, 4 March 2019.
- [WebAuthn Level 4](https://www.w3.org/TR/webauthn-4/): W3C First Public Working Draft, 15 September 2026.
- [WebAuthn editor's draft](https://w3c.github.io/webauthn/): Editor's Draft, checked 2026-10-05.
- [CTAP 2.3](https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html): FIDO Alliance Proposed Standard, 26 February 2026, cited only where WebAuthn depends on it.

## License

MIT
