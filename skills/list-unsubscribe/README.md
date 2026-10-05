# list-unsubscribe

An agent skill for email list header fields: `List-Unsubscribe` and the other RFC 2369 fields, RFC 8058 one-click unsubscribe, and RFC 2919 `List-Id`, for senders and receivers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill list-unsubscribe
```

Then ask your agent to "add one-click unsubscribe to our newsletter emails" or "review our List-Unsubscribe endpoint".

## What it covers

- `List-Help`, `List-Unsubscribe`, `List-Subscribe`, `List-Post`, `List-Owner` and `List-Archive`: syntax, URI order, and nested lists.
- `List-Unsubscribe-Post: List-Unsubscribe=One-Click`, the DKIM signature over both headers, opaque unsubscribe URIs, and the HTTPS POST endpoint without redirects or cookies.
- Receiver and mail client behaviour: parsing, user consent, the POST, `mailto:` commands, and `List-Id` matching.
- Gmail and Yahoo bulk sender unsubscribe rules and processing deadlines, labelled as provider policy.
- RFC 8058 and RFC 2919 errata, and upgrading an RFC 2369-only list to one-click.

## Versions

| Line                   | Status  |
| ---------------------- | ------- |
| RFC 2369 with RFC 8058 | current |

`references/versions.md` says what RFC 8058 added, lists the errata, and explains the upgrade to one-click.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 2369](https://www.rfc-editor.org/rfc/rfc2369): RFC (Proposed Standard), RFC 2369.
- [RFC 8058](https://www.rfc-editor.org/rfc/rfc8058) and [its errata](https://www.rfc-editor.org/errata/rfc8058): RFC (Proposed Standard), RFC 8058.
- [RFC 2919](https://www.rfc-editor.org/rfc/rfc2919) and [its errata](https://www.rfc-editor.org/errata/rfc2919): RFC (Proposed Standard), RFC 2919.
- [IANA Message Headers registry](https://www.iana.org/assignments/message-headers): last updated 2026-05-13.
- [Gmail sender guidelines](https://support.google.com/mail/answer/81126) and [FAQ](https://support.google.com/mail/answer/14229414): provider policy.
- [Yahoo sender requirements](https://senders.yahooinc.com/best-practices/) and [FAQs](https://senders.yahooinc.com/faqs/): provider policy.

## License

MIT
