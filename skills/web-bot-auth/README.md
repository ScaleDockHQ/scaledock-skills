# web-bot-auth

An agent skill for Web Bot Auth: sign bot and AI agent HTTP requests with RFC 9421 HTTP Message Signatures, publish keys in a directory, and verify signed requests at an origin or proxy, following `draft-ietf-webbotauth-httpsig-protocol-00` with upgrades from the individual `draft-meunier-*` drafts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill web-bot-auth
```

Then ask your agent to "sign our crawler's requests with Web Bot Auth" or "verify Web Bot Auth signatures in our reverse proxy".

## What it covers

- RFC 9421 essentials: covered components, signature parameters, the signature base and the verification algorithm.
- The signing profile: `tag="web-bot-auth"`, `created`, `expires`, JWK thumbprint `keyid`, and the `Signature-Agent` header.
- Key directories at `/.well-known/http-message-signatures-directory`, the `jwks_uri` and `cimd` discovery types, rotation and directory response signatures.
- Verification: the (URL, key) trust model, SSRF-safe fetching, caching, failure handling and the verified, invalid and unverified outcomes.

Draft posture: build, pinned to `draft-ietf-webbotauth-httpsig-protocol-00`.

## Versions

| Line                            | Status                |
| ------------------------------- | --------------------- |
| draft-ietf-webbotauth-00        | current (build)       |
| draft-meunier individual drafts | legacy (upgrade from) |

`references/versions.md` says what changed since the individual drafts and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9421: HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421): RFC (Standards Track).
- [draft-ietf-webbotauth-httpsig-protocol-00](https://www.ietf.org/archive/id/draft-ietf-webbotauth-httpsig-protocol-00.txt): WG draft, -00.
- [draft-ietf-webbotauth-httpsig-protocol datatracker page](https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/): WG Document.
- [draft-meunier-webbotauth-httpsig-protocol](https://datatracker.ietf.org/doc/draft-meunier-webbotauth-httpsig-protocol/): Replaced, -02.
- [draft-meunier-http-message-signatures-directory](https://datatracker.ietf.org/doc/draft-meunier-http-message-signatures-directory/): Replaced, -05.
- [draft-meunier-webbotauth-httpsig-protocol-02](https://www.ietf.org/archive/id/draft-meunier-webbotauth-httpsig-protocol-02.txt), [draft-meunier-web-bot-auth-architecture-05](https://www.ietf.org/archive/id/draft-meunier-web-bot-auth-architecture-05.txt) and [draft-meunier-http-message-signatures-directory-05](https://www.ietf.org/archive/id/draft-meunier-http-message-signatures-directory-05.txt): replaced individual drafts, for the legacy line.
- [Web Bot Auth working group charter](https://datatracker.ietf.org/wg/webbotauth/about/): Active.
- [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638) and [RFC 8037](https://www.rfc-editor.org/rfc/rfc8037): RFC (Standards Track), for JWK thumbprints.

## License

MIT
