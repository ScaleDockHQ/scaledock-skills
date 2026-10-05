# Versions and upgrades

Read this when choosing a target version, reading a payload written for AP2 v0.1, upgrading, or deciding what to do about the FIDO standardization work. Sources: the AP2 v0.2 pages on ap2-protocol.org, the AP2 v0.1 specification at tag `v0.1.0`, the AP2 GitHub releases and changelog, and the FIDO Alliance announcement, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line     | Status  | Revision            | Posture | Summary                                                                                  |
| ----- | -------- | ------- | ------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `0.2` | AP2 v0.2 | current | v0.2.0 (2026-04-28) | build   | Open and closed Checkout and Payment Mandates as SD-JWT credentials, with receipts.      |
| `0.1` | AP2 v0.1 | legacy  | v0.1.0 (2025-09-16) |         | Intent, Cart and Payment Mandates and the `v0.1-alpha` A2A extension. Superseded by 0.2. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

AP2 is pre-1.0. The GitHub repository has two releases, `v0.1.0` and `v0.2.0`, and the `main` branch has had no specification change since `v0.2.0` (the one later commit, `e1ea56d`, removes a lock file). Even the current line carries the draft posture build: implement it, but expect incompatible changes.

## Which version to use

- Default to AP2 v0.2. Its `vct` values carry a schema version suffix (`mandate.checkout.1`, `mandate.payment.open.1`), and verifiers match the exact string (Spec, Mandate Versioning).
- No line is supported besides the current one: AP2 v0.1 is legacy. Read a v0.1 payload only to understand a peer or to upgrade it.
- Treat v0.1 and v0.2 as different protocols. Do not feed `ap2.mandates.*` objects into a v0.2 verifier.
- There is no preview: see [Preview](#preview).

## What changed

### AP2 v0.2

The v0.2.0 release notes say it "focuses on providing Human Not Present flows". The changes below are read from the two specification texts:

- Two mandate types replace three: the Checkout Mandate and the Payment Mandate (Spec, Mandates). The Intent and Cart Mandates are gone.
- Every mandate is open or closed. Open mandates carry constraints and the agent key in `cnf`; closed mandates bind to them through the key binding JWT's `sd_hash` (Agent Authorization; Spec, Autonomous).
- Mandates are SD-JWT verifiable digital credentials, typed by `vct` with a numeric version suffix: `mandate.checkout.1`, `mandate.checkout.open.1`, `mandate.payment.1` and `mandate.payment.open.1` (Spec, Mandate Versioning).
- The Merchant signs the Checkout as a JWT; the closed Checkout Mandate binds to it with `checkout_hash` and the Payment Mandate with `transaction_id` (Checkout Mandate, Mandate Schema; Payment Mandate, Mandate Schema).
- Delegation goes through OpenID4VP `transaction_data` of type `delegate` or a Trusted Agent Provider (Agent Authorization, Mandate Delegation).
- Every verification returns a signed receipt, success or error (Agent Authorization, Action Authorization).
- Constraints are typed, for example `checkout.line_items`, `payment.amount_range`, `payment.budget` and `payment.agent_recurrence`, and an unknown type fails evaluation (Agent Authorization, Verification and Processing Rules).
- The specification defines no A2A binding of its own and leaves the commerce protocol out of scope, with UCP as the designed-for carrier (Spec, introduction). The v0.2 samples still use A2A with the extension URI `https://github.com/google-agentic-commerce/ap2/v1`.

### AP2 v0.1

- Three verifiable credentials: the Cart Mandate for human-present purchases, the Intent Mandate for human-not-present tasks, and the Payment Mandate shared with the network and issuer (v0.1 specification, § 4.1, § 4.1.1 to § 4.1.3).
- An A2A extension at `v0.1-alpha` with the URI `https://github.com/google-agentic-commerce/ap2/tree/v0.1`, roles in `params.roles`, and mandates carried as DataParts keyed `ap2.mandates.IntentMandate`, `ap2.mandates.CartMandate` and `ap2.mandates.PaymentMandate` (A2A Extension for AP2).

The full v0.1 model is in [`a2a-mcp-ucp-and-v0-1.md`](a2a-mcp-ucp-and-v0-1.md#the-v01-model-superseded).

## Upgrading

### 0.1 to 0.2

The v0.2 pages publish no mapping from the v0.1 names. Use the inferred mapping in [Moving from v0.1 to v0.2](a2a-mcp-ucp-and-v0-1.md#moving-from-v01-to-v02), and confirm it against both texts before you rely on it.

1. Change the version marker: stop advertising the `v0.1` A2A extension URI, and type every mandate with a v0.2 `vct` value including its suffix (Spec, Mandate Versioning).
2. Replace removed constructs. A Cart Mandate becomes a closed Checkout Mandate over the Merchant-signed `checkout_jwt`. An Intent Mandate becomes an open Checkout Mandate and an open Payment Mandate with constraints, `cnf` and a short `exp`. The v0.1 Payment Mandate becomes a closed Payment Mandate bound by `transaction_id`.
3. Move the user's signature onto the Trusted Surface through OpenID4VP or the Trusted Agent Provider key, and add receipts for every verification, success and error.
4. Validate against v0.2: every verifier runs the v0.2 verification rules, evaluates every constraint, and fails unknown constraint types.
5. Keep behaviour unchanged: the user authorizes the same purchase, amount and payee as before. An upgrade that verifies but widens what the agent may spend is a regression.

## Preview

None is listed. The FIDO Alliance announced on 28 April 2026 that its Payments Technical Working Group will develop agent-initiated commerce specifications from Google's AP2 and Mastercard's Verifiable Intent contributions, and the AP2 site says standardization continues in FIDO. As of 2026-10-05 no FIDO specification text for this work is public, so there is nothing to cite as a preview.

Watch the AP2 GitHub releases and the FIDO Alliance publications. When FIDO or the AP2 repository publishes draft text, add it as a preview with posture track. When it ships, make it current, make AP2 v0.2 legacy (or supported if verifiers keep accepting it), and add an upgrade section.
