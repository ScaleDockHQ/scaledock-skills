# Security considerations

Read this when reviewing a client, a resource server or a facilitator for replay, wrong amounts, expiry, fund safety and double delivery. Rules cite the x402 v2 core specification (v2 § n) and the scheme documents, listed in [Sources](../SKILL.md#sources). The spec's own security section is short (v2 § 10), and most of the binding rules live in the scheme documents, so read the binding for your network as well.

## Trust model

- **Trust minimising.** No payment scheme may let the facilitator or the resource server move funds other than as the client intended (README, Principles).
- On EVM `exact`, the facilitator cannot modify the amount or the destination. It only broadcasts (scheme_exact_evm.md, Summary).
- On `upto`, the signature MUST bind the recipient, so a malicious facilitator cannot redirect funds (scheme_upto.md, property 3).
- On EVM `upto`, the signature also binds one facilitator through `witness.facilitator` (scheme_upto_evm.md, Phase 2).

## Replay and nonce

- Signed authorizations carry a unique 32-byte nonce, and EIP-3009 contracts reject a reused nonce on chain (v2 § 10.1).
- **The network's replay primitive is authoritative.** A consumed primitive MUST produce a settlement failure, never a success (scheme_exact.md, Facilitator-submitted, Replay).
- **Double delivery.** The network stops double spend, not double delivery. If a resubmitted payload looks the same as the original at the network interface, every caller gets success and one payment yields several resources. Such methods MUST deduplicate settlements atomically across every process that serves `/settle`, and keep each key until the payment can no longer land (scheme_exact.md, Duplicate delivery).
- **Client-submitted proofs:**
  - Bind each proof to the request. An unbound proof is valid at any server that shares `payTo` and whose amount it covers.
  - Claim the proof atomically before the resource runs. Of two concurrent presentations, exactly one MUST succeed.
  - Keep the consumed key, the CAIP-2 network plus the payment identifier, for as long as the proof stays presentable (scheme_exact.md, Client-submitted).
- `upto` authorizations settle at most once (scheme_upto.md, property 1).
- `auth-capture` consents for `capture` and `refund` MUST be single-use (scheme_auth_capture.md, Core properties).
- Application-level retries: the `payment-identifier` extension gives an idempotency key. The same `id` with a different payload gets 409 (payment_identifier.md, Idempotency Behavior).

## Amounts

- `amount` is a string of atomic units (v2 § 5.1.2). Never use a decimal display amount.
- **`exact`:** settlement MUST produce exactly one identifiable transfer of `amount` of `asset` to `payTo` (scheme_exact.md, Transfer correctness).
  - EVM: the amount must match exactly (`invalid_exact_evm_payload_authorization_value_mismatch`, v2 § 9).
  - SVM: exactly one matching transfer of at least `amount`. Overpayment is tolerated; zero matches or several matches are rejected (scheme_exact_svm.md, § 1.4).
- **`upto`:** the settled amount must be ≤ the signed maximum, and zero is allowed.
  - Re-verify the signature at settle against the signed maximum, never against the settle-time `amount` (scheme_upto.md, properties 4 and 5).
  - A facilitator that requires settle-time `amount` to equal `permitted.amount` breaks partial settlement (scheme_upto_evm.md, Conformance note).
- **Clients:** check every `accepts[]` entry against your own budget before signing. Budget management is out of scope of the spec and belongs to the client (v2 Document Scope).
- **Failed handlers:** under `authorization`, a handler that fails leaves the client uncharged. Under `upfront`, the client is charged with nothing delivered, and no refund is defined (scheme_exact.md, Payment Flow). Prefer `authorization` when both are offered (v2 § 6.1).

## Expiry and timing

- Authorizations have explicit validity windows (v2 § 10.1):
  - EIP-3009: `validAfter` and `validBefore`;
  - Permit2: `witness.validAfter` and `deadline`;
  - `upto`: a start time and an end time (scheme_upto.md, property 2).
- Facilitators MUST check that the authorization is inside its window at verify time (scheme_exact_evm.md, Phase 2 and Phase 3).
- `maxTimeoutSeconds` bounds how long the payment may take (v2 § 5.1.2). Bindings tie expiry to it. For example, Stellar authorization expiry MUST NOT exceed the ledger count derived from `maxTimeoutSeconds`, and Starknet `Execute Before` MUST cover it (scheme_exact.md, Critical Validation Requirements).
- On SVM, the blockhash expires after about 60 to 90 seconds. Long handlers SHOULD use `upfront`, because otherwise the transaction can expire before settle (scheme_exact_svm.md, Protocol Flow).
- `settlement_pending` is non-terminal: the transaction may still confirm. Reconcile on chain using `transaction` before you retry, or you may settle twice (v2 § 9).

## Ordering and state

- At least one verify or settle MUST run before the resource executes (v2 § 6.1).
- `/verify` MUST NOT commit payment state or write onchain (v2 § 7.1). Treat it as advisory. Only `/settle` establishes finality.
- Resource servers MUST reject unsupported transfer method and flow combinations. Clients MUST NOT pay into a `paymentFlow` they do not recognise (v2 § 6.1).
- **MCP:** if settlement fails after the tool ran, return the payment error, not the tool content (transports-v2/mcp.md, Settlement Failure).

## Sponsor safety (facilitators)

- **Fees:** where the facilitator sponsors fees, no operation in the signed payment may debit it beyond the fee (scheme_exact.md, Facilitator safety).
- **SVM:**
  - The fee payer appears in no instruction's accounts and is never a transfer authority or source.
  - Resolve address lookup tables and fail closed.
  - Require no signatures beyond the client and the fee payer.
  - Bound compute units and priority fees, and allowlist programs (scheme_exact_svm.md, § 2.1 and § 2.2).
- **EVM ERC-7710:**
  - Set an explicit gas limit on `redeemDelegations`, and reject unexpectedly high simulated gas.
  - Expect the client to be able to invalidate a delegation between simulation and execution (scheme_exact_evm.md, ERC-7710 Security Considerations).
- **SVM `upto`:** the server MUST treat unsettled voucher value as facilitator credit risk and settle promptly (scheme_upto_svm.md, § 1).

## Information exposure

- `EXTENSION-RESPONSES` and `extensionResponses` are never forwarded or serialised to buyers (v2 § 5.4.2, § 7.2.1).
- `PaymentRequired.error` and `ResourceInfo` are visible to any caller. Discovery publishes `accepts` and resource descriptions (v2 § 8). Keep internal details out of them.

## Authentication

- x402 can be combined with wallet authentication for authenticated pricing (v2 § 10.2).
- The `sign-in-with-x` extension (CAIP-122) lets returning payers skip payment. `auth-hints` tells clients which `accepts[]` entries need authentication before they pay (extension documents).

## Common mistakes

- Sending `X-PAYMENT` to a v2 server, or v1 network names such as `base-sepolia` in a v2 `accepts[]`.
- Putting `PaymentRequired` only in the 402 body on HTTP v2. Its canonical place is the `PAYMENT-REQUIRED` header.
- Reading decimal prices into `amount`.
- Settling before the handler under `authorization`, or calling `/verify` under `upfront` and treating it as finality.
- Retrying `/settle` blindly after `settlement_pending`.
- Comparing the `upto` settle-time `amount` with the signed maximum for equality.
- Forwarding facilitator extension responses to the client.
