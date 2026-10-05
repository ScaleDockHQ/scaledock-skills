# Checkout and transport bindings

Rules for the `dev.ucp.shopping.checkout` capability in UCP 2026-08-25, its REST, MCP, A2A and Embedded Protocol bindings, and the fulfillment and discount extensions. Citations name the page and heading.

## Operations

| Operation         | REST                                    | MCP tool            |
| ----------------- | --------------------------------------- | ------------------- |
| Create Checkout   | `POST /checkout-sessions`               | `create_checkout`   |
| Get Checkout      | `GET /checkout-sessions/{id}`           | `get_checkout`      |
| Update Checkout   | `PUT /checkout-sessions/{id}`           | `update_checkout`   |
| Complete Checkout | `POST /checkout-sessions/{id}/complete` | `complete_checkout` |
| Cancel Checkout   | `POST /checkout-sessions/{id}/cancel`   | `cancel_checkout`   |

Sources: Checkout REST Binding, Operations; Checkout MCP Binding, Tools.

- **Create** is called when the buyer shows purchase intent. Product data from feeds SHOULD match the response. With the cart capability negotiated, create accepts `cart_id` for cart-to-checkout conversion (Checkout, Create Checkout).
- **Get** returns the latest state. What stays readable after completion or cancellation is up to the business; the platform honors `expires_at` (Checkout, Get Checkout).
- **Update** is a full replacement: the platform MUST send the entire checkout, and it is not allowed during `complete_in_progress` (Checkout, Update Checkout).
- **Complete** places the order from `ready_for_complete` (Checkout, Complete Checkout).
- **Cancel**: any checkout not `completed` or `canceled` SHOULD be cancelable; otherwise return an error (Checkout, Cancel Checkout).

## Status lifecycle

| Status                 | Meaning and rule                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `incomplete`           | Information missing; read `messages` and fix with Update.                                                                      |
| `requires_escalation`  | Needs buyer input or review that the API cannot collect; resolve `recoverable` errors first, then hand off via `continue_url`. |
| `ready_for_complete`   | All information present and no Action outstanding; the platform may call Complete.                                             |
| `complete_in_progress` | Complete was accepted and is processing; the response MUST NOT contain `order`.                                                |
| `completed`            | Order placed; `order` is present. The checkout is immutable from here.                                                         |
| `canceled`             | Invalid or expired; can happen from any state.                                                                                 |

Source: Checkout, Status Values and Guidelines.

### Completion and retries

From Checkout, Complete Checkout and Accepted completion:

- A synchronous completion returns `completed` with `order` (`id`, `permalink_url`). An asynchronous one returns `complete_in_progress` without `order`.
- The platform MUST NOT use Complete to poll. With no response, it SHOULD poll Get Checkout with bounded backoff and MUST stop at `expires_at`.
- Only if Get Checkout cannot establish whether the original request was processed MAY the platform resend the identical request with the same idempotency key; it MUST NOT use a new key for that retry.
- A new Complete after the checkout returns to `ready_for_complete` MUST use a fresh key, even with an unchanged payload.
- During `complete_in_progress` the platform MUST NOT start Update or Complete. Before Cancel it MUST exhaust fallbacks and handoff, and it MUST NOT treat the checkout as canceled until the business reports `canceled`.
- The business MUST surface any Action that needs input through Update before it accepts Complete. If an Action blocks Complete, the business MUST return `incomplete` with a `recoverable` error whose `path` selects that Action (Checkout, Actions).

## Messages and errors

- `ucp.status` discriminates the shape: `success` carries the resource, `error` carries `messages` and no resource. When no resource exists, messages SHOULD use `unrecoverable` (Checkout, Error Handling).
- Each error has `type`, `code`, `severity`, `content` and an optional `path`, which is an RFC 9535 JSONPath into the response (Checkout, The `path` Field).
- Severities: `recoverable` (the platform fixes it with Update), `requires_buyer_input` (the checkout is incomplete and the API cannot collect the data), `requires_buyer_review` (the checkout is complete but policy needs buyer authorization), `unrecoverable` (retry with a new resource or hand off). Platforms SHOULD resolve recoverable errors before handoff (Checkout, Error Processing Algorithm).
- Standard errors, which businesses SHOULD mark `recoverable` so platforms show specific UX: `out_of_stock`, `item_unavailable`, `address_undeliverable`, `payment_failed`, `eligibility_invalid` (Checkout, Standard Errors).
- Over every transport, business outcomes are successful responses (HTTP 200, a JSON-RPC `result`); protocol failures use HTTP statuses or JSON-RPC `error`. See `discovery-and-negotiation.md` for the code table.

## Continue URL and handoff

- The business MUST provide `continue_url` with `requires_escalation`, SHOULD provide it in other non-terminal statuses, and SHOULD omit it for `completed` and `canceled`. It MUST be an absolute HTTPS URL and SHOULD preserve checkout state; server-side state is recommended and a checkout permalink is optional (Checkout, Continue URL).
- With `requires_escalation`, the business MUST include at least one `requires_buyer_input` or `requires_buyer_review` message (Checkout, Guidelines).
- The platform MUST use `continue_url` for `requires_escalation` and SHOULD prefer it over a platform-built permalink. An agent may fill the checkout, but must hand it to a trusted, deterministic UI for the buyer to review and place the order, unless the AP2 Mandates extension is active (Checkout, Guidelines; AP2 Mandates Extension, Overview).
- The business MUST send a confirmation email after completion and its checkout logic MUST be deterministic (Checkout, Guidelines).
- Scope for user-authenticated access: `dev.ucp.shopping.checkout:manage` (Checkout, Scopes).

## REST binding

From Checkout REST Binding:

- The base URL is the service `endpoint`; requests and responses are `application/json` and MUST be valid RFC 8259 JSON (Base URL, Content Types).
- HTTPS with TLS 1.3 at minimum (Transport Security).
- Every request MUST carry `UCP-Agent` (Specific Header Requirements).
- State-changing operations SHOULD support `Idempotency-Key`. When it is sent, the server MUST store it with the result for at least 24 hours, return the cached result for a matching body, and return `409 Conflict` for a different body (Specific Header Requirements).
- Protocol errors use 401, 403, 409, 429 or 503 with a JSON body of `code` and `content`; business outcomes use HTTP 200 with the UCP envelope and `messages` (Error Responses).

## MCP binding

From Checkout MCP Binding:

- Calls use `tools/call`: the OpenRPC `method` becomes `params.name` and its params become `params.arguments` (Implementation).
- Every request MUST include `meta["ucp-agent"].profile`. `complete_checkout` and `cancel_checkout` also require `meta["idempotency-key"]` (Request Metadata).
- For `get`, `update`, `complete` and `cancel`, a top-level `id` names the checkout, and the `checkout` payload MUST NOT contain `id` (Identifier Pattern).
- Business outcomes are a JSON-RPC `result` whose `structuredContent` holds the UCP envelope and `messages`. Protocol errors are a JSON-RPC `error` with `-32000`, or `-32001` for discovery (Error Handling, Business Outcomes).
- A conforming server MUST implement JSON-RPC 2.0, provide all five checkout tools, validate tool inputs against UCP schemas and support HTTP transport with streaming; it SHOULD authenticate agents (Conformance).

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "create_checkout",
    "arguments": {
      "meta": {
        "ucp-agent": {
          "profile": "https://platform.example/profiles/shopping-agent.json"
        },
        "idempotency-key": "550e8400-e29b-41d4-a716-446655440000"
      },
      "checkout": { "line_items": [] }
    }
  }
}
```

## A2A binding

From Checkout A2A Binding:

- The business's `a2a` service `endpoint` is its Agent Card URL, and the card must advertise the UCP extension URI `https://ucp.dev/2026-08-25/specification/reference` (A2A Interactions).
- Platforms send `UCP-Agent` and `X-A2A-Extensions` headers (Header Mapping Reference).
- The checkout MUST be returned in a `DataPart` under key `a2a.ucp.checkout`. Payment data for completion goes under `a2a.ucp.checkout.payment` and signals under `a2a.ucp.checkout.signals`; with AP2, the signed checkout mandate also goes in `a2a.ucp.checkout.payment`.

## Embedded Protocol

The Embedded Protocol lets a host render the business's checkout (the `continue_url` page) in an iframe or native web view. From Embedded Protocol:

- Messages MUST be JSON-RPC 2.0 with `jsonrpc`, `method` (`ec.*` for checkout, `ep.cart.*` for cart) and `params`. Requests carry a unique `id` and get a matching response; notifications MUST NOT carry `id` and get no response (Message Format, Message Types).
- Both success and application errors MUST be returned in `result`, discriminated by `result.ucp.status`. JSON-RPC `error` is only for transport failures such as `-32601` method not found (Response Handling, Transport Errors).
- Shared error codes: `abort_error` and `timeout_error` (recoverable), `security_error`, `invalid_state_error` and `not_supported_error` (unrecoverable). Errors SHOULD use only those two severities (Error Codes).
- Security: the business MUST set CSP `frame-ancestors <host_origin>`. Business iframes MUST be sandboxed (SHOULD use `allow-scripts allow-forms allow-same-origin`), hosts SHOULD use `credentialless` iframes, and every `postMessage` origin is strictly validated (Security).

## Fulfillment extension

`dev.ucp.shopping.fulfillment` extends checkout and catalog search and lookup (Fulfillment Extension, Overview):

- Checkout gains `fulfillment.methods[]`, each with `line_item_ids`, `destinations[]`, `selected_destination_id` and `groups[]` of selectable `options[]` with `selected_option_id`, plus optional `available_methods[]`.
- Destination `type` is required in responses and optional in requests. Well-known values: `shipping_address` and `business_location`. Only `shipping` methods are platform-writable; `pickup` and other method types are selected via `selected_destination_id`. A request with `destinations[]` MUST include the method `type` (Destinations).
- When the business accepts a `selected_destination_id`, it MUST echo the same ID with exactly one matching destination, MUST revalidate availability, and MUST NOT silently substitute another. When it rejects one, it MUST leave the checkout unchanged and return a `recoverable` error whose `path` selects the field (Selection and Location Identity).
- `options[].title` MUST distinguish the option from its siblings and be enough on its own; `options[].description` MUST NOT repeat `title` or `total`; `available_methods[].description` MUST be a standalone sentence (Rendering, Business Responsibilities).

## Discount extension

`dev.ucp.shopping.discount` can extend cart, checkout or both; platforms SHOULD check which before sending codes (Discount Extension, Discovery):

- `discounts.codes` replaces earlier codes, `[]` clears them, and codes match case-insensitively. `discounts.applied` lists code-based and automatic discounts, and amounts show in `totals[]` (Operations).
- On cart-to-checkout conversion, the business MUST carry applied codes forward (Operations).
- Rejected codes appear in `messages[]`, SHOULD use `type: "warning"`, and use `discount_code_expired`, `discount_code_invalid`, `discount_code_already_applied`, `discount_code_combination_disallowed`, `discount_code_user_not_logged_in` or `discount_code_user_ineligible` (Rejected Codes).
- Automatic discounts have `automatic: true`, no `code`, and cannot be removed by the platform (Automatic Discounts).
- Accepted eligibility claims MUST appear as provisional discounts in `applied` (Eligibility Claims).
