# Versions and upgrades

Read this when choosing a target revision, reading an implementation written against an earlier MPP draft, or refreshing the pins. Sources: the core drafts, the datatracker page and the paymentauth.org companion documents, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                    | Line                      | Status  | Revision                               | Posture | Summary                                                                        |
| --------------------- | ------------------------- | ------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `httpauth-payment-01` | draft-httpauth-payment-01 | current | draft-httpauth-payment-01 (2026-09-09) | build   | The latest core revision, with charge, subscription, discovery and MCP drafts. |

Statuses: **current** is the default target. No legacy or preview line exists.

The protocol has no wire version. The core evolves by adding optional parameters that receivers MUST ignore when unknown, and a truly incompatible change would register a new scheme name such as `Payment2`. Payment methods version through a `version` field in `methodDetails` (absent means 1) or a new method identifier, and a breaking intent change registers a new intent identifier such as `charge-v2` (core § 9.2.1 to § 9.2.3). So a line here is a draft revision, and only a change of scheme or intent name would justify a second line.

### Why build

- The core is a complete specification: status-code table, ABNF, IANA registrations for the scheme, three header fields and two registries, and full security considerations (core § 4.2, Appendix A, § 11, § 12).
- Implementations exist: Stripe documents accepting MPP payments with its SDK, and mpp.dev lists SDKs and payment methods (Stripe docs; mpp.dev).
- Every revision since launch only added to the protocol (see What changed), so implementing the pinned revision is not expected to strand an integration.

Against that, record the risks a build posture accepts:

- The core is an individual Internet-Draft with no working group, and expires on 13 March 2027 (datatracker). Its text can still change, and its IANA registrations are requests that take effect only when an RFC is published.
- The charge, subscription, discovery and transport documents are published on paymentauth.org only, not submitted to the IETF datatracker, and carry their own revision numbers. They are maintained in `tempoxyz/mpp-specs`.
- Payment methods are maintained by each payment network, not by the core authors (mpp.dev governance). Pin every method specification you implement separately.

## Which version to use

- Implement draft-httpauth-payment-01 with the companion revisions pinned in Sources.
- Treat an implementation built on `draft-ryan-httpauth-payment-01` or `draft-httpauth-payment-00` as compatible but incomplete: compare it with What changed and add what is missing.
- When refreshing, check the datatracker page for a newer revision, WG adoption or a replacement draft, and the `mpp-specs` repository for new companion revisions. A new scheme or intent name is a new version line; a new revision updates this one.

## What changed

The core draft was renamed once, from `draft-ryan-httpauth-payment` to `draft-httpauth-payment`. All changes were additive.

### draft-ryan-httpauth-payment-00 (2026-02-15)

- Placeholder submission without the protocol text.

### draft-ryan-httpauth-payment-01 (2026-03-18, launch)

- First full text: the Payment scheme, 402 semantics, challenge parameters, credentials in `Authorization`, `Payment-Receipt`, problem types and the method and intent registries. Published on the day of the Stripe and Tempo announcement.

### draft-httpauth-payment-00 (2026-06-19)

- Renamed draft.
- `Accept-Payment` request field for client preferences (core § 7.4).
- `id` MUST be non-empty (core § 5.1.1).
- Challenge-binding secret management, including rotation (core § 11.2.2).

### draft-httpauth-payment-01 (2026-09-09, current)

- `header` challenge parameter and the `Payment-Authorization` field, so a request can carry both an ordinary `Authorization` credential and a Payment credential (core § 4.4.3, § 5.1.2, § 5.2).
- A credential in a field the challenge did not select MUST NOT satisfy it (core § 5.2).
- Separate `payment-expired` problem type for expired challenges (core § 4.2, § 8.2).
- Challenge binding is a MUST, covering `header` in an eighth HMAC slot when present, and `opaque` is always bound (core § 5.1.2.1, § 5.1.2.1.1).
- Responses to requests carrying `Payment-Authorization` MUST be `private` or `no-store`, because shared caches only protect `Authorization` (core § 11.10).

## Upgrading

### From draft-httpauth-payment-00 to -01

1. Add `payment-expired` handling: return it for expired challenges instead of the generic problem type, and let clients request a fresh challenge on it.
2. Make challenge binding mandatory if it was optional, and bind `opaque` when present.
3. If any resource also needs ordinary authentication, issue `header="Payment-Authorization"` and read the credential only from that field; append `header` as the eighth HMAC slot.
4. Set `Cache-Control: private` or `no-store` on every response to a request with `Payment-Authorization`.
5. Clients: ignore challenges whose `header` value is anything other than `Payment-Authorization`, and send the credential only in the selected field.

### From draft-ryan-httpauth-payment-01

Apply the changes above, then also add `Accept-Payment` support, reject empty `id` values, and document secret rotation.

## Preview

No preview line exists. The session intent is not a shared intent document; each payment method that supports it defines its own, such as the Tempo session intent (draft-tempo-session-00). Treat any new shared intent on paymentauth.org as a candidate addition to this line once it is published, not as a preview.
