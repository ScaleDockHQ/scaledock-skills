# Schemes and networks

Read this when choosing a scheme, writing or checking a scheme's `payload`, or settling on a specific network. A scheme defines how `payload` is built, how it is validated and settled, and which `extra` keys it uses (v2 § 6). Each scheme has a network-agnostic document and per-network bindings under `specs/schemes/<scheme>/`. Sources are in [Sources](../SKILL.md#sources). Pin the commit of every binding you implement: bindings change on `main` without a protocol version bump.

## Networks and assets

- Networks are CAIP-2 `namespace:reference`, for example `eip155:84532` or `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`. Non-blockchain networks are encouraged to follow the same format, for example `ach:us` (v2 § 11.1).
- On EVM networks, `exact` with EIP-3009 works with ERC-20 tokens that implement EIP-3009. On Solana it works with SPL and Token-2022 tokens. What is actually available depends on the facilitator and the deployment (v2 § 11.2).
- A facilitator lists the `scheme`, `network` and `x402Version` combinations it supports through `GET /supported` (v2 § 7.3).

## `exact` (scheme_exact.md)

Transfers a specific amount that the server knows in advance.

- Default flow: `authorization`. `upfront` MAY be used when the resource needs finality first. `authorization` SHOULD be preferred where the transfer method permits it (Payment Flow).
- A method whose validity window bounds how long a handler may take SHOULD offer `upfront` for longer handlers. On SVM, the blockhash expires after about 60 to 90 seconds, so long-running handlers SHOULD use `upfront` (scheme_exact_svm.md, Protocol Flow).
- Asset transfer method families (Asset Transfer Method Families):
  - **Facilitator-submitted**: the client signs and the facilitator submits. Each method MUST declare its fee payer, replay primitive, validity window and duplicate-submission behaviour. Settlement MUST produce exactly one identifiable transfer of `amount` of `asset` to `payTo`. A sponsoring facilitator MUST NOT be debited beyond the fee. The network's replay primitive is authoritative: a consumed primitive MUST fail settlement. Where a resubmission cannot be told apart from the original, settlements MUST be deduplicated atomically across every `/settle` process.
  - **Client-submitted (payment proof)**: MUST use `upfront`. The proof MUST be bound to the request, by an instrument unique to this request, a server nonce, a payer signature over the requirements, or a payee commitment. It MUST be claimed atomically before the resource runs, with exactly one of two concurrent presentations succeeding. Its consumption key is the CAIP-2 network joined to the payment identifier. It is retained while still presentable, and the method states how non-conforming amounts and failures are handled.

### EVM binding (scheme_exact_evm.md)

| `assetTransferMethod` | Payload                                               | Notes                                                                                                               |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `eip3009` (default)   | `signature`, `authorization`                          | `extra.name` and `extra.version` (the EIP-712 domain) are required. Settles with `transferWithAuthorization`.       |
| `permit2`             | `signature`, `permit2Authorization`                   | The spender is the `x402ExactPermit2Proxy`, and the witness binds `to` and `validAfter`. Needs a Permit2 allowance. |
| `erc7710`             | `delegationManager`, `permissionContext`, `delegator` | Verification is by simulation of `redeemDelegations` only.                                                          |

- If `extra.assetTransferMethod` is absent, clients default to `eip3009`. A payload that uses another method echoes it in `accepted.extra`.
- The facilitator cannot modify the amount or the destination (Summary).
- EIP-3009 verification: the signature recovers to `authorization.from`, the balance is sufficient, the amount and validity window meet the requirements, the token and network match, and the transfer is simulated (Phase 2).
- Permit2 verification: the same signature, balance, amount, `deadline`/`validAfter`, token and network checks, plus the allowance. If the allowance is missing and neither gas-sponsoring extension (`erc20ApprovalGasSponsoring`, `eip2612GasSponsoring`) applies, return `412 Precondition Failed` with `PERMIT2_ALLOWANCE_REQUIRED` (Phase 3).
- ERC-7710: set an explicit gas limit on `redeemDelegations`, and reject when simulation shows unexpectedly high gas, because the delegation can be revoked between simulation and execution (Security Considerations).
- If a broadcast succeeds but confirmation cannot be established, the facilitator MAY return `settlement_pending` with the transaction hash (Phase 3/4).

### SVM binding (scheme_exact_svm.md)

- `extra.feePayer` (the sponsor's key) is required. `extra.memo`, `extra.recentBlockhash` and `extra.lastValidBlockHeight` are optional. If `memo` is present, the client MUST use it as the Memo data.
- `payload.transaction` is a base64, partially signed, versioned transaction. The sponsor adds the fee-payer signature at settle (Protocol Flow).
- Exactly one transfer across the top-level instructions and the CPI trace MUST match the mint, the destination ATA derived from `payTo` and `asset`, and an amount of at least `amount`. Zero or more than one match MUST be rejected (§ 1.4).
- Sponsor baseline, all MUST, before signing (§ 2.1):
  - The fee payer appears in no instruction's accounts and is not a transfer authority or source.
  - Address lookup tables are resolved, and the check fails closed.
  - Fee-payer funds cannot be debited beyond the fee.
  - No signatures are required beyond the client and the fee payer.
- Sponsors SHOULD bound compute units and priority fees, and allowlist programs (§ 2.2).

### Other networks

`exact` has bindings for Algorand, Aptos, Canton, Cardano, Casper, Concordium, Hedera, Keeta, Bitcoin Lightning, NEAR, Starknet, Stellar, Sui, TON and XRPL. Each is `scheme_exact_<network>.md`. `scheme_exact.md` summarises the critical validation rules for SVM, Stellar, TON, Starknet and Hedera (Critical Validation Requirements). Read the binding for the target network before implementing it. This skill does not restate them.

## `upto` (scheme_upto.md)

Authorizes up to a maximum and settles the actual usage, for example per token generated or per byte transferred. It cannot use `upfront` (Payment Flow). Core properties, all MUST:

1. **Single use**: settle each authorization at most once.
2. **Time bound**: a start time (`validAfter`) and an end time (`deadline`).
3. **Recipient binding**: the signature binds the recipient, so the facilitator cannot redirect funds.
4. **Maximum enforcement**: settled amount ≤ the authorized maximum. Zero is allowed.
5. **Phase-dependent `amount`**: at `/verify`, `paymentRequirements.amount` is the maximum. At `/settle`, it is the actual charge. The facilitator MUST re-verify the client's signature against the signed maximum (`permitted.amount`), never against the settle-time `amount`.

- Out of scope: multi-settlement or streaming, recurring charges, and open-ended allowances.
- **EVM** (scheme_upto_evm.md): Permit2 only. EIP-3009 is not supported because it fixes the amount. `extra.facilitatorAddress`, announced through `/supported`, MUST be put into `witness.facilitator`. That binds the authorization to one facilitator.
- At verify, `permitted.amount` must equal `requirements.amount`. At settle, check `requirements.amount <= permitted.amount` and transfer `requirements.amount`. A zero settlement needs no transaction (Phase 3, Phase 4, Settle-Time Verification).
- **SVM** (scheme_upto_svm.md): realised with a payment-channel program. The client escrows the ceiling in a one-request channel, and the server settles with a voucher signed by `extra.receiverAuthorizer`. `expiresAt == 0` MUST be rejected. Per v2 § 6.1, SVM `upto` defaults to `escrow` and EVM `upto` to `authorization`.

## `batch-settlement` (scheme_batch_settlement.md)

- The client sends a payment commitment, access is granted immediately, and value moves later.
- The lifecycle is commit, accumulate, then redeem out of band.
- The client commits up to `amount`, and the server may charge less, reported in `PAYMENT-RESPONSE`.
- Success MUST include a non-empty commitment identifier.
- Every network binding MUST specify:
  - the commitment format
  - verification rules
  - storage
  - double-spend prevention
  - expiry
  - redemption
  - the trust model: capital-backed (escrow, channel or delegation) or credit-backed (a billing account held by a network intermediary)

Bindings exist for EVM, SVM, and one credit-backed network that authenticates commitments with HTTP Message Signatures (RFC 9421) through the `http-message-signatures` extension (`scheme_batch_settlement_*.md`).

## `auth-capture` (scheme_auth_capture.md)

- The client authorizes a maximum, and the payment then has a lifecycle:

| Operation   | What it does                                         | Who starts it                      |
| ----------- | ---------------------------------------------------- | ---------------------------------- |
| `authorize` | holds the funds                                      | client-authorized                  |
| `charge`    | collects without a hold                              | server, relayed by the facilitator |
| `capture`   | pays out held funds; repeatable up to the hold       | server, relayed by the facilitator |
| `void`      | releases the remaining hold                          | server, relayed by the facilitator |
| `refund`    | returns captured funds; repeatable                   | server, relayed by the facilitator |
| `reclaim`   | the client recovers its hold after `captureDeadline` | client alone, never relayed        |

- Default flow `escrow`: `authorize`, then `capture` or `void`, then `refund`. Flow `authorization`: `charge`, then `refund`.
- Lifecycle operations are `/settle` calls, named in the payload, for example `payload.type: "capture"`.
- Deadlines are absolute, in `extra.captureDeadline` and `extra.refundDeadline`.
- `charge`, `capture`, `void` and `refund` MUST be authenticated as consented to by the resource server. Each consent for a repeatable operation MUST be single-use (Core properties).
- The document's own history labels it v1.1 (2026-08-18) after an "Initial draft" v1.0. It has an EVM binding.

## Choosing a scheme

| Need                                          | Scheme             |
| --------------------------------------------- | ------------------ |
| Fixed price known before the call             | `exact`            |
| Metered price capped by the client            | `upto`             |
| Sub-cent or high-volume calls, deferred value | `batch-settlement` |
| Holds, partial capture, refunds               | `auth-capture`     |

Offer several `accepts[]` entries, for example one per network, so clients can pick what they hold. Offer only scheme and network pairs your facilitator lists in `/supported`.
