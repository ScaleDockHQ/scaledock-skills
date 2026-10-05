---
name: list-unsubscribe
description: >-
  List-Unsubscribe (RFC 2369, RFC 8058 one-click): add and process email
  unsubscribe headers. Covers the current line, RFC 2369 with RFC 8058, plus
  RFC 2919 List-Id; no preview exists. Use when building or reviewing a
  newsletter, marketing or mailing list sender, a one-click unsubscribe HTTPS
  endpoint, or a mail client or mailbox provider that shows an unsubscribe
  button: List-Unsubscribe with angle-bracketed mailto and https URIs,
  List-Unsubscribe-Post: List-Unsubscribe=One-Click, the HTTPS POST a receiver
  sends, multipart/form-data or application/x-www-form-urlencoded bodies, no
  redirects, no cookies or HTTP authorization, opaque hard-to-forge tokens,
  covering both headers in the DKIM h= tag, List-Help, List-Subscribe,
  List-Post (including NO), List-Owner, List-Archive, List-Id, nested lists,
  and Gmail and Yahoo bulk sender one-click unsubscribe requirements (provider
  policy, not spec).
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# List-Unsubscribe and list header fields

RFC 2369 (IETF, July 1998) defines the `List-Help`, `List-Unsubscribe`, `List-Subscribe`, `List-Post`, `List-Owner` and `List-Archive` header fields, which carry angle-bracketed URIs for mailing list commands. RFC 8058 (IETF, January 2017) adds `List-Unsubscribe-Post`, which signals that the HTTPS URI in `List-Unsubscribe` accepts a one-click POST. RFC 2919 (IETF, March 2001) defines `List-Id`, which identifies the list. With this skill the agent writes these header fields on the sender side, builds the one-click endpoint, and implements the receiver or mail client side that parses them and sends the POST.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: sender (list manager, newsletter or marketing platform, transactional mailer that runs lists), receiver (mailbox provider or MUA that offers an unsubscribe action), or both.
- Target version: RFC 2369 with RFC 8058 (default and only line), with RFC 2919 for `List-Id`. No legacy line and no preview exist. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the RFC Editor entries of RFC 2369, RFC 8058 and RFC 2919 for errata or updating RFCs, search the IETF Datatracker for drafts that update them, re-read the provider policy pages, and update the pins.
- Mail streams: which messages belong to a list (they get the headers) and which are one-off transactional mail.
- Signing: which domain signs with DKIM and whether you control its `h=` list (one-click needs it, RFC 8058 § 4).
- Mailbox providers: whether the sender has to meet Gmail or Yahoo bulk sender rules. These are provider policy, not part of the RFCs.

## Invariants

1. **Only list software generates these fields, at most one of each per message** (RFC 2369 § 3, RFC 2919 § 3). Strip user-originated list header fields from incoming posts (RFC 2369 § 5, RFC 2919 § 8).
2. **Values are angle-bracketed URIs, comma-separated, in order of preference** (RFC 2369 § 2). No whitespace inside the brackets (RFC 2369 § 2). `List-Post` alone may carry the value `NO` (RFC 2369 § 3.4).
3. **One-click needs exactly one HTTPS URI** in `List-Unsubscribe`, plus one `List-Unsubscribe-Post` whose value is exactly `List-Unsubscribe=One-Click` (RFC 8058 § 3.1, § 5). Other non-HTTP URIs such as `mailto:` may sit next to it (§ 3.1).
4. **Both headers are DKIM-signed.** The message has at least one valid DKIM signature whose `h=` tag includes `List-Unsubscribe` and `List-Unsubscribe-Post` (RFC 8058 § 3.1, § 4). Without it, receivers SHOULD NOT offer one-click (§ 4).
5. **The URI alone identifies recipient and list** (RFC 8058 § 3.1). There are no extra POST arguments, so everything is encoded in the URI, and it SHOULD carry an opaque or hard-to-forge component that the server verifies (§ 3.1, § 6).
6. **The endpoint never redirects** a one-click POST (RFC 8058 § 3.1), and needs no cookies, HTTP authorization or other context: the receiver MUST NOT send them (§ 3.1, § 6).
7. **Receivers POST only with user consent** (RFC 8058 § 3.2). The body is the key/value pair from `List-Unsubscribe-Post`, sent as `multipart/form-data` (SHOULD) or `application/x-www-form-urlencoded` (MAY) (§ 3.2).
8. **Clients let the user confirm any list command** before it runs (RFC 2369 § 5), and do not follow URIs that endanger the user's system, such as `file://` (RFC 2369 § 5).
9. **`List-Id` is a domain you control, compared case-insensitively and never trusted as authentication** (RFC 2919 § 2, § 6, § 8). It is at most 255 octets (§ 2).

## Workflow

1. **Pick the version.** Use RFC 2369 with RFC 8058, and RFC 2919 for `List-Id`.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target is recorded, and the provider policies you must meet are listed separately from the RFC rules.
2. **Choose the header fields.** Decide which RFC 2369 fields the list offers, include them on every list message including command responses (RFC 2369 § 3), and add a `mailto:` URI next to any web URI (RFC 2369 § 1). Assign a stable `List-Id` (RFC 2919 § 4, § 5).
   -> [`references/headers.md`](references/headers.md)
   ✓ Each field appears at most once, every value starts with `<`, and `List-Id` sits under a domain the list owner controls.
3. **Mint the unsubscribe URI.** Encode recipient and list in an opaque, hard-to-forge token in an HTTPS URI that reaches your endpoint directly.
   -> [`references/one-click-endpoint.md`](references/one-click-endpoint.md)
   ✓ The URI identifies one recipient on one list, cannot be guessed or edited into another subscriber's URI, and does not redirect.
4. **Sign the message.** Add `List-Unsubscribe-Post: List-Unsubscribe=One-Click` and DKIM-sign with both list headers in `h=` (RFC 8058 § 4). Install the `dkim` skill for signing details.
   ✓ A verifier reports a passing DKIM signature whose `h=` contains `List-Unsubscribe` and `List-Unsubscribe-Post`.
5. **Build the endpoint.** Handle POST with either form encoding as a completed unsubscribe without further interaction, and GET as the manual path with a confirmation step (RFC 8058 § 1, § 3.2).
   -> [`references/one-click-endpoint.md`](references/one-click-endpoint.md)
   ✓ A POST with `List-Unsubscribe=One-Click` and no cookies removes the recipient from that list; a GET alone removes nobody; no 3xx is ever returned to the POST.
6. **Meet the processing timeline your providers set.** The RFCs set none. Gmail recommends fulfilling one-click requests within 48 hours and Yahoo requires honoring unsubscribes within 2 days (provider policy).
   -> [`references/one-click-endpoint.md`](references/one-click-endpoint.md)
   ✓ Removal reaches every sending system within the strictest provider window you must meet.
7. **Receiver or MUA side.** Parse the fields with the RFC 2369 § 2 tolerance rules, check the DKIM condition, get user consent, then POST or open the URI.
   -> [`references/receiver-behavior.md`](references/receiver-behavior.md)
   ✓ One-click is offered only for a validly signed message with one HTTPS URI and the exact `List-Unsubscribe-Post` value, and the POST carries no cookies or credentials.
8. **Nested lists and forwarding.** A sublist replaces the parent's `List-Help`, `List-Subscribe`, `List-Unsubscribe` and `List-Owner`, and leaves `List-Id` alone (RFC 2369 § 4, RFC 2919 § 7).
   -> [`references/headers.md`](references/headers.md)
   ✓ An unsubscribe from a sublist message removes the reader from the list that actually mailed them.
9. **Upgrade** (only when asked). Turn an RFC 2369-only `List-Unsubscribe` into one-click by following the upgrade section.
   -> [`references/versions.md`](references/versions.md)
   ✓ The message carries one HTTPS URI, the `List-Unsubscribe-Post` field, and a DKIM signature over both, and the existing `mailto:` path still works.

## Verify before done

- [ ] Every list message has at most one of each `List-*` field, and every value starts with `<` (RFC 2369 § 2, § 3).
- [ ] `List-Unsubscribe` has exactly one HTTPS URI, and `List-Unsubscribe-Post` is exactly `List-Unsubscribe=One-Click` (RFC 8058 § 3.1, § 5).
- [ ] A valid DKIM signature lists both headers in `h=` (RFC 8058 § 4).
- [ ] The URI carries a verified opaque or hard-to-forge token identifying recipient and list (RFC 8058 § 3.1, § 6).
- [ ] The endpoint accepts `multipart/form-data` and `application/x-www-form-urlencoded`, never redirects the POST, and needs no cookie or login (RFC 8058 § 3.1, § 3.2).
- [ ] Receivers POST only after user consent and without cookies, authorization or other context (RFC 8058 § 3.1, § 3.2, § 6).
- [ ] `List-Id` is under a domain the owner controls (or a conforming `localhost` id), at most 255 octets, and unchanged across host moves (RFC 2919 § 2, § 4, § 5).
- [ ] Provider rules (Gmail, Yahoo) are documented as provider policy, with their pinned page and check date, never as RFC requirements.

## Reference index

- **`references/versions.md`**: the single version line, what RFC 8058 added to RFC 2369, the errata, the expired bis drafts, and the upgrade to one-click. Load for steps 1 and 9.
- **`references/headers.md`**: syntax and semantics of every RFC 2369 field, `List-Unsubscribe-Post`, and `List-Id`, with examples, nested lists and the IANA registry entries. Load for steps 2 and 8.
- **`references/one-click-endpoint.md`**: the sender side: URI design, the POST request, GET versus POST, response rules, security, and provider timelines. Load for steps 3 to 6.
- **`references/receiver-behavior.md`**: the receiver and MUA side: parsing, choosing a URI, the DKIM check, consent, sending the POST, `mailto:` handling, and `List-Id` use. Load for step 7.

## Related skills

- `dkim` for signing the message with `List-Unsubscribe` and `List-Unsubscribe-Post` in `h=`: `npx skills add ScaleDockHQ/scaledock-skills --skill dkim`.
- `dmarc` for From-domain alignment, which Gmail and Yahoo also require from bulk senders: `npx skills add ScaleDockHQ/scaledock-skills --skill dmarc`.
- `spf` for authorizing the sending hosts: `npx skills add ScaleDockHQ/scaledock-skills --skill spf`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 2369: The Use of URLs as Meta-Syntax for Core Mail List Commands and their Transport through Message Header Fields](https://www.rfc-editor.org/rfc/rfc2369): RFC (Proposed Standard), RFC 2369 (July 1998), no errata, checked 2026-10-05.
- [RFC 8058: Signaling One-Click Functionality for List Email Headers](https://www.rfc-editor.org/rfc/rfc8058): RFC (Proposed Standard), RFC 8058 (January 2017), checked 2026-10-05.
- [RFC 8058 errata](https://www.rfc-editor.org/errata/rfc8058): RFC Editor errata, verified EIDs 5117, 5559 and 8927, checked 2026-10-05.
- [RFC 2919: List-Id](https://www.rfc-editor.org/rfc/rfc2919): RFC (Proposed Standard), RFC 2919 (March 2001), checked 2026-10-05.
- [RFC 2919 errata](https://www.rfc-editor.org/errata/rfc2919): RFC Editor errata, verified EID 3951, held EID 2499, checked 2026-10-05.
- [IANA Message Headers registry](https://www.iana.org/assignments/message-headers): IANA registry, last updated 2026-05-13, checked 2026-10-05.
- [Gmail: Email sender guidelines](https://support.google.com/mail/answer/81126): provider policy (Google), page as read 2026-10-05, checked 2026-10-05.
- [Gmail: Email sender guidelines FAQ](https://support.google.com/mail/answer/14229414): provider policy (Google), page as read 2026-10-05, checked 2026-10-05.
- [Yahoo: Sender Requirements & Recommendations](https://senders.yahooinc.com/best-practices/): provider policy (Yahoo), Senders Best Communications Practices Version 3.0, checked 2026-10-05.
- [Yahoo: Sender FAQs](https://senders.yahooinc.com/faqs/): provider policy (Yahoo), page as read 2026-10-05, checked 2026-10-05.
