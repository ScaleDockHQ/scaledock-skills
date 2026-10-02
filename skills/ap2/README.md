# ap2

An agent skill for the Agent Payments Protocol (AP2) v0.2: authorize AI agent payments with user-signed Checkout and Payment Mandates, and verify them as a merchant, credential provider or payment processor.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ap2
```

Then ask your agent to "add AP2 Checkout Mandate verification to our checkout" or "review our shopping agent's AP2 mandate handling".

## What it covers

- The Agent Authorization model: open and closed mandates as SD-JWT verifiable digital credentials, OpenID4VP and Trusted Agent Provider delegation, receipts and errors.
- The Checkout and Payment Mandate schemas, every constraint type, and a TypeScript sketch of merchant-side checks.
- The five roles, Human Present and Human Not Present flows, verification per role, dispute evidence, and the threats AP2 mitigates.
- AP2 with UCP, A2A and MCP, and the superseded v0.1 Intent, Cart and Payment Mandates with the v0.1 A2A extension.
- A comparison with the Visa Trusted Agent Protocol and the Agentic Commerce Protocol (ACP).

Draft posture: build, pinned to AP2 v0.2 (tag `v0.2.0`). AP2 is pre-1.0 and its standardization continues in the FIDO Alliance.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AP2 specification](https://ap2-protocol.org/ap2/specification/) and its pages on mandates, agent authorization, flows, security and implementation: Released, v0.2.
- [AP2 v0.2.0 release](https://github.com/google-agentic-commerce/AP2/releases/tag/v0.2.0): Released, 2026-04-28.
- [AP2 v0.1 specification](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.1.0/docs/specification.md) and [v0.1 A2A extension](https://raw.githubusercontent.com/google-agentic-commerce/AP2/v0.1.0/docs/a2a-extension.md): superseded, v0.1.0.
- [UCP and AP2](https://ucp.dev/documentation/ucp-and-ap2/): documentation.
- [Visa Trusted Agent Protocol specifications](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications): in development and deployment, unversioned.
- [Agentic Commerce Protocol](https://raw.githubusercontent.com/agentic-commerce-protocol/agentic-commerce-protocol/7fdd78df677a94dce04c770644b0fbbb1401272b/README.md): Beta, latest stable 2026-04-17.

## License

MIT
