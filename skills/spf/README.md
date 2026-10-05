# spf

An agent skill for RFC 7208 Sender Policy Framework (SPF): writing, checking and debugging `v=spf1` DNS records that authorize which hosts may send mail for a domain, and upgrading from RFC 4408.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill spf
```

Then ask your agent to "review our SPF record" or "fix the too many DNS lookups permerror in our SPF record".

## What it covers

- The record: one DNS TXT record starting with `v=spf1`, multiple strings, record size, and why the SPF RR type is obsolete.
- Mechanisms (`all`, `include`, `a`, `mx`, `ptr`, `ip4`, `ip6`, `exists`), qualifiers, and the `redirect` and `exp` modifiers.
- Macros and their expansion rules.
- The `check_host()` function, the `HELO` and `MAIL FROM` identities, and the seven results.
- The limit of 10 DNS-querying terms, the void lookup limit, and how to count a record tree.
- Flattening trade-offs, forwarding and mailing list failures, and their mitigations.
- SMTP reply codes, including the RFC 7372 enhanced status codes, and the `Received-SPF` and `Authentication-Results` (RFC 8601) header fields.
- What RFC 7208 changed from RFC 4408, its errata, and an upgrade checklist.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| RFC 7208 | current               |
| RFC 4408 | legacy (upgrade from) |

`references/versions.md` says what RFC 7208 changed, which RFCs update it, and how to upgrade from RFC 4408. No preview exists.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 7208](https://www.rfc-editor.org/rfc/rfc7208): RFC (Proposed Standard), updated by RFC 7372, RFC 8553 and RFC 8616.
- [RFC 7208 errata](https://www.rfc-editor.org/errata/rfc7208): 2 verified, 10 reported, 2 held, 3 rejected.
- [RFC 4408](https://www.rfc-editor.org/rfc/rfc4408): RFC (Experimental), obsoleted by RFC 7208.
- [RFC 7372](https://www.rfc-editor.org/rfc/rfc7372): RFC (Proposed Standard), email authentication status codes.
- [RFC 8553](https://www.rfc-editor.org/rfc/rfc8553): RFC (Best Current Practice), underscored DNS node names.
- [RFC 8616](https://www.rfc-editor.org/rfc/rfc8616): RFC (Proposed Standard), email authentication for internationalized mail.
- [RFC 8601](https://www.rfc-editor.org/rfc/rfc8601): RFC (Proposed Standard), the `Authentication-Results` header field.

## License

MIT
