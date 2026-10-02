# Roles, flows and verification

Citations name the AP2 v0.2 page and heading.

## Roles

| Role                             | Responsibility                                                                              | Verifies                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Shopping Agent (SA)              | Product discovery, building the checkout, executing the purchase. Expected to be agentic.   | Nothing normative; it presents mandates and handles receipts.                                              |
| Credential Provider (CP)         | Source of payment credentials; checks the agent may use a credential and scopes it.         | Payment Mandate and its constraints.                                                                       |
| Merchant (M)                     | Provides and completes the Checkout; owns inventory, pricing and merchant discounts.        | Checkout Mandate, `checkout_hash` and checkout constraints.                                                |
| Merchant Payment Processor (MPP) | Processes the payment.                                                                      | That the payment credential is scoped to this Checkout, for example by a closed Payment Mandate inside it. |
| Trusted Surface (TS)             | UI trusted to obtain informed consent and create user-signed Mandates. Must be non-agentic. | It shows content; it does not verify.                                                                      |

Source: Spec, Roles and Agentic vs Non-Agentic. One entity may play several roles and takes on each role's duties; any role may delegate its duties, and a delegate follows that role's verification rules (Spec, Roles and Verification). The Executive Summary also names the Network and Issuer, which may receive the Payment Mandate (Overview, Section 3).

A role is agentic when an LLM handles communication to or from it. Merchant, MPP and CP may be either; the Shopping Agent is expected to be agentic. When either side of an exchange is agentic, tamper-evident mechanisms are needed because the agent itself may be an attacker (Spec, Agentic vs Non-Agentic).

Example placements of each role (Implementation Considerations, Roles):

- Merchant: UCP endpoints, a merchant agent speaking A2A to the shopping agent and UCP to its backend, or a merchant combined with its processor.
- Credential Provider: a user wallet or payment network, a store of instruments kept by the shopping agent, or one kept by the merchant.
- Trusted Surface: a deterministic part of the shopping agent app, a standalone wallet or issuer app, or a trusted user agent such as a mobile platform or browser.

## Modes

- **Human Present (direct).** The user sees the closed Checkout and approves it and its payment. Closed mandates are signed by the user or by a trusted Agent Provider.
- **Human Not Present (autonomous).** The user approves open mandates with constraints. The agent later signs the closed mandates with its own key and presents both open and closed.

Verifiers always receive closed Checkout and Payment Mandates; only the verification differs (Spec, Modes). A merchant or credential provider can turn an autonomous flow into a present one by returning `unresolved_constraint` and bringing the user back (Flows, introduction).

## Human Present flow

From Flows, Human Present (non-normative):

1. The user starts shopping; the SA assembles a cart with the Merchant.
2. At checkout the Merchant creates a signed Checkout and asks for a mandate.
3. The SA fetches instrument options from the CP and picks one.
4. The SA builds Checkout and Payment Mandate Content and sends it to the TS.
5. The TS renders it, authenticates the user (for example biometrics), and signs both mandates. The `checkout_jwt` hash links them.
6. The SA sends the Payment Mandate to the CP, which verifies it and creates a payment token, possibly obtaining a scoped token from the network.
7. The SA sends the token and the Checkout Mandate to the Merchant, which checks the mandate against the current cart and initiates payment with the token and `checkout_jwt` hash.
8. The MPP verifies the Payment Mandate in the token and its binding to the `checkout_jwt` hash.
9. The MPP returns a signed Payment Receipt to the SA, CP and network; the Merchant returns a signed Checkout Receipt to the SA.

Because the user approves the closed checkout, this can often be replaced by a traditional e-commerce journey between the Merchant and the TS (Spec, Direct).

## Human Not Present flow

From Flows, Human Not Present and Spec, Autonomous:

1. **Phase 1a, user present.** The SA builds open Checkout and Payment Mandate Content. The TS signs both; the open Payment Mandate includes the hash of the open Checkout Mandate, and both carry the agent public key in `cnf`. Set `exp` as short as the task allows.
2. **Phase 1b, user absent.** The SA shops and the Merchant issues a signed Checkout.
3. **Phase 2.** The SA selects the open mandates whose constraints fit, builds closed Checkout and Payment Mandate Content, and signs both with its agent key; `sd_hash` binds each closed mandate to its open one.
4. The CP verifies the open and closed Payment Mandates and creates a token.
5. The Merchant verifies the closed Checkout Mandate against the cart and the open one's constraints, then initiates payment with the token, the `checkout_jwt` hash and the open Checkout Mandate hash.
6. The MPP verifies the Payment Mandates and both bindings; receipts are returned as in the present flow.

The agent must not present another open mandate until it has a rejection receipt for the previous one, and must disclose only what the closed mandates need. Delegation from one shopping agent to another is out of scope for v0.2 (Spec, Agent-to-Agent Delegation).

## Verification per role

From Spec, Verification:

- **Merchant.** Must receive a Checkout Mandate before completing the checkout. Process it per Agent Authorization rules, check `checkout_hash` against the Checkout JWT it issued, and evaluate open-mandate constraints. On failure, return a Checkout Receipt with the error.
- **Credential Provider and Network.** Must receive a Payment Mandate before returning a credential. Process it, evaluate open-mandate constraints, and return a Payment Receipt with the error on failure.
- **Merchant Payment Processor.** Must receive a payment credential from the Merchant and check it is scoped to the Checkout.
- **Dispute.** Verify the Checkout Mandate as a Merchant would, recompute the `checkout_jwt` hash, check the Checkout Receipt `reference` against the closed Checkout Mandate hash, verify the Payment Mandate as the MPP would using the `checkout_hash`, and check the Payment Receipt `reference` against the closed Payment Mandate hash.

The Checkout Mandate and receipt may be held by the SA and Merchant; the Payment Mandate and receipt by the SA, CP, Network and MPP (Spec, Dispute Evidence). Store SD-JWTs with disclosures in compact serialization so the hashes can be recomputed (Implementation Considerations, Hashes).

## Threats and mitigations

From Security and Privacy Considerations:

| Threat                                                                           | Mitigation                                                                                                                                                     |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A stolen Payment Mandate is used with another checkout                           | The Payment Mandate references its checkout: `transaction_id` when closed, the reference constraint when open.                                                 |
| An open mandate is reused for a different closed mandate, or mismatched with one | Closed mandates carry `sd_hash`; open mandates carry the agent key in `cnf`.                                                                                   |
| A closed Checkout Mandate is replayed on another session                         | The Merchant checks `checkout_hash` against its latest `checkout_jwt`.                                                                                         |
| An agent alters the payment in transit                                           | The CP and MPP verify the user's signature; constraints bound amounts and payees.                                                                              |
| A released payment credential is stolen                                          | Release it to the Merchant only after a verified final Payment Mandate.                                                                                        |
| Prompt injection steers product choice                                           | The Merchant's signature protects the offer; constraints bound the worst case.                                                                                 |
| Double spend from one open mandate                                               | No overlapping closed mandates without rejection receipts; receipts protected from the agent's LLM; CP, networks or MPPs may reject overlaps or revoke tokens. |

Privacy: use selective disclosure for constraints that would leak unrelated intent, optionally add decoy digests (RFC 9901 § 4.2.5), salt every digest (RFC 9901 § 9.1), and add a salt to the Checkout if it is signed with a deterministic scheme.

## Operating the agent key and mandates

- One way to protect the agent key is to sign through a tool call in which deterministic code checks the closed mandate first; a technology provider may take this on (Implementation Considerations, Agent Key).
- Mandates are long-lived. Offer a way to see and manage active mandates and the tasks using them, limit their duration, and notify the user even during autonomous runs (Implementation Considerations, Mandate Management).
- Whether to work only with known agents is left to the commerce protocol (Implementation Considerations, Agent Identification). Agent identity schemes such as those in `adjacent-protocols.md` can fill that gap.
