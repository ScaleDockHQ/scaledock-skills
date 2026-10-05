# Versions and upgrades

Read this when choosing a target version, meeting a signer or verifier built against one of the individual `draft-meunier-*` drafts, or upgrading it. Sources: `draft-ietf-webbotauth-httpsig-protocol-00` and its Changelog, `draft-meunier-webbotauth-httpsig-protocol-02`, `draft-meunier-web-bot-auth-architecture-05`, `draft-meunier-http-message-signatures-directory-05`, and the datatracker history of the working group draft, listed in [Sources](../SKILL.md#sources).

Bare section numbers refer to `draft-ietf-webbotauth-httpsig-protocol-00`. Sections of the older drafts are prefixed with the draft name, for example (architecture-05 § 4.2.1).

## Version lines

| Id           | Line                            | Status  | Revision                                                                                                                                                                                                                                                                                             | Posture | Summary                                                                                                                    |
| ------------ | ------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `ietf-00`    | draft-ietf-webbotauth-00        | current | `draft-ietf-webbotauth-httpsig-protocol-00` (2026-09-01)                                                                                                                                                                                                                                             | build   | The working group draft: one protocol document with the directory, typed discovery and the (URL, key) trust model.         |
| `meunier-02` | draft-meunier individual drafts | legacy  | `draft-meunier-webbotauth-httpsig-protocol-00` to `-02` (2026-06-26 to 2026-08-18), `draft-meunier-web-bot-auth-architecture-00` to `-05` and `draft-meunier-http-message-signatures-directory-00` to `-05` (2025-04-15 to 2026-03-02), `draft-meunier-webbotauth-httpsig-directory-00` (2026-06-26) |         | The individual drafts that the working group draft replaced. The architecture and directory drafts split signing and keys. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The datatracker, read 2026-10-05, shows `-00` as the latest revision of the working group draft, so no `-01` exists yet. The text of `draft-meunier-webbotauth-httpsig-protocol-02` is the same as `draft-ietf-webbotauth-httpsig-protocol-00` apart from the draft name and title-case section headings: a deployment on `-02` is already on the current rules.

## Which version to use

- Default to `draft-ietf-webbotauth-httpsig-protocol-00`, with posture build: sign and verify exactly as it specifies.
- No line is supported. A signer on an individual draft is upgraded; a verifier may still accept the legacy bare-String `Signature-Agent` form, because the current draft allows that (§ 5.2.1), but signers must send the dictionary form.
- RFC 9421 underneath is an RFC and does not change with these drafts.

## What changed

### draft-ietf-webbotauth-00

`draft-ietf-webbotauth-httpsig-protocol-00` is the working group adoption of `draft-meunier-webbotauth-httpsig-protocol-02`. Its Changelog records what the individual protocol drafts changed on the way:

In `draft-meunier-webbotauth-httpsig-protocol-02` (now the current text):

- `Signature-Agent` is required on every signed request, and each signature covers the member keyed to its own label (§ 5.2, § 5.2.1).
- Discovery must return 200 (OK) and must not follow redirects (§ 5.5).
- Directory response signatures are optional for directly resolved keys (Appendix B.1).
- Replay protection, including `nonce`, is deferred to RFC 9421; the draft adds no nonce requirement (§ 5.2.3).
- `Signature-Key` is deferred to `draft-hardt-httpbis-signature-key`.

In `draft-meunier-webbotauth-httpsig-protocol-01`:

- The Identifiers and Trust Model section: identity is the resolved `Signature-Agent` URL, not the key; a `directory` value is an origin; `kid` equals the key thumbprint (§ 4, § 4.1, § 5.5).
- Attribution: key lookup on the (URL, key) pair, redistributed key material, failed resolution, and rejection of directory response signatures dated in the future (§ 5.4, § 5.5.3, § 6.10, Appendix B.1).
- The separate directory draft (`draft-meunier-webbotauth-httpsig-directory`) is folded in with its IANA registrations, and the document moves to Standards Track (§ 5.5.1, § 8).
- An outer signature that covers an inner one also covers its `signature-input`, `signature-agent` and every component the inner one covered (§ 5.2.2).

In `draft-meunier-webbotauth-httpsig-protocol-00` (renamed from `draft-meunier-web-bot-auth-architecture`):

- SSRF guidance for discovery fetches, and deployment guidance for outcomes, caching, retry, proxies and observability (§ 6.7, Appendix C).
- Test keys, static signatures and discovery failures (§ 6.8, § 6.9, § 6.10).
- Multiple Web Bot Auth signatures (§ 5.2.2).
- The `type` parameter on `Signature-Agent` members, with the `directory`, `jwks_uri` and `cimd` discovery types (§ 5.2.1, § 5.5).

### draft-meunier individual drafts

What the split design looked like, from `draft-meunier-web-bot-auth-architecture-05` and `draft-meunier-http-message-signatures-directory-05`:

- Signing rules lived in the architecture draft: cover `@authority` or `@target-uri`, and set `created`, `expires`, `keyid` (JWK thumbprint) and `tag="web-bot-auth"` (architecture-05 § 4.2). These are unchanged.
- `Signature-Agent` was RECOMMENDED, not required; if sent, one of its members had to be signed (architecture-05 § 4.2.1).
- `Signature-Agent` member values could use the `https` (recommended), `http` or `data` scheme, with `data` carrying an inline directory (directory-05 § 4.1). There was no `type` parameter; every value pointed at a directory.
- Agents SHOULD add a `nonce` of 64 random bytes, unique within the validity window (architecture-05 § 4.2.2).
- Verifiers could discard signatures with an unknown `keyid`, or fetch the directory named by `Signature-Agent` (architecture-05 § 4.4); keys were not scoped to the URL they came from.
- The directory SHOULD be served over HTTPS (directory-05 § 3), and the directory server was RECOMMENDED to sign its response once per key with `tag="http-message-signatures-directory"` (directory-05 § 5.2).
- Until architecture-04, `Signature-Agent` was a bare String such as `Signature-Agent: "https://signature-agent.test"`; architecture-04 changed it to a Structured Fields Dictionary, and architecture-05 kept the String examples for migration (ietf-00 Changelog).

## Upgrading

### meunier-02 to ietf-00

Upgrading from `draft-meunier-webbotauth-httpsig-protocol-02` itself only changes the citation: update references to the draft name. From any earlier individual draft:

1. Change the version marker: cite `draft-ietf-webbotauth-httpsig-protocol-00` in configuration and documentation; the `tag="web-bot-auth"` value is unchanged (§ 5.2).
2. Replace removed or renamed fields:
   - Send `Signature-Agent` on every signed request, in dictionary form (`sig1="https://..."`), and cover the member for the signature's own label, for example `"signature-agent";key="sig1"` (§ 5.2.1). Replace a bare String value with a dictionary member.
   - Replace `http` and `data` member values with an `https` URL; inline `data:` directories are no longer allowed (§ 5.2.1).
   - Make a `directory` value a bare origin, and add `type=jwks_uri` or `type=cimd` where the URL is not a directory origin (§ 5.5).
   - Set each JWK `kid`, if present, to the key thumbprint (§ 5.5).
   - Verifiers: index keys by (URL, key) instead of `keyid` alone, reject non-200 discovery responses, stop following redirects, and apply the SSRF limits (§ 5.4, § 5.5, § 6.7).
3. Validate against the target: run the Verify list in `SKILL.md`, and check sample requests against the current draft's test vectors (Appendix E).
4. Keep behaviour unchanged: keep the same key pairs, `keyid` values and directory URL so existing verifiers keep attributing requests to the same identity. A `nonce` may stay; the current draft leaves replay policy to RFC 9421 and the verifier (§ 5.2.3).

## Preview

No preview line is listed. The only line with text is `draft-ietf-webbotauth-httpsig-protocol-00`, a working group draft that is the current line with posture build; the datatracker shows no later revision. When `-01` is published, re-read its Changelog and update this file; when the draft becomes an RFC, make the RFC current, make the draft legacy, and add an upgrade section.
