# Versions and upgrades

Read this to choose a target version, to read an OP or client built to an older draft, to upgrade one, or to decide what to do with the errata draft. Sources: the Final text, the errata draft, draft-04, both Implementer's Drafts (with the Document History in Implementer's Draft 2), the 2017 MODRNA draft, and the OpenID and MODRNA specification indexes, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                | Line                                  | Status  | Revision                                        | Posture | Summary                                                                                                     |
| ----------------- | ------------------------------------- | ------- | ----------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `errata1-preview` | CIBA Core 1.0 errata set 1 draft      | preview | draft 06 incorporating errata set 1, 2025-01-23 | track   | Proposed errata. One normative change: the client assertion audience must be the OP issuer alone.           |
| `1.0`             | CIBA Core 1.0                         | current | Final, 2021-09-01                               |         | The default target. Poll, ping and push; signed requests; user codes; push ID Token bindings.               |
| `id2`             | CIBA Core Implementer's Draft 2       | legacy  | draft-03, 2020-01-22                            |         | Adds the audience rules, default interval, long polling and `auth_req_id` character set. Superseded by 1.0. |
| `id1`             | CIBA Core Implementer's Draft 1       | legacy  | draft-02, 2019-01-16                            |         | First CIBA Core draft: generic grant type URN, three delivery modes, `requested_expiry`.                    |
| `modrna-id1`      | MODRNA CIBA 1.0 Implementer's Draft 1 | legacy  | 2017-03-06                                      |         | The MODRNA predecessor: polling or notification only, a MODRNA grant type URN.                              |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The OpenID specifications list names CIBA Core under the MODRNA Final Specifications, "replacing OpenID Connect Backchannel Authentication", which is the 2017 MODRNA document. Its "Errata Corrections" section has no CIBA entry as of 2026-10-05. The MODRNA specifications page lists draft 06 incorporating errata set 1 under Drafts, not as an approved errata set.

## Which version to use

- Build OPs and clients to CIBA Core 1.0, the Final text of 1 September 2021.
- There is no supported older line: every earlier document is a draft that 1.0 replaces. Treat an OP or client built to one as input to an upgrade.
- Follow the errata draft only to see what is coming. Its posture is **track**: do not make an OP reject audiences that 1.0 says it MUST accept. A client may already send the OP issuer as the only audience, because 1.0 says it SHOULD (CIBA §7.1), and that request is valid under both texts.
- A FAPI-CIBA deployment pins its own profile drafts. See the `fapi` skill, which pins FAPI-CIBA ID1 with posture build.

## What changed

### CIBA Core 1.0 errata set 1 draft

Compared word by word with the Final text on 2026-10-05:

- §7.1 client authentication: the Final text says the client SHOULD use the Issuer Identifier as the JWT assertion audience and the OP MUST accept the issuer, token endpoint URL or backchannel authentication endpoint URL. The draft replaces this: "If the Client authenticates using a client assertion as described in Section 4.2 of [RFC7521], the OP MUST verify that it is the sole audience of the assertion, with the issuer identifier [RFC8414] of the OP as its sole value." RFC 7521 is added to the references.
- Editorial only elsewhere: references are cited inline (RFC 6749, RFC 8628, RFC 7231, RFC 8705), the OpenID Connect Core reference is dated 15 December 2023, and the acknowledgements and copyright year are updated.
- The working group is shown as "OpenID Mobile Profile Working Group".

The FAPI-CIBA working copy of 26 June 2026 already repeats the sole-audience rule "as per [CIBA]" (FAPI-CIBA working copy §4.1.1 note).

### CIBA Core 1.0

From a word diff against Implementer's Draft 2 (draft-03):

- Profiles may define extra parameters to send to and receive from the backchannel authentication endpoint (§3).
- New "Sender Constrained Tokens in Push Mode": tokens delivered by push can be bound to the key material the client presented at the backchannel authentication endpoint (§5).
- Clients MUST ignore unrecognized response parameters in the acknowledgement (§7.3) and unrecognized parameters in ping and push callbacks (§10.2, §10.3.1).
- The OP need not send a ping callback for an expired `auth_req_id` (§10.2).
- Push implementers should consider sender-constrained access tokens (§14).
- The mTLS reference moves from the Internet-Draft to RFC 8705; the `login_hint_token` example's `sub_id` uses `format` instead of `subject_type`.
- draft-04 (4 June 2021) is the intermediate draft between Implementer's Draft 2 and Final, with the same normative text as Final apart from editorial changes.

### CIBA Core Implementer's Draft 2

From the Document History entry `-OIDC-CIBA-CORE-03` in draft-03:

- Explicit audience expectations for JWT assertion client authentication at the backchannel authentication endpoint.
- Only an asymmetrically encrypted `id_token_hint` needs to be decrypted.
- A default `interval` of 5 seconds.
- Long polling guidance, and guidance for clients that poll too quickly.
- Better PPID text, and guidance on proving ownership of keys at `jwks_uri`.
- `auth_req_id` is invalid after successful redemption, and its characters are restricted.
- Clients inspect error bodies instead of relying on the HTTP status alone.
- `requested_expiry` may be a JSON number or string, and profiles may define extra request parameters of any JSON type.
- A security consideration on context metadata.

### CIBA Core Implementer's Draft 1

From the Document History entries up to `-OIDC-CIBA-CORE-02`:

- Renamed to OpenID Connect Client Initiated Backchannel Authentication Flow - Core, with privacy considerations made less specific to mobile network operators (`-OIDC-CIBA-CORE-01`).
- The grant type becomes `urn:openid:params:grant-type:ciba`, without MODRNA in the URN.
- New `invalid_binding_message` authentication error, `requested_expiry` request parameter, and `transaction_failed` push error.
- `expires_in` and `interval` are positive integers as JSON numbers.
- Earlier MODRNA drafts (history entry `-06`) had already moved to three modes (poll, ping and push), renamed `client_notification_endpoint` to `backchannel_client_notification_endpoint`, added the `backchannel_authentication_endpoint` metadata, made `acr_values` optional, and added `at_hash`, `urn:openid:params:jwt:claim:rt_hash` and `urn:openid:params:jwt:claim:auth_req_id` to the push ID Token.

### MODRNA CIBA 1.0 Implementer's Draft 1

- Two modes: polling, or notification, in which the OP POSTs the tokens to the client's registered `client_notification_endpoint` with the `client_notification_token` as bearer token (MODRNA CIBA §3, §3.1, §6.3).
- The endpoint is called `bc-authorize`, and the token request uses `grant_type=urn:openid:params:modrna:grant-type:backchannel_request` (§3, §6.1).
- `acr_values` is REQUIRED, as defined by the MODRNA Authentication Profile (§4.1).
- The client SHOULD wait `interval` between polls (§4.3).

## Upgrading

### CIBA Core Implementer's Draft 2 to CIBA Core 1.0

1. Change the version marker: cite CIBA Core 1.0 Final in metadata and documentation. Protocol values are unchanged.
2. Replace removed or renamed behaviour:
   - Client: ignore unrecognized parameters in the acknowledgement and in callbacks (§7.3, §10.2, §10.3.1).
   - Client: do not wait for a ping callback after `expires_in`; clean up expired requests yourself (§7.4, §10.2).
   - OP in push mode: record the key material presented at the backchannel authentication endpoint and bind pushed tokens to it, if you offer sender-constrained tokens (§5, §14).
3. Validate against the target: run the Verify list in `SKILL.md`.
4. Keep behaviour unchanged: the same client keeps the same delivery mode and receives the same tokens.

### CIBA Core Implementer's Draft 1 to CIBA Core 1.0

1. Apply these steps, then the Implementer's Draft 2 to 1.0 steps above.
2. Replace removed or renamed behaviour:
   - OP: accept the issuer, token endpoint URL and backchannel authentication endpoint URL as JWT assertion audience (§7.1).
   - OP: issue `auth_req_id` values only from `A-Z a-z 0-9 . - _`, and invalidate them after one successful redemption (§7.3, §10.1.1).
   - OP: accept `requested_expiry` as a JSON number or string in signed requests (§7.1.1).
   - Client: default `interval` to 5 seconds, wait at least 30 seconds for a long-poll response, and stop polling after `invalid_request` (§7.3, §10.1, §11).
   - Client: decrypt an `id_token_hint` only when it was asymmetrically encrypted (§7.1).
3. Validate against the target: a client that polls too fast receives `slow_down` or `invalid_request` and backs off.
4. Keep behaviour unchanged: existing registrations keep their mode and grant type.

### MODRNA CIBA 1.0 Implementer's Draft 1 to CIBA Core 1.0

1. Change the version marker: replace the grant type `urn:openid:params:modrna:grant-type:backchannel_request` with `urn:openid:params:grant-type:ciba` in token requests, `grant_types` and `grant_types_supported` (§4, §10.1).
2. Replace removed or renamed behaviour:
   - Registration: replace "notification endpoint registered or not" with an explicit `backchannel_token_delivery_mode`. A notification client that expects tokens in the callback becomes `push`; register `backchannel_client_notification_endpoint` over HTTPS (§4).
   - OP: publish `backchannel_authentication_endpoint` and `backchannel_token_delivery_modes_supported` (§4).
   - OP in push mode: add `at_hash`, `urn:openid:params:jwt:claim:auth_req_id` and, with a refresh token, `urn:openid:params:jwt:claim:rt_hash` to the ID Token (§10.3.1).
   - Client in push mode: validate those claims; stop calling the token endpoint (§10.3.1, §11).
   - Treat `acr_values` as optional, and support the 1.0 error codes in §11, §12 and §13.
3. Validate against the target: run the Verify list in `SKILL.md`, and consider ping mode where pushed tokens are not wanted.
4. Keep behaviour unchanged: the user still approves on the same authentication device with the same binding message.

## Preview: CIBA Core 1.0 errata set 1 draft

The draft is draft 06 incorporating errata set 1, published 23 January 2025 and listed under Drafts on the MODRNA specifications page. Posture: **track**. Do not make an OP reject the token endpoint URL or backchannel authentication endpoint URL as assertion audience on the strength of this draft, because 1.0 says the OP MUST accept them. A client can already send the OP issuer as the only audience, which satisfies both texts. Watch the MODRNA specifications page and the "Errata Corrections" section of the OpenID specifications list. When the errata set is approved, make it the current revision of the `1.0` line (same id, new revision and source), drop this preview, and add the sole-audience check to the OP invariants.
