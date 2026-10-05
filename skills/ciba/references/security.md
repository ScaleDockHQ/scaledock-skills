# Security, privacy and FAPI-CIBA

Read this for workflow step 7. Section numbers are CIBA Core 1.0 unless the FAPI-CIBA profile is named. FAPI-CIBA rules are summarized here only to show where they tighten CIBA; build them with the `fapi` skill.

## CIBA security considerations

### Hints

- `login_hint_token` SHOULD be signed by its issuer. This protects against injection and lets the OP authenticate the sender, so rogue clients cannot harvest identifiers (§14).
- `id_token_hint` cannot be checked with normal JWT rules, because it is used in a different context from the one it was issued for (§14). The OP:
  - should accept expired ID Tokens as hints for a reasonable period;
  - should check that it is the issuer, and that the presenting client is in `aud`;
  - should verify the signature, keeping in mind that key rotation limits how long a hint stays verifiable.
- As an alternative, the OP may skip signature checks and accept only ID Tokens with pairwise subject identifiers, checking that the authenticated client was issued that identifier or shares its Sector Identifier (§14).
- The OP processes the hint to check that it is valid and names a real user, and tells clients which hint types, issuers and maximum ages it accepts (§7.2).

### Unsolicited requests and the user code

- Anyone who knows a user's `login_hint` could start requests that pop up on that user's AD. The optional `user_code` prevents this (§7.1.2).
- The client MUST NOT store user codes (§7.1.2).

### Binding message

- `binding_message` interlocks the CD and the AD. It should be something the user can reliably match on both, such as a random code of reasonable entropy, and short plain text for small displays (§7.1).
- The OP answers `invalid_binding_message` when the message is unacceptable (§7.1, §13).

### Notification endpoint and token

- The OP SHOULD ensure that `backchannel_client_notification_endpoint` is under the client's administrative authority, or it would deliver results to the wrong client (§14).
- `client_notification_token` needs at least 128 bits of entropy, and the client checks it on every callback against the `auth_req_id` (§7.1, §10.2, §10.3.1).
- No 3xx answers, and the OP does not follow redirects (§10.2, §10.3.1).

### Push mode

- Push delivers tokens without client authentication at the token endpoint. Protect the notification endpoint and its registration (§14).
- The `at_hash`, `urn:openid:params:jwt:claim:rt_hash` and `urn:openid:params:jwt:claim:auth_req_id` claims let the client detect tampering with the callback (§10.3.1, §14).
- Consider sender-constrained access tokens for push, bound to the key material presented at the backchannel authentication endpoint (§5, §14).

### Identifiers and TLS

- `auth_req_id` needs at least 128 bits of entropy and the §7.3 character set (§7.3).
- The backchannel authentication endpoint and the notification endpoint MUST use TLS (§7, §9).
- Public-key client authentication is RECOMMENDED over shared secrets (§7.2).

### Context metadata

The client may send the OP context about its session, such as the CD's geolocation, for the OP to compare with the AD. CIBA neither requires nor defines this (§14). FAPI-CIBA defines `request_context` for it.

## Privacy considerations (§15)

A static global identifier such as a phone number or email as hint has privacy costs. Alternatives:

- An `id_token_hint` carrying a pairwise identifier and no personal data, obtained earlier through a front-channel flow.
- A single-use identifier generated on the AD and moved to the CD, for example as a QR code, which the client wraps in a `login_hint_token`.
- A discovery service that returns an encrypted `login_hint_token`.

## FAPI-CIBA in brief

FAPI-CIBA profiles CIBA for high-risk APIs. The `fapi` skill pins Implementer's Draft 1 (labelled Draft-02, 15 August 2019) with posture build. In ID1 the authorization server, among other rules (FAPI-CIBA ID1 §5.2.2):

- supports confidential clients only;
- requires unique authorization context or a `binding_message`;
- does not support push mode, supports poll mode, and may support ping mode;
- requires signed authentication requests (CIBA §7.1.1) whose `nbf` and `exp` limit the lifetime to 60 minutes or less;
- returns `acr` when it supports it and the client asked for it;
- may require `request_context`, a JSON object for fraud and threat decisions (ID1 §5.3);
- should not carry intent ids or other authorization metadata in `login_hint` or `login_hint_token`, which only identify the user.

The client sends only signed requests and ensures authorization context or a `binding_message` (ID1 §5.2.3.1). Push is excluded because it delivers tokens to a client-owned endpoint instead of through an authenticated token endpoint (ID1 §7.8). JWS uses PS256 or ES256 and never `none` (ID1 §7.10).

ID1 also warns that a fraudster can start a parallel flow with the same user identifier, so comparing binding messages on both devices may be the only defence. Where that risk is too high, use QR-conveyed binding messages or ephemeral identifiers from the AD (ID1 §7.3). It highly recommends a `login_hint` with nonce-like properties, generated on an AS-owned authentication device, or an `id_token_hint` (ID1 §7.2).

The FAPI-CIBA working copy of 26 June 2026 is a draft. It adds FAPI 2.0 alongside FAPI 1.0. With FAPI 2.0, both signed and unsigned requests are supported. It also adds `backchannel_endpoint_login_hint_token_types_supported` and `backchannel_endpoint_login_hint_token_types` metadata, and points to RAR for complex authorization data (FAPI-CIBA working copy §4.1, §4.3). It recommends redirect flows for same-device use cases (§5.1). Do not build from the working copy; the `fapi` skill tracks it.

## Review checklist

- [ ] Hints: one per request; `login_hint_token` signed; `id_token_hint` issuer, audience and age policy written down.
- [ ] Unsolicited requests: user codes required, or a documented reason (security context, non-static hints) why they are not.
- [ ] Binding message: shown on both devices, short, random enough to match; `invalid_binding_message` handled.
- [ ] Notification endpoint: HTTPS, ownership checked at registration, bearer token checked per `auth_req_id`, no redirects.
- [ ] Push: ID Token bindings validated; sender-constrained tokens considered; or push disabled, as FAPI-CIBA requires.
- [ ] Identifiers: `auth_req_id` and `client_notification_token` from a CSPRNG with at least 128 bits.
- [ ] Privacy: static global identifiers avoided where a pairwise `id_token_hint` or single-use identifier works.
- [ ] FAPI deployments: the `fapi` skill's FAPI-CIBA checklist passes.
