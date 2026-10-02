# Attacker model and security considerations

From the FAPI 2.0 Attacker Model (AM, Final, 22 February 2025) and the FAPI 2.0 Security Profile §6 (SP, Final, 22 February 2025).

## Security goals (AM §5)

| Goal                     | Meaning                                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization (§5.2)     | No attacker can obtain and use an access token for resources other than their own.                                                     |
| Authentication (§5.3)    | No attacker can obtain and use an ID token identifying another user to log in.                                                         |
| Session integrity (§5.4) | No attacker can force a user to be logged in as the attacker, or to use the attacker's resources. CSRF and session swapping fall here. |

## Out of scope (AM §6)

These are assumed to work correctly and need separate threat modelling:

- TLS is not broken.
- JWKS and other key distribution fetches the right keys.
- The resource owner's browser and device are not compromised.
- Identity proofing and session management at the client and AS are handled correctly.

## Attackers (AM §7)

| Id                              | Capability                                                                                                                                | FAPI 2.0 response                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A1 web attacker                 | Runs endpoints, takes part as a normal user, tampers with its own traffic, sends links to users. Cannot intercept others or act as an AS. | PKCE, PAR, `iss`, strict redirects.                                                         |
| A1a web attacker as AS          | A1 that also runs an authorization server trusted in the ecosystem, and can replay messages from honest ASs.                              | `iss` mix-up defence (RFC 9207); separate sender-constraining keys per AS (SP §6.3).        |
| A2 network attacker             | Controls the network; intercepts, blocks and tampers. Cannot break cryptography.                                                          | TLS 1.2 or later per BCP 195, HSTS and DNSSEC (SP §5.2).                                    |
| A3a reads authorization request | Web attacker that can also read front-channel authorization requests, for example via apps registered for URLs, browser history or XSS.   | PAR keeps parameters out of the URL; one-time `request_uri`; short code lifetime (SP §6.4). |
| A4 token endpoint               | Makes the client use a fake token endpoint. Kept for information only.                                                                    | Not relevant in FAPI 2.0, because endpoints come from authoritative metadata.               |
| A5 reads resource requests      | Can read requests after the RS processed them, for example at a TLS-terminating proxy.                                                    | Sender-constrained tokens; DPoP replay mitigations (SP §6.2).                               |

AM §8.2 says DNS spoofing is covered by A2, leaked request data in logs by A3a, and redirection to malicious sites by A1.

## Security considerations (SP §6)

- **Access token lifetimes (§6.1).**
  - Short-lived access tokens with refresh tokens narrow the window for attacks.
  - Refresh tokens also let clients rotate sender-constraining keys without losing grants.
  - Lifetimes set too short add load on the AS and dependence on it.
- **DPoP proof replay (§6.2).** An A5 attacker can replay a DPoP proof, possibly with an altered body, because DPoP does not sign the body. Mitigations:
  - Short-lived DPoP nonces.
  - `jti` replay prevention.
  - Signed resource requests.
  - mTLS instead of DPoP.

  Message Signing Final does not define signed resource requests; the conformance suite says HTTP Message Signatures are not supported, and the FAPI WG lists FAPI 2.0 HTTP Signatures only as a draft.

- **Injection of stolen access tokens (§6.3, "Cuckoo's Token").**
  - Precondition: an attacker controls an AS the client trusts.
  - Mitigations: a separate DPoP key or mTLS certificate per AS, the RS checking the token issuer, and short-lived access tokens.
- **Authorization request leaks lead to CSRF (§6.4).** An A3 attacker reads a request and pushes its own code to the victim. Mitigations:
  - A one-time `request_uri`.
  - One code grant call per authorization call.
  - Short code lifetimes.
- **Browser-swapping (§6.5).** If the authorization response leaks, no current technology fully prevents the attack. The profile keeps the response confidential: no open redirectors, and `redirect_uri` sent through PAR.
- **Incomplete implementations (§6.6).** Use certified implementations; see `certification.md`.
- **Client impersonating a resource owner (§6.7).** The AS should not let clients choose a `client_id` that can be mistaken for a user subject identifier.
- **Key compromise (§6.8).**
  - Rotate keys automatically through `jwks_uri`.
  - Use single-purpose keys.
  - Weigh stateful tokens, which can be invalidated centrally, against stateless tokens, which a compromised key could forge.

## Review checklist

- [ ] Every attacker in the table above has the listed mitigation in the deployment.
- [ ] Mobile or embedded-browser use keeps the authorization response confidential.
- [ ] DPoP deployments that face A5 risk use nonces and `jti` replay checks, or use mTLS.
- [ ] Clients that trust several ASs use a separate sender-constraining key per AS.
- [ ] Key rotation is automated and keys are single purpose.
