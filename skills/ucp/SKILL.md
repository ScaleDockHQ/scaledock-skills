---
name: ucp
description: >-
  UCP 2026-08-25 (Universal Commerce Protocol): build and review agentic commerce businesses and platforms that
  discover, negotiate, check out, pay and track orders. Covers the business profile at /.well-known/ucp and the
  platform profile sent in UCP-Agent, reverse-domain names and schema authority binding, exact-version capability
  negotiation and extension pruning, ucp.version and supported_versions, services over REST, MCP (tools/call,
  structuredContent), A2A and the Embedded Protocol, the dev.ucp.shopping.checkout lifecycle and continue_url,
  fulfillment and discount extensions, payment handlers, available_instruments and credentials,
  AP2 mandates and 3DS authentication actions, identity linking with OAuth 2.0 scopes, PKCE and RFC 9207, orders
  with signed webhooks, and RFC 9421 message signatures with keys[]. Targets UCP 2026-08-25; supports UCP
  2026-04-08, upgrades from 2026-01-23 and 2026-01-11, and tracks the UCP draft. Triggers: ucp, universal commerce
  protocol, agentic checkout, dev.ucp.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Universal Commerce Protocol (UCP)

UCP is an open protocol, published at ucp.dev, that lets a platform (an AI agent, app or website acting for a buyer) discover a business, negotiate capabilities, run a checkout, pay through a payment handler, link the buyer's account and follow the order. This skill pins UCP 2026-08-25 and produces a business endpoint, a platform client, a profile or a review that meets its MUST-level rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the page and heading it cites. UCP pages have no section numbers, so citations name the page and the heading (for example "Overview, Authority Binding"); RFC rules cite the section number. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: business (serves `/.well-known/ucp` and the commerce endpoints), platform (agent or app calling a business), embedded host, payment credential provider authoring a handler, or identity provider for the Accelerated IdP Flow.
- Transports: which services the business exposes (`rest`, `mcp`, `a2a`, `embedded`) and which the platform speaks.
- Capabilities: checkout, cart, catalog, order, identity linking, and which extensions (fulfillment, discount, buyer consent, loyalty, AP2 mandates, payment authentication, split payments, payment terms).
- Payment handlers: the reverse-domain handler names, and whether raw card data would reach the platform (it should not).
- Target version: UCP 2026-08-25 (current, the default; the release ucp.dev aliases as `latest`). UCP 2026-04-08 is supported: still receiving backports, serve it through `supported_versions` for a named peer. UCP 2026-01-23 and UCP 2026-01-11 are legacy: read and upgrade from them, never author them. The UCP draft is a preview (posture: track): never advertise it. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, read `https://ucp.dev/versions.json` and the GitHub releases for a newer dated release, then re-read every URL in [Sources](#sources), and update the pins.

## Invariants

1. **HTTPS everywhere.** All UCP communication MUST use HTTPS (Overview, Transport Security); REST endpoints need TLS 1.3 at minimum (Checkout REST, Transport Security).
2. **Profiles are well-formed and cacheable.** A business profile lives at `/.well-known/ucp`; `ucp.version`, `ucp.services` and `ucp.payment_handlers` are required (the registries even when empty). Published artifacts are served without redirects, with `Cache-Control: public, max-age` of at least 60 (Overview, Profile Structure and Hosting).
3. **Every request names the platform profile.** REST sends `UCP-Agent: profile="…"` as an RFC 8941 Dictionary; MCP sends `meta["ucp-agent"].profile` in the tool arguments (Overview, Platform Advertisement on Request).
4. **Names are bound to their schema host.** Capability and service names use `{reverse-domain}.{service}.{capability}`; a declared `schema` URL's host, reversed, MUST equal the name or be a label-aligned prefix of it, and a platform MUST NOT fetch or activate an entity that fails (Overview, Authority Binding and Enforcement).
5. **One protocol version per negotiation.** The platform picks one version from `version` and `supported_versions`, verifies a fetched leaf profile's `ucp.version` equals the key, and never mixes capabilities across profiles; the business MUST answer an unknown version with `version_unsupported` and MUST return the negotiated version in every response (Overview, Protocol Version and Request-Time Validation).
6. **No draft in public discovery.** `version` and `supported_versions` MUST be dated `YYYY-MM-DD` releases, never `"draft"` (Overview, Pre-release Versions).
7. **`dev.ucp.*` entries carry release `D`.** A profile for `ucp.version` `D` MUST declare version `D` on every `dev.ucp.*` service, capability and extension, and a platform MUST reject entries whose version differs (Overview, Component Versioning and Release Snapshots).
8. **Capabilities intersect by exact version.** Keep a capability only if both sides list the same name and at least one identical version, take the latest shared date, then prune extensions until none lacks a parent (Overview, Intersection Algorithm).
9. **Responses carry `ucp`.** Every response includes `ucp.version` and only the capabilities that are negotiated and relevant to the operation (Overview, Business Requirements and Response Capability Selection).
10. **Escalate through `continue_url`.** A checkout in `requires_escalation` MUST carry `continue_url` and at least one `requires_buyer_input` or `requires_buyer_review` message, and the platform MUST hand off through it (Checkout, Continue URL and Guidelines).
11. **Credentials flow one way.** Platforms SHOULD NOT touch raw financial credentials; businesses MUST NOT echo credentials back, MUST treat each checkout's resolved `available_instruments` as authoritative, and MUST reject more than one instrument unless split payments is negotiated (Overview, Credential Flow & PCI Scope and Payment Handlers).
12. **Webhooks are signed, keys live in `keys[]`.** Business-to-platform webhooks MUST be signed with RFC 9421; signing keys MUST be published in the top-level `keys[]` JWK Set, and every verifier MUST support `ES256` (Overview, Authentication Mechanisms and Profile Structure; Message Signatures, Signature Algorithms).
13. **The authenticated identity matches `UCP-Agent`.** With API keys, OAuth or mTLS, the verifier MUST confirm the principal may act for the profile in `UCP-Agent` (Overview, Identity Binding).
14. **Fetches are SSRF-safe.** Any URL dereferenced for identity resolution MUST be HTTPS, MUST NOT follow redirects, and MUST NOT resolve to special-use addresses such as `169.254.169.254` (Overview, Fetching).
15. **Identity linking is OAuth 2.0 done strictly.** Authorization Code with PKCE `S256`, `iss` validation per RFC 9207 byte for byte, exact `redirect_uri` matching, and `401 identity_required` or `403 insufficient_scope` with a `WWW-Authenticate: Bearer` challenge (Identity Linking, General Guidelines and Error Handling).

## Workflow

1. **Pick the version.** Target UCP 2026-08-25 unless a named peer needs UCP 2026-04-08; list the leaf profiles you will serve in `supported_versions`.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is a dated release that is not legacy, and no profile advertises the draft.
2. **Publish or read the profiles.** Write the business profile (services per transport, capabilities, payment handlers, `keys[]`) and the platform profile; check authority binding on every `schema` URL.
   -> [`references/discovery-and-negotiation.md`](references/discovery-and-negotiation.md)
   ✓ `GET /.well-known/ucp` returns 200 over HTTPS without a redirect, with `Cache-Control: public, max-age=60` or more, and validates against `profile.json`.
3. **Negotiate.** Resolve the platform profile from `UCP-Agent`, select the protocol version, intersect capabilities by exact version, prune orphan extensions, and map discovery and negotiation failures to the error codes.
   -> [`references/discovery-and-negotiation.md`](references/discovery-and-negotiation.md)
   ✓ An unreachable profile gets `424 profile_unreachable`, an unknown version `version_unsupported`, and an empty intersection `200` with `capabilities_incompatible`.
4. **Bind the transport.** Map operations to REST paths, MCP `tools/call` tools, A2A `DataPart` keys or Embedded Protocol messages, with the transport's error split between protocol errors and business outcomes.
   -> [`references/checkout.md`](references/checkout.md)
   ✓ MCP results carry the UCP payload in `structuredContent`, and business outcomes are never sent as JSON-RPC `error`.
5. **Run checkout.** Implement create, get, update (full replacement), complete and cancel, the status lifecycle, `messages` severities, `continue_url`, idempotency keys and any active extensions.
   -> [`references/checkout.md`](references/checkout.md)
   ✓ A `requires_escalation` response has `continue_url`, and a retried complete with the same key and body returns the cached result.
6. **Wire payments.** Advertise handlers, resolve `available_instruments` per checkout, accept opaque credentials bound to the checkout, and add AP2 mandates or payment authentication Actions only when negotiated.
   -> [`references/payments.md`](references/payments.md)
   ✓ No response echoes a credential, and a complete with two instruments is rejected with `payment_failed` unless split payments is active.
7. **Link identity and serve orders.** Run OAuth discovery and the Authorization Code flow, derive scopes from `config.scopes`, gate operations, and send signed order webhooks with the full order.
   -> [`references/identity-and-orders.md`](references/identity-and-orders.md)
   ✓ A gated call without a token gets `401` with `WWW-Authenticate: Bearer realm=…` and `identity_required`, and every webhook verifies against the business `keys[]`.
8. **Sign and harden.** Add RFC 9421 request and response signatures where required or recommended, key rotation, and the profile-fetch budget and SSRF guards.
   -> [`references/discovery-and-negotiation.md`](references/discovery-and-negotiation.md)
   ✓ Signatures cover `@method`, `@authority`, `@path`, `content-digest`, `content-type` and `ucp-agent` and `idempotency-key` when present.
9. **Upgrade** (only when asked). Follow the upgrade section for each step from the source release to UCP 2026-08-25.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded profile and payloads validate against the 2026-08-25 schemas, and older peers are still served through `supported_versions`.

## Verify before done

- [ ] `/.well-known/ucp` validates against `https://ucp.dev/2026-08-25/schemas/profile.json`, every `dev.ucp.*` entry says `2026-08-25`, and every `schema` host passes the authority-binding table.
- [ ] Each `supported_versions` URL serves a leaf profile whose `ucp.version` equals its key and which has no `supported_versions`.
- [ ] Every request carries `UCP-Agent` (REST) or `meta["ucp-agent"]` (MCP), and MCP `complete_checkout` and `cancel_checkout` carry `meta["idempotency-key"]`.
- [ ] Every response has `ucp.version` and `ucp.status` where the schema defines it, and only relevant capabilities.
- [ ] Idempotency keys are stored at least 24 hours; a reused key with a different body gets `409` (REST) or `-32000` (MCP).
- [ ] `requires_escalation` always comes with `continue_url` and a `requires_buyer_*` message.
- [ ] Handlers are filtered per cart, `available_instruments` in the response is authoritative, and token credentials have an expiry.
- [ ] With AP2 negotiated, every checkout response has `ap2.merchant_authorization` and complete without `ap2.checkout_mandate` fails with `mandate_required`.
- [ ] Order webhooks are RFC 9421 signed, carry `Webhook-Id` and `Webhook-Timestamp`, and the platform checks the signer owns the order.
- [ ] Identity linking uses PKCE `S256`, validates `iss` without normalization, and answers missing scopes with `403 insufficient_scope` listing the full scope set.
- [ ] Nothing from the UCP draft (for example `dev.ucp.lodging.booking`) is advertised.

## Reference index

- **`references/versions.md`**: the four dated releases and the draft, their status, what each changed, upgrade steps between them, and the preview. Load for steps 1 and 9.
- **`references/discovery-and-negotiation.md`**: profiles, naming and authority binding, services and endpoints, the `ucp` namespace and `map_order`, version selection, the intersection algorithm, error codes, identity and key resolution, message signatures, and fetch safety. Load for steps 2, 3 and 8.
- **`references/checkout.md`**: checkout operations, status lifecycle, messages and severities, `continue_url`, idempotency, the REST, MCP, A2A and Embedded bindings, and the fulfillment and discount extensions. Load for steps 4 and 5.
- **`references/payments.md`**: payment handlers, `available_instruments`, credentials and binding, PCI scope, the AP2 mandates extension, payment authentication Actions, and split payments. Load for step 6.
- **`references/identity-and-orders.md`**: identity linking (OAuth discovery, flow, scopes, Accelerated IdP Flow, errors) and the order capability (snapshot, Get Order, webhooks). Load for step 7.

## Related skills

- `ap2`, for the AP2 mandate credentials UCP carries: `npx skills add ScaleDockHQ/scaledock-skills --skill ap2`
- `x402`, for HTTP-native payments outside a UCP checkout: `npx skills add ScaleDockHQ/scaledock-skills --skill x402`
- `agentic-commerce-protocol`, for the other agent checkout protocol: `npx skills add ScaleDockHQ/scaledock-skills --skill agentic-commerce-protocol`
- `mcp`, for the MCP server UCP's MCP transport runs on: `npx skills add ScaleDockHQ/scaledock-skills --skill mcp`
- `a2a`, for the Agent Card and messages of UCP's A2A transport: `npx skills add ScaleDockHQ/scaledock-skills --skill a2a`
- `oauth`, for the OAuth 2.0 RFCs identity linking builds on: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`
- `web-bot-auth`, for the Signature-Agent interop UCP supports: `npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [UCP Specification Overview (2026-08-25)](https://ucp.dev/2026-08-25/specification/overview/): Release 2026-08-25 (latest), release/2026-08-25 at 3a541e13, checked 2026-10-05.
- [UCP Checkout Capability (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/checkout/): Release 2026-08-25, checked 2026-10-05.
- [UCP Checkout REST Binding (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/checkout/rest/): Release 2026-08-25, checked 2026-10-05.
- [UCP Checkout MCP Binding (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/checkout/mcp/): Release 2026-08-25, checked 2026-10-05.
- [UCP Checkout A2A Binding (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/checkout/a2a/): Release 2026-08-25, checked 2026-10-05.
- [UCP Embedded Protocol (2026-08-25)](https://ucp.dev/2026-08-25/specification/embedded-protocol/): Release 2026-08-25, checked 2026-10-05.
- [UCP Fulfillment Extension (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/extensions/fulfillment/): Release 2026-08-25, checked 2026-10-05.
- [UCP Discount Extension (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/extensions/discount/): Release 2026-08-25, checked 2026-10-05.
- [UCP Order Capability (2026-08-25)](https://ucp.dev/2026-08-25/specification/shopping/order/): Release 2026-08-25, checked 2026-10-05.
- [UCP Identity Linking Capability (2026-08-25)](https://ucp.dev/2026-08-25/specification/common/identity-linking/): Release 2026-08-25, checked 2026-10-05.
- [UCP Payment Handler Specification Guide (2026-08-25)](https://ucp.dev/2026-08-25/specification/payment/guide/): Release 2026-08-25, checked 2026-10-05.
- [UCP AP2 Mandates Extension (2026-08-25)](https://ucp.dev/2026-08-25/specification/payment/extensions/ap2-mandates/): Release 2026-08-25, checked 2026-10-05.
- [UCP Payment Authentication Extension (2026-08-25)](https://ucp.dev/2026-08-25/specification/payment/extensions/authentication/): Release 2026-08-25, checked 2026-10-05.
- [UCP Message Signatures (2026-08-25)](https://ucp.dev/2026-08-25/specification/signatures/): Release 2026-08-25, checked 2026-10-05.
- [UCP Versioning (release branch policy)](https://github.com/Universal-Commerce-Protocol/ucp/blob/release/2026-08-25/docs/versioning.md): Release 2026-08-25, checked 2026-10-05.
- [UCP release v2026-08-25](https://github.com/Universal-Commerce-Protocol/ucp/releases/tag/v2026-08-25): Release notes, published 2026-08-25, checked 2026-10-05.
- [UCP release v2026-04-08](https://github.com/Universal-Commerce-Protocol/ucp/releases/tag/v2026-04-08): Release notes, published 2026-04-09, checked 2026-10-05.
- [UCP Specification Overview (2026-04-08)](https://ucp.dev/2026-04-08/specification/overview/): Release 2026-04-08, release/2026-04-08 at f021fcb2, checked 2026-10-05.
- [UCP Specification Overview (2026-01-23)](https://ucp.dev/2026-01-23/specification/overview/): Release 2026-01-23, checked 2026-10-05.
- [UCP Specification Overview (2026-01-11)](https://ucp.dev/2026-01-11/specification/overview/): Release 2026-01-11, checked 2026-10-05.
- [UCP Specification Overview (draft)](https://ucp.dev/draft/specification/overview/): Draft, main at b0d92c2d (2026-10-05), checked 2026-10-05. Draft posture: track.
- [UCP Lodging Booking Capability (draft)](https://ucp.dev/draft/specification/lodging/booking/): Draft, main at b0d92c2d, checked 2026-10-05. Draft posture: track.
- [UCP published versions index](https://ucp.dev/versions.json): Site index, lists draft, 2026-08-25 (latest), 2026-04-08, 2026-01-23, 2026-01-11, checked 2026-10-05.
