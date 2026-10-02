# OpenID certification for FAPI

The OpenID Foundation offers a free conformance suite at `https://www.certification.openid.net/`. Implementers self-certify with it, and certified implementations may use the "OpenID Certified" mark (OpenID Certification page). The FAPI 2.0 SP §6.6 says deployments should use certified implementations.

## What the OP suite tests (Conformance Testing for FAPI OPs)

The page as read on 2026-10-02 lists these testable documents:

- FAPI 1.0 Part 2 Advanced Final (March 2021).
- FAPI 2.0 Security Profile Final.
- FAPI 2.0 Security Profile Implementer's Draft 2.
- FAPI 2.0 Message Signing Implementer's Draft 1.

If in doubt, test against the latest Final: FAPI 2.0, or FAPI 1.0 Advanced Final.

The suite tests Message Signing at Implementer's Draft 1, while the specification is Final (25 September 2025). Confirm which Message Signing revision a test plan exercises before you claim conformance to the Final.

## Setting up an authorization server test

1. Register two clients, each with its own keys or certificates. The suite uses both to test mix-up attacks.
2. Register these redirect URIs for each client, with the query string exactly as written:
   - `https://www.certification.openid.net/test/a/ALIAS/callback`
   - `https://www.certification.openid.net/test/a/ALIAS/callback?dummy1=lorem&dummy2=ipsum`
3. Give both client JWK sets an `alg`, usually PS256, with ES256 permitted in some cases.
4. Provide a resource server URL: a simple GET endpoint that returns JSON. The suite uses it to test sender-constrained tokens.
5. Create a test plan for the server, not one with "client" in its name. Pick the variant for each client authentication method and sender-constraining option.
6. Launch the plan and run every module until it finishes.

## FAPI 2.0 specifics

- Support for OpenID Connect (the `openid` scope and the ID token) is optional in the FAPI 2.0 tests.
- Run one test plan per option to certify that option. For example, one plan for `private_key_jwt`; it does not have to be repeated with and without JARM.
- The HTTP Message Signatures feature is not supported by the suite.
- FAPI 1.0 plain tests need the AS to support the acr value `urn:mace:incommon:iap:silver`. No specification requires it, but the tests do.
- Ecosystem variants exist, for example OpenBanking UK. They are supersets of the base FAPI tests.

## Relying party (client) certification (FAPI RP submission page)

- All tests in the chosen plan must pass before submission.
- Each certification package contains:
  - A signed Certification of Conformance, with a valid conformance profile name and the suite version, for example `www.certification.openid.net version 5.1.10`.
  - The test plan logs, added by "Publish for certification".
  - Client-side evidence per test: RP logs, screenshots or both.
- Name evidence files after the test, for example `fapi1-advanced-final-client-test-invalid-shash.log`.
- Published logs may contain client credentials and keys. Deactivate test clients and keys after certifying.

## FAPI-CIBA (Conformance Testing for FAPI-CIBA OPs)

- Every certification request includes poll-mode results. Ping mode is optional.
- Ping tests use the notification endpoint `https://www.certification.openid.net/test/a/ALIAS/ciba-notification-endpoint`.
- Pick the variant for the client authentication method and mode, for example `poll-mtls`.
- Both client JWKS need an `alg`, usually PS256, with ES256 allowed.

## Checklist

- [ ] The test plan matches the profile and every configured option.
- [ ] Two clients with distinct keys and the exact suite redirect URIs are registered.
- [ ] A JSON resource endpoint is available for sender-constraint tests.
- [ ] The plan finishes with no failures. Review warnings, but they do not block certification.
- [ ] Test credentials are rotated or deactivated after the logs are published.
