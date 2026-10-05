# Versions and upgrades

Read this when choosing a target version, reading a message that has only RFC 2369 headers, upgrading to one-click, or checking for a newer draft. Sources: RFC 2369, RFC 8058, RFC 2919, their RFC Editor entries and errata, and the IETF Datatracker, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line                   | Status  | Revision                                                                           | Posture | Summary                                                                                    |
| --------- | ---------------------- | ------- | ---------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `rfc8058` | RFC 2369 with RFC 8058 | current | RFC 2369 (July 1998) and RFC 8058 (January 2017), both Proposed Standard; RFC 2919 |         | The default and only target. RFC 8058 adds one-click to RFC 2369; RFC 2919 adds `List-Id`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The RFC Editor lists no RFC that updates or obsoletes RFC 2369, RFC 8058 or RFC 2919. RFC 2369 has no predecessor, so there is no legacy line. RFC 8058 does not update RFC 2369 (RFC 8058 § 3.1): a message with only RFC 2369 headers is still valid, it just does not offer one-click.

## Which version to use

- Default to RFC 2369 with RFC 8058, and add `List-Id` from RFC 2919.
- Offer one-click (RFC 8058) whenever the message is DKIM-signed by a domain you control and you can run the HTTPS endpoint. Gmail and Yahoo require it for marketing and subscribed messages from bulk senders; that is provider policy, see [`one-click-endpoint.md`](one-click-endpoint.md).
- A list that only has RFC 2369 fields is not legacy, but it is a candidate for the one-click upgrade below.

## What changed

### RFC 8058 on top of RFC 2369

- New header field `List-Unsubscribe-Post`, whose only value is `List-Unsubscribe=One-Click` (§ 3.1, § 5), registered in the IANA Message Headers registry with status standard (§ 7).
- The receiver may unsubscribe with an HTTPS POST to the HTTPS URI in `List-Unsubscribe`, with the key/value pair as the body (§ 3.2). RFC 2369 alone leaves the URI to the client, and its examples are mostly `mailto:` (RFC 2369 § 3.2).
- New sender obligations: one HTTPS URI that identifies recipient and list, no redirects, a DKIM signature covering both headers (§ 3.1, § 4).
- New receiver obligations: user consent before the POST, no cookies or authorization, no one-click without the DKIM signature (§ 3.1, § 3.2, § 4).

### Errata

- RFC 8058, EID 5117 and EID 8927 (verified, technical): the § 8.3 example's `boundary` parameter is `-FormBoundaryjWmhtjORrn`, because the delimiter line is `--` plus the boundary value (RFC 7578 § 4.1, as cited in the erratum).
- RFC 8058, EID 5559 (verified, editorial): the § 8.3 request target is `/unsubscribe.html/opaque123456789`, matching the URI in the header; the RFC text has a stray `=`.
- RFC 8058, EID 5558 (rejected): the § 8.3 `Content-Length: 124` is correct as printed.
- RFC 2919, EID 3951 (verified, technical): the header syntax is `list-id-header = "List-ID:" [phrase / CFWS] "<" list-id ">" CRLF`, so `List-ID: <list.example.com>` with a space is valid.
- RFC 2919, EID 2499 (held for document update): `[DRUMS]` in §§ 2 and 3 means RFC 2822.
- RFC 2919, EID 361 (rejected): the verifier notes that header field names are case-insensitive, so `List-ID` and `List-Id` are the same field.
- RFC 2369 has no errata.

## Upgrading

### RFC 2369 `List-Unsubscribe` to RFC 8058 one-click

1. Change the version marker: add `List-Unsubscribe-Post: List-Unsubscribe=One-Click` to every message where one-click should work (RFC 8058 § 3.1).
2. Replace removed or renamed fields: none are removed. Make sure `List-Unsubscribe` contains exactly one HTTPS URI with an opaque per-recipient, per-list token (§ 3.1, § 6), and keep any `mailto:` URI next to it (§ 3.1, RFC 2369 § 1). A URI that leads to a landing page or a redirect is not one-click; give the POST target its own non-redirecting handler (§ 3.1).
3. Validate against the target: DKIM-sign with both headers in `h=` (§ 4), and POST the § 8 example bodies, in both encodings, to a staging endpoint.
4. Keep behaviour unchanged: existing `mailto:` and GET unsubscribe paths keep working, and a GET still shows a confirmation step rather than unsubscribing (§ 1, § 3.1 "This document does not update [RFC2369]").

## Preview

No preview line is listed. The Datatracker shows `draft-moonesamy-rfc2369bis-04` and `draft-moonesamy-rfc2919bis-04`, individual drafts whose state is Expired (they expired in 2012), so neither has current text to track; see [draft-moonesamy-rfc2369bis](https://datatracker.ietf.org/doc/draft-moonesamy-rfc2369bis/). No IETF draft updating RFC 8058 was found. If a working group adopts a revision, add it here as a `-preview` line with posture `track`.
