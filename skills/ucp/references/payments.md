# Payments

Rules for payment handlers, instruments and credentials, and the payment extensions in UCP 2026-08-25. Citations name the page and heading: the Overview's Payment Architecture section, the Payment Handler Specification Guide, the AP2 Mandates Extension and the Payment Authentication Extension.

## Model

UCP separates payment instruments (what is accepted) from payment handlers (the specifications for how an instrument is processed) (Overview, Payment Architecture).

- A **payment credential provider** (a PSP or wallet) authors the handler specification and its JSON Schemas. Handler names are reverse-domain, for example `com.google.pay` or `dev.shopify.shop_pay`, and are bound to their `schema` host like any other entity (Overview, Payment Handlers; see `discovery-and-negotiation.md`).
- The **business** picks handlers and advertises its configuration in `ucp.payment_handlers`.
- The **platform** runs the handler's protocol with the provider to get an opaque credential, then submits it to the business (Overview, Roles & Responsibilities).

The lifecycle is negotiation (business to platform), acquisition (platform with the provider) and completion (platform to business) (Overview, Payment in the Checkout Lifecycle).

## Trust and PCI scope

From Overview, Security and Trust Model and Credential Flow & PCI Scope:

- The platform SHOULD NOT touch raw financial credentials.
- Credentials flow platform to business only. Businesses MUST NOT echo credentials back in responses.
- Platforms handle tokens, encrypted payloads or mandates, not raw PANs.
- The `handler_id` in the payload routes the credential to the right provider key.

Platforms stay out of PCI-DSS scope by using handlers with opaque credentials, never storing raw card data, and presenting network tokens instead of an FPAN (Overview, PCI-DSS Scope Management).

## Handlers in profiles and responses

- Every handler entry has `id` and `version`. The variants are `business_schema` (in `/.well-known/ucp`), `platform_schema` (in the platform profile, with `spec` and `schema`) and `response_schema` (runtime configuration in checkout and order responses) (Payment Handler Specification Guide, Handler Declaration Variants).
- Businesses MUST filter handlers by cart context, for example dropping buy now, pay later for subscriptions or regional methods for a foreign address (Overview, Payment Handlers).
- `map_order.payment_handlers` and the order of `available_instruments` are a business's suggested presentation order. Platforms SHOULD take it into account but MAY reorder, and arbitrate it against the buyer's preference in `context.payment[]` (Overview, Payment Handlers).

### Resolving `available_instruments`

Both sides advertise `available_instruments`. For each checkout, the business intersects the platform's list, its own `business_schema` list and the cart context, and returns the result. Platforms MUST treat the response value as authoritative and MUST NOT use instrument types or constraints that contradict it (Payment Handler Specification Guide, Resolving `available_instruments`).

| Source           | `available_instruments`                             |
| ---------------- | --------------------------------------------------- |
| Platform profile | `card` with brands visa, mastercard, amex, discover |
| Business profile | `card` with brands visa, mastercard, amex           |
| Response         | `card` with brands visa, mastercard, amex           |

`constraints` describe what the business derives (such as the card `brand`); `ucp.request_constraints` describe what must be on the wire (required fields, accepted credential types). When an authoritative response puts `ucp.request_constraints` on an available instrument, the business MUST include an explicit `path` (Payment Handler Specification Guide, Defining the Schema; Overview, Request Constraints).

### Cardinality

A checkout submission MUST contain exactly one payment instrument unless `dev.ucp.common.payment.split_payments` is active. Businesses MUST reject violations with a `payment_failed` error in `messages[]` (Overview, Payment Handlers).

## Credentials

- Base credential schemas: `payment_credential.json` (type only), `token_credential.json`, `pan_credential.json` (raw FPAN with `cvc`), and `network_token_credential.json` (verified with a `cryptogram`) (Payment Handler Specification Guide, Credential Shapes).
- A handler specification MUST say which credential types it accepts. Token credentials MUST include an expiry field (`expiry`, `ttl` or similar).
- A **binding** ties an instrument to one capability resource by `type` and `id`, so a credential meant for one checkout cannot be replayed on another. Handler specifications SHOULD document how to build an effective binding (Payment Handler Specification Guide, Instrument Acquisition and Key Definitions).
- A handler specification MUST map common failures (declined, insufficient funds, network error) to standard UCP errors (Payment Handler Specification Guide, Error Handling).

## Security practices

From Overview, Security Best Practices:

- **Businesses**: validate that `handler_id` is in the advertised set, separate test and production PSP credentials, make payment processing idempotent, log payment events without credentials, and set credential timeouts.
- **Platforms**: use HTTPS, validate handler configurations before running them, time out credential acquisition, clear credentials from memory after submission, and re-acquire expired credentials.
- **Providers**: bind credentials to the specific business, rate-limit acquisition, check platform authorization, and expire credentials (for example 15 minutes for tokens).

## AP2 mandates extension

`dev.ucp.common.payment.ap2_mandate` extends checkout with cryptographic proof that the user authorized this checkout and payment (AP2 Mandates Extension, Overview). Once negotiated, the session is locked: neither side may fall back to an unprotected checkout.

From Activation and Session Locking:

- The business MUST include `ap2.merchant_authorization` in all checkout responses.
- The business MUST NOT accept `complete_checkout` without `ap2.checkout_mandate`.
- The platform MUST verify the business signature before presenting the checkout to the user.
- In the trusted platform provider model, the platform MUST publish at least one key in its profile's top-level `keys`.

From Cryptographic Requirements, Business Authorization and Mandate Structure:

- `merchant_authorization` is a JWS with detached content (RFC 7515 Appendix F), `<header>..<signature>`, with `alg` and `kid` in the header. The signature MUST cover the header and the checkout payload.
- The payload is the checkout canonicalized with JCS (RFC 8785), excluding the `ap2` field.
- The algorithm follows AP2's Checkout JWT rule; AP2 v0.2 requires ECDSA (`ES256`, `ES384` or `ES512`).
- Mandates are SD-JWT credentials with key binding. The `checkout_mandate` goes in `ap2.checkout_mandate` and MUST contain the full checkout response including `ap2.merchant_authorization`. The `payment_mandate` goes in `payment.instruments[*].credential.token`.

On `complete`, the business MUST reject a missing mandate with `mandate_required`, verify the SD-JWT signature, key binding and expiry per AP2, check that the embedded `merchant_authorization` is its own valid signature, and check that the embedded terms (id, totals, line items) match the session (Business Verification). If a key cannot be resolved or a signature is invalid, the business MUST return an error (Signing Key Requirements).

Error codes: `mandate_required`, `agent_missing_key`, `mandate_invalid_signature`, `mandate_expired`, `mandate_scope_mismatch`, `merchant_authorization_invalid`, `merchant_authorization_missing` (Error Codes).

The mandate credentials themselves are defined by AP2; use the `ap2` skill for them.

## Payment authentication extension

`dev.ucp.common.payment.authentication` extends checkout with two Action types: `dev.ucp.common.payment.device_data_collection` (an invisible device data collection surface) and `dev.ucp.common.payment.three_ds_challenge` (a buyer-facing 3DS challenge). It standardizes only the platform-facing interaction, not EMV 3DS itself (Payment Authentication Extension, Overview).

- A business MUST NOT emit either Action type unless the extension is active for the checkout (Overview).
- A business SHOULD keep at most one authentication Action outstanding per payment attempt; collection comes before a challenge, in a later response (Runtime Shape).
- Each Action's `config.payment_instrument_id` MUST identify an instrument in the checkout; the platform MUST decline an Action whose instrument or handler cannot be resolved unambiguously (Runtime Shape).
- The platform MUST decline an Action whose `config.url` origin is not among the handler's allowed origins, and MUST install its message receiver before navigating (Surface Rendering and Notifications).
- `config.url` MUST be absolute `https` with no userinfo. Platforms keep the surface within allowed origins, grant only the frame capabilities the handler needs, avoid leaking session URLs, and treat completion notifications as advisory (Security and Data Handling).

Handlers that need other interactions publish their own checkout extension with its Action types, which both sides must advertise before those Actions are emitted (Payment Handler Specification Guide, Payment Actions).
