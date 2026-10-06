# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Level 1: identification, tokens and replay protection

Source: https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/index.md

- **Cards on File and Agentic Tokens.** AI Agents cannot use consumers' existing cards on file with merchants, even when logging a consumer into their merchant account.
- **What This Means for Your Implementation.** You do not need to modify your payment processing logic to accept tokenized credentials.
- **Example request.** Signature-Agent: "https://agentpay-key-directory.mastercard.com/"
- **Understanding the Signature Headers.** Identifies the interaction type: `Agent-pay-auth`, `agent-browser-auth` or `agent-payer-auth`
- **Example request.** Your verification logic should check for both scheme-specific and generic tags to support the full range of legitimate agents.
- **Verification Steps Reference.** Verify all required fields are present (`@authority`, `@path`, `created`, `keyid`, `expires`, `tag`, `alg`, `nonce`) | Block request
- **Verification Steps Reference.** Confirm `expires - created` ≤ 8 minutes
- **Replay Attack Protection.** Maintain a cache of seen nonces for the past 8 minutes. Reject any request with a previously seen nonce.
- **What This Means for Your Implementation.** Apply the same card-not-present security measures you use for any online transaction (3-D Secure, AVS, CVV verification) and avoid blocking agents solely because they lack scheme registration.

## Level 3: programmatic checkout

Source: https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/23/index.md

- **Step 2: Validate the intent.** Reject the checkout if intent validation fails. Do not process payments against invalid, expired, or missing intents.
- **Step 3: Validate the payment token.** If a message signature was present, confirm the nonce in the payment object matches the nonce from the message signature headers
- **Step 3: Validate the payment token.** If signature validation fails, the payment object may have been tampered with. Do not process the payment.
- **Mastercard Agent Pay.** Tokenized payload containing DSRP cryptogram and card metadata.

## Testing and reference

Source: https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/24/index.md

- **Level 3: Advanced Programmatic Checkout.** Validate SD-JWT credential chain (L1→L2→L3) if participating in Mastercard Agent Pay
- **Glossary of Terms.** A parameter in the Signature-Input header identifying the interaction type: `agent-pay-auth` (Mastercard)
