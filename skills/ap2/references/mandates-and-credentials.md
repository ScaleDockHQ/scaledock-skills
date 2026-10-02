# Mandates and credentials

AP2 v0.2 secures payments with two Mandate types, the Checkout Mandate and the Payment Mandate, built on a general Agent Authorization model. Citations name the AP2 v0.2 page and heading.

## Agent Authorization model

Authorization has two steps (Agent Authorization, introduction):

- **Mandate Delegation.** The agent creates Mandate Content, the user sees it on a Trusted Surface, and after consent a Mandate is created and handed to the agent, which stores it.
- **Action Authorization.** A Verifier asks the agent for proof, the agent presents a Mandate (key-binding it if it is open), the Verifier checks integrity and content, and returns a signed Mandate Receipt.

### Delegation models

| Model                  | Who the Verifier trusts                                          | Notes                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| User Credential        | The issuer of the user's credential, held by the Trusted Surface | One credential can delegate to many agents. The document specifies OpenID4VP with SD-JWT VCs; ISO mDocs could fill the same role.    |
| Trusted Agent Provider | The Agent Provider directly                                      | No pre-issued credential. The provider's Trusted Surface shows the content and signs with a key the agent must not be able to reach. |

Source: Agent Authorization, Mandate Delegation, User Credential and Trusted Agent Provider.

### Delegation with OpenID4VP

The agent sends an OpenID4VP Authorization Request whose `transaction_data` array holds base64url-encoded JSON objects. The delegation object has (Agent Authorization, Delegation using OpenID4VP):

- `type`: required, the string `delegate`.
- `format`: required, the VDC format of the returned Mandate, for example `dc+sd-jwt`.
- `delegate_payload`: required, an array of Mandate Content objects.
- `delegate_disclosures`: optional, selective disclosures in the payload.

The Authorization Response must include `delegate_payload` in the Key Binding (see the Delegate SD-JWT individual draft). Using the Digital Credentials API is recommended where available. Several delegations can travel in one request. The page's example pairs a `payment_card` entry, which drives the confirmation UI, with a `delegate` entry carrying a `mandate.checkout.1` and a `mandate.payment.1` payload.

## Open and closed mandates

Mandates form a verifiable chain from the user-approved Mandate to the closed Mandate a Verifier sees (Agent Authorization, Mandate Structure):

- **Open**: not yet bound to a transaction. Carries constraints on the closed Mandate and is bound to one agent through `cnf`. It enables autonomous action.
- **Closed**: bound to one transaction, by the user's signature directly (Human Present) or by a Key Binding JWT signed with the key named in the open Mandate's `cnf` (Human Not Present).

Open Mandates must support cryptographic key binding.

### SD-JWT Mandate Content

Claims (Agent Authorization, Mandates using SD-JWT VCs):

- `vct`: required, the Mandate Type.
- `constraints`: optional, an array of objects, each with a required `type`.
- `cnf`: confirmation key per RFC 7800; required while the Mandate is open.

An open Mandate need not have every required field of its type, but the closed Mandate must. New mandate and constraint types may be defined; use collision-resistant names such as an rDNS prefix or a URN.

### Verification and processing rules

From Agent Authorization, Verification and Processing Rules:

1. Verify and process the SD-JWT chain according to Delegate SD-JWT.
2. Check that claims from the open Mandate Content appear unchanged in the closed Mandate Content.
3. Evaluate each constraint of each open Mandate against the closed Mandate. Unknown constraints fail.

### Mandate Receipt

A Verifier-signed JWT (Agent Authorization, Action Authorization):

| Claim               | Required                 | Meaning                                                                                                                    |
| ------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `iss`               | yes                      | The Verifier.                                                                                                              |
| `result`            | yes                      | `success` or `error`.                                                                                                      |
| `reference`         | yes                      | base64url hash of the received Mandate (the final SD-JWT in a chain), computed like `sd_hash` with `_sd_alg` or `sha-256`. |
| `error`             | when `result` is `error` | Error code.                                                                                                                |
| `error_description` | no                       | Human-readable text.                                                                                                       |

Errors (Agent Authorization, Errors): `invalid_credential` (terminal), `unresolved_constraint` (may fall back to a directly approved closed Mandate or a non-agentic flow), `invalid_mandate` (terminal), `mandates_not_supported` (may fall back to non-agentic flows).

After a success receipt the agent stores the open Mandate, closed Mandate and receipt together and narrows the open Mandate's scope, often ending it.

## Checkout Mandate

Created by the Shopping Agent, rendered by the Trusted Surface, verified by the Merchant (Checkout Mandate, Usage).

- `vct`: closed `mandate.checkout.1`, open `mandate.checkout.open.1` (Checkout Mandate, Type). The schema table on the same page still says `mandate.checkout`; follow the Type section and Spec, Mandate Versioning.

| Field           | Type    | Required | Selectively disclosable | Meaning                                                                                                |
| --------------- | ------- | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `vct`           | string  | yes      | no                      | Mandate type.                                                                                          |
| `checkout_jwt`  | string  | yes      | yes                     | base64url serialized merchant-signed JWT of the Checkout. With UCP it must be the UCP Checkout object. |
| `checkout_hash` | string  | yes      | no                      | base64url hash of the `checkout_jwt` value, using `_sd_alg` or `sha-256`.                              |
| `iat`           | integer | no       | no                      | Creation time, Unix epoch.                                                                             |
| `exp`           | integer | no       | no                      | Expiry, Unix epoch.                                                                                    |

### Checkout constraints

- `checkout.allowed_merchants`: `allowed` is an array of Merchant objects (`id`, `name`, optional `website`), selectively disclosable. The Merchant must be among the revealed elements; no revealed elements means the constraint is invalid.
- `checkout.line_items`: `items` is an array of `{ id, acceptable_items[], quantity }`, where `acceptable_items` are `{ id, title }` and selectively disclosable. Each requirement must be met by matching checkout items in full quantity, with no requirement or checkout item used twice. The page suggests a maximum-flow check, and notes that one open Checkout Mandate cannot be split across several checkouts.

### Checkout Receipt

`status` (`Success` or `Error`), `iss`, `iat`, `reference` (hash of the closed Mandate), plus `error` and `error_description` only on error and `order_id` only on success (Checkout Mandate, Checkout Receipt).

## Payment Mandate

Created by the Shopping Agent, rendered by the Trusted Surface, verified by the Credential Provider, the Network and the Merchant Payment Processor (Payment Mandate, Usage).

- `vct`: closed `mandate.payment.1`, open `mandate.payment.open.1` (Payment Mandate, Type).

| Field                | Type              | Required | Meaning                                                                                               |
| -------------------- | ----------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `vct`                | string            | yes      | Mandate type.                                                                                         |
| `transaction_id`     | string            | yes      | base64url hash of the `checkout_jwt` value.                                                           |
| `payee`              | Merchant          | yes      | Merchant receiving the payment.                                                                       |
| `pisp`               | Pisp              | no       | Payment Initiation Service Provider (`legal_name`, `brand_name`, `domain_name`).                      |
| `payment_amount`     | Amount            | yes      | `{ amount, currency }`: integer minor units and an ISO 4217 code, the final value the user confirmed. |
| `payment_instrument` | PaymentInstrument | yes      | `{ id, type, description? }`.                                                                         |
| `execution_date`     | string            | no       | ISO 8601 date; absent means immediate.                                                                |
| `risk_data`          | object            | no       | Risk signals collected by the Trusted Surface.                                                        |
| `iat`, `exp`         | integer           | no       | Unix epoch timestamps.                                                                                |

An open Payment Mandate may include any of these properties.

### Payment constraints

| Type                                  | Properties                                                                                                               | Passes when                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `payment.agent_recurrence`            | `frequency` (`ON_DEMAND`, `DAILY`, `WEEKLY`, `BIWEEKLY`, `MONTHLY`, `QUARTERLY`, `ANNUALLY`), optional `max_occurrences` | Enough time has passed since the previous presentation and the occurrence count is within the limit.                                    |
| `payment.allowed_payees`              | `allowed[]` Merchant                                                                                                     | `payee` is in `allowed`.                                                                                                                |
| `payment.allowed_payment_instruments` | `allowed[]` PaymentInstrument                                                                                            | `payment_instrument` is in `allowed`.                                                                                                   |
| `payment.allowed_pisps`               | `allowed[]` Pisp                                                                                                         | The facilitating PISP is in `allowed`.                                                                                                  |
| `payment.amount_range`                | `currency`, `max`, optional `min` (minor units)                                                                          | Amount is within range and currencies match.                                                                                            |
| `payment.budget`                      | `max`, `currency`                                                                                                        | Requested amount plus all earlier closed amounts is at most `max`; add the amount after approval. Used with `payment.agent_recurrence`. |
| `payment.reference`                   | `conditional_transaction_id`                                                                                             | The approved Checkout Mandate has an open Checkout Mandate with that digest in its delegate chain.                                      |
| `payment.execution_date`              | optional `not_before`, `not_after`                                                                                       | `execution_date` is inside the window.                                                                                                  |

The amount-range and budget examples on the page use decimals even though the table says integer minor units; use integers. The Security and Privacy page calls the reference constraint `mandate.payment.reference`; the type defined on the Payment Mandate page is `payment.reference`.

### Payment Receipt

`status`, `iss`, `iat`, `reference` and `payment_id` are required; `error` and `error_description` appear only on error; `psp_confirmation_id` and `network_confirmation_id` appear only on success (Payment Mandate, Payment Receipt).

## Example: closed Payment Mandate content

Adapted from Payment Mandate, Closed Payment Mandate example (decoded disclosure):

```json
{
  "vct": "mandate.payment.1",
  "transaction_id": "NivWhuqfzcvZNapvIEJ2-3tsdQLkiuIcye2g46WVgX8",
  "payee": {
    "id": "merchant_1",
    "name": "Demo Merchant",
    "website": "https://demo-merchant.example"
  },
  "payment_amount": { "amount": 19900, "currency": "USD" },
  "payment_instrument": {
    "id": "stub",
    "type": "card",
    "description": "Card ••••4242"
  }
}
```

In autonomous mode it travels as a Key Binding JWT (`typ: kb+sd-jwt`) with `aud`, `nonce` and `sd_hash` binding it to the open Mandate.

## Sketch: deterministic merchant-side checks

Framework-neutral TypeScript with Web Crypto. SD-JWT parsing and signature verification are left to a conformant SD-JWT library; this only shows the AP2-specific checks after that.

```ts
type Merchant = { id: string; name: string; website?: string };
type Constraint =
  | { type: "checkout.allowed_merchants"; allowed: Merchant[] }
  | {
      type: "checkout.line_items";
      items: {
        id: string;
        acceptable_items: { id: string }[];
        quantity: number;
      }[];
    };

function base64url(bytes: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function checkoutHash(checkoutJwt: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(checkoutJwt),
  );
  return base64url(digest);
}

async function verifyClosedCheckout(
  closed: { vct: string; checkout_jwt: string; checkout_hash: string },
  latestCheckoutJwt: string,
  self: Merchant,
  openConstraints: Constraint[],
): Promise<{ result: "success" } | { result: "error"; error: string }> {
  if (closed.vct !== "mandate.checkout.1")
    return { result: "error", error: "invalid_mandate" };
  if ((await checkoutHash(latestCheckoutJwt)) !== closed.checkout_hash) {
    return { result: "error", error: "invalid_mandate" };
  }
  for (const c of openConstraints) {
    switch (c.type) {
      case "checkout.allowed_merchants":
        if (!c.allowed.some((m) => m.id === self.id))
          return { result: "error", error: "invalid_mandate" };
        break;
      case "checkout.line_items":
        // Evaluate with the maximum-flow method from the Checkout Mandate page.
        break;
      default: {
        const unknown: never = c;
        void unknown;
        return { result: "error", error: "unresolved_constraint" };
      }
    }
  }
  return { result: "success" };
}
```

The hash is compared against the Merchant's latest Checkout JWT, not the copy inside the mandate (Security and Privacy, Manipulated Checkout). The `sha-256` call assumes `_sd_alg` is absent or `sha-256`. Reject unrecognised constraint `type` values with `unresolved_constraint` while parsing untrusted input into this union; the `never` check keeps the switch exhaustive when new types are added. Wrap the result in a signed Checkout Receipt either way.
