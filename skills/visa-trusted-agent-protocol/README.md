# visa-trusted-agent-protocol

An agent skill for Trusted Agent Protocol: verifying Trusted Agent Protocol signatures and objects as a merchant or site protection provider.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill visa-trusted-agent-protocol
```

Then ask your agent to apply Trusted Agent Protocol.

## What it covers

- Visa's Trusted Agent Protocol (TAP) lets an AI agent prove to a merchant that it is a trusted agent acting for a consumer, using an RFC 9421 HTTP message signature with an `agent-browser-auth` or `agent-payer-auth` tag, plus signed consumer recognition and payment container objects linked to it by the same nonce. This skill quotes the Merchant Specifications page on Visa Developer and the visa/trusted-agent-protocol repository README pinned at a commit.
- The Merchant Specifications page is unversioned and says that accessing or using it means agreeing to the Visa Trusted Agent Protocol Product Terms; read those terms before relying on the page. Where the page labels content as the Visa implementation (Visa ID Token, the Visa-hosted key URL), the rules apply to Visa's deployment of the protocol. The repository's sample agent, proxy and registry code is out of scope.

## Versions

| Line                   | Status  |
| ---------------------- | ------- |
| Trusted Agent Protocol | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Trusted Agent Protocol: Merchant Specifications](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications): Visa Developer specification, Unversioned page, read 2026-10-06.
- [Trusted Agent Protocol README](https://raw.githubusercontent.com/visa/trusted-agent-protocol/16d59bdf3f8a542bc538d0962edbb80ea30a02af/README.md): Repository document, commit 16d59bd, 2025-10-28.

## License

MIT
